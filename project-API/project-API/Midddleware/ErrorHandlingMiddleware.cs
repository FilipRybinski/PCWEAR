using Org.BouncyCastle.Crypto.Tls;
using project_API.Exceptions;

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
            }
            catch (notFoundException e)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(e.Message);
            }
            catch(verificationPasswordException e)
            {
                context.Response.StatusCode = 406;
                await context.Response.WriteAsync(e.Message);
            }
            catch (Exception e)
            { 
                _logger.LogError(e,e.Message);
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Someting went wrong ");
            }
        }
    }
}
