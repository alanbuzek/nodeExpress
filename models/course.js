const Joi = require('joi');
const mongoose = require('mongoose');

// schema for the course object
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});
// validate course name, using joi library
const validateName = body => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(body, schema);
};

// create Course class mased on the schema
const Course = mongoose.model('Course', courseSchema);

exports.validateName = validateName;
exports.Course = Course;
