using FluentValidation;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;

namespace project_API.Models.Validators
{
    public class postDtoValidator : AbstractValidator<PostDto>
    {

        public postDtoValidator(dataBase dbcontext)
        {
            RuleFor(x => x.title).NotEmpty();
            RuleFor(x => x.body).NotEmpty();
        }
    }

}
