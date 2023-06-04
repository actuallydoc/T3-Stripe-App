INSERT INTO Product
values
(random(),"STM32-F4XD",DATETIME(), DATETIME(),"8969572530887024379","-8053437333699211677" ,15,"price_1NCrMhLgP5qE4oZv7AynSsKO","Whatever descri",10,"https://si.farnell.com/productimages/standard/en_GB/2845534-40.jpg")

INSERT INTO Product
values
(random(), "Arduino Mega WIFI ESP8266", DATETIME(), DATETIME(), "8843059429749026742", "2345014552627217601", 20,,"" "Arduino MEGA z integriranim WiFi ESP8266", 10, "https://www.3dsvet.eu/wp-content/uploads/2020/06/Arduino-MEGA-ESP8266-01.jpg")


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
INSERT INTO Subcategory values (random(), "releji", "Releji" ,DATETIME(), DATETIME(), (SELECT ID FROM Category WHERE name = "modulidodatki"),
                               "/releji",  "https://d1wqzb5bdbcre6.cloudfront.net/4bdf7140b86d242f8e335ddd3a4629fc0d7a5b2f4f4ea406752416b1a96f0d2c/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878546b4e72646d4a4d5a314131635555306231703266475a735833526c633352664d6c6447526b3156646b39774e6b4d34616d746a626e5656626d6c58626c4e5130305649386665365330")


INSERT INTO Subcategory values (random(), "stm32", "STM32", DATETIME(), DATETIME(), "2949623238137507330", "/stm32", "https://www.3dsvet.eu/wp-content/uploads/2023/04/STM32F103R8T6.jpg")

INSERT INTO Subcategory values (random(), "raspberrypi4", "Raspberry PI 4", DATETIME(), DATETIME(), (select id from Category where name = "raspberrypi"), "/raspberrypi4", "https://d1wqzb5bdbcre6.cloudfront.net/ad579628a805ac3b84310857db1d9e714e7375b3bf3cc9f631d41838d015fa70/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878546b4e72646d4a4d5a314131635555306231703266475a735833526c6333526653334a5551306f3062575a56516e687765474e7653315a3556326875555546313030705359385547366c")

INSERT INTO Product values (random(), "Raspberry PI 4 4GB", datetime(), DATETIME(), (select id from Category where name = "raspberry"),(select id from Subcategory where name = "raspbberrypi4"),60, "price_1NFNJkLgP5qE4oZvWf7NIg04", "Raspberry PI 4 Računalnik",10, "https://d1wqzb5bdbcre6.cloudfront.net/ad579628a805ac3b84310857db1d9e714e7375b3bf3cc9f631d41838d015fa70/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878546b4e72646d4a4d5a314131635555306231703266475a735833526c6333526653334a5551306f3062575a56516e687765474e7653315a3556326875555546313030705359385547366c")


INSERT INTO Product values (random(), "Relejni modul 2CH 5V LOW", DATETIME(), DATETIME(),(SELECT id FROM Category WHERE name = 'modulidodatki'),(SELECT id from Subcategory WHERE name = "releji"),8, "price_1ND6eULgP5qE4oZvDBVwMZp1", "Relejni modul 2CH 5V LOW", 10, "https://d1wqzb5bdbcre6.cloudfront.net/4bdf7140b86d242f8e335ddd3a4629fc0d7a5b2f4f4ea406752416b1a96f0d2c/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878546b4e72646d4a4d5a314131635555306231703266475a735833526c633352664d6c6447526b3156646b39774e6b4d34616d746a626e5656626d6c58626c4e5130305649386665365330")



INSERT INTO Product values (random(), "Arduino Uno", DATETIME(), DATETIME(),(SELECT id FROM Category WHERE name = 'arduino'),(SELECT id from Subcategory WHERE name = "uno"),8, "price_1NCkzxLgP5qE4oZvinjQKKjL", "ASINDASIODSAIODASNPDANSPIDNAISOP", 10, "https://si.farnell.com/productimages/standard/en_GB/2075382-40.jpg")

INSERT INTO Product values (random(), "Arduino Nano", DATETIME(), DATETIME(),(SELECT id FROM Category WHERE name = 'arduino'),(SELECT id from Subcategory WHERE name = "nano"),8,"price_1NCkzxLgP5qE4oZvinjQKKjL", "ASINDASIODSAIODASNPDANSPIDNAISOP", 10, "https://asset.conrad.com/media10/isa/160267/c1/-/sl/1172623_BB_00_FB/image.jpg?x=400&y=400")