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
} = require("../models/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/pool");
const secret = process.env.USER_SECRET;

// // get route functions // //

// getting faculty based on faculty_id //

const getFaculty = async (req, res) => {
  const id = req.params.faculty_id;
  const faculty = await Faculty.findOne({ id });

  if (!faculty) {
    res.status(404).json({ success: false, err: "Student not found" });
  }

  res
    .status(200)
    .json({ success: true, data: { id: faculty.id, name: faculty.name } });
};

// get course using course id //

const getCourse = async (req, res) => {
  const courseId = req.params.course_id;

  try {
    const course = await Course.findOne({
      where: { id: courseId },
      include: [Slot, Faculty],
    });

    if (!course) {
      res.status(404).json({ success: false, err: "Course not found" });
    }

    const slotIds = course.Slots.map((slot) => slot.id);
    const facultyIds = course.Faculties.map((faculty) => faculty.id);

    const data = {
      id: course.id,
      name: course.name,
      slot_ids: slotIds,
      faculty_ids: facultyIds,
      course_type: course.course_type,
    };

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, err });
  }
};

// Gets the timetable for the currently authenticated student. Does not work without authentication //

const getTimetable = async (req, res) => {
  const studentId = req.userID;
  try {
    // Find the student in the database
    const student = await Student.findByPk(studentId);
  
    // Get the registered courses for the student
    const registeredCourses = await RegisteredCourse.findAll({
      where: { StudentId: studentId },
      include: [
        {
          model: Course,
          include: [
            {
              model: Faculty,
              attributes: ['id', 'name'],
            },
            {
              model: Slot,
              attributes: ['id'],
              include: [
                {
                  model: Timings,
                  attributes: ['day', 'start', 'end'],
                },
              ],
            },
          ],
          attributes: ['id', 'name', 'course_type'],
        },
        {
          model: Slot,
          attributes: ['id'],
          include: [
            {
              model: Timings,
              attributes: ['day', 'start', 'end'],
            },
          ],
        },
      ],
    });
    
    // Map the registered courses to the desired format
    const timetable = {
      id: student.id,
      name: student.name,
      registered_courses: registeredCourses.map((registeredCourse) => {
        const course = registeredCourse.Course;
        const faculties = course.Faculties.map((faculty) => ({
          id: faculty.id,
          name: faculty.name,
        }));
        const allowedSlots = course.Slots.map((slot) => ({
          id: slot.id,
          timings: slot.Timings.map((timing) => ({
            day: timing.day,
            start: timing.start.toISOString(),
            end: timing.end.toISOString(),
          })),
        }));
        const slots = registeredCourse.Slots.map((slot) => ({
          id: slot.id,
          timings: slot.Timings.map((timing) => ({
            day: timing.day,
            start: timing.start.toISOString(),
            end: timing.end.toISOString(),
          })),
        }));
        return {
          course: {
            id: course.id,
            name: course.name,
            faculties: faculties,
            course_type: course.course_type,
            allowed_slots: allowedSlots,
          },
          slots: slots,
        };
      }),
    };
    
    // Return the timetable as the response
    res.json({ success: true, data: timetable });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// // post route functions // //

const registerCourse = async (req, res) => {
  const { course_id, faculty_id, slot_ids } = req.body;
  const userID = req.userID;

  try {
    // Find the course and associated data
    const course = await Course.findOne({
      where: { id: course_id },
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

    // Find the faculties associated with the course
    const faculties = course.Faculties.map((faculty) => ({
      id: faculty.id,
      name: faculty.name,
    }));

    // Find the slots associated with the course
    const slots = course.Slots.map((slot) => ({
      id: slot.id,
      timings: slot.Timings.map((timing) => ({
        day: timing.day,
        start: timing.start,
        end: timing.end,
      })),
    }));

    // Create a new registered course
    const registeredCourse = await RegisteredCourse.create({
      CourseId: course.id,
      FacultyId: faculty_id,
      StudentId: userID,
    });

    // Add the selected slots to the registered course
    await Promise.all(
      slot_ids.map((slot_id) => registeredCourse.addSlot(slot_id))
    );

    // Get the registered courses associated with the student
    const registeredCourses = await RegisteredCourse.findAll({
      where: { StudentId: userID }, 
      include: [
        {
          model: Course,
          attributes: ["id", "name", "course_type"],
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

    const studentName = await Student.findOne({ userID });

    // Map the registered courses to the desired format
    const data = {
      id: userID, 
      name: studentName.name, 
      registered_courses: registeredCourses.map((registeredCourse) => {
        const course = registeredCourse.Course;
        return {
          course: {
            id: course.id,
            name: course.name,
            course_type: course.course_type,
            faculties: course.Faculties.map((faculty) => ({
              id: faculty.id,
              name: faculty.name,
            })),
            slots: course.Slots.map((slot) => ({
              id: slot.id,
              timings: slot.Timings.map((timing) => ({
                day: timing.day,
                start: timing.start,
                end: timing.end,
              })),
            })),
            registered_on: registeredCourse.createdAt,
          },
        };
      }),
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginStudent = async (req, res) => {
  const { id, password } = req.body;
  const student = await Student.findOne({ id });

  if (!student) {
    res.status(404).json({ success: false, err: "Student not found" });
  }

  const passwordMatches = await bcrypt.compare(password, student.password);

  if (passwordMatches) {
    const accessToken = jwt.sign(id, secret);
    res.status(200).json({ success: true, id, accessToken });
  } else {
    res.status(401).json({ success: false, err: "Password invalid" });
  }
};

module.exports = {
  getFaculty,
  getCourse,
  getTimetable,
  registerCourse,
  loginStudent,
};
