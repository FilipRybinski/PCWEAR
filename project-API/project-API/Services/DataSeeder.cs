using project_API.Entities;
using System.Diagnostics;

namespace project_API.Services
{
    public class dataSeeder
    {
        private readonly dataBase _dbcontext;
        public dataSeeder(dataBase dbContext) {
            _dbcontext = dbContext;
        }
        public void Seed()
        {
            if (!_dbcontext.Roles.Any())
            {
                var Roles= new List<role>()
                {
                    new role()
                    {
                        name="User"
                    },
                    new role()
                    {
                        name="Moderator"
                    },
                    new role()
                    {
                        name="Admin"
                    },
                };
                _dbcontext.AddRange(Roles);
                _dbcontext.SaveChanges();
            }
            if (!_dbcontext.Parts.Any())
            {
                var Roles = new List<Part>()
                {
                    new Part()
                    {
                        Name="AMD Ryzen 5 5600X",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/3ef757133d38ac40afe75da691ba7d60.256p.jpg",
                        price=21.2,
                        Processor=new Processor()
                        {
                            cores=6,
                            graphics=false,
                            socket="AM4",
                            tdp= 65,
                            threads=12,
                        }

                    },
                    new Part()
                    {
                        Name="Corsair RM750e (2023)",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/336c7955df0312d04655dd3a13973c95.256p.jpg",
                        price=21.2,
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="gold",
                            wattage=750,
                            modular="Full",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="Samsung 980 Pro",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/3b2a91588d1a28bfa1b0184fb7f1c0a1.256p.jpg",
                        price=21.2,
                        HardDrive=new HardDrive()
                        {
                            capacity=2000,
                            type="SSD",
                            cache=2048,
                            interfaces="M.2 PCIe 4.0 X4"

                        }

                    },
                     new Part()
                    {
                        Name="Corsair Vengeance 32 GB",
                        ImageUrl="https://m.media-amazon.com/images/I/41jJSPS8W7L.jpg",
                        price=21.2,
                        Memory=new Memory()
                        {
                            speed=5600,
                            modulesLower=2,
                            modulesUpper=16,
                            color="black",
                            cl=36

                        }

                    },
                      new Part()
                    {
                        Name="MSI B550 GAMING GEN3",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/cbc52effd345bd5e9d66b5f7d198f8b4.256p.jpg",
                        price=21.2,
                        Motherboard=new Motherboard()
                        {
                            socket="AM4",
                            formFactor="ATX",
                            maxMemory=128,
                            memorySlot=4,
                            color="black"

                        }

                    },  new Part()
                    {
                        Name="Gigabyte GeForce RTX 3060 EAGLE OC LHR ",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/6/pr_2021_6_15_13_30_27_153_06.jpg",
                        price=73.9,
                        Graphics=new Graphics()
                        {
                            chipset="GeForce RTX 3060",
                            memory=12,
                            coreClock=1320,
                            boostClock=1807,
                            color="black",
                            length=242

                        }

                    },
                        new Part()
                    {
                        Name="be quiet! Dark Rock Pro 4",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/8ab57dc3c0eb346c72ef7a2405e31227.256p.jpg",
                        price=73.9,
                        ProcessorCooler=new ProcessorCooler()
                        {
                            noiseLower=12.8,
                            noiseUpper=24.3,
                            rpmLower=650,
                            rpmUpper=1800,
                            size=250

                        }

                    },
                            new Part()
                    {
                        Name="Cooler Master MasterBox Q300L",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/ec48e16ee4d6629045cfc4d71c649746.256p.jpg",
                        price=73.9,
                        Case=new Case()
                        {
                          color="BLACK",
                          externalVolume=33.6,
                          type="MicroATX Mini Tower",
                          sidePanel="Acrylic"

                        }

                    },
                };
                _dbcontext.AddRange(Roles);
                _dbcontext.SaveChanges();
            }
        }
    }
}
