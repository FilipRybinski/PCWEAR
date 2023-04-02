using project_API.Entities;

namespace project_API.Services
{
    public class DataSeeder
    {
        private readonly DataBase _dbcontext;
        public DataSeeder(DataBase dbContext) {
            _dbcontext = dbContext;
        }
        public void Seed()
        {
            if (!_dbcontext.Roles.Any())
            {
                var Roles= new List<Role>()
                {
                    new Role()
                    {
                        Name="User"
                    },
                    new Role()
                    {
                        Name="Moderator"
                    },
                    new Role()
                    {
                        Name="Admin"
                    },
                };
                _dbcontext.AddRange(Roles);
                _dbcontext.SaveChanges();
            }
        }
    }
}
