using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using System.Security.Claims;

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
        [HttpPost("addProcessor")]
        public async Task<IActionResult> addProcessor([FromBody] ProcessorDto body)
        {
            await _hardwareService.addProcessor(body);
            return Ok();
        }
        [HttpGet("getProcessor")]
        public async Task<IActionResult> getProcessor([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? cores, [FromQuery] int? threads, [FromQuery] bool? graphics, [FromQuery] int? tdp, [FromQuery] string? socket)
        {
            var result=_hardwareService.pagination<ProcessorReturnDto>( await _hardwareService.getProcessors(name,cores,threads,graphics,tdp,socket),page,pageSize);

            return Ok(result);
        }
        [HttpPost("addMotherboard")]
        public async Task<IActionResult> addMotherboard([FromBody] MotherboardDto body)
        {
            await _hardwareService.addMotherboard(body);
            return Ok();
        }
        [HttpGet("getMotherboard")]
        public async Task<IActionResult> getMotherboard([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? socket, [FromQuery] string? formFactor, [FromQuery] int? maxMemory, [FromQuery] int? memorySlot, [FromQuery] string? color)
        {
            var result = _hardwareService.pagination<MotherboardReturnDto>(await _hardwareService.getMotherboard( name, socket, formFactor, maxMemory, memorySlot, color), page, pageSize);

            return Ok(result);
        }
        [HttpPost("addMemory")]
        public async Task<IActionResult> addMemory([FromBody] MemoryDto body)
        {
            await _hardwareService.addMemory(body);
            return Ok();
        }
        [HttpGet("getMemory")]
        public async Task<IActionResult> getMemory([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? speed, [FromQuery] int? modulesLower, [FromQuery] int? modulesUpper, [FromQuery] int? cl, [FromQuery] string? color)
        {
            var result = _hardwareService.pagination<MemoryReturnDto>(await _hardwareService.getMemory( name, speed, modulesLower, modulesUpper, cl, color), page, pageSize);

            return Ok(result);
        }
        [HttpPost("addHardDrive")]
        public async Task<IActionResult> addHardDrive([FromBody] HardDriveDto body)
        {
            await _hardwareService.addHardDrive(body);
            return Ok();
        }
        [HttpGet("getHardDrive")]
        public async Task<IActionResult> getHardDrive([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? capacity, [FromQuery] string? type, [FromQuery] int? cache, [FromQuery] string? interfaces)
        {
            var result = _hardwareService.pagination<HardDriveReturnDto>(await _hardwareService.getHardDrive(name, capacity, type,cache,interfaces), page, pageSize);

            return Ok(result);
        }
        [HttpPost("addProcessorCooler")]
        public async Task<IActionResult> addProcessorCooler([FromBody] ProcessorCoolerDto body)
        {
            await _hardwareService.addProcessorCooler(body);
            return Ok();
        }
        [HttpGet("getProcessorCooler")]
        public async Task<IActionResult> getProcessorCooler([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? rpmLower, [FromQuery] int? rpmUpper, [FromQuery] int? noiseLower, [FromQuery] int? noiseUpper, [FromQuery] int? size)
        {
            var result = _hardwareService.pagination<ProcessorCoolerReturnDto>(await _hardwareService.getProcessorCooler( name, rpmLower, rpmUpper, noiseLower, noiseUpper, size), page, pageSize);

            return Ok(result);
        }
        [HttpPost("addGraphics")]
        public async Task<IActionResult> addGraphics([FromBody] GraphicsDto body)
        {
            await _hardwareService.addGraphics(body);
            return Ok();
        }
        [HttpGet("getGraphics")]
        public async Task<IActionResult> getGraphics([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? chipset, [FromQuery] int? memory, [FromQuery] int? coreClock, [FromQuery] int? boostClock, [FromQuery] string? color, [FromQuery] int? length)
        {
            var result = _hardwareService.pagination<GraphicsReturnDto>(await _hardwareService.getGraphics( name, chipset, memory, coreClock,boostClock, color, length), page, pageSize);

            return Ok(result);
        }
        [HttpPost("addCase")]
        public async Task<IActionResult> addCase([FromBody] CaseDto body)
        {
            await _hardwareService.addCase(body);
            return Ok();
        }
        [HttpGet("getCase")]
        public async Task<IActionResult> getCase([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? type, [FromQuery] string? color, [FromQuery] string? sidePanel, [FromQuery] double? externalVolume)
        {
            var result = _hardwareService.pagination<CaseReturnDto>(await _hardwareService.getCase( name,  type, color, sidePanel, externalVolume), page, pageSize);

            return Ok(result);
        }
        [HttpPost("addPowerSupply")]
        public async Task<IActionResult> addPowerSupply([FromBody] PowerSupplyDto body)
        {
            await _hardwareService.addPowerSupply(body);
            return Ok();
        }
        [HttpGet("getPowerSupply")]
        public async Task<IActionResult> getPowerSupply([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? type, [FromQuery] string? efficiency, [FromQuery] int? wattage, [FromQuery] string? modular, [FromQuery] string? color)
        {
            var result = _hardwareService.pagination<PowerSupplyReturnDto>(await _hardwareService.getPowerSupply( name, type, efficiency, wattage,modular, color), page, pageSize);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("addAssessment")]
        public async Task<IActionResult> addAssessment([FromBody] AssessmentDto body)
        {
            await _hardwareService.addAssessment(body,Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok();
        }



    }
}
