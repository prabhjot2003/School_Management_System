const mongoose = require ('mongoose');
const schemaLibary = require ('../../model/libaryModel/userLibary');
const school = require('../../model/schoolModel/userSchool');

const libaryCreate = async (req, res) => {
    try {
      const { schooId, contact, email,} = req.body;
      
  
      // Check if the provided classId exists
      const schoolValid = await school.findOne({ '_id': schooId });
      if (!schoolValid) {
        return res.json({
          message: "School doesn't exist"
        });
      }
  
      // Check if the section with the given name already exists
      const existsLibary = await schemaLibary.findOne({"email" : email});
      if (existsLibary) {
        return res.json({
          message: "Libary already exists"
        });
      }
  
      // Create a new section
      const newLibary = new schemaLibary({
        ...req.body
  
      });
  
      // Save the new section
      await newLibary.save();
      return res.status(200).json({
        message: 'Libary successfully', newLibary
      });
    }
  
    catch (error) {
  
      return res.status(500).json({ 
      message: "Internal server error"
      });
    }
  }

  const  getlibary = async(req,res)=>{
    try {
        const schooId = req.params.id;
    
        // Find school by ID
        const schoolvaild = await school.findById(schooId );
    
    if(schoolvaild) {
        const library = await schemaLibary.find({schooId })
        
        return res.status(200).json({ 
          success: true, 
          message: 'library retrieved successfully',
          library
        }); 
          
      }else{
        return res.status(404).json({ 
          success: false, 
          message: 'library not found', 
          error: 'School with the provided ID does not exist' });
        } 
    
    } catch (error) {
        console.error('Error getting School by ID:', error);
        res.status(500).json({
           success: false, 
           message: 'Internal Server Error', 
           error: error.message 
          });
      }
}

module.exports = {
 libaryCreate,
 getlibary

}