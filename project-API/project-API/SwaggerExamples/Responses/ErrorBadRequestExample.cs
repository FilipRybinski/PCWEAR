using project_API.Settings;
using Swashbuckle.AspNetCore.Filters;

namespace project_API.SwaggerExamples.Responses
{
    public class ErrorBadRequestExample : ErrorDetails, IExamplesProvider<ErrorBadRequestExample>
    {
        public ErrorBadRequestExample GetExamples()
        {
            return new ErrorBadRequestExample()
            {
                Code = 400,
                Message = "Bad request",
                StackTrace = "path"
            };
        }
    }
}