require('dotenv').config();
const express = require("express");
const cors = require('cors');
const accountRepo = require("./repositories/repository.account");

const port = process.env.PORT;
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));

// Endpoint

app.post('/createAccountAslab', accountRepo.createAccountAslab);

app.listen(port, () => {
    console.log("Server is running and listening on port ", port);
});

