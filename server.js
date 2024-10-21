const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Firestore database reference
const db = admin.firestore();

// Routes
app.use('/tasks', require('./routes/taskRoutes'));

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
