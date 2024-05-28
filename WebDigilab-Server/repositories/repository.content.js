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
            'SELECT * FROM course ORDER BY course_id ASC'
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
            'SELECT * FROM matkul ORDER BY matkul_id ASC'
        );

        const allMatkul = result.rows;

        res.status(200).json(allMatkul);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function createChapter(req, res) {
    const {course_id, chapter_no, chapter_title, chapter_link} = req.body;
    
    //janlup kasih handle ketika nomor chapter sudah ada atau nomor chapter null

    try {
        const result = await pool.query(
            'INSERT INTO chapter (course_id, chapter_no, chapter_title, chapter_link) VALUES ($1, $2, $3, $4) RETURNING *',
            [course_id, chapter_no, chapter_title, chapter_link]
        );

        const newChapter = result.rows[0];

        res.status(200).json(newChapter);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function getAllChaptersByCourseId(req, res) {

    const courseId = req.params.id;

    try {
        const result = await pool.query(
            'SELECT * FROM chapter WHERE course_id = $1 ORDER BY chapter_no ASC',
            [courseId]
        );

        const allChapters = result.rows;

        res.status(200).json(allChapters);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function updateCourse(req, res) {
    
    const {course_id, matkul_id, course_name, course_desc, course_image} = req.body;

    try {
        const result = await pool.query (
            'UPDATE course SET matkul_id = $1, course_name = $2, course_desc = $3, course_image = $4 WHERE course_id = $5 RETURNING *',
            [matkul_id, course_name, course_desc, course_image, course_id]
        )

        const updatedCourse = result.rows[0];
        
        res.status(200).json(updatedCourse);
    } catch(err) {
        res.status(500).json({
            error: err
        })
    }
}

async function deleteCourse(req, res) {
    const {course_id} = req.body;

    try {
        const result = await pool.query(
            'DELETE FROM course WHERE course_id = $1 RETURNING *',
            [course_id]
        )

        const deletedCourse = result.rows[0];
        res.status(200).json(deletedCourse);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function deleteChapter(req, res) {
    const {chapter_id} = req.body;

    try {
        const result = await pool.query(
            'DELETE FROM chapter WHERE chapter_id = $1 RETURNING *',
            [chapter_id]
        )

        const deletedChapter = result.rows[0];
        res.status(200).json(deletedChapter);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

async function updateChapter(req, res) {
    
    const {chapter_id, chapter_title, chapter_no, chapter_link} = req.body;

    try {
        const result = await pool.query (
            'UPDATE chapter SET chapter_title = $1, chapter_no = $2, chapter_link = $3 WHERE chapter_id = $4 RETURNING *',
            [chapter_title, chapter_no, chapter_link, chapter_id]
        )

        const updatedChapter = result.rows[0];
        
        res.status(200).json(updatedChapter);
    } catch(err) {
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
    getAllMatkuls,
    createChapter,
    getAllChaptersByCourseId,
    updateCourse,
    deleteCourse,
    deleteChapter,
    updateChapter
}
