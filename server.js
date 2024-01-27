const express = require('express');
const app = express();
const path = require('path');

//template engine
app.use(express.static('public'));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const connectDB = require('./config/db');
connectDB();

const port = process.env.port || 3000;

//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.get("/", (req, res) => {
    res.render("index");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})