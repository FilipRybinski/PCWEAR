namespace project_API.Exceptions
{
    public class CustomException:Exception
    {
        public CustomException (string message) : base (message) { }
    }
    public class NotFoundException : Exception
    {
        public NotFoundException () : base ("Not enough resources are available to complete this operation") { }
    }
}
