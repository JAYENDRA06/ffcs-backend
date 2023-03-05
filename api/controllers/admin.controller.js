const {
  Faculty,
  Timings,
  Slot,
  AllowedSlots,
  Course,
  CourseFaculty,
  RegisteredCourse,
  Student,
  Admin,
} = require("../models/index"); // Import the models

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

require("dotenv").config();

// // post route functions // //

// creating new faculty //
const createFaculty = async (req, res) => {
  const { id, name } = req.body;
  try {
    const exists = await Faculty.findOne({ where: { id } });
    if (exists) res.status(409).json({ success: false, err: "Already exists" });
    const faculty1 = await Faculty.create({ id, name });
    res.status(200).json({ success: true, data: { id, name } });
  } catch {
    res.status(404).json({ success: false });
  }
};

// create new course //
const createCourse = async (req, res) => {
  try {
    const { id, name, slot_ids, faculty_ids, course_type } = req.body;

    // Find slots and faculties by their IDs
    const slots = await Slot.findAll({ where: { id: slot_ids } });
    const faculties = await Faculty.findAll({ where: { id: faculty_ids } });

    // Create new course
    const course = await Course.create({ id, name, course_type });

    // Add relationships between course, slots, and faculties
    await course.setSlots(slots);
    await course.setFaculties(faculties);

    // Get course data with related models
    const courseData = await Course.findOne({
      where: { id },
      include: [
        {
          model: Faculty,
          attributes: ["id", "name"],
        },
        {
          model: Slot,
          attributes: ["id"],
          include: [
            {
              model: Timings,
              attributes: ["day", "start", "end"],
            },
          ],
        },
      ],
    });

    // Construct response body
    const responseData = {
      id: courseData.id,
      name: courseData.name,
      faculties: courseData.Faculties.map((faculty) => ({
        id: faculty.id,
        name: faculty.name,
      })),
      course_type: courseData.course_type,
      allowed_slots: courseData.Slots.map((slot) => ({
        id: slot.id,
        timings: slot.Timings.map((timing) => ({
          day: timing.day,
          start: timing.start,
          end: timing.end,
        })),
      })),
    };

    // Return response
    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, error: "Failed to create course" });
  }
};

// create new student //
const createStudent = async (req, res) => {
  try {
    const { id, name, password } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    // console.log(hash);

    const student = await Student.create({ id, name, password: hash });

    res.status(201).json({
      success: true,
      data: {
        id: student.id,
        name: student.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// create new slot //
const createSlot = async (req, res) => {
  const { id, timings } = req.body;
  try {
    const slot1 = await Slot.create({ id });
    timings.forEach(async (timing) => {
      const timings1 = await Timings.create({
        day: timing.day,
        start: new Date(timing.start),
        end: new Date(timing.end),
      });
      await slot1.addTiming(timings1);
    });
  } catch {
    res.status(404).json({ success: false });
  }

  res.json({ success: true, data: { id, timings } });
};

// create new admin for testing only //
const createAdmin = async (req, res) => {
  const { id, password } = req.body;

  const exists = await Admin.findOne({ where: { id } });
  if (exists) res.status(409).json({ success: false, err: "Already exists" });

  if(password.length === 0) res.status(400).json({ success: false, err: "Password required" });

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const admin = await Admin.create({ id, password: hash });

    res.status(201).json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const loginAdmin = async (req, res) => {
  const { id, password } = req.body;
  const admin = await Admin.findOne({ id });

  if (!admin) {
    res.status(404).json({ success: false, err: "Admin not found" });
  }

  const passwordMatches = await bcrypt.compare(password, admin.password);

  if (passwordMatches) {
    const accessToken = jwt.sign(id, process.env.ADMIN_SECRET);
    res.status(200).json({ success: true, id, accessToken });
  } else {
    res.status(401).json({ success: false, err: "Password invalid" });
  }
};

module.exports = {
  createFaculty,
  createCourse,
  createStudent,
  createSlot,
  createAdmin,
  loginAdmin,
};
