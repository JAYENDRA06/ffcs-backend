const router = require("express").Router();

const {
  Faculty,
  Timings,
  Slot,
  AllowedSlots,
  Course,
  CourseFaculty,
  RegisteredCourse,
  Student,
  sequelize,
} = require("../models/index"); // Import the models from the file where they were defined

// Create the tables in the database
(async () => {
  await sequelize.sync();
})();

router.post("/createSlot", async (req, res) => {
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
});

router.post("/createFaculty", async (req, res) => {
  const { id, name } = req.body;
  try {
    const exists = await Faculty.findOne({ where: { id } });
    if (exists) res.status(409).json({ success: false, err: "Already exists" });
    const faculty1 = await Faculty.create({ id, name });
    res.status(200).json({ success: true, data: { id, name } });
  } catch {
    res.status(404).json({ success: false });
  }
});

router.post("/createCourse", async (req, res) => {
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
});

router.post("/createStudent", async (req, res) => {
  try {
    const { id, name } = req.body;

    const student = await Student.create({ id, name });

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
});

module.exports = router;
