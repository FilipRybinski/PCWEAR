using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;

namespace project_API.Services
{
    public interface IPostService
    {
        public Task<Post> addPost(PostDto body,int userId, int threadId);
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
            var newPost = new Post()
            {
                UserId=userId,
                ThreadId=threadId,
                Body = body.Body,
                Title = body.Title,
            };
            await _dbcontext.AddAsync(newPost);
            await _dbcontext.SaveChangesAsync();
            var thread = await _dbcontext.Threads.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == threadId);
            if(thread is null)
            {
                throw new NotFoundException("Thread");
            }
            await _emailService.NotificationOfNewPost(thread.User);
            return newPost;
        }
    }
}
