using Swashbuckle.AspNetCore.Filters;

namespace project_API.Settings
{
    public class ErrorDetails
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }
    public class BadRequestExample : ErrorDetails, IExamplesProvider<BadRequestExample>
    {
        public BadRequestExample GetExamples()
        {
            return new BadRequestExample()
            {
                Code = 400,
                Message = "Bad request",
                StackTrace = "path"
            };
        }
    }
    public class InternalServerExample : ErrorDetails, IExamplesProvider<InternalServerExample>
    {
        public InternalServerExample GetExamples()
        {
            return new InternalServerExample()
            {
                Code = 500,
                Message = "Internal Server Error",
                StackTrace = "path"
            };
        }
    }
    public class NotFoundExample : ErrorDetails, IExamplesProvider<NotFoundExample>
    {
        public NotFoundExample GetExamples()
        {
            return new NotFoundExample()
            {
                Code = 404,
                Message = "Not enough resources are available to complete this operation",
                StackTrace = "path"
            };
        }
    }
    public class UnauthorizeExample : ErrorDetails, IExamplesProvider<UnauthorizeExample>
    {
        public UnauthorizeExample GetExamples()
        {
            return new UnauthorizeExample()
            {
                Code = 401,
                Message = "Unauthorized access",
                StackTrace = "path"
            };
        }
    }
}
