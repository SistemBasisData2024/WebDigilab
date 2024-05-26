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

async function createMatkul(req,res) {
    const {matkul_name, matkul_desc} = req.body;

    try {

        const result = await pool.query (
            'INSERT INTO matkul (matkul_name, matkul_desc) VALUES ($1, $2) RETURNING *',
            [matkul_name, matkul_desc]
        );

        const newMatkul = result.rows[0];
        
        res.status(200).json(newMatkul);
    }
    catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

async function createCourse(req, res) {
    const {matkul_id, course_name, course_desc, course_image, course_start, course_end} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO course (matkul_id, course_name, course_desc, course_image, course_start, course_end) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [matkul_id, course_name, course_desc, course_image, course_start, course_end]
        );

        const newCourse = result.rows[0];

        res.status(200).json(newCourse);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function getAllCourses(req, res) {

    try {
        const result = await pool.query(
            'SELECT * FROM course'
        );

        const allCourse = result.rows;

        res.status(200).json(allCourse);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function getAllCoursesByMatkulId(req, res) {

    const matkulId = req.params.id;

    try {
        const result = await pool.query(
            'SELECT * FROM course WHERE matkul_id = $1',
            [matkulId]
        );

        const allCourse = result.rows;

        res.status(200).json(allCourse);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function getAllMatkuls(req, res) {

    try {
        const result = await pool.query(
            'SELECT * FROM matkul'
        );

        const allMatkul = result.rows;

        res.status(200).json(allMatkul);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    createMatkul,
    createCourse,
    getAllCourses,
    getAllCoursesByMatkulId,
    getAllMatkuls
}
