using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class AuthorizationTests
    {
        private readonly HttpClient _client;

        public AuthorizationTests()
        {
            _client = new HttpClient
            {
                BaseAddress = new Uri("https://localhost:5000/api/")
            };
        }
        [Fact]
        public async Task deleteUser()
        {
            var response = await _client.GetAsync("account/delete/1");
            Assert.Equal(HttpStatusCode.MethodNotAllowed, response.StatusCode);

        }
        [Fact]
        public async Task getUsers()
        {
            var response = await _client.GetAsync("account/getUsers");
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
        [Fact]
        public async Task removePost()
        {
            var response = await _client.GetAsync("posts/removePost/1");
            Assert.Equal(HttpStatusCode.MethodNotAllowed, response.StatusCode);
        }
        [Fact]
        public async Task getArchive()
        {
            var response = await _client.GetAsync("threads/getArchive");
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
        [Fact]
        public async Task getgetAllNotAcceptedThreads()
        {
            var response = await _client.GetAsync("getAllNotAcceptedThreads");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
