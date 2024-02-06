const mongoose = require('mongoose')
const classSchema = require('../../model/classModel/userClass')
const school = require('../../model/schoolModel/userSchool');
const slugify = require('slugify');



const classCreate = async (req, res) => {

  try {
    const { Name, schooId, } = req.body
    const schoolValid = await school.findOne({ $and: [{ '_id': schooId }, { "isActive": true }] });

    const slug = slugify(Name, { lower: true })

    const Slug = await classSchema.findOne({ 'slug': slug });

    if (Slug) {
      return res.status(400).json({ message: 'slug is already created' })
    }


    if (!schoolValid) {
      return res.json({
        message: "school dont exists"
      });

    }
    else {
      const existsClass = await classSchema.findOne({ "Name": Name })


      if (existsClass) {
        return res.json({
          message: "class already Exist"
        });
      }
      else {

        const newClass = new classSchema({
          Name: Name,
          schooId: schooId,
          slug

        });

        // Save the new section
        await newClass.save();
        return res.status(200).json({
          message: 'Section added successfully', newClass
        });

      }
    }

  }
  catch (error) {
    console.log(error)
    return res.json({ message: "error", error })

  }
}

const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, schoolId, isActive, slug } = req.body

    const existingclass = await classSchema.findById({ '_id': classId })
    if (!existingclass) {
      return res.status(404).json({
        success: false,
        message: 'Class with provided Id does not found'
      })
    }
    if (slug) {
      const checkClass = await classSchema.findOne({ 'slug': slug, '_id': { $ne: classId } });

      return res.status(404).json({
        success: false,
        message: 'Slug already is in use',
        checkClass
      });
    }
    //Update the Details of Class
    const updatedClass = await classSchema.findByIdAndUpdate(classId, req.body, {
      new: true
    });

    return res.status(200).json({
      success: true,
      messae: "Class is updated successfully",
      updatedClass
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};



const getAllclass = async (req, res) => {
  try {

    // Retrieve all posts
    const posts = await classSchema.find();

    res.status(200).json({
      success: true,
      message: 'All Class Retrieved Successfully',
      posts
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


const getALLclassdata = async (req, res) => {
  try {
    const schoolId = req.params.id
    const schoolvalid = await school.findById({ "_id": schoolId });
    if (!schoolvalid) {
      return res.status(404).json({
        status: false,
        message: "school not found"
      })
    }
    const data = await classSchema.aggregate([

      {
        '$count': 'number of in class'

      },

    ]);

    return res.status(200).json({
      status: true,
      data,
    });

  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error'
    });
  }
}


// const deleteClass = async (req, res) => {
//   const schoolId = req.params.id; // Accessing the id parameter correctly

//   try {
//     const schooled = await school.findById(schoolId); // Finding the school by its id

//     if (!schooled) {
//       return res.status(404).json({ message: 'School not found' });
//     }

//     // Mark the school as inactive (soft delete)
//     schooled.isActive = false;
//     await schooled.save(); // Saving the updated school

//     res.json({
//       message: 'School deleted successfully'
//     });
//   }
//   catch (error) {

//     return res.status(500).json({
//       status: false,
//       message: 'Internal Server Error'
//     });
//   }
// }


// const deleteSchool = async (req, res) => {
//   try {  
//     const schoolId = req.params.id
//     const validSchool = await schoolSchema.findById({ '_id': schoolId })
//     if (validSchool) {
//       req.body.isActive = false
//       req.body.isDeleted = true
//       validSchool.set(req.body)
//       const save = await validSchool.save()
//       const linkedClass = classSchema.find({'schoolId': schoolId})
//      if(linkedClass){

//       const delClass = await schoolSchema.aggregate([
//         {
//           '$match': {
//             '_id': schoolId
//           }
//         },
//         {
//           '$lookup': {
//             'from': 'classes', 
//             'localField': '_id', 
//             'foreignField': 'schoolId', 
//             'as': 'classes'
//           }
//         },
//         {
//           '$lookup': {
//             'from': 'sections', 
//             'localField': '_id', 
//             'foreignField': 'classId', 
//             'as': 'sections'
//           }
//         },
//       ])
      
//       return res.status(200).json({ message: 'school and classes deleted successfully', delClass})

//      }else{
//       return res.status(200).json({ message: 'school deleted successfully and has no classes linked'})
//     }
//     } else {
//       return res.status(400).json({ message: 'school does not exists' })
//     }
//   } catch (error) {
//     return res.status(500).json({ message: 'error while deleting school' })
//   }
// }



module.exports = {
  classCreate,
  updateClass,
  getAllclass,
  getALLclassdata,
 

};


