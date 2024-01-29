const classSchema = require('../../model/classModel/userClass')
const sectionSchema = require('../../model/sectionModel/userSection');
const school = require('../../model/schoolModel/userSchool');
const StudentSchema = require('../../model/studentModel/userStudent');
const messages = require("../../utils/messages")


const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, age, dateOfBirth, email, phoneNo, fatherName, motherName, gender, fatherOccupation, motherOccupation, classId, sectionId, schooId } = req.body;


        const classValid = await classSchema.findOne({ '_id': classId });
        if (!classValid) {
            return res.json({
                message: messages.classNotFound
            });
        }


        const schoolValid = await school.findOne({ '_id': schooId });
        if (!schoolValid) {
            return res.json({
                message: "School doesn't exist"
            });
        }


        const sectionValid = await sectionSchema.findOne({ '_id': sectionId });
        if (!sectionValid) {
            return res.json({
                message: "Section doesn't exist"
            });
        }



        const newStudent = new StudentSchema({
            firstName,
            lastName,
            age,
            dateOfBirth,
            email,
            phoneNo,
            fatherName,
            motherName,
            gender,
            fatherOccupation,
            motherOccupation,
            classId,
            sectionId,
            schooId
        });

        // Save the new student
        await newStudent.save();
        return res.status(200).json({
            message: 'Student added successfully',
            newStudent
        });
    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const updateStudent = async (req, res) => {
    try {
      const updateStudentId = req.params.id;
    
  
      // Check if the post exists
      const studentExits = await StudentSchema.findById(updateStudentId);
  
      if (!studentExits) {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
          error: 'Student with the provided ID does not exist'
        });
      }
  
      // Update post data
    //   classExits.Name = req.body.Name;

    studentExits.Name = req.body.Name,
    studentExits.firstName = req.body.firstName,
    studentExits.lastName = req.body.lastName,
    studentExits.age = req.body.age,
    studentExits.dateOfBirth = req.body.dateOfBirth,
    studentExits.email = req.body.email,
    studentExits.phoneNo = req.body.phoneNo,
    studentExits.gender = req.body.gender,
    studentExits.fatherOccupation = req.body.fatherOccupation,
    studentExits.motherOccupation = req.body.motherOccupation,
    studentExits.classId = req.body.classId,
    studentExits.sectionId = req.body.sectionId,
    studentExits.schooId =req.body.schooId
    
    
  
      // Save the updated post
      const updatedPost = await studentExits.save();
  
      res.status(200).json({
        success: true,
        message: 'Student updated successfully',
       
      });
    } catch (error) {
      console.error('Error updating Student:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message
      });
    }
  };


  const getAllstudent = async (req, res) => {
    try {
  
      // Retrieve all posts
      const schooldata = await StudentSchema.find();
  
      res.status(200).json({
        success: true,
        message: 'All Student Retrieved Successfully',
        schooldata
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message
      });
    }
  };




module.exports = {
    createStudent,
    updateStudent,
    getAllstudent 
}




