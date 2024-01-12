using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using UrashimaServer;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Middlewares;
using UrashimaServer.RealTime;

var builder = WebApplication.CreateBuilder(args);

// Logger
var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .Filter.ByIncludingOnly("StatusCode = 200 or StatusCode = 401 and RequestPath like '%/api/%'")
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

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
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://localhost:2808").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://localhost:2816").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://localhost:2016").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("https://www.urashima-ads.site").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("https://www.officer.urashima-ads.site").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        policy.WithOrigins("https://www.hq.urashima-ads.site").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    }));
// Auto Mapper
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<GlobalExceptionHandleMiddleware>();
builder.Services.AddTransient<ExtractInfoMiddleware>();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("production")));
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("NgOrigins");
app.UseHttpsRedirection();

app.MapHub<ChatHub>("chat-hub");

app.UseAuthorization();

app.UseMiddleware<GlobalExceptionHandleMiddleware>();
app.UseMiddleware<ExtractInfoMiddleware>();

app.MapControllers();

app.Run();
