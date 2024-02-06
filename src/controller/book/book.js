const mongoose = require('mongoose');
const schemabook= require('../../model/bookModel/userBook');
const schemaLibary = require ('../../model/libaryModel/userLibary');
const schemaCategory = require('../../model/categoryModel/usercategory');
const slugify = require('slugify');


const bookCreate = async (req, res) => {
    try {
        const { libaryId, categoryId, author, isbn, title, isReturn } = req.body;

        const slug = slugify(title, { lower: true });

        const Slug = await schemabook.findOne({ 'slug': slug });

        if (Slug) {
            return res.status(400).json({ message: 'Slug is already created' });
        }

        // Check if the provided libaryId exists
        const libaryValid = await schemaLibary.findOne({ '_id': libaryId });
        if (!libaryValid) {
            return res.status(404).json({ message: "Library doesn't exist" });
        }

        // Check if the provided categoryId exists
        const categoryValid = await schemaCategory.findOne({ '_id': categoryId });
        if (!categoryValid) {
            return res.status(404).json({ message: "Category doesn't exist" });
        }

        req.body.slug = slug;

        // Create a new book
        const newBook = new schemabook({
            ...req.body
        });

        // Save the new book
        await newBook.save();
        return res.status(200).json({ message: 'Book successfully created', newBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const  getbook = async(req,res)=>{
    try {
        const categoryId = req.params.id;
    
        // Find school by ID
        const schoolvaild = await schemaCategory.findById(categoryId);
    
    if(schoolvaild) {
        const book = await schemabook.find({categoryId})
        
        return res.status(200).json({ 
          success: true, 
          message: 'library retrieved successfully',
          book
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



const  getOnlybookDetail = async(req,res)=>{
    try {
        const bookId = req.params.id;
    
        // Find school by ID
        const schoolvaild = await schemabook.findById({'_id':bookId});
       
    if(schoolvaild) {
        const bookdetailss = await schemabook.find({'_id': bookId})
        
        return res.status(200).json({ 
          success: true, 
          message: 'library retrieved successfully',
          bookdetailss
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
    bookCreate,
    getbook,
    getOnlybookDetail
}