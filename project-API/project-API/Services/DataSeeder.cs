using project_API.Entities;

namespace project_API.Services
{
    public class dataSeeder
    {
        private readonly dataBase _dbcontext;
        public dataSeeder(dataBase dbContext) {
            _dbcontext = dbContext;
        }
        public void Seed()
        {
            if (!_dbcontext.Roles.Any())
            {
                var Roles= new List<role>()
                {
                    new role()
                    {
                        name="User"
                    },
                    new role()
                    {
                        name="Moderator"
                    },
                    new role()
                    {
                        name="Admin"
                    },
                };
                _dbcontext.AddRange(Roles);
                _dbcontext.SaveChanges();
            }
        }
    }
}
