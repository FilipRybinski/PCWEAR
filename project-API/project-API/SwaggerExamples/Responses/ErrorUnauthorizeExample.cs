using project_API.Settings;
using Swashbuckle.AspNetCore.Filters;

namespace project_API.SwaggerExamples.Responses
{
    public class ErrorUnauthorizeExample : ErrorDetails, IExamplesProvider<ErrorUnauthorizeExample>
    {
        public ErrorUnauthorizeExample GetExamples()
        {
            return new ErrorUnauthorizeExample()
            {
                Code=401,
                Message = "Unauthorized access",
            };
        }
    }
}
