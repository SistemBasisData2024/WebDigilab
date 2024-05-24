require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require("bcrypt")
const saltRounds = 10

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,

    ssl: {
        require: true,
    },
});

pool.connect().then(() => {
    console.log("Connected to PostgreSQL database");
});

function validateUser(hash) {
    bcrypt
      .compare("evan", hash)
      .then(res => {
        console.log(res) // return true
      })
      .catch(err => console.error(err.message))        
}

async function createAccountAslab(req,res) {
    const {aslab_name, aslab_npm, aslab_profile_picture, aslab_bio, aslab_email, aslab_password} = req.body;

    var hashed_password;

    bcrypt
    .hash(aslab_password, saltRounds)
    .then(hash => {
        hashed_password = hash;
    })
    .catch(err => console.error(err.message))

    try {

        const check = await pool.query (
            'SELECT * FROM aslab WHERE aslab_npm = $1', 
            [aslab_npm]
        )

        if (check.rowCount !== 0) {
            return res.status(400).json({
                error: "NPM sudah terdaftar"
            });
        }

        const check2 = await pool.query (
            'SELECT * FROM aslab WHERE aslab_email = $1', 
            [aslab_email]
        )

        if (check2.rowCount !== 0) {
            return res.status(401).json({
                error: "Email sudah dipakai"
            });
        }

        const result = await pool.query (
            'INSERT INTO aslab (aslab_name, aslab_npm, aslab_profile_picture, aslab_bio, aslab_email, aslab_password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [aslab_name, aslab_npm, aslab_profile_picture, aslab_bio, aslab_email, hashed_password]
        );

        const newAccountAslab = result.rows[0];
        
        res.status(200).json(newAccountAslab);
    }
    catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

module.exports = {
    createAccountAslab
}