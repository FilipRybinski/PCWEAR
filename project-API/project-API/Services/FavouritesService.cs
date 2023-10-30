using Microsoft.EntityFrameworkCore;
using project_API.Entities;

namespace project_API.Services
{
    public interface IFavouritesService
    {
        public Task<bool> manageFavourite(int partId, int userId);
        public Task<List<object>> getFavourites(int userId);
    }
    public class FavouritesService : IFavouritesService
    {
        private readonly dataBase _dbcontext;
        private readonly IHardwareService _hardwareService;
        public FavouritesService(dataBase dbcontext, IHardwareService hardwareService)
        {
            _dbcontext = dbcontext;
            _hardwareService = hardwareService;
        }
        public async Task<bool> manageFavourite(int partId,int userId)
        {
            var check =await _dbcontext.Favourites.FirstOrDefaultAsync(e => e.partId == partId && e.userId == userId);
            if(check != null)
            {
                _dbcontext.Remove(check);
                await _dbcontext.SaveChangesAsync();
                return false;
            }
            var newFavourite = new Favourites()
            {
                partId = partId,
                userId = userId,
            };
            await _dbcontext.AddAsync(newFavourite);
            await _dbcontext.SaveChangesAsync();
            return true;
        }
        public async Task<List<object>> getFavourites(int userId)
        {
            var result = await _hardwareService.combineAll(userId);
            var mapped = result.Where(e => e.GetType().GetProperty("favourites").GetValue(e).Equals(true));
            return mapped.ToList();
        }

    }
}
