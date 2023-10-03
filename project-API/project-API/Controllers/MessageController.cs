using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using project_API.Hub;
using project_API.Models;

namespace project_API.Controllers
{
    [Route("hub")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private IHubContext<MessageHub, IMessageHub> message;
        public MessageController(IHubContext<MessageHub, IMessageHub> _message)
        {
            message = _message;
        }
        [HttpPost("message")]
        public string postMessage([FromBody] UserMessageDto dto)
        {
            message.Clients.All.SendOffersToUser(dto);
            return "Message send";
        }
    }
}
