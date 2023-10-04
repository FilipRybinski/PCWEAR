namespace project_API.Exceptions
{
    public class BadRequestException:Exception
    {
        public BadRequestException() : base("Bad request") { }
        public BadRequestException(string message) : base (message) { }
    }
    public class NotFoundException : Exception
    {
        public NotFoundException () : base ("Not enough resources are available to complete this operation") { }
        public NotFoundException(string message):base ((message + " resources are not available to complete this operation")) { }
    }
    public class InternalServerException : Exception
    {
        public InternalServerException() : base("Iternal Server Error") { }
        public InternalServerException(string message) : base((message + " caused the error")) { }
    }
}
