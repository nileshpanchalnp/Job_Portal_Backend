const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Required for serving static files

const User_router = require('./src/Routes/User');
const Company_router = require('./src/Routes/Company');
const Application_router = require('./src/Routes/Candidate');
const Bookmark_Router = require("./src/Routes/Bookmark")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Static file serving for resumes
app.use('/uploads/resumes', express.static(path.join(__dirname, 'src/uploads/resumes')));

// ✅ API Routes
app.use('/User', User_router);
app.use('/company', Company_router);
app.use('/candidate', Application_router);
app.use('/Bookmark', Bookmark_Router)

// ✅ Server & MongoDB connection
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URl)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

  console.log(`Server is running on port ${process.env.PORT}`);
});
