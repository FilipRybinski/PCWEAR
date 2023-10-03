using project_API.Settings;
using Swashbuckle.AspNetCore.Filters;
namespace project_API.SwaggerExamples.Responses
{
    public class ErrorThreadNotFoundExample : ErrorDetails, IExamplesProvider<ErrorThreadNotFoundExample>
    {
        public ErrorThreadNotFoundExample GetExamples()
        {
            return new ErrorThreadNotFoundExample()
            {
                Code = 404,
                Message = "Not enough resources are available to complete this operation",
                StackTrace = "path"
            };
        }
    }
}


