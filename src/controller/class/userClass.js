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














module.exports = {
  classCreate,
};


