const admin = require('firebase-admin');
const db = admin.firestore();
const { body, validationResult } = require('express-validator');

// Fetch all tasks with optional pagination and filtering
exports.getAllTasks = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;  // Number of tasks per page
  const page = parseInt(req.query.page) || 1;    // Current page
  const titleFilter = req.query.title ? req.query.title : ''; // Title filter

  try {
    let query = db.collection('tasks');

    // Apply title filtering if a title is provided
    if (titleFilter) {
      query = query.where('title', '>=', titleFilter).where('title', '<=', titleFilter + '\uf8ff'); // Filter by title
    }

    const tasksSnapshot = await query
      .orderBy('createdAt') // Ensure there's an order for pagination
      .offset((page - 1) * limit) // Skip tasks based on page
      .limit(limit) // Limit the number of tasks returned
      .get();

    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ success: false, error: 'Error fetching tasks' });
  }
};

// Fetch a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskDoc = await db.collection('tasks').doc(req.params.id).get();
    if (!taskDoc.exists) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: { id: taskDoc.id, ...taskDoc.data() } });
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ success: false, error: 'Error fetching task' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  await body('title').notEmpty().withMessage('Title is required').run(req);
  await body('description').optional().isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, description } = req.body;
  try {
    const newTask = await db.collection('tasks').add({
      title,
      description,
      completed: false,
      createdAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: newTask.id } });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ success: false, error: 'Error creating task' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  await body('title').optional().isString().run(req);
  await body('description').optional().isString().run(req);
  await body('completed').optional().isBoolean().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const taskRef = db.collection('tasks').doc(id);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await taskRef.update({ title, description, completed });
    res.status(200).json({ success: true, message: 'Task updated successfully' });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ success: false, error: 'Error updating task' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskRef = db.collection('tasks').doc(id);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await taskRef.delete();
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ success: false, error: 'Error deleting task' });
  }
};
