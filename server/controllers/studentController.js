const Student = require('../models/StudentModel');

const addStudent = async (req, res) => {
  const { rollNo, name, className, email } = req.body;

  if (!rollNo || !name || !className || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const studentExists = await Student.findOne({ rollNo });

    if (studentExists) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    const student = await Student.create({ rollNo, name, className, email, attendance: [] });

    if (student) {
      res.status(201).json(student);
    } else {
      res.status(400).json({ message: 'Failed to create student' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (students.length > 0) {
      res.status(200).json(students);
    } else {
      res.status(404).json({ message: 'No students found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};

const markAttendance = async (req, res) => {
  const { id } = req.params;
  const { status, date } = req.body;

  if (!status || !date) {
    return res.status(400).json({ message: 'Status and date are required' });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!student.attendance) {
      student.attendance = [];
    }

    const formattedDate = new Date(date).toISOString().split('T')[0];

  
    const existingAttendance = student.attendance.find(
      (att) => att.date.toISOString().split('T')[0] === formattedDate
    );

    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      student.attendance.push({ date: formattedDate, status });
    }

    await student.save();

    res.status(200).json({ message: 'Attendance marked successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update attendance', error: error.message });
  }
};

const getAttendanceByDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  try {
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const students = await Student.find({});
    
    const records = students.map((student) => {
      let status = 'Not Marked';
      
      if (student.attendance && Array.isArray(student.attendance)) {
        const attendanceRecord = student.attendance.find(att => {
          if (att.date instanceof Date) {
            return att.date.toISOString().split('T')[0] === formattedDate;
          } else {
            const attDate = new Date(att.date).toISOString().split('T')[0];
            return attDate === formattedDate;
          }
        });
        
        if (attendanceRecord) {
          status = attendanceRecord.status;
        }
      }
      
      return {
        rollNo: student.rollNo,
        name: student.name,
        className: student.className,
        email: student.email,
        status: status,
        date: formattedDate 
      };
    });

    res.status(200).json(records);
  } catch (error) {
    console.error('Attendance fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch attendance', error: error.message });
  }
};


const searchStudents = async (req, res) => {
  const { name, date } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Search name is required' });
  }

  try {
    const students = await Student.find({
      name: { $regex: name, $options: 'i' }
    });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found with this name' });
    }

    const formattedStudents = students.map(student => {
      let status = 'Not Marked';
      let attendanceDate = null;
      
      if (date) {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const attendanceRecord = student.attendance?.find(
          att => att.date && att.date.toISOString().split('T')[0] === formattedDate
        );
        if (attendanceRecord) {
          status = attendanceRecord.status;
          attendanceDate = formattedDate;
        }
      } else if (student.attendance?.length > 0) {
        const latestAttendance = student.attendance[student.attendance.length - 1];
        status = latestAttendance.status;
        attendanceDate = latestAttendance.date instanceof Date 
          ? latestAttendance.date.toISOString().split('T')[0]
          : new Date(latestAttendance.date).toISOString().split('T')[0];
      }
    
      return {
        _id: student._id,
        rollNo: student.rollNo,
        name: student.name,
        className: student.className,
        email: student.email,
        status: status,
        date: attendanceDate 
      };
    });
    
    res.status(200).json(formattedStudents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search students', error: error.message });
  }
};

module.exports = {
  addStudent,
  getStudents,
  markAttendance,
  getAttendanceByDate,
  searchStudents,
};
