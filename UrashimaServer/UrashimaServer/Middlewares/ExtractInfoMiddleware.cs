using System.Net;

namespace UrashimaServer.Middlewares
{
    public class Address
    {
        public string? Ward { get; set; }
        public string? District { get; set; }
    }
    public class ExtractInfoMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var address = new Address();
            address.Ward = context.Request.Cookies["ward"];
            address.District = context.Request.Cookies["district"];

            context.Items["address"] = address;
            await next(context);
        }
    }
}
