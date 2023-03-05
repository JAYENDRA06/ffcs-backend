const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/pool');

// Define the Faculty model
const Faculty = sequelize.define('Faculty', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the Timings model
const Timings = sequelize.define('Timings', {
  day: {
    type: DataTypes.ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'),
    allowNull: false,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define the Slot model
const Slot = sequelize.define('Slot', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});

// Define the AllowedSlots model
const AllowedSlots = sequelize.define('AllowedSlots', {});

// Define the Course model
const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_type: {
    type: DataTypes.ENUM('THEORY', 'LAB'),
    allowNull: false,
  },
});

// Define the CourseFaculty model
const CourseFaculty = sequelize.define('CourseFaculty', {});

// Define the RegisteredCourse model
const RegisteredCourse = sequelize.define('RegisteredCourse', {});

// Define the RegisteredCourse model
const RegisteredCourseSlots = sequelize.define('RegisteredCourseSlots', {});

// Define the Student model
const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//define admin model
const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the relationships between the models
Faculty.belongsToMany(Course, { through: CourseFaculty });
Course.belongsToMany(Faculty, { through: CourseFaculty });

Course.belongsToMany(Slot, { through: AllowedSlots });
Slot.belongsToMany(Course, { through: AllowedSlots });

Slot.belongsToMany(Timings, { through: 'SlotTimings' });
Timings.belongsToMany(Slot, { through: 'SlotTimings' });

Course.hasMany(RegisteredCourse);
RegisteredCourse.belongsTo(Course);

Student.hasMany(RegisteredCourse);
RegisteredCourse.belongsTo(Student);

Faculty.hasMany(RegisteredCourse);
RegisteredCourse.belongsTo(Faculty);

RegisteredCourse.belongsToMany(Slot, { through: 'RegisteredCourseSlots' });
Slot.belongsToMany(RegisteredCourse, { through: 'RegisteredCourseSlots' });


module.exports = {
  Faculty,
  Timings,
  Slot,
  AllowedSlots,
  Course,
  CourseFaculty,
  RegisteredCourse,
  RegisteredCourseSlots,
  Student,
  Admin,
  sequelize,
};
