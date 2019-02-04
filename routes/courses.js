const express = require('express');
const router = express.Router();
const { Course, validateName } = require('../models/course');

// get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort('name');
    res.send(courses);
  } catch (err) {
    console.log(err.message);
  }
});

// get a given course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');
    res.send(course);
  } catch (err) {
    console.log(err.message);
  }
});

// add a new course
router.post('/', async (req, res) => {
  // validate request
  const { error } = validateName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // craete new course object
  const course = new Course({
    name: req.body.name
  });

  //save
  try {
    const result = await course.save();
  } catch (err) {
    console.log(err);
  }
  res.send(course);
});

// update course
router.put('/:id', async (req, res) => {
  // validate sent course name
  const { error } = validateName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // find course and error if not found
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name });
  } catch (err) {
    console.log(err.message);
  }
  if (!course) return res.status(404).send('Course not found');

  // update course name
  res.send(course);
});

// delete a course
router.delete('/:id', async (req, res) => {
  // find course and error if not found
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  res.send(course);
});

module.exports = router;
