using System.Net;
using System.Web;

namespace UrashimaServer.Middlewares
{
    public class ExtractInfoMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            string? encodedData = context.Request.Headers["Regions"];
            context.Items["address"] = HttpUtility.UrlDecode(encodedData);

            await next(context);
        }
    }
}
