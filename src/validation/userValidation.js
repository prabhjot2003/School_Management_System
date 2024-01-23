const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string().email().lowercase(),
  name: Joi.string().min(3).max(30),
  password: Joi.string().min(2).required(),
  address: Joi.string().min(2).required(),
  contact: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  image: Joi.string(),
  establishedYear: Joi.string(),
 isActive: Joi.boolean(),
});



const loginUserSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});





module.exports = {
  createUserSchema,
  loginUserSchema,

};