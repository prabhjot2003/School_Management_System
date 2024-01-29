const mongoose = require('mongoose')
const sectionSchema = require('../../model/sectionModel/userSection');
const classSchema = require('../../model/classModel/userClass');
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
    const updateSectionId = req.params.id;


    // Check if the post exists
    const sectionExits = await sectionSchema.findById(updateSectionId);

    if (!sectionExits) {
      return res.status(404).json({
        success: false,
        message: 'Section not found',
        error: 'Section with the provided ID does not exist'
      });
    }

    // Update post data
    //   classExits.Name = req.body.Name;

    sectionExits.Name = req.body.Name,
      sectionExits.classId = req.body.classId,
      sectionExits.slug = req.body.slug


    // Save the updated post
    const updatedPost = await sectionExits.save();

    res.status(200).json({
      success: true,
      message: 'Section updated successfully',

    });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};



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













module.exports = {
  SectionCreate,
  updateSection,
  getAllsection

};


