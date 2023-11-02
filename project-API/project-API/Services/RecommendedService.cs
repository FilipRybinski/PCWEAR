using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Models;
using project_API.Settings;
using System.Linq;

namespace project_API.Services
{
    public interface IRecommendedService
    {
        public Task addSet(int id, List<int> body);
        public Task<List<ComputerSetDto>> getSets();
    }
    public class RecommendedService : IRecommendedService
    {
        private readonly dataBase _dbcontext;
        private readonly IHardwareService _hardwareService;
        public RecommendedService(dataBase dbcontext, IHardwareService hardwareService)
        {
            _hardwareService = hardwareService;
            _dbcontext = dbcontext;

        }
        public async Task addSet(int id, List<int> body)
        {
            var newSet = new ComputerSet()
            {
                userId = id,
                partsId = body.ToArray(),

            };
            await _dbcontext.AddAsync(newSet);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<object>>getParts(List<object> data,int[] partsId)
        {
            var spltiedData= data.Where(e => partsId.Contains((int)e.GetType().GetProperty("Id").GetValue(e))).ToList();
            return spltiedData;
        }
        public async Task<List<ComputerSetDto>> getSets()
        {
            var data = await _hardwareService.combineAll(null);
            var sets = await _dbcontext.ComputerSets.Include(e=>e.User).ToListAsync();
            var result= await Task.WhenAll( sets.Select(async e => new ComputerSetDto()
            {
                Date = e.CreateDate.ToString("MMMM yyyy"),
                user = e.User.userName,
                roleId = e.User.roleId,
                pathUserImage = e.User.pathUserImage,
                parts =await getParts(data, e.partsId)

            }));
            return result.ToList();
        }
    }
}
