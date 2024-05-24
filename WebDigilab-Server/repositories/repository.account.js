require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require("bcrypt")

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

async function hashPassword(password){
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function createAccountAslab(req,res) {
    const {aslab_name, aslab_npm, aslab_profile_picture, aslab_bio, aslab_email, aslab_password} = req.body;

    const hashed_password = hashPassword(aslab_password);

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

async function createAccountPraktikan(req, res){
    try {
        const { username, npm, bio, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const checkNpm = await pool.query(
            'SELECT * FROM praktikan WHERE praktikan_npm = $1', 
            [npm]
        );
        if(checkNpm.rowCount !==0){
            return res.status(400).json({
                error: "NPM sudah terdaftar"
            });
        }
        const checkEmail = await pool.query(
            'SELECT * FROM praktikan WHERE praktikan_email = $1', 
            [email]
        );
        if(checkEmail.rowCount !==0){
            return res.status(400).json({
                error: "Email sudah terdaftar"
            });
        }
        const result = await pool.query(
            'INSERT INTO praktikan (praktikan_name, praktikan_npm, praktikan_bio, praktikan_email, praktikan_password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [username, npm, bio, email, hashedPassword]
        );
        res.status(201).json(result);
    } catch (error) {
        //console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {
    createAccountAslab,
    createAccountPraktikan
}