const school = require('../../model/schoolModel/userSchool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUserSchema, loginUserSchema } = require("../../validation/userValidation");




const createSchool = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);

        if (error) {
            console.log(error.message);
            return res.status(400).json({
                error: error.details.map((err) => err.message.replace(/"/g, '')),
            });
        }

        const userExists = await school.findOne({ email: req.body.email });
      

        if (userExists) {
            return res.status(400).json({
                status: false,
                error: "Email should be unique",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        // Explicitly define the properties for better readability
        const schoolData = new school({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: passwordHash,
            contact: req.body.contact,
            image: req.body.image,
            isActive: req.body.isActive,
        });

        const savedSchool = await schoolData.save();

        res.status(200).json({
            status: true,
            data: savedSchool,
            message: "School created successfully",
        });
    } catch (err) {
        console.error("Error creating School:", err);
        res.status(500).json({
            status: false,
            error: "Internal server error",
        });
    }
};


const loginSchool = async (req, res) => {
    const { error } = loginUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((err) => err.message.replace(/"/g, ''))
        });
    }

    const { email, password } = req.body;

    try {
        const user = await school.findOne({ email: email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
             const token = jwt.sign({ user_id: user?._id, email }, process.env.TOKEN_KEY, { expiresIn: '6h' }) //role
                


            return res.status(200).json({
                data: { user },
                status: true,
                data: { user, token },
                message: "Login successful",
            })


           




        } else {
            return res.status(404).json({
                status: false,
                error: "User not found",
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            status: false,
            error: "Internal server error",
        });
    }
}






module.exports = {
    createSchool,
    loginSchool,
};