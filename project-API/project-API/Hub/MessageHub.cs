using Microsoft.AspNetCore.SignalR;
using project_API.Models;

namespace project_API.Hub
{
    public interface IMessageHub
    {
        Task SendOffersToUser(MessageDto dto);
    }
    public class MessageHub:Hub<IMessageHub>
    {
        public async Task SendOffersToUser(MessageDto dto)
        {
            await Clients.All.SendOffersToUser(dto);
        }
    }
}
