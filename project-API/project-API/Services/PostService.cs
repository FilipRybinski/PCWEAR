using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;
using System.Collections.Specialized;

namespace project_API.Services
{
    public interface IPostService
    {
        public Task<Post> addPost(PostDto body,int userId, int threadId);
        public Task<List<PostWithUserDto>> getPosts(int threadId,string? roleId);
    }
    public class PostService:IPostService
    {
        private readonly dataBase _dbcontext;
        private readonly IEmailService _emailService;
        public PostService(dataBase dbcontext, IEmailService emailService)
        {
            _emailService = emailService;
            _dbcontext = dbcontext;
        }
        public async Task<Post> addPost(PostDto body,int userId,int threadId)
        {
            var thread = await _dbcontext.Threads.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == threadId);
            if (thread is null)
            {
                throw new NotFoundException("Thread");
            }
            var newPost = new Post()
            {
                UserId=userId,
                ThreadId=threadId,
                Body = body.body,
                Title = body.title,
            };
            await _dbcontext.AddAsync(newPost);
            await _dbcontext.SaveChangesAsync();
            NameValueCollection queryString = System.Web.HttpUtility.ParseQueryString(string.Empty);
            queryString.Add(nameof(thread.Id).ToLower(), thread.Id.ToString());
            queryString.Add(nameof(thread.Title), thread.Title);
            Task.Run(() => _emailService.NotificationOfNewPost("PostNotification", queryString.ToString(), thread.User));
            return newPost;
        }
        public async Task<List<PostWithUserDto>> getPosts(int threadId,string? roleId)
        {
            var query = _dbcontext.Posts.Include(u => u.User).Include(T => T.Thread).Where(p => p.ThreadId == threadId).AsQueryable();
            if (!string.IsNullOrEmpty(roleId))
            {
                if (!roleId.Equals("Admin"))
                {
                    query = query.Where(t => t.Thread.accepted == true && t.Thread.archived == false);
                }
            }
            else
            {
                query = query.Where(t => t.Thread.accepted == true && t.Thread.archived == false);
            }
            var result= await query.Select(p => new PostWithUserDto()
            {
                Title = p.Title,
                Body = p.Body,
                createDate = p.CreatedDate.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
                user = p.User.userName,
                pathUserImage = p.User.pathUserImage,
                roleId = p.User.roleId,
            }).ToListAsync();
            return result;

        }
    }
}
