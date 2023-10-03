using project_API.Settings;
using Swashbuckle.AspNetCore.Filters;

namespace project_API.SwaggerExamples.Responses
{
    public class ErrorInternalServerExample : ErrorDetails, IExamplesProvider<ErrorInternalServerExample>
    {
        public ErrorInternalServerExample GetExamples()
        {
            return new ErrorInternalServerExample()
            {
                Code = 500,
                Message = "Internal Server Error",
            };
        }
    }
}