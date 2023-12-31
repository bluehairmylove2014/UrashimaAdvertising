using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using System.Text.Json.Serialization;
using UrashimaServer;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddCors(options => options.AddPolicy(name: "NgOrigins",
    policy =>
    {
        policy.WithOrigins("http://localhost:2808").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://localhost:2816").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://localhost:2016").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://www.urashima-ua.site").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://www.officer.urashima-ua.site").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://www.hq.urashima-ua.site").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    }));
// Auto Mapper
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<GlobalExceptionHandleMiddleware>();
builder.Services.AddTransient<ExtractInfoMiddleware>();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("production")));  

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("NgOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<GlobalExceptionHandleMiddleware>();
app.UseMiddleware<ExtractInfoMiddleware>();

app.MapControllers();

app.Run();
