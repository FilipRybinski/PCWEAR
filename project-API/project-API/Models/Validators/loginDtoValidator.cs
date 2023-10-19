using FluentValidation;
using project_API.Entities;
using project_API.Models;

namespace project_API.Models.Validators
{
    public class loginDtoValidator : AbstractValidator<UserLoginDto>
    {
        public loginDtoValidator(dataBase dbcontext)
        {
            RuleFor(x => x.userPassword).NotEmpty();
            RuleFor(x => x.email).Custom((value, context) =>
            {
                var confirmed = dbcontext.Users.FirstOrDefault(u => u.email == value);
                if (confirmed is not null && !confirmed.confirmed)
                {
                    context.AddFailure("You need to confirm your account ");
                }
            });

        }
    }
}