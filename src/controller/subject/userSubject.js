const subjectSchema = require('../../model/subjectModel/userSubject');
const slugify = require('slugify');



const createSubject = async (req, res) => {
    try {
        const { name } = req.body;

        const slug = slugify(name, { lower: true })

        const Slug = await subjectSchema.findOne({ 'slug': slug });

        if (Slug) {
            return res.status(400).json({ message: 'slug is already created' })
        }

        req.body.slug = slug
        
        // Create a new section
        const newSection = new subjectSchema({
            ...req.body
        });



        // Save the new section
        await newSection.save();
        return res.status(200).json({
        message: 'Subject  added successfully', newSection
        });
    }

    catch (error) {

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    createSubject,
}