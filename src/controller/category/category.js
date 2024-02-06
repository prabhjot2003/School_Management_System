const mongoose = require('mongoose');
const schemaCategory = require('../../model/categoryModel/usercategory');
const schemaLibary = require ('../../model/libaryModel/userLibary');


const categoryCreate = async (req, res) => {
    try {
      const { libaryId, name} = req.body;
      
  
      // Check if the provided classId exists
      const libaryValid = await schemaLibary.findOne({ '_id': libaryId });
      if (!libaryValid) {
        return res.json({
          message: "Libary doesn't exist"
        });
      }
  
      // Check if the section with the given name already exists
      const existsCategory = await schemaCategory.findOne({"name" : name});
      if (existsCategory) {
        return res.json({
          message: "Category already exists"
        });
      }
  
      // Create a new section
      const newCategory = new schemaCategory({
        ...req.body
  
      });
  
      // Save the new section
      await newCategory.save();
      return res.status(200).json({
        message: 'Category successfully', newCategory
      });
    }
  
    catch (error) {
  
      return res.status(500).json({ 
      message: "Internal server error"
      });
    }
  }



module.exports = {
    categoryCreate
}