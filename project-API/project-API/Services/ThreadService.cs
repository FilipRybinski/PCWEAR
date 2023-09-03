using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using Thread = project_API.Entities.Thread;
using project_API.Models;
using System.Security.Claims;
using System.Threading;

namespace project_API.Services
{
    public interface IThreadService
    {
        public Task<ICollection<Post>> getThreadPosts(int id);
        public Task<ICollection<Thread>> getUserThreads(int id);
        public Task<ICollection<ThreadDto>> getAllThreads();
        public Task postThread(ThreadPostNewDto body, int id);
        public string getUrlImage(int id);
        public int getCurrentLike(int threadId,int userId);
        public int getCountLikes(int threadId, int pattern);
        public Task<ThreadLikesDto> postReaction(ThreadReactionDto body, int id);
        public Task updateThreadViews(int threadId);
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
            var result = await _dbcontext.Threads.Include(t=>t.User).Include(z=>z.Categories).Where(t=>t.accepted==false && t.archived==false).ToListAsync();
            if (result is null)
            {
                throw new CustomException("Threads not found");
            }
            var mapped = result.Select( x => new ThreadDto
            {
                id = x.Id,
                title = x.Title,
                description = x.Description,
                posts = x.Posts.Count,
                createDate = x.CreateDate.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
                user = x.User.userName,
                categories = x.Categories,
                likes = getCountLikes(x.Id,1),
                dislikes = getCountLikes(x.Id, -1),
                views=x.views,
                currentLike = getCurrentLike(x.Id,x.UserId),
                pathUserImage=getUrlImage(x.UserId),

            }).ToList();
            
            return mapped;
        }
        public string getUrlImage(int id)
        {
            var result = _dbcontext.Users.FirstOrDefault(u => u.Id == id);
            if(result is null)
            {
                throw new CustomException("User not found");
            }
            return result.pathUserImage;
        }
        public int getCountLikes(int threadId, int pattern)
        {
            var result = _dbcontext.threadReactions.Where(r => r.ThreadId == threadId && r.value == pattern).Count();
            return result;
        }
       public int getCurrentLike(int threadId,int userId)
        {
            var result = _dbcontext.threadReactions.FirstOrDefault(r => r.ThreadId == threadId && r.UserId == userId);
            if(result is null)
            {
               return 0;
            }
            return result.value;
        }
        public async Task postThread(ThreadPostNewDto body,int id)
        {
            var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id); ;
            if (user is null)
            {
                throw new CustomException("User not found");
            }
            var categories = await _dbcontext.Categories.Where(c => body.Categories.Contains(c)).ToListAsync();
            var thread = new Thread()
            {
                UserId = user.Id,
                Title = body.Title,
                Description = body.Description,
                Categories= categories
            };

            await _dbcontext.Threads.AddAsync(thread);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<ThreadLikesDto> postReaction(ThreadReactionDto body, int id)
        {
            var result=await _dbcontext.threadReactions.FirstOrDefaultAsync(r => r.ThreadId==body.ThreadId && r.UserId==id);
            if(result is null)
            {
                var newReaction = new ThreadReaction()
                {
                    ThreadId = body.ThreadId,
                    UserId = id,
                    value = body.value
                };
                await _dbcontext.AddAsync(newReaction);
                await _dbcontext.SaveChangesAsync();
            }
            else
            {
                result.value=body.value;
                await _dbcontext.SaveChangesAsync();
            }
            var updateLikes = new ThreadLikesDto()
            {
                likes = getCountLikes(body.ThreadId, 1),
                dislikes = getCountLikes(body.ThreadId, -1),
            };
            return updateLikes;
        }
        public async Task updateThreadViews(int threadId)
        {
            var thread = await _dbcontext.Threads.FirstOrDefaultAsync();
            if(thread is null)
            {
                throw new CustomException("Thread not found");
            }
            thread.views++;
            await _dbcontext.SaveChangesAsync();
        }
    }
}
