const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const courseController = require('D:/SIT725/6.2D/Controller/courseController.js');
const CourseSelection = require('D:/SIT725/6.2D/Model/courseModel.js'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect('mongodb://localhost:27017/SIT725', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON payloads
app.use(express.static('public'));

// Routes
app.post('/submit', courseController.submitCourseForm);

app.get('/courses', async (req, res) => {
    try {
        const courses = await CourseSelection.find({});
        res.status(200).json(courses);
    } catch (err) {
        console.error('Failed to retrieve courses:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Conditional Server Start
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app; // Exports the app for testing purposes
