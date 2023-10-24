using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HardwareController : ControllerBase
    {
        private readonly IHardwareService _hardwareService;
        public HardwareController(IHardwareService hardwareService)
        {
            _hardwareService = hardwareService;
        }
        [HttpPost("processor")]
        public async Task<IActionResult> addProcessor([FromBody] ProcessorDto body)
        {
            await _hardwareService.addProcessor(body);
            return Ok();
        }
        [HttpPost("processor-cooler")]
        public async Task<IActionResult> addProcessorCooler([FromBody] ProcessorCoolerDto body)
        {
            await _hardwareService.addProcessorCooler(body);
            return Ok();
        }
        [HttpPost("motherboard")]
        public async Task<IActionResult> addMotherboard([FromBody] MotherboardDto body)
        {
            await _hardwareService.addMotherboard(body);
            return Ok();
        }
        [HttpPost("memory")]
        public async Task<IActionResult> addMemory([FromBody] MemoryDto body)
        {
            await _hardwareService.addMemory(body);
            return Ok();
        }
        [HttpPost("hard-drive")]
        public async Task<IActionResult> addHardDrive([FromBody] HardDriveDto body)
        {
            await _hardwareService.addHardDrive(body);
            return Ok();
        }
        [HttpPost("graphics")]
        public async Task<IActionResult> addGraphics([FromBody] GraphicsDto body)
        {
            await _hardwareService.addGraphics(body);
            return Ok();
        }
        [HttpPost("case")]
        public async Task<IActionResult> addCase([FromBody] CaseDto body)
        {
            await _hardwareService.addCase(body);
            return Ok();
        }
        [HttpPost("power-supply")]
        public async Task<IActionResult> addPowerSupply([FromBody] PowerSupplyDto body)
        {
            await _hardwareService.addPowerSupply(body);
            return Ok();
        }
        [HttpGet("allParts")]
        public async Task<IActionResult> getParts([FromQuery] string? sortBy, [FromQuery] int page, [FromQuery] int pageSize)
        {
            if (page<1 || pageSize<1)
            {
                return BadRequest();
            }
            var result =await _hardwareService.getParts(sortBy,page,pageSize);
            return Ok(result);
        }
        [HttpGet("getType")]
        public  IActionResult getType()
        {
            var result = _hardwareService.getType();
            return Ok(result);
        }



    }
}
