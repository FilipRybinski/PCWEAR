using FluentValidation;
using project_API.Entities;

namespace project_API.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<UserRegisterDto>
    {

        public RegisterUserDtoValidator(DataBase dbcontext)
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.UserPassword).MinimumLength(8);
            RuleFor(x => x.UserPasswordConfirmed).Equal(e => e.UserPassword);
            RuleFor(x => x.Email).Custom((value, context) =>
            {
                var emailInUse = dbcontext.Users.Any(u => u.Email == value);
                if (emailInUse)
                {
                    context.AddFailure("Email","Eamil already taken");
                }
            });
        }
    }
}
