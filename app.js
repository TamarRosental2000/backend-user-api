const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const membersRoutes = require('./routes/members');
require('dotenv').config();

const app = express();

//conent to db


app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: ['https://localhost', 'https://www.google.com', 'https://www.facebook.com','*'],
}));


app.use('/members', membersRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});