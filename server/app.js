const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyparser = require('body-parser')
 
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

const cors = require('cors');
require('dotenv').config();
app.use(cors());

mongoose.connect(process.env.DBCON).then(() => {
    console.log("DB connected!!!");
})
let PORT = process.env.PORT || 9000


app.use(bodyparser.urlencoded({ extended: true })) 
app.use(bodyparser.json())

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

app.listen(PORT, function (error) {
    if (error) throw error
    console.log("Server Run on PORT : ", PORT)
})