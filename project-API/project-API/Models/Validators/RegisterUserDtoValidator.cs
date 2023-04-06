using FluentValidation;
using project_API.Entities;

namespace project_API.Models.Validators
{
    public class registerUserDtoValidator : AbstractValidator<userRegisterDto>
    {

        public registerUserDtoValidator(dataBase dbcontext)
        {
            RuleFor(x => x.email).NotEmpty().EmailAddress();
            RuleFor(x => x.userPassword).MinimumLength(8);
            RuleFor(x => x.userPasswordConfirmed).Equal(e => e.userPassword);
            RuleFor(x => x.email).Custom((value, context) =>
            {
                var emailInUse = dbcontext.Users.Any(u => u.email == value);
                if (emailInUse)
                {
                    context.AddFailure("Eamil already taken");
                }
            });
            RuleFor(x => x.userName).Custom((value, context) =>
            {
                var userNameInUse = dbcontext.Users.Any(u => u.userName == value);
                if (userNameInUse) 
                {
                    context.AddFailure("Username already taken");
                }
            });
            RuleFor(x => x.PersonalData.name).NotEmpty();
            RuleFor(x => x.PersonalData.surname).NotEmpty();
            RuleFor(x => x.PersonalData.phoneNumber).NotEmpty();
            RuleFor(x => x.postalDetails.city).NotEmpty();
            RuleFor(x => x.postalDetails.country).NotEmpty();
            RuleFor(x => x.postalDetails.postalCode).NotEmpty();
            RuleFor(x => x.postalDetails.street).NotEmpty();

        }
    }
}
