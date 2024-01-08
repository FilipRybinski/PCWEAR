using System.Net;

namespace Tests
{
    public class RequestTests
    {
        private readonly HttpClient _client;

        public RequestTests()
        {
            _client = new HttpClient
            {
                BaseAddress = new Uri("https://localhost:5000/api/")
            };
        }
        [Fact]
        public async Task getThreads()
        {
            var response = await _client.GetAsync("threads/getThreads?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        }
        [Fact]
        public async Task getPost()
        {
            var response = await _client.GetAsync("posts/getPosts/1?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        [Fact]
        public async Task getTOP10()
        {
            var response = await _client.GetAsync("Hardware/getTop7");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        [Fact]
        public async Task getProcessor()
        {
            var response = await _client.GetAsync("Hardware/getProcessor?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        [Fact]
        public async Task getMotherboard()
        {
            var response = await _client.GetAsync("Hardware/getMotherboard?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        [Fact]
        public async Task getMemorY()
        {
            var response = await _client.GetAsync("Hardware/getMemory?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
        [Fact]
        public async Task getProcessorCooler()
        {
            var response = await _client.GetAsync("Hardware/getProcessorCooler?page=1&pageSize=55");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
        [Fact]
        public async Task getGraphics()
        {
            var response = await _client.GetAsync("Hardware/getGraphics?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
        [Fact]
        public async Task getCase()
        {
            var response = await _client.GetAsync("Hardware/getCase?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
        [Fact]
        public async Task getPowerSupply()
        {
            var response = await _client.GetAsync("Hardware/getPowerSupply?page=1&pageSize=5");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }

    }
}