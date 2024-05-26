require('dotenv').config();
const express = require("express");
const cors = require('cors');
const accountRepo = require("./repositories/repository.account");
const contentRepo = require("./repositories/repository.content")

const port = process.env.PORT;
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));

// Endpoint

app.post('/createAccountAslab', accountRepo.createAccountAslab);
app.post('/createAccountPraktikan', accountRepo.createAccountPraktikan);
app.post('/loginAccountAslab', accountRepo.loginAccountAslab);
app.post('/loginAccountPraktikan', accountRepo.loginAccountPraktikan);

app.post('/createMatkul', contentRepo.createMatkul);
app.post('/createCourse', contentRepo.createCourse);
app.get('/getAllCourses', contentRepo.getAllCourses);
app.get('/getAllCourses/:id', contentRepo.getAllCoursesByMatkulId);
app.get('/getAllMatkuls', contentRepo.getAllMatkuls);

app.listen(port, () => {
    console.log("Server is running and listening on port ", port);
});

