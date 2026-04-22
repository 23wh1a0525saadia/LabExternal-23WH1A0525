const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Note = require('./models/Note');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = 5004;
const MONGO_URI = 'mongodb://127.0.0.1:27017/quicknotes';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api/notes', notesRouter);

async function seedSampleNotes() {
  try {
    const existingCount = await Note.countDocuments();
    if (existingCount > 0) {
      console.log(`Skipping seed — ${existingCount} note(s) already exist.`);
      return;
    }

    const sampleNotes = [
      {
        title: 'Welcome to QuickNotes Pro',
        content: 'This is your first sample note. Feel free to explore the app!',
        category: 'General',
      },
      {
        title: 'Shopping List',
        content: 'Milk, Bread, Eggs, Coffee, and a bar of dark chocolate.',
        category: 'Personal',
      },
      {
        title: 'MERN Lab Exam',
        content: 'Remember to implement POST, PUT, and DELETE APIs during the lab.',
        category: 'Work',
      },
    ];

    const inserted = await Note.insertMany(sampleNotes);
    console.log(`Seeded ${inserted.length} sample notes into MongoDB.`);
  } catch (err) {
    console.error('Error seeding sample notes:', err.message);
  }
}

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB at', MONGO_URI);

    await seedSampleNotes();

    app.listen(PORT, () => {
      console.log(`QuickNotes Pro server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
