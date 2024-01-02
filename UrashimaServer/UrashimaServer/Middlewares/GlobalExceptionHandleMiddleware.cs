using System.Net;
using System.Text.Json;

namespace UrashimaServer.Middlewares
{
    public class GlobalExceptionHandleMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            } catch (Exception ex)
            {
                Console.WriteLine("Err: " + ex.Message);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                string json = JsonSerializer.Serialize(new
                {
                    message = ex.Message
                });

                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(json);
            }
        }
    }
}
