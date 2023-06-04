INSERT INTO Product
values
(random(),"STM32-F4XD",DATETIME(), DATETIME(),"8969572530887024379","-8053437333699211677" ,15,"price_1NCrMhLgP5qE4oZv7AynSsKO","Whatever descri",10,"https://si.farnell.com/productimages/standard/en_GB/2845534-40.jpg")

INSERT INTO Product
values
(random(), "Arduino Mega", DATETIME(), DATETIME(), "8843059429749026742", "2345014552627217601", 15, "DEF PRICE","DESCRIPTION XD", 10, "https://asset.conrad.com/media10/isa/160267/c1/-/sl/191790_BB_00_FB/image.jpg?x=400&y=400")


INSERT INTO Category
values
(random(),"arduino","Moduli & Dodatki", DATETIME(), DATETIME(), "/modulidodatki")

INSERT INTO Category
values
(random(),"stm","STM", DATETIME(), DATETIME(), "/stm")

INSERT INTO Category
values
(random(),"esp","ESP", DATETIME(), DATETIME(), "/esp")

INSERT INTO Category
values
(random(),"raspberrypi","Raspberry PI", DATETIME(), DATETIME(), "/raspberrypi")

INSERT INTO Category
values
(random(),"modulidodatki","Moduli & Dodatki", DATETIME(), DATETIME(), "/modulidodatki")

INSERT INTO Subcategory values (random(), "leonardo", "Leonardo", DATETIME(), DATETIME(), "-8196448458879397412"  ,"/leonardo", "https://www.3dsvet.eu/wp-content/uploads/2023/05/Arduino-LEONARDO-smd-microUSB-ITALIJA.jpg")

INSERT INTO Subcategory values (random(), "stm32", "STM32", DATETIME(), DATETIME(), "2949623238137507330", "/stm32", "https://www.3dsvet.eu/wp-content/uploads/2023/04/STM32F103R8T6.jpg")


INSERT INTO Product values (random(), "Arduino Uno", DATETIME(), DATETIME(),(SELECT id FROM Category WHERE name = 'arduino'),(SELECT id from Subcategory WHERE name = "uno"),8, "price_1NCkzxLgP5qE4oZvinjQKKjL", "ASINDASIODSAIODASNPDANSPIDNAISOP", 10, "https://si.farnell.com/productimages/standard/en_GB/2075382-40.jpg")

INSERT INTO Product values (random(), "Arduino Nano", DATETIME(), DATETIME(),(SELECT id FROM Category WHERE name = 'arduino'),(SELECT id from Subcategory WHERE name = "nano"),8,"price_1NCkzxLgP5qE4oZvinjQKKjL", "ASINDASIODSAIODASNPDANSPIDNAISOP", 10, "https://asset.conrad.com/media10/isa/160267/c1/-/sl/1172623_BB_00_FB/image.jpg?x=400&y=400")