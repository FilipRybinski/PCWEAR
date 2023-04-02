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
            RuleFor(x => x.PersonalData.Name).NotEmpty();
            RuleFor(x => x.PersonalData.Surname).NotEmpty();
            RuleFor(x => x.PersonalData.PhoneNumber).NotEmpty();
            RuleFor(x => x.PostalDetails.City).NotEmpty();
            RuleFor(x => x.PostalDetails.Country).NotEmpty();
            RuleFor(x => x.PostalDetails.PostalCode).NotEmpty();
            RuleFor(x => x.PostalDetails.Street).NotEmpty();

        }
    }
}
