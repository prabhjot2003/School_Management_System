const mongoose = require('mongoose');
const teacherSchema = require('../../model/teacherModel/userTeacher');
const school = require('../../model/schoolModel/userSchool');
const subjectSchema = require('../../model/subjectModel/userSubject');
const linkingSchema = require('../../model/linkingModel/userLinking');
const threelinking = require('../../model/linkingClassateachersubject/threedata')
const classSchema = require('../../model/classModel/userClass')




const createTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, schoolId } = req.body; // Corrected typo: "schooId" to "schoolId"

    // Check if the provided schoolId exists
    const schoolValid = await school.findOne({ '_id': schoolId });

    if (!schoolValid) {
      return res.status(404).json({ message: "School doesn't exist" });
    }


    // Create a new teacher instance
    const newTeacher = new teacherSchema({
      ...req.body
    });

    // Save the new teacher
    await newTeacher.save();
    return res.status(200).json({
      message: 'Teacher added successfully',
      newTeacher
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};



const Linking = async (req, res) => {
  try {
    const { teacherId, subjectId, classId } = req.body;
    const teach = await teacherSchema.findById(teacherId);
    const sub = await subjectSchema.findById(subjectId);
 
    

    if (!teach || !sub ) {
      return res.Status(404).json({
        success: 'false',
        error: 'Teacher or Subject are not found'
      })
    }

    const Link = await linkingSchema.findOne({ 'subjectId': subjectId });
    if (Link) {
      return res.status(403).json({
        success: false,
        error: 'Subject is already linked to the Teacher',
      });
    }

    // create the new link 
    const newlink = new linkingSchema(req.body);
    await newlink.save();
    res.status(200).json({
      success: true,
      message: 'Subject linked to teacher successfully',

    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const getTeacherandSubject = async (req, res) => {
  try {
    const teachId = req.params.id;
    
   
    if (!teachId) {
      return res.status(404).json({
        status: false,
        message: "Teacher ID not provided"
      });
    }

    const data = await linkingSchema.aggregate([
      {
        $match: {
          'teacherId': teachId
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subjectDetails"
        }
      },
      {
        $unwind: "$subjectDetails"
      },
      {
        $project: { 
          
          teacherId: 1,
          subjectName: "$subjectDetails.name"
        }
      }
    ]);

    // if (!data || data.length === 0) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "Teacher or associated subjects not found"
    //   });
    // }

    return res.status(200).json({
      status: true,
      message: "Teacher Details",
      data
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error"
    });
  }
};



const getTeacherandSubjectAandCLass = async (req, res) => {
  try {
    const teachId = req.params.id;
   
    if (!teachId) {
      return res.status(404).json({
        status: false,
        message: "Teacher ID not provided"
      });
    }
 
    const data = await threelinking.aggregate([
     
      
      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subjectDetails"
        }
      },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDetails"
        }
      },
     
      {
        $project: { 
          
          teacherId: 1,
          subjectName: "$subjectDetails.name",
          className : "$classDetails.Name"
        }
      }
    ]);

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Teacher or associated subjects not found"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Teacher Details",
      data
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error"
    });
  }
};



const Linkingthree = async (req, res) => {
  try {
    const { teacherId, subjectId, classId } = req.body;
    const teachs = await teacherSchema.findById(teacherId);
    const subs = await subjectSchema.findById(subjectId);
    const classs = await classSchema.findById(classId);

    if (!teachs || !subs || !classs) {
      return res.status(404).json({
        success: false,
        error: 'Teacher, Subject, or Class not found'
      });
    }

    const Link = await threelinking.findOne({ 'subjectId': subjectId, 'classId': classId, 'teacherId': teacherId });
    if (Link) {
      return res.status(403).json({
        success: false,
        error: 'Subject is already linked to the Teacher',
      });
    }

    // create the new link 
    const newlink = new threelinking(req.body);
    await newlink.save();
    res.status(200).json({
      success: true,
      message: 'Subject linked to teacher successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




module.exports = {
  createTeacher,
  Linking,
  getTeacherandSubject,
  getTeacherandSubjectAandCLass,
  Linkingthree
 
}
