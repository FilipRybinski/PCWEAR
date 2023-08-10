using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using Thread = project_API.Entities.Thread;

namespace project_API.Services
{
    public interface IThreadService
    {
        public Task<ICollection<Post>> getThreadPosts(int id);
        public Task<ICollection<Thread>> getUserThreads(int id);
        public Task<ICollection<Thread>> getAllThreads();
        public Task postThread(Thread body);
    }
    public class ThreadService : IThreadService
    {
        private readonly dataBase _dbcontext;
        public ThreadService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<ICollection<Post>> getThreadPosts(int id)
        {
            var result = await _dbcontext.Threads.Include(t => t.Posts).FirstOrDefaultAsync(t => t.Id == id);
            if(result is null)
            {
                throw new CustomException("Thread not found");
            }
            return result.Posts;

        }
        public async Task<ICollection<Thread>> getUserThreads(int id)
        {
            var result = await _dbcontext.Threads.Where(t=>t.UserId==id).ToListAsync();
            if(result is null)
            {
                throw new CustomException("User dont have any threads");
            }
            return result;
        }
        public async Task<ICollection<Thread>> getAllThreads()
        {
            var result = await _dbcontext.Threads.ToListAsync();
            if (result is null)
            {
                throw new CustomException("Threads not found");
            }
            return result;
        }
        public async Task postThread(Thread body)
        {
            await _dbcontext.Threads.AddAsync(body);
            await _dbcontext.SaveChangesAsync();
        }

    }

}
