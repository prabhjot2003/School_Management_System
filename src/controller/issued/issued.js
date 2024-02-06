const mongoose = require('mongoose');
const StudentSchema = require('../../model/studentModel/userStudent');
const schemabook = require('../../model/bookModel/userBook');
const schemaIsuued = require('../../model/issuedModel/userIssued');





const isuuedCreate = async (req, res) => {
  try {
    const { studentId, issueDate, returnDate, bookId, bookFee } = req.body;


    // Check if the provided classId exists
    const studentValid = await StudentSchema.findOne({ '_id': studentId });
    if (!studentValid) {
      return res.json({
        message: "Student doesn't exist"
      });
    }

    // Check if the section with the given name already exists
    const existsBook = await schemabook.findOne({ "_id": bookId });
    if (!existsBook) {
      return res.json({
        message: "Book already exists"
      });
    }

    const issueStudentBook = await schemaIsuued.find({"studentId": studentId}) 
    if(issueStudentBook.length<2){
    const newissuedBook = new schemaIsuued({
        ...req.body
    });
  
      // Save the new section
      await newissuedBook.save();
      return res.status(200).json({
        message: 'Category successfully', newissuedBook
      });
    
    

    }else{
  return res.status(400).json({
    message: "Only two book allowed"
  })
    }
  }

  catch (error) {

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = {
  isuuedCreate
}