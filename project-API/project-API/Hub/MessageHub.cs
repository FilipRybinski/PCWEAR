using Microsoft.AspNetCore.SignalR;
using project_API.Models;

namespace project_API.Hub
{
    public interface IMessageHub
    {
        Task SendOffersToUser(UserMessageDto dto);
    }
    public class MessageHub:Hub<IMessageHub>
    {
        public async Task SendOffersToUser(UserMessageDto dto)
        {
            await Clients.All.SendOffersToUser(dto);
        }
    }
}
