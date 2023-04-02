using Org.BouncyCastle.Crypto.Tls;
using project_API.Exceptions;

namespace project_API.Midddleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
               await next.Invoke(context);
            }
            catch (NotFoundException e)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(e.Message);
            }
            catch(VerificationPasswordException e)
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
