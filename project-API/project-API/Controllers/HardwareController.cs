using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Entities;
using project_API.Models;
using project_API.Services;
using project_API.Settings;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(typeof(BadRequestExample), 400)]
    [ProducesResponseType(typeof(InternalServerExample), 500)]
    [ProducesResponseType(typeof(NotFoundExample), 404)]
    public class HardwareController : ControllerBase
    {
        private readonly IHardwareService _hardwareService;
        public HardwareController(IHardwareService hardwareService)
        {
            _hardwareService = hardwareService;
        }
        [Authorize(Roles ="Admin")]
        [HttpPost("addProcessor")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addProcessor([FromBody] ProcessorDto body)
        {
            await _hardwareService.addProcessor(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editProcessor/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editProcessor([FromRoute]int id,[FromBody] ProcessorDto body)
        {
            await _hardwareService.editProcessor(id, body);
            return Ok();
        }
        [HttpGet("getProcessor")]
        public async Task<IActionResult> getProcessor([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? cores, [FromQuery] int? threads, [FromQuery] bool? graphics, [FromQuery] int? tdp, [FromQuery] string? socket)
        {
            var result=_hardwareService.pagination<ProcessorReturnDto>( await _hardwareService.getProcessors(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name,cores,threads,graphics,tdp,socket),page,pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addMotherboard")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addMotherboard([FromBody] MotherboardDto body)
        {
            await _hardwareService.addMotherboard(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editMotherboard/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editMotherboard([FromRoute] int id, [FromBody] MotherboardDto body)
        {
            await _hardwareService.editMotherboard(id, body);
            return Ok();
        }
        [HttpGet("getMotherboard")]
        public async Task<IActionResult> getMotherboard([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? socket, [FromQuery] string? formFactor, [FromQuery] int? maxMemory, [FromQuery] int? memorySlot, [FromQuery] string? color)
        {
            var result = _hardwareService.pagination<MotherboardReturnDto>(await _hardwareService.getMotherboard(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name, socket, formFactor, maxMemory, memorySlot, color), page, pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addMemory")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addMemory([FromBody] MemoryDto body)
        {
            await _hardwareService.addMemory(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editMemory/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editMemory([FromRoute] int id, [FromBody] MemoryDto body)
        {
            await _hardwareService.editMemory(id, body);
            return Ok();
        }
        [HttpGet("getMemory")]
        public async Task<IActionResult> getMemory([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? speed, [FromQuery] int? modulesLower, [FromQuery] int? modulesUpper, [FromQuery] int? cl, [FromQuery] string? color)
        {
            var result = _hardwareService.pagination<MemoryReturnDto>(await _hardwareService.getMemory(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name, speed, modulesLower, modulesUpper, cl, color), page, pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addHardDrive")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addHardDrive([FromBody] HardDriveDto body)
        {
            await _hardwareService.addHardDrive(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editHardDrive/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editHardDrive([FromRoute] int id, [FromBody] HardDriveDto body)
        {
            await _hardwareService.editHardDrive(id, body);
            return Ok();
        }
        [HttpGet("getHardDrive")]
        public async Task<IActionResult> getHardDrive([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? capacity, [FromQuery] string? type, [FromQuery] int? cache, [FromQuery] string? interfaces)
        {
            var result = _hardwareService.pagination<HardDriveReturnDto>(await _hardwareService.getHardDrive(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name, capacity, type,cache,interfaces), page, pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addProcessorCooler")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addProcessorCooler([FromBody] ProcessorCoolerDto body)
        {
            await _hardwareService.addProcessorCooler(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editProcessorCooler/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editProcessorCooler([FromRoute] int id, [FromBody] ProcessorCoolerDto body)
        {
            await _hardwareService.editProcessorCooler(id, body);
            return Ok();
        }
        [HttpGet("getProcessorCooler")]
        public async Task<IActionResult> getProcessorCooler([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] int? rpmLower, [FromQuery] int? rpmUpper, [FromQuery] int? noiseLower, [FromQuery] int? noiseUpper, [FromQuery] int? size)
        {
            var result = _hardwareService.pagination<ProcessorCoolerReturnDto>(await _hardwareService.getProcessorCooler(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name, rpmLower, rpmUpper, noiseLower, noiseUpper, size), page, pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addGraphics")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addGraphics([FromBody] GraphicsDto body)
        {
            await _hardwareService.addGraphics(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editGraphics/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editGraphics([FromRoute] int id, [FromBody] GraphicsDto body)
        {
            await _hardwareService.editGraphics(id, body);
            return Ok();
        }
        [HttpGet("getGraphics")]
        public async Task<IActionResult> getGraphics([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? chipset, [FromQuery] int? memory, [FromQuery] int? coreClock, [FromQuery] int? boostClock, [FromQuery] string? color, [FromQuery] int? length)
        {
            var result = _hardwareService.pagination<GraphicsReturnDto>(await _hardwareService.getGraphics(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name, chipset, memory, coreClock,boostClock, color, length), page, pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addCase")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addCase([FromBody] CaseDto body)
        {
            await _hardwareService.addCase(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editCase/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editCase([FromRoute] int id, [FromBody] CaseDto body)
        {
            await _hardwareService.editCase(id, body);
            return Ok();
        }
        [HttpGet("getCase")]
        public async Task<IActionResult> getCase([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? type, [FromQuery] string? color, [FromQuery] string? sidePanel, [FromQuery] double? externalVolume)
        {
            var result = _hardwareService.pagination<CaseReturnDto>(await _hardwareService.getCase(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name,  type, color, sidePanel, externalVolume), page, pageSize);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("addPowerSupply")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> addPowerSupply([FromBody] PowerSupplyDto body)
        {
            await _hardwareService.addPowerSupply(body);
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("editPowerSupply/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> editPowerSupply([FromRoute] int id, [FromBody] PowerSupplyDto body)
        {
            await _hardwareService.editPowerSupply(id, body);
            return Ok();
        }
        [HttpGet("getPowerSupply")]
        public async Task<IActionResult> getPowerSupply([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string? name, [FromQuery] string? type, [FromQuery] string? efficiency, [FromQuery] int? wattage, [FromQuery] string? modular, [FromQuery] string? color)
        {
            var result = _hardwareService.pagination<PowerSupplyReturnDto>(await _hardwareService.getPowerSupply(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)), name, type, efficiency, wattage,modular, color), page, pageSize);

            return Ok(result);
        }

        [HttpGet("getTop7")]
        public async Task<IActionResult> getTop7()
        {
            var result = await _hardwareService.getTop7(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }



    }
}
