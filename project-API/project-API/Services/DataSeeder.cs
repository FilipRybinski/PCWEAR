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
            if (!_dbcontext.Parts.Any()) {
                var parts = new List<Part>()
                {
                    new Part()
                    {
                        Name="AMD Ryzen 5 5600X",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/3ef757133d38ac40afe75da691ba7d60.256p.jpg",
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
                        Name="Intel Core i5-12400F",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/12/pr_2021_12_23_9_31_19_942_00.jpg",
                        Processor=new Processor()
                        {
                            cores=6,
                            graphics=false,
                            socket="1700",
                            tdp= 65,
                            threads=12,
                        }

                    }, new Part()
                    {
                        Name="AMD Ryzen 7 5700X",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/4/pr_2022_4_15_16_29_20_759_00.jpg",
                        Processor=new Processor()
                        {
                            cores=8,
                            graphics=false,
                            socket="AM4",
                            tdp= 65,
                            threads=16,
                        }

                    }, new Part()
                    {
                        Name="AMD Ryzen 5 5600",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/4/pr_2022_4_4_13_1_27_284_00.jpg",
                        Processor=new Processor()
                        {
                            cores=6,
                            graphics=false,
                            socket="AM4",
                            tdp= 65,
                            threads=12,
                        }

                    }, new Part()
                    {
                        Name="Intel Core i5-13500",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/1/pr_2023_1_2_8_18_54_246_02.jpg",
                        Processor=new Processor()
                        {
                            cores=14,
                            graphics=true,
                            socket="1700",
                            tdp= 65,
                            threads=20,
                        }

                    },
                    new Part()
                    {
                        Name="AMD Ryzen 5 3600",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/7/pr_2019_7_19_9_27_42_99_00.jpg",
                        Processor=new Processor()
                        {
                            cores=6,
                            graphics=true,
                            socket="1700",
                            tdp= 65,
                            threads=12,
                        }

                    },
                    new Part()
                    {
                        Name="Corsair RM750e (2023)",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/336c7955df0312d04655dd3a13973c95.256p.jpg",
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="80 PLUS Gold",
                            wattage=750,
                            modular="Full modular",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="ENDORFY Vero L5",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/2/pr_2023_2_24_13_38_3_975_07.jpg",
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="Plus Bronze",
                            wattage=700,
                            modular="None modular",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="be quiet! System Power 10",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/10/pr_2022_10_18_14_36_47_458_02.jpg",
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="80 PLUS Gold",
                            wattage=850,
                            modular="None modular",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="MSI MAG",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/11/pr_2021_11_4_14_47_57_993_00.jpg",
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="80 PLUS Bronze",
                            wattage=650,
                            modular="None modular",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="Gigabyte UD850GM PG5",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/3/pr_2023_3_9_14_22_22_350_06.jpg",
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="80 PLUS Gold",
                            wattage=850,
                            modular="Full modular",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="Corsair CV",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/8/pr_2021_8_27_13_34_43_831_00.jpg",
                        PowerSupply=new PowerSupply()
                        {
                            type="ATX",
                            efficiency="80 Plus Bronze",
                            wattage=550,
                            modular="None modular",
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="Samsung 980 Pro",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/3b2a91588d1a28bfa1b0184fb7f1c0a1.256p.jpg",
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
                        Name="Lexar 1TB M.2 PCIe NVMe NM620",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/7/pr_2022_7_11_7_55_50_654_02.jpg",
                        HardDrive=new HardDrive()
                        {
                            capacity=1000,
                            type="SSD",
                            cache=0,
                            interfaces="PCIe NVMe 3.0 x4"

                        }

                    },
                    new Part()
                    {
                        Name="Kingston 2TB M.2 PCIe Gen4 NVMe KC3000",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_22_10_9_42_174_01.jpg",
                        HardDrive=new HardDrive()
                        {
                            capacity=2048,
                            type="SSD",
                            cache=0,
                            interfaces="PCIe NVMe 4.0 x4"

                        }

                    },
                    new Part()
                    {
                        Name="Crucial 500GB 2,5\" SATA SSD MX500",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2018/1/pr_2018_1_3_14_2_15_279_01.jpg",
                        HardDrive=new HardDrive()
                        {
                            capacity=500,
                            type="SSD",
                            cache=0,
                            interfaces="2,5\" SATA"

                        }

                    },
                    new Part()
                    {
                        Name="Samsung 1TB 2,5\" SATA SSD 870 EVO",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/1/pr_2021_1_25_12_40_53_262_00.jpg",
                        HardDrive=new HardDrive()
                        {
                            capacity=1000,
                            type="SSD",
                            cache=0,
                            interfaces="2,5\" SATA"

                        }

                    },
                     new Part()
                    {
                        Name="Corsair Vengeance 32 GB",
                        ImageUrl="https://m.media-amazon.com/images/I/41jJSPS8W7L.jpg",
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
                        Name="Lexar 32GB (2x16GB) 6000MHz CL30 Ares RGB",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/8/pr_2023_8_3_13_7_52_603_00.jpg",
                        Memory=new Memory()
                        {
                            speed=6000,
                            modulesLower=8,
                            modulesUpper=16,
                            color="silver",
                            cl=30

                        }

                    },
                       new Part()
                    {
                        Name="Lexar 32GB (2x16GB) 3600Mhz CL18 Thor White",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/5/pr_2023_5_29_12_59_8_573_00.jpg",
                        Memory=new Memory()
                        {
                            speed=3600,
                            modulesLower=8,
                            modulesUpper=16,
                            color="white",
                            cl=18

                        }

                    },
                        new Part()
                    {
                        Name="GOODRAM 32GB (2x16GB) 3200MHz CL16 IRDM X",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/2/pr_2022_2_22_13_20_43_256_00.jpg",
                        Memory=new Memory()
                        {
                            speed=3200,
                            modulesLower=2,
                            modulesUpper=16,
                            color="black",
                            cl=16

                        }

                    },
                         new Part()
                    {
                        Name="Patriot 32GB (2x16GB) 3600MHz CL18 Viper Blackout",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/2/pr_2021_2_10_13_47_16_810_00.jpg",
                        Memory=new Memory()
                        {
                            speed=3600,
                            modulesLower=2,
                            modulesUpper=16,
                            color="black",
                            cl=18

                        }

                    },
                      new Part()
                    {
                        Name="MSI B550 GAMING GEN3",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/cbc52effd345bd5e9d66b5f7d198f8b4.256p.jpg",
                        Motherboard=new Motherboard()
                        {
                            socket="AM4",
                            formFactor="ATX",
                            maxMemory=128,
                            memorySlot=4,
                            color="black"

                        }

                    },
                       new Part()
                    {
                        Name="MSI B550-A PRO",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/6/pr_2020_6_9_17_24_15_146_00.jpg",
                        Motherboard=new Motherboard()
                        {
                            socket="AM4",
                            formFactor="ATX",
                            maxMemory=128,
                            memorySlot=4,
                            color="black"

                        }

                    },
                        new Part()
                    {
                        Name="MSI MPG B550 GAMING PLUS",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/6/pr_2020_6_12_9_3_57_498_00.jpg",
                        Motherboard=new Motherboard()
                        {
                            socket="AM4",
                            formFactor="ATX",
                            maxMemory=128,
                            memorySlot=4,
                            color="black"

                        }

                    },
                         new Part()
                    {
                        Name="Gigabyte B760 GAMING X DDR4",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/1/pr_2023_1_10_10_54_35_353_05.jpg",
                        Motherboard=new Motherboard()
                        {
                            socket="1700",
                            formFactor="ATX",
                            maxMemory=128,
                            memorySlot=4,
                            color="black"

                        }

                    },
                          new Part()
                    {
                        Name="MSI B550 GAMING GEN3",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/1/pr_2023_1_11_11_9_57_200_01.jpg",
                        Motherboard=new Motherboard()
                        {
                            socket="1700",
                            formFactor="mATX",
                            maxMemory=128,
                            memorySlot=4,
                            color="white"

                        }

                    },
                           new Part()
                    {
                        Name="ASUS ROG STRIX B760-I GAMING WIFI",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/1/pr_2023_1_16_15_36_20_141_05.jpg",
                        Motherboard=new Motherboard()
                        {
                            socket="1700",
                            formFactor="mITX",
                            maxMemory=128,
                            memorySlot=4,
                            color="black"

                        }

                    },
                    new Part()
                    {
                        Name="Intel Arc A750 8GB GDDR6",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/2/pr_2023_2_7_11_27_18_551_02.jpg",
                        Graphics=new Graphics()
                        {
                            chipset="Intel Arc A750",
                            memory=8,
                            coreClock=1600,
                            boostClock=2050,
                            color="black",
                            length=230

                        }

                    },
                    new Part()
                    {
                        Name="KFA2 GeForce RTX 4060 1-Click OC 2X 8GB GDDR6 ",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_6_11_0_29_286_00.jpg",
                        Graphics=new Graphics()
                        {
                            chipset="GeForce RTX 4060",
                            memory=8,
                            coreClock=2475,
                            boostClock=2490,
                            color="black",
                            length=265

                        }

                    },
                    new Part()
                    {
                        Name="Sapphire Radeon RX 6600 GAMING Pulse 8GB GDDR6",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_21_15_1_9_475_00.jpg",
                        Graphics=new Graphics()
                        {
                            chipset="Radeon™ RX 6600",
                            memory=8,
                            coreClock=2044,
                            boostClock=2491,
                            color="black",
                            length=210

                        }

                    },
                    new Part()
                    {
                        Name="Zotac GeForce RTX 3060 Twin Edge OC LHR 12GB GDDR6",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/2/pr_2021_2_22_13_39_29_197_04.jpg",
                        Graphics=new Graphics()
                        {
                            chipset="GeForce RTX 3060",
                            memory=12,
                            coreClock=1500,
                            boostClock=1807,
                            color="black",
                            length=224

                        }

                    },
                    new Part()
                    {
                        Name="XFX Radeon RX 7800 XT SPEEDSTER QICK319 CR 16GB GDDR6",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/10/pr_2023_10_17_11_11_11_693_00.jpg",
                        Graphics=new Graphics()
                        {
                            chipset="Radeon™ RX 7800 XT",
                            memory=16,
                            coreClock=1295,
                            boostClock=1560,
                            color="black",
                            length=335

                        }

                    },
                        new Part()
                    {
                        Name="be quiet! Dark Rock Pro 4",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/8ab57dc3c0eb346c72ef7a2405e31227.256p.jpg",
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
                        Name="ENDORFY Fera 5 120mm",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/9/pr_2022_9_29_11_41_58_185_00.jpg",
                        ProcessorCooler=new ProcessorCooler()
                        {
                            noiseLower=12.8,
                            noiseUpper=24.3,
                            rpmLower=250,
                            rpmUpper=1800,
                            size=155

                        }

                    },
                     new Part()
                    {
                        Name="Silver Monkey X CRISP DUAL 2x120 mm",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/10/pr_2022_10_12_12_17_57_738_00.jpg",
                        ProcessorCooler=new ProcessorCooler()
                        {
                            noiseLower=12.8,
                            noiseUpper=24.3,
                            rpmLower=700,
                            rpmUpper=1800,
                            size=148

                        }

                    },
                    new Part()
                    {
                        Name="ENDORFY Fortis 5 ARGB 140mm",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/9/pr_2022_9_29_11_55_50_257_00.jpg",
                        ProcessorCooler=new ProcessorCooler()
                        {
                            noiseLower=12.8,
                            noiseUpper=24.3,
                            rpmLower=250,
                            rpmUpper=1400,
                            size=250

                        }

                    },
                     new Part()
                    {
                        Name="be quiet! Dark Rock Pro 4 120/135mm",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/5/pr_2022_5_20_11_5_25_946_00.jpg",
                        ProcessorCooler=new ProcessorCooler()
                        {
                            noiseLower=12.8,
                            noiseUpper=24.3,
                            rpmLower=60,
                            rpmUpper=1500,
                            size=163

                        }

                    },
                    new Part()
                    {
                        Name="Noctua NH-D15 2x140mm",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2017/10/pr_2017_10_12_11_24_1_915_00.jpg",
                        ProcessorCooler=new ProcessorCooler()
                        {
                            noiseLower=12.8,
                            noiseUpper=24.3,
                            rpmLower=300,
                            rpmUpper=1500,
                            size=150

                        }

                    },
                    new Part()
                    {
                        Name="Cooler Master MasterBox Q300L",
                        ImageUrl="https://cdna.pcpartpicker.com/static/forever/images/product/ec48e16ee4d6629045cfc4d71c649746.256p.jpg",
                        Case=new Case()
                        {
                          color="BLACK",
                          externalVolume=33.6,
                          type="MicroATX Mini Tower",
                          sidePanel="Acrylic"

                        }

                    },
                    new Part()
                    {
                        Name="ENDORFY Ventum 200 Air",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/11/pr_2022_11_17_13_11_43_84_02.jpg",
                        Case=new Case()
                        {
                          color="BLACK",
                          externalVolume=30,
                          type="ATX, microATX, ITX Middle Tower",
                          sidePanel="Glass"

                        }

                    },
                    new Part()
                    {
                        Name="Ce quiet! Pure Base 500DX Black",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/4/pr_2020_4_23_11_50_6_672_00.jpg",
                        Case=new Case()
                        {
                          color="BLACK",
                          externalVolume=31.3,
                          type="ATX, m-ATX, Mini-ITX Middle Tower",
                          sidePanel="Acrylic"

                        }

                    },
                    new Part()
                    {
                        Name="Cooler Master MasterBox Q300L",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/4/pr_2020_4_23_11_50_6_672_00.jpg",
                        Case=new Case()
                        {
                          color="BLACK",
                          externalVolume=33.6,
                          type="MicroATX Mini Tower",
                          sidePanel="Acrylic"

                        }

                    },
                    new Part()
                    {
                        Name="ENDORFY Signum 300 ARGB",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/11/pr_2022_11_16_14_39_13_262_00.jpg",
                        Case=new Case()
                        {
                          color="BLACK",
                          externalVolume=40.2,
                          type="ATX, m-ATX, Mini-ITX Middle Tower",
                          sidePanel="Glass"

                        }

                    },
                    new Part()
                    {
                        Name="be quiet! Pure Base 500DX White",
                        ImageUrl="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/4/pr_2020_4_23_12_3_59_38_06.jpg",
                        Case=new Case()
                        {
                          color="white",
                          externalVolume=36.6,
                          type="TX, m-ATX, Mini-ITX Middle Tower",
                          sidePanel="Acrylic"

                        }

                    },
                };
                _dbcontext.AddRange(parts);
                _dbcontext.SaveChanges();
            }
        }
    }
}
