const mongoose = require('mongoose')
const sectionSchema = require('../../model/sectionModel/userSection');
const classSchema = require('../../model/classModel/userClass');
const StudentSchema = require('../../model/studentModel/userStudent');
const slugify = require('slugify');


const SectionCreate = async (req, res) => {
  try {
    const { Name, classId, maxStudentCapacity } = req.body;

    const slug = slugify(Name, { lower: true })

    const Slug = await sectionSchema.findOne({ 'slug': slug });

    if (Slug) {
      return res.status(400).json({ message: 'slug is already created' })
    }



    // Check if the provided classId exists
    const classValid = await classSchema.findOne({ '_id': classId });
    if (!classValid) {
      return res.json({
        message: "Class doesn't exist"
      });
    }

    // Check if the section with the given name already exists
    const existsSection = await sectionSchema.findOne({ "Name": Name });
    if (existsSection) {
      return res.json({
        message: "Section already exists"
      });
    }

    // Create a new section
    const newSection = new sectionSchema({
      Name: Name,
      classId: classId,
      maxStudentCapacity: maxStudentCapacity,
      slug

    });

    // Save the new section
    await newSection.save();
    return res.status(200).json({
      message: 'Section added successfully', newSection
    });
  }

  catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
}


const updateSection = async (req, res) => {
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



const getAllsection = async (req, res) => {
  try {

    // Retrieve all posts
    const schooldata = await sectionSchema.find();

    res.status(200).json({
      success: true,
      message: 'All Section Retrieved Successfully',
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



const getStudentSecton = async (req, res) => {
  try {
    const sectionId = req.params.id
    const sectionvaild = await sectionSchema.findById({ "_id": sectionId });
    if (!sectionvaild) {
      return res.status(404).json({
        status: false,
        message: "Section not found"
      })
    }
    const data = await StudentSchema.aggregate([

      {
        '$count': 'number of '

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
  SectionCreate,
  updateSection,
  getAllsection,
  getStudentSecton

};


