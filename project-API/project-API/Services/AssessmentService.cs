using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;

namespace project_API.Services
{
    public interface IAssessmentService
    {
        public Task addAssessment(AssessmentDto body, int userId);
        public Task modifyAssessment(AssessmentDto body, int userId);
        public Task<AssessmentDto> checkAssessment(int partId, int userId);
        public Task<List<CommentDto>> getAssessments(int id);
    }
    public class AssessmentService : IAssessmentService
    {
        private readonly dataBase _dbcontext;
        public AssessmentService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task addAssessment(AssessmentDto body, int userId)
        {
            var newComment = new Comment()
            {
                partId = body.partId,
                userId = userId,
                comment = body.comment
            };
            await _dbcontext.AddAsync(newComment);
            var newAssessment = new Rating()
            {
                partId = body.partId,
                userId = userId,
                rating = body.rating
            };
            await _dbcontext.AddAsync(newAssessment);
            await _dbcontext.SaveChangesAsync();

        }
        public async Task<AssessmentDto> checkAssessment(int partId, int userId)
        {
            var result = await _dbcontext.Comments.Include(e => e.Part.Rating).Include(e => e.User).FirstOrDefaultAsync(e => e.User.Id == userId && e.partId == partId);
            if (result is null)
            {
                return null;
            }
            var mapped = new AssessmentDto()
            {
                partId = partId,
                rating = result.Part.Rating.FirstOrDefault(e => e.userId == userId).rating,
                comment = result.comment
            };
            return mapped;
        }
        public async Task modifyAssessment(AssessmentDto body, int userId)
        {
            var comment = await _dbcontext.Comments.FirstOrDefaultAsync(e => e.userId == userId);
            var rating = await _dbcontext.Ratings.FirstOrDefaultAsync(e => e.userId == userId);
            if (comment is null || rating is null)
            {
                throw new BadRequestException();
            }
            comment.comment = body.comment;
            rating.rating = body.rating;
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<CommentDto>> getAssessments(int id)
        {
            var result = await _dbcontext.Comments.Include(e => e.User).Include(e => e.Part.Rating).Where(e => e.partId == id).ToListAsync(); ;
            var result2 = await _dbcontext.Ratings.Where(e => e.partId == id).ToArrayAsync();

            var mapped = result.Select(e => new CommentDto()
            {
                user = e.User.userName,
                pathUserImage = e.User.pathUserImage,
                roleId = e.User.roleId,
                comment = e.comment,
                userId=e.userId,
                rating = e.Part.Rating.FirstOrDefault(p => p.partId == id && p.userId==e.userId).rating
            }).ToList();
            return mapped;

        }
    }
}
