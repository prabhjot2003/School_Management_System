const mongoose = require('mongoose')
const classSchema = require('../../model/classModel/userClass')
const school = require('../../model/schoolModel/userSchool');
const slugify = require('slugify');



const classCreate = async (req, res) => {

  try {
    const { Name, schooId, } = req.body
    const schoolValid = await school.findOne({ '_id': schooId });

    const slug = slugify(Name, {lower: true})

    const Slug = await classSchema.findOne({'slug': slug});

    if (Slug){
      return res.status(400).json({message: 'slug is already created'})
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
    return res.json({ message: "error", error})

  }
}




const updateClass = async (req, res) => {
  try {
    const updateClassId = req.params.id;
  

    // Check if the post exists
    const classExits = await classSchema.findById(updateClassId);

    if (!classExits) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
        error: 'Class with the provided ID does not exist'
      });
    }

    // Update post data
    classExits.Name = req.body.Name;

    // Save the updated post
    const updatedPost = await classExits.save();

    res.status(200).json({
      success: true,
      message: 'Class updated successfully',
     
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};


// getAllclass Api

const getAllclass = async (req, res) => {
  try {
    
    // Retrieve all posts
    const posts = await classSchema.find();

    res.status(200).json({ 
      success: true, 
      message: 'All Class Retrieved Successfully', 
      posts });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false,
       message: 'Internal Server Error', 
       error: error.message });
  }
};



//   const  getAllclass= async(req, res) => {
//   try {
//       const allUser = await classSchema.find({});
//       res.status(200).json(allUser);
//   } 
//   catch (error) 
//   {
//       res.status(400).json({ message: error.message });
//   }
// }

const   getALLclassdata  = async (req, res) => {
  try {
    const schoolId = req.params.id
    const schoolvalid = await school.findById({"_id" : schoolId});
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








module.exports = {
  classCreate,
  updateClass,
  getAllclass,
  getALLclassdata

};


