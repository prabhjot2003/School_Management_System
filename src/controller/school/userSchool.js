const school = require('../../model/schoolModel/userSchool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentSchema = require('../../model/studentModel/userStudent');
const classSchema = require('../../model/classModel/userClass')
const { createUserSchema, loginUserSchema } = require("../../validation/userValidation");




// const createSchool = async (req, res) => {
//     try {
//         const { error } = createUserSchema.validate(req.body);

//         if (error) {
//             console.log(error.message);
//             return res.status(400).json({
//                 error: error.details.map((err) => err.message.replace(/"/g, '')),
//             });
//         }
//         const { email } = req.body
//         const userExists = await school.findOne({ $and: [{ 'email': email }, { "isActive": true }] });

 
//         if (userExists) {
//             return res.status(400).json({
//                 status: false,
//                 error: "Email should be unique",
//             });
//         }
 
//         const salt = await bcrypt.genSalt(10);
//         const passwordHash = await bcrypt.hash(req.body.password, salt);
//         req.body.password = passwordHash
//         const image = req.file.path
//         req.body.image = image
//         // Explicitly define the properties for better readability
//         const schoolData = new school(
//             req.body
//         );



        
//         const savedSchool = await schoolData.save();

//         res.status(200).json({
//             status: true,
//             data: savedSchool,
//             message: "School created successfully",
//         });
//     } catch (err) {
//         console.error("Error creating School:", err);
//         res.status(500).json({
//             status: false,
//             error: "Internal server error",
//         });
//     }
// };


const createSchool = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);

        if (error) {
            console.log(error.message);
            return res.status(400).json({
                status: false,
                error: error.details.map((err) => err.message.replace(/"/g, '')),
            });
        }

        const { email, password } = req.body;
        const userExists = await school.findOne({ email, isActive: true });

        if (userExists) {
            return res.status(400).json({
                status: false,
                error: "Email should be unique",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Avoid modifying request body directly
        const schoolData = new school({
            ...req.body,
            password: passwordHash,
            image: req.file.path // Handle if req.file is not present
        });

        const savedSchool = await schoolData.save();

        res.status(200).json({
            status: true,
            data: savedSchool,
            message: "School created successfully",
        });
    } catch (err) {
        console.error("Error creating School:", err);
        res.status(500).json({
            status: false,
            error: "Internal server error",
        });
    }
};









const loginSchool = async (req, res) => {
    const { error } = loginUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((err) => err.message.replace(/"/g, ''))
        });
    }

    const { email, password } = req.body;

    try {
        const user = await school.findOne({ email: email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            const token = jwt.sign({ user_id: user?._id, email }, process.env.TOKEN_KEY, { expiresIn: '6h' }) //role



            return res.status(200).json({
                data: { user },
                status: true,
                data: { user, token },
                message: "Login successful",
            })







        } else {
            return res.status(404).json({
                status: false,
                error: "User not found",
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            status: false,
            error: "Internal server error",
        });
    }
};


const updateSchool = async (req, res) => {
    try {
        const updateSchoolId = req.params.id;
        const { name, address, email, password, contact, image, isActive } = req.body;

        const schoolExists = await school.findById(updateSchoolId);

        if (!schoolExists) {
            return res.status(404).json({
                success: false,
                message: 'School not found',
                error: 'School with the provided ID does not exist'
            });
        }

        const schoolWithEmail = await school.findOne({ email, _id: { $ne: updateSchoolId } });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        req.body.password = passwordHash

        //&& schoolWithEmail._id.toString() !== updateSchoolId
        if (schoolWithEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered with another school',
            });
        }

        // Save the updated schoolss
        const updatedSchool = await school.findByIdAndUpdate(updateSchoolId, req.body);

        res.status(200).json({
            success: true,
            message: 'School updated successfully',
            updatedSchool
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


const getAllschool = async (req, res) => {
    try {

        // Retrieve all posts
        const schooldata = await school.find();

        res.status(200).json({
            success: true,
            message: 'All School Retrieved Successfully',
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


// const deleteSchool = async (req, res) => {
//     const schoolId = req.params.id; // Accessing the id parameter correctly

//     try {
//         const schooled = await school.findById(schoolId); // Finding the school by its id

//         if (!schooled) {
//             return res.status(404).json({ message: 'School not found' });
//         }

//         // Mark the school as inactive (soft delete)
//         schooled.isActive = false;
//         schooled.isdelete = true;
//         await schooled.save(); // Saving the updated school

        

//         res.json({
//             message: 'School deleted successfully'
//         });
//     }
//     catch (error) {
//         console.log("error:", error);
//         return res.status(500).json({
//             status: false,
//             message: 'Internal Server Error'
//         });
//     }
// }




const deleteSchool = async (req, res) => {
    try {  
      const schoolId = req.params.id
      const validSchool = await school.findById({ '_id': schoolId })
      if (validSchool) {
        req.body.isActive = false
        req.body.isDeleted = true
        validSchool.set(req.body)
        const save = await validSchool.save()
        const linkedClass = classSchema.find({'schoolId': schoolId})
       if(linkedClass){
  
        const delClass = await school.aggregate([
          {
            '$match': {
              '_id': schoolId
            }
          },
          {
            '$lookup': {
              'from': 'classes', 
              'localField': '_id', 
              'foreignField': 'schooId', 
              'as': 'classes'
            }
          },
          {
            '$lookup': {
              'from': 'sections', 
              'localField': '_id', 
              'foreignField': 'classId', 
              'as': 'sections'
            }
          },
        ])
        
        return res.status(200).json({ message: 'school and classes deleted successfully', delClass})
  
       }else{
        return res.status(200).json({ message: 'school deleted successfully and has no classes linked'})
      }
      } else {
        return res.status(400).json({ message: 'school does not exists' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'error while deleting school' })
    }
  }
  












module.exports = {
    createSchool,
    loginSchool,
    updateSchool,
    getAllschool,
    deleteSchool

}