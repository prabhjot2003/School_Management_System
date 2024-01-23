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


module.exports = {
    createStudent,
}




