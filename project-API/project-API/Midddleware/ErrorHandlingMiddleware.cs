﻿using Newtonsoft.Json;
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
            }
            catch(UnauthorizedAccessException e)
            {
                await createResponse(context.Response.StatusCode, e, context);
            }
            catch (CustomException e)
            {
                _logger.LogError(e, e.Message);
                await createResponse((int)HttpStatusCode.InternalServerError, e, context);
            }
            catch (NotFoundException e)
            {
                _logger.LogError(e, e.Message);
                await createResponse((int)HttpStatusCode.NotFound, e, context);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                await createResponse((int)HttpStatusCode.InternalServerError, e, context);
            }
        }
        public async Task<HttpContext> createResponse(int code,Exception e,HttpContext context)
        {
            ErrorDetails details = new ErrorDetails()
            {
                Code = code,
                Message = e.Message,
                StackTrace=e.StackTrace
            };
            string json = JsonConvert.SerializeObject(details);
            context.Response.StatusCode = code;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(json);
            return context;
        }
    }
}