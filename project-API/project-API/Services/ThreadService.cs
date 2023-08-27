using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using Thread = project_API.Entities.Thread;
using project_API.Models;
using System.Security.Claims;

namespace project_API.Services
{
    public interface IThreadService
    {
        public Task<ICollection<Post>> getThreadPosts(int id);
        public Task<ICollection<Thread>> getUserThreads(int id);
        public Task<ICollection<ThreadDto>> getAllThreads();
        public Task postThread(AddThreadDto body, int i);
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
        public async Task<ICollection<ThreadDto>> getAllThreads()
        {
            var result = await _dbcontext.Threads.Include(t=>t.User).Where(t=>t.accepted==false && t.archived==false).ToListAsync();
            var mapped = result.ConvertAll<ThreadDto>(x => new ThreadDto
            {
                id = x.Id,
                title = x.Title,
                description = x.Description,
                posts = x.Posts.Count,
                createDate = x.CreateDate.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
                user = x.User.userName
            });
            if (result is null)
            {
                throw new CustomException("Threads not found");
            }
            return mapped;
        }
        public async Task postThread(AddThreadDto body,int id)
        {
            var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id); ;
            if (user is null)
            {
                throw new CustomException("User not found");
            }
            var categories = await _dbcontext.ThreadCategories.Where(c => body.ThreadCategories.Contains(c.Id)).ToListAsync();
            var thread = new Thread()
            {
                UserId = user.Id,
                Title = body.Title,
                Description = body.Description,
                CreateDate = DateTime.UtcNow,
                ThreadCategories= categories
            };

            await _dbcontext.Threads.AddAsync(thread);
            await _dbcontext.SaveChangesAsync();
        }

    }

}
