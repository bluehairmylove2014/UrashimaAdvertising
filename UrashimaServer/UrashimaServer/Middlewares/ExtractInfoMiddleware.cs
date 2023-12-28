using System.Net;
using System.Web;

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
            string? encodedData = context.Request.Cookies["regions"];
            context.Items["address"] = HttpUtility.UrlDecode(encodedData!);

            await next(context);
        }
    }
}
