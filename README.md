# requirement as per project this Dependencies 
"bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "joi": "^17.12.0",
    "jsonwebtoken": "^9.0.2",
    "kill-port": "^2.0.1",
    "mongoose": "^8.1.0",
    "nanoid": "^3.3.6",
    "nodemon": "^3.0.3"


# My Port Number 
8080


# Run commond for Projet 
Two types of Run the Project Commond
1. npm start .
2. npx nodemon .

# createSchool api hit the Url in Postman using this  Url and using the this field
POST : http://localhost:8080/school/Create
For Example : 

    "name": " ",
    "email": " ",
    "password":" ",
    "contact":" ",
    "image": " ",
    "establishedYear": " ",
    "address" : " ",
    "activeOn": " "


# logicSchool api hit the url in postman using this Url using the this field
POST : http://localhost:8080/school/Login
For Example : 

     "email": " " ,
    "password":" "


# createSection api hit  the url in postman using this Url using the this field
POST : http://localhost:8080/section/sectionCreate 
For Example : 

     "Name": "",
     "classId" : " ",
    "maxStudentcapacity":" "

# createClass api hit the Url in postman using this Url using the this field
POST : http://localhost:8080/class/classCreate
For Example : 

    "Name": " ",
    "schooId":" ",
    "grade" :" ",
    "activeOn":" "

# createStudent api hit the Url in postman using this Url using the this field
POST : http://localhost:8080/studentt/createStudent
For Exmaple

  "firstName":" ", 
    "lastName":" ",
    "age": " ",
    "dateOfbirth": " ",
    "email": " ",
    "phoneNo":" ",
    "fatherName":" ",
    "motherName": " ",
    "gender": "male",
    "fatherOccupation":" ",
    "motherOccupation": " ",
    "schooId": " ",
    "classId":" ",
    "sectionId":" " 


    




