
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;
using System.Collections;

namespace project_API.Services
{
    public interface IHardwareService
    {
        public Task addProcessor(ProcessorDto processor);
        public Task addProcessorCooler(ProcessorCoolerDto processorCooler);
        public Task addMotherboard(MotherboardDto motherboard);
        public Task addMemory(MemoryDto memory);
        public Task addHardDrive(HardDriveDto harddrive);
        public Task addGraphics(GraphicsDto graphics);
        public Task addCase(CaseDto caseBody);
        public Task addPowerSupply(PowerSupplyDto powerSupply);
        public Task<Part> createPart(string name,string imageUrl);
        public Task<Array> getParts(string name, int page, int PageSize);
        public List<string> getType();
    }
    public class HardwareService: IHardwareService
    {
        private readonly dataBase _dbcontext;
        public HardwareService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<Array> getParts(string name, int page, int PageSize)
        {
            if (string.IsNullOrEmpty(name))
            {
                var types = getType();
                ArrayList array= new ArrayList();
                foreach(var type in types)
                {
                    var data = await getPartsByName(type);
                    array.AddRange(data);
                }
                return array.ToArray().Skip((page - 1) * PageSize).Take(PageSize).ToArray();
            }
            ArrayList result = new ArrayList();
            result.AddRange(await getPartsByName(name));
            return result.ToArray().Skip((page - 1) * PageSize).Take(PageSize).ToArray();
          
        }
        public async Task<Array> getPartsByName(string name)
        {
            switch (name)
            {
                case "processor":
                    var processors = await _dbcontext.Processors.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(processors.Select(async e => new ProcessorReturnDto()
                    {
                        Id=e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        cores = e.cores,
                        threads = e.threads,
                        graphics = e.graphics,
                        tdp = e.tdp,
                        socket = e.socket,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "motherboard":
                    var motherboards = await _dbcontext.Motherboards.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(motherboards.Select(async e => new MotherboardReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        socket = e.socket,
                        formFactor = e.formFactor,
                        maxMemory = e.maxMemory,
                        memorySlot = e.memorySlot,
                        color = e.color,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "memory":
                    var memorys = await _dbcontext.Memorys.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(memorys.Select(async e => new MemoryReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        speed = e.speed,
                        modulesLower = e.modulesLower,
                        modulesUpper = e.modulesUpper,
                        color = e.color,
                        cl = e.cl,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "processorCooler":
                    var processorCooler = await _dbcontext.ProcessorCoolers.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(processorCooler.Select(async e => new ProcessorCoolerReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        rpmLower = e.rpmLower,
                        rpmUpper = e.rpmUpper,
                        noiseLower = e.noiseLower,
                        noiseUpper = e.noiseUpper,
                        size = e.size,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "harddrive":
                    var harddrives = await _dbcontext.HardDrives.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(harddrives.Select(async e => new HardDriveReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        capacity = e.capacity,
                        type = e.type,
                        cache = e.cache,
                        interfaces = e.interfaces,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "graphics":
                    var graphics = await _dbcontext.Graphicss.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(graphics.Select(async e => new GraphicsReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        chipset = e.chipset,
                        memory = e.memory,
                        coreClock = e.coreClock,
                        boostClock = e.boostClock,
                        color = e.color,
                        length = e.length,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "case":
                    var cases = await _dbcontext.Cases.Include(e => e.Part).ToArrayAsync();
                    return await Task.WhenAll(cases.Select(async e => new CaseReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        type = e.type,
                        color = e.color,
                        sidePanel = e.sidePanel,
                        externalVolume = e.externalVolume,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
                case "powersupply":
                    var powersupply = await _dbcontext.PowerSupplys.Include(e => e.Part).ToListAsync();
                    return await Task.WhenAll(powersupply.Select(async e => new PowerSupplyReturnDto()
                    {
                        Id = e.Part.Id,
                        name = e.Part.Name,
                        imageUrl = e.Part.ImageUrl,
                        type = e.type,
                        efficiency = e.efficiency,
                        wattage = e.wattage,
                        modular = e.modular,
                        color = e.color,
                        commentsCount = await getCommentsCount(e.PartId),
                        rating = await getRating(e.PartId),
                    }).ToArray());
            }
            throw new BadRequestException();
        }
        public async Task<double> getRating(int id)
        {
            var count = await _dbcontext.Ratings.Where(r => r.partId == id).CountAsync();
            var sum = await _dbcontext.Ratings.Where(r => r.partId == id).Select(r => r.rating).SumAsync();
            if(count== 0 || sum==0)
            {
                return 0;
            }
            return sum/count;
        }
        public async Task<int> getCommentsCount(int id)
        {
            return await _dbcontext.Comments.Where(c => c.partId == id).CountAsync();
        }
        public async Task addProcessor(ProcessorDto processor)
        {
            var newPart = await createPart(processor.name,processor.imageUrl);
            var newProcessor = new Processor()
            {
                PartId=newPart.Id,
                cores=processor.cores,
                graphics=processor.graphics,
                socket=processor.socket,
                tdp=processor.tdp,
                threads=processor.threads,
            };
            await _dbcontext.AddAsync(newProcessor);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addProcessorCooler(ProcessorCoolerDto processorCooler)
        {
            var newPart = await createPart(processorCooler.name, processorCooler.imageUrl);
            var newProcessorCooler = new ProcessorCooler()
            {
                PartId = newPart.Id,
                rpmLower=processorCooler.rpmLower,
                rpmUpper=processorCooler.rpmUpper,
                noiseLower=processorCooler.noiseLower,
                noiseUpper=processorCooler.noiseUpper,
                size=processorCooler.size,
            };
            await _dbcontext.AddAsync(newProcessorCooler);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addMotherboard(MotherboardDto motherboard)
        {
            var newPart = await createPart(motherboard.name, motherboard.imageUrl);
            var newMotherboard = new Motherboard()
            {
                PartId = newPart.Id,
                socket=motherboard.socket,
                formFactor=motherboard.formFactor,
                maxMemory=motherboard.maxMemory,
                memorySlot=motherboard.memorySlot,
                color=motherboard.color,
            };
            await _dbcontext.AddAsync(newMotherboard);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addMemory(MemoryDto memory)
        {
            var newPart = await createPart(memory.name, memory.imageUrl);
            var newMemory = new Memory()
            {
                PartId = newPart.Id,
                speed=memory.speed,
                modulesLower=memory.modulesLower,
                modulesUpper=memory.modulesUpper,
                color=memory.color,
                cl=memory.cl,
            };
            await _dbcontext.AddAsync(newMemory);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addHardDrive(HardDriveDto harddrive)
        {
            var newPart = await createPart(harddrive.name, harddrive.imageUrl);
            var newHardDrive = new HardDrive()
            {
                PartId = newPart.Id,
                capacity=harddrive.capacity,
                type=harddrive.type,
                cache=harddrive.cache,
                interfaces=harddrive.interfaces,
            };
            await _dbcontext.AddAsync(newHardDrive);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addGraphics(GraphicsDto graphics)
        {
            var newPart = await createPart(graphics.name, graphics.imageUrl);
            var newGraphics = new Graphics()
            {
                PartId = newPart.Id,
                chipset=graphics.chipset,
                memory=graphics.memory,
                coreClock=graphics.coreClock,
                boostClock=graphics.boostClock,
                color=graphics.color,
                length=graphics.length,
            };
            await _dbcontext.AddAsync(newGraphics);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addCase(CaseDto caseBody)
        {
            var newPart = await createPart(caseBody.name, caseBody.imageUrl);
            var newCase = new Case()
            {
                PartId = newPart.Id,
                type=caseBody.type,
                color=caseBody.color,
                sidePanel=caseBody.sidePanel,
                externalVolume=caseBody.externalVolume,
            };
            await _dbcontext.AddAsync(newCase);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task addPowerSupply(PowerSupplyDto powerSupply)
        {
            var newPart = await createPart(powerSupply.name, powerSupply.imageUrl);
            var newPowerSupply = new PowerSupply()
            {
                PartId = newPart.Id,
                type=powerSupply.type,
                efficiency=powerSupply.efficiency,
                wattage=powerSupply.wattage,
                modular=powerSupply.modular,
                color=powerSupply.color,
            };
            await _dbcontext.AddAsync(newPowerSupply);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<Part> createPart(string name,string imageUrl)
        {
            var part = new Part()
            {
                Name = name,
                ImageUrl=imageUrl
            };
            await _dbcontext.AddAsync(part);
            await _dbcontext.SaveChangesAsync();
            return part;
        }
        public List<string> getType()
        {
            return new List<string>() { "processor", "motherboard", "memory", "processorCooler", "harddrive", "graphics", "case", "powersupply" };
        }
    }
}
