using Newtonsoft.Json;
using Org.BouncyCastle.Crypto.Tls;
using project_API.Exceptions;
using project_API.Settings;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace project_API.Midddleware
{
    public class errorHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<errorHandlingMiddleware> _logger;
        public errorHandlingMiddleware(ILogger<errorHandlingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
                if (context.Response.StatusCode == 401)
                {
                    await createResponse(context.Response.StatusCode, "Unauthorized access", context);
                }
            }
            catch (CustomException e)
            {
                _logger.LogError(e, e.Message);
                await createResponse((int)HttpStatusCode.InternalServerError, e.Message, context);
            }
            catch (NotFoundException e)
            {
                _logger.LogError(e, e.Message);
                await createResponse((int)HttpStatusCode.NotFound, e.Message, context);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                await createResponse((int)HttpStatusCode.InternalServerError, e.Message, context);
            }
        }
        public async Task<HttpContext> createResponse(int code,string message,HttpContext context)
        {
            ErrorDetails details = new ErrorDetails()
            {
                Code = code,
                Message = message
            };
            string json = JsonConvert.SerializeObject(details);
            context.Response.StatusCode = code;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(json);
            return context;
        }
    }
}