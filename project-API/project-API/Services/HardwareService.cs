
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using NLog.Filters;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;
using System.Collections;
using System.Runtime.InteropServices;

namespace project_API.Services
{
    public interface IHardwareService
    {
        public Task addProcessor(ProcessorDto processor);
        public Task<List<ProcessorReturnDto>> getProcessors(int? id,string? name,int? cores, int? threads, bool? graphics, int? tdp, string? socket);
        public Task addMotherboard(MotherboardDto motherboard);
        public Task<List<MotherboardReturnDto>> getMotherboard(int? id, string? name, string? socket, string? formFactor,int? maxMemory, int? memorySlot, string? color);
        public Task addMemory(MemoryDto memory);
        public Task<List<MemoryReturnDto>> getMemory(int? id, string? name, int? speed,int? modulesLower, int? modulesUpper, int? cl,string? color);
        public Task addHardDrive(HardDriveDto hardDrive);
        public Task<List<HardDriveReturnDto>> getHardDrive(int? id, string? name, int? capacity, string? type, int? cache, string? interfaces);
        public Task addProcessorCooler(ProcessorCoolerDto processorCooler);
        public Task<List<ProcessorCoolerReturnDto>> getProcessorCooler(int? id, string? name, int? rpmLower, int? rpmUpper, int? noiseLower, int? noiseUpper, int? size);
        public Task addGraphics(GraphicsDto graphics);
        public Task<List<GraphicsReturnDto>> getGraphics(int? id, string? name, string? chipset,int? memory, int? coreClock, int? boostClock, string? color, int? length);
        public Task addCase(CaseDto caseBody);
        public Task<List<CaseReturnDto>> getCase(int? id, string? name, string? type,string? color, string? sidePanel, double? externalVolume);
        public Task addPowerSupply(PowerSupplyDto powerSupply);
        public Task<List<PowerSupplyReturnDto>> getPowerSupply(int? id, string? name,string? type, string? efficiency, int? wattage,string? modular, string? color);
        public List<T> pagination<T>(List<T> data, int page, int pageSize);
        public Task<List<object>> getTop7(int ? id);
        public Task<List<object>> combineAll(int? id);
    }
    public class HardwareService: IHardwareService
    {
        private readonly dataBase _dbcontext;
        public HardwareService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public List<T> pagination<T>(List<T> data,int page,int pageSize)
        {
            return data.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }
        public async Task<double> getRating(int id)
        {
            var count = await _dbcontext.Ratings.Where(r => r.partId == id).CountAsync();
            var sum = await _dbcontext.Ratings.Where(r => r.partId == id).Select(r => r.rating).SumAsync();
            if (count == 0 || sum == 0)
            {
                return 0;
            }
            return sum / count;
        }
        public async Task<int> getCommentsCount(int id)
        {
            return await _dbcontext.Comments.Where(c => c.partId == id).CountAsync();
        }
        public async Task<Part> createPart(string name, string imageUrl)
        {
            var part = new Part()
            {
                Name = name,
                ImageUrl = imageUrl
            };
            await _dbcontext.AddAsync(part);
            await _dbcontext.SaveChangesAsync();
            return part;
        }
        public async Task<bool> checkFavourites(int? userId,int partId)
        {
            if(userId is null)
            {
                return false;
            }
            var result =await _dbcontext.Favourites.FirstOrDefaultAsync(e => e.userId == userId && e.partId == partId);
            if(result is null)
            {
                return false;
            }
            return true;
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
        public async Task<List<ProcessorReturnDto>> getProcessors(int? id,string? name,int? cores, int? threads, bool? graphics, int? tdp, string? socket)
        {
            var query = _dbcontext.Processors.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (cores!=null)
            {
                query=query.Where(e => e.cores==cores);
            }
            if (threads!=null)
            {
                query = query.Where(e => e.threads == threads);
            }
            if(graphics !=null)
            {
                query = query.Where(e=>e.graphics==graphics);
            }
            if (tdp != null)
            {
                query = query.Where(e => e.tdp <= tdp);
            }
            if (socket != null)
            {
                query = query.Where(e => e.socket.Contains(socket));
            }
            var result = await query.ToListAsync();
            var mapped=await Task.WhenAll(result.Select(async e => new ProcessorReturnDto()
            {
                Id = e.Part.Id,
                name = e.Part.Name,
                imageUrl = e.Part.ImageUrl,
                cores = e.cores,
                threads = e.threads,
                graphics = e.graphics,
                tdp = e.tdp,
                socket = e.socket,
                commentsCount = await getCommentsCount(e.PartId),
                rating = await getRating(e.PartId),
                favourites=await checkFavourites(id,e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task addMotherboard(MotherboardDto motherboard)
        {
            var newPart = await createPart(motherboard.name, motherboard.imageUrl);
            var newMotherboard = new Motherboard()
            {
                PartId = newPart.Id,
                socket = motherboard.socket,
                formFactor = motherboard.formFactor,
                maxMemory = motherboard.maxMemory,
                memorySlot = motherboard.memorySlot,
                color = motherboard.color,
            };
            await _dbcontext.AddAsync(newMotherboard);
            await _dbcontext.SaveChangesAsync();
        }
        public async  Task<List<MotherboardReturnDto>> getMotherboard(int? id, string? name, string? socket, string? formFactor, int? maxMemory, int? memorySlot, string? color)
        {
            var query = _dbcontext.Motherboards.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (socket != null)
            {
                query = query.Where(e => e.socket.Contains(socket));
            }
            if (formFactor != null)
            {
                query = query.Where(e => e.formFactor.Contains(formFactor));
            }
            if (maxMemory != null)
            {
                query = query.Where(e => e.maxMemory==maxMemory);
            }
            if (memorySlot != null)
            {
                query = query.Where(e => e.memorySlot == memorySlot);
            }
            if (color != null)
            {
                query = query.Where(e => e.color.Contains(color));
            }
            var result = await query.ToArrayAsync();
            var mapped=await Task.WhenAll(result.Select(async e => new MotherboardReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task<List<MemoryReturnDto>> getMemory(int? id, string? name, int? speed, int? modulesLower, int? modulesUpper, int? cl, string? color)
        {
            var query = _dbcontext.Memorys.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (speed != null)
            {
                query = query.Where(e => e.speed==speed);
            }
            if (modulesLower != null)
            {
                query = query.Where(e => e.modulesLower==modulesLower);
            }
            if (modulesUpper != null)
            {
                query = query.Where(e => e.modulesUpper == modulesUpper);
            }
            if (cl != null)
            {
                query = query.Where(e => e.cl == cl);
            }
            if (color != null)
            {
                query = query.Where(e => e.color.Contains(color));
            }
            var result = await query.ToArrayAsync();
            var mapped=await Task.WhenAll(result.Select(async e => new MemoryReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task addMemory(MemoryDto memory)
        {
            var newPart = await createPart(memory.name, memory.imageUrl);
            var newMemory = new Memory()
            {
                PartId = newPart.Id,
                speed = memory.speed,
                modulesLower = memory.modulesLower,
                modulesUpper = memory.modulesUpper,
                color = memory.color,
                cl = memory.cl,
            };
            await _dbcontext.AddAsync(newMemory);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<HardDriveReturnDto>> getHardDrive(int? id, string? name, int? capacity, string? type, int? cache, string? interfaces)
        {
            var query = _dbcontext.HardDrives.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (capacity != null)
            {
                query = query.Where(e => e.capacity == capacity);
            }
            if (type != null)
            {
                query = query.Where(e => e.type.Contains(type));
            }
            if (cache != null)
            {
                query = query.Where(e => e.cache==cache);
            }
            if (interfaces != null)
            {
                query = query.Where(e => e.interfaces.Contains(interfaces));
            }
            var result = await query.ToArrayAsync();
            var mapped= await Task.WhenAll(result.Select(async e => new HardDriveReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task addHardDrive(HardDriveDto harddrive)
        {
            var newPart = await createPart(harddrive.name, harddrive.imageUrl);
            var newHardDrive = new HardDrive()
            {
                PartId = newPart.Id,
                capacity = harddrive.capacity,
                type = harddrive.type,
                cache = harddrive.cache,
                interfaces = harddrive.interfaces,
            };
            await _dbcontext.AddAsync(newHardDrive);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<ProcessorCoolerReturnDto>> getProcessorCooler(int? id, string? name, int? rpmLower, int? rpmUpper, int? noiseLower, int? noiseUpper, int? size)
        {
            var query = _dbcontext.ProcessorCoolers.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (rpmLower != null)
            {
                query = query.Where(e => e.rpmLower>=rpmLower);
            }
            if (rpmUpper != null)
            {
                query = query.Where(e => e.rpmUpper <= rpmUpper);
            }
            if (noiseLower != null)
            {
                query = query.Where(e => e.noiseLower <= noiseLower);
            }
            if (noiseUpper != null)
            {
                query = query.Where(e => e.noiseUpper <= noiseUpper);
            }
            if (size != null)
            {
                query = query.Where(e => e.size <= size);
            }
            var result = await query.ToArrayAsync();
            var mapped=await Task.WhenAll(result.Select(async e => new ProcessorCoolerReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task addProcessorCooler(ProcessorCoolerDto processorCooler)
        {
            var newPart = await createPart(processorCooler.name, processorCooler.imageUrl);
            var newProcessorCooler = new ProcessorCooler()
            {
                PartId = newPart.Id,
                rpmLower = processorCooler.rpmLower,
                rpmUpper = processorCooler.rpmUpper,
                noiseLower = processorCooler.noiseLower,
                noiseUpper = processorCooler.noiseUpper,
                size = processorCooler.size,
            };
            await _dbcontext.AddAsync(newProcessorCooler);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<GraphicsReturnDto>> getGraphics(int? id, string? name, string? chipset, int? memory, int? coreClock, int? boostClock, string? color, int? length)
        {
            var query = _dbcontext.Graphicss.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (chipset != null)
            {
                query = query.Where(e => e.chipset==chipset);
            }
            if (memory != null)
            {
                query = query.Where(e => e.memory == memory);
            }
            if (coreClock != null)
            {
                query = query.Where(e => e.coreClock == coreClock);
            }
            if (boostClock!= null)
            {
                query = query.Where(e => e.boostClock == boostClock);
            }
            if (color != null)
            {
                query = query.Where(e => e.color.Contains(color));
            }
            if (length != null)
            {
                query = query.Where(e => e.length<=length);
            }
            var result = await query.ToArrayAsync();
            var mapped = await Task.WhenAll(result.Select(async e => new GraphicsReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task addGraphics(GraphicsDto graphics)
        {
            var newPart = await createPart(graphics.name, graphics.imageUrl);
            var newGraphics = new Graphics()
            {
                PartId = newPart.Id,
                chipset = graphics.chipset,
                memory = graphics.memory,
                coreClock = graphics.coreClock,
                boostClock = graphics.boostClock,
                color = graphics.color,
                length = graphics.length,
            };
            await _dbcontext.AddAsync(newGraphics);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<CaseReturnDto>> getCase(int? id, string? name, string? type, string? color, string? sidePanel, double? externalVolume)
        {
            var query = _dbcontext.Cases.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (type != null)
            {
                query = query.Where(e => e.type.Contains(type));
            }
            if (color != null)
            {
                query = query.Where(e => e.color.Contains(color));
            }
            if (sidePanel != null)
            {
                query = query.Where(e => e.sidePanel.Contains(sidePanel));
            }
            if (externalVolume != null)
            {
                query = query.Where(e => e.externalVolume<=externalVolume);
            }
            var result= await query.ToArrayAsync();
            var mapped= await Task.WhenAll(result.Select(async e => new CaseReturnDto()
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
                favourites = await checkFavourites(id, e.PartId),
            }));
            return mapped.ToList();
        }
        public async Task addCase(CaseDto caseBody)
        {
            var newPart = await createPart(caseBody.name, caseBody.imageUrl);
            var newCase = new Case()
            {
                PartId = newPart.Id,
                type = caseBody.type,
                color = caseBody.color,
                sidePanel = caseBody.sidePanel,
                externalVolume = caseBody.externalVolume,
            };
            await _dbcontext.AddAsync(newCase);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<PowerSupplyReturnDto>> getPowerSupply(int? id, string? name, string? type, string? efficiency, int? wattage, string? modular, string? color)
        {
            var query = _dbcontext.PowerSupplys.Include(e => e.Part).AsQueryable();
            if (name != null)
            {
                query = query.Where(e => e.Part.Name.Contains(name));
            }
            if (type != null)
            {
                query = query.Where(e => e.type.Contains(type));
            }
            if (efficiency != null)
            {
                query = query.Where(e => e.efficiency.Contains(efficiency));
            }
            if (wattage != null)
            {
                query = query.Where(e => e.wattage==wattage);
            }
            if (modular != null)
            {
                query = query.Where(e => e.modular.Contains(modular));
            }
            if (color != null)
            {
                query = query.Where(e => e.color.Contains(color));
            }
            var result = await query.ToListAsync();
            var mapped = await Task.WhenAll(result.Select(async e => new PowerSupplyReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }));
            return mapped.ToList();
        }
        public async Task addPowerSupply(PowerSupplyDto powerSupply)
        {
            var newPart = await createPart(powerSupply.name, powerSupply.imageUrl);
            var newPowerSupply = new PowerSupply()
            {
                PartId = newPart.Id,
                type = powerSupply.type,
                efficiency = powerSupply.efficiency,
                wattage = powerSupply.wattage,
                modular = powerSupply.modular,
                color = powerSupply.color,
            };
            await _dbcontext.AddAsync(newPowerSupply);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<List<object>> combineAll(int? id)
        {
            List<object> list=new List<object>();
            var processors = await _dbcontext.Processors.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(processors.Select(async e => new ProcessorReturnDto()
            {
                Id = e.Part.Id,
                name = e.Part.Name,
                imageUrl = e.Part.ImageUrl,
                cores = e.cores,
                threads = e.threads,
                graphics = e.graphics,
                tdp = e.tdp,
                socket = e.socket,
                commentsCount = await getCommentsCount(e.PartId),
                rating = await getRating(e.PartId),
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var motherboards = await _dbcontext.Motherboards.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(motherboards.Select(async e => new MotherboardReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var memorys = await _dbcontext.Memorys.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(memorys.Select(async e => new MemoryReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var processorCooler = await _dbcontext.ProcessorCoolers.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(processorCooler.Select(async e => new ProcessorCoolerReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var harddrives = await _dbcontext.HardDrives.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(harddrives.Select(async e => new HardDriveReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var graphics = await _dbcontext.Graphicss.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(graphics.Select(async e => new GraphicsReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var cases = await _dbcontext.Cases.Include(e => e.Part).ToArrayAsync();
            list.AddRange(await Task.WhenAll(cases.Select(async e => new CaseReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            var powersupply = await _dbcontext.PowerSupplys.Include(e => e.Part).ToListAsync();
            list.AddRange(await Task.WhenAll(powersupply.Select(async e => new PowerSupplyReturnDto()
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
                favourites = await checkFavourites(id, e.PartId)
            }).ToArray()));
            return list;
        }
        public async Task<List<object>> getTop7(int? id)
        {
            var result = await combineAll(id);
            return result.OrderByDescending(e => e.GetType().GetProperty("commentsCount").GetValue(e)).OrderByDescending(e=>e.GetType().GetProperty("rating").GetValue(e)).Take(10).ToList();
        }
    }

}
