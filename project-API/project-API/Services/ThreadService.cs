using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using Thread = project_API.Entities.Thread;
using project_API.Models;
using MySqlX.XDevAPI.Common;
using System.Linq;
using System.Threading;

namespace project_API.Services
{
    public interface IThreadService
    {
        public Task<List<ThreadDto>> getThread(int id,string userRole, int? userId);
        public Task<List<Thread>> getUserThreads(int id);
        public Task<Boolean> postThread(ThreadPostNewDto body, int id);
        public Task<ThreadLikesDto> postReaction(ThreadReactionDto body, int id);
        public Task<List<ThreadDto>> getAllThreads(FilterThreadcs filter,int? userId);
        public Task<List<Thread>> getAllNotAcceptedThreads();
        public Task<Boolean> acceptThreads(List<int> body);
        public Task<string> getUrlImage(int id);
        public Task<int> getCurrentLike(int threadId,int? userId);
        public Task<int> getCountLikes(int threadId, int pattern);
        public Task<Boolean> updateThreadViews(int threadId);
        public Task<List<ArchiveDto>> getArchive();
        public Task<Boolean> changeStateArchive(List<ArchiveChangeState> body);
        public Task<List<Statistics>> getStatisticThreads(int id);
    }
    public class ThreadService : IThreadService
    {
        private readonly dataBase _dbcontext;
        public ThreadService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<List<ThreadDto>> getThread(int id, string? userRole,int? userId)
        {
            var query = _dbcontext.Threads.Include(t => t.User).Include(c => c.Categories).Where(t => t.Id == id).AsQueryable();
            if (!string.IsNullOrEmpty(userRole))
            {
                if (!userRole.Equals("Admin"))
                {
                    query = query.Where(t => t.accepted == true && t.archived == false);
                }
            }
            else
            {
                query = query.Where(t => t.accepted == true && t.archived == false);
            }
            var result = await mapToThreadDto(await query.ToListAsync(),userId);
            
            return result;

        }
        public async Task<List<Thread>> getUserThreads(int id)
        {
            var result = await _dbcontext.Threads.Where(t=>t.UserId==id).ToListAsync();
            if(result is null)
            {
                throw new NotFoundException("Thread");
            }
            return result;
        }
        public async Task<string> getUrlImage(int id)
        {
            var result = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if(result is null)
            {
                throw new NotFoundException("User");
            }
            return result.pathUserImage;
        }
        public async Task<int> getCountLikes(int threadId, int pattern)
        {
            var result = await _dbcontext.threadReactions.Where(r => r.ThreadId == threadId && r.value == pattern).CountAsync();
            return result;
        }
       public async Task<int> getCurrentLike(int threadId,int? userId)
        {
            if(userId is null)
            {
                return 0;
            }
            var result = await _dbcontext.threadReactions.FirstOrDefaultAsync(r => r.ThreadId == threadId && r.UserId == userId);
            if(result is null)
            {
               return 0;
            }
            return result.value;
        }
        public async Task<Boolean> postThread(ThreadPostNewDto body,int userId)
        {
            var bodyCategories = body.Categories.Select(c => c.Name).ToList();
            var categories = await _dbcontext.Categories.Where(c => bodyCategories.Contains(c.Name)).ToListAsync();
            var thread = new Thread()
            {
                UserId = userId,
                Title = body.Title,
                Description = body.Description,
                Categories= categories
            };

            await _dbcontext.Threads.AddAsync(thread);
            await _dbcontext.SaveChangesAsync();
            return true;
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
                likes =await getCountLikes(body.ThreadId, 1),
                dislikes =await  getCountLikes(body.ThreadId, -1),
            };
            return updateLikes;
        }
        public async Task<Boolean> updateThreadViews(int threadId)
        {
            var thread = await _dbcontext.Threads.FirstOrDefaultAsync(t=>t.Id==threadId);
            if(thread is null)
            {
                throw new BadRequestException("Cannot uptade views for thread");
            }
            thread.views++;
            await _dbcontext.SaveChangesAsync();
            return true;

        }
        public async Task<List<ThreadDto>> getAllThreads(FilterThreadcs filter,int? userId)
        {
            var query = _dbcontext.Threads.Include(t => t.User).Include(z => z.Categories).Where(t => t.accepted == true && t.archived == false).AsQueryable();
            if (filter.byCategoryName!=null)
            {
                var category = await _dbcontext.Categories.Where(c => filter.byCategoryName.Contains(c.Name)).ToListAsync();
                foreach(var cat in category)
                {
                    query = query.Where(q => q.Categories.Contains(cat));
                }
            }
            if (!string.IsNullOrEmpty(filter.byTitle))
            {
                query=query.Where(q => q.Title.ToLower().Contains(filter.byTitle.ToLower()));
            }
            if (!string.IsNullOrEmpty(filter.byDescription))
            {
                query=query.Where(q => q.Description.ToLower().Contains(filter.byDescription.ToLower()));
            }
            query=query.Skip((filter.page-1)*filter.pageSize).Take(filter.pageSize);
            var result = await query.ToListAsync();
            return await mapToThreadDto(result,userId);
        }
        public async Task<List<Thread>> getAllNotAcceptedThreads()
        {
            var result = await _dbcontext.Threads.Where(t => t.accepted == false).ToListAsync();
            if(result is null)
            {
                throw new NotFoundException();
            }
            return result;
        }
        public async Task<Boolean> acceptThreads(List<int> body)
        {
            if (body.Count == 0)
            {
                throw new BadRequestException();
            }
            foreach(var number in body)
            {
                var result=await _dbcontext.Threads.FirstOrDefaultAsync(t => t.Id == number);
                if(result is null)
                {
                    throw new NotFoundException("Threads");
                }
                result.accepted=true;
                await _dbcontext.SaveChangesAsync();
            }
            return true;
        }
        public async Task<List<ThreadDto>> mapToThreadDto(List<Thread> threads,int ?userId)
        {
            var mapped = await Task.WhenAll(threads.Select(async x => new ThreadDto
            {
                id = x.Id,
                title = x.Title,
                description = x.Description,
                postsCount = x.Posts.Count,
                createDate = x.CreateDate.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
                user = x.User.userName,
                categories = x.Categories.Select(c=>new CategoryDto()
                {
                    Name = c.Name,
                    bgColor=c.bgColor,
                    color=c.color
                }).ToList(),
                likes = await getCountLikes(x.Id, 1),
                dislikes = await getCountLikes(x.Id, -1),
                roleId=x.User.roleId,
                views = x.views,
                currentLike = await getCurrentLike(x.Id, userId),
                pathUserImage = await getUrlImage(x.UserId),
                userId=x.UserId,

            }).ToList());
            return mapped.ToList();
        }
        public async Task<List<ArchiveDto>> getArchive()
        {
            var result = await _dbcontext.Threads.Where(t=>t.accepted==true).Select(t => new ArchiveDto() 
            {
                id=t.Id,
                title = t.Title,
                archived=t.archived,
                createDate=t.CreateDate.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss")
            }).ToListAsync();
            return result;
        }
        public async Task<Boolean> changeStateArchive(List<ArchiveChangeState> body)
        {
            if (body.Count == 0)
            {
                throw new BadRequestException();
            }
            foreach (var archive in body)
            {
                var result = await _dbcontext.Threads.FirstOrDefaultAsync(t => t.Id == archive.threadId);
                if (result is null)
                {
                    throw new NotFoundException("Arichve");
                }
                result.archived = archive.archive;
            }
            await _dbcontext.SaveChangesAsync();
            return true;
        }
        public async Task<List<Statistics>> getStatisticThreads(int id)
        {
            var result =await  _dbcontext.Threads.Where(e => e.UserId == id).ToListAsync();
            var mapped = await Task.WhenAll(result.Select(async e => new Statistics()
            {
                name = e.Title,
                likes = await getCountLikes(e.Id, 1),
                dislikes = await getCountLikes(e.Id, -1),
                views=e.views
            }));
            return mapped.OrderByDescending(e=>e.likes).ToList();
        }
    }
}
