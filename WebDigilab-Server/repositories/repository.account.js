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

async function validateUser(password, hashedPassword) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

async function hashPassword(password){
    //console.log("Password to hash:", password);
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function createAccountAslab(req,res) {
    //console.log("Request body:", req.body);
    const {aslab_name, aslab_npm, aslab_profile_picture, aslab_bio, aslab_email, aslab_password} = req.body;

    const hashed_password = await hashPassword(aslab_password);

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
        const { praktikan_name, praktikan_npm, praktikan_bio, praktikan_profile_picture, praktikan_email, praktikan_password } = req.body;
        const hashedPassword = await hashPassword(praktikan_password);
        const checkNpm = await pool.query(
            'SELECT * FROM praktikan WHERE praktikan_npm = $1', 
            [praktikan_npm]
        );
        if(checkNpm.rowCount !==0){
            return res.status(400).json({
                error: "NPM sudah terdaftar"
            });
        }
        const checkEmail = await pool.query(
            'SELECT * FROM praktikan WHERE praktikan_email = $1', 
            [praktikan_email]
        );
        if(checkEmail.rowCount !==0){
            return res.status(401).json({
                error: "Email sudah terdaftar"
            });
        }
        const result = await pool.query(
            'INSERT INTO praktikan (praktikan_name, praktikan_npm, praktikan_bio, praktikan_profile_picture, praktikan_email, praktikan_password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [praktikan_name, praktikan_npm, praktikan_bio, praktikan_profile_picture, praktikan_email, hashedPassword]
        );
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

async function loginAccountAslab(req, res) {
    const { aslab_email, aslab_password } = req.body;
    if (!aslab_email || !aslab_password) {
      res
        .status(400)
        .json({message: "Missing field"});
      return;
    }

    try {
      const aslab = await pool.query(
        `SELECT * FROM aslab WHERE aslab_email = '${aslab_email}';`
      );
      if (aslab.rows.length === 0) {
        res
          .status(401)
          .json({message: "User not found"});
        return;
      }

      const match = await validateUser(aslab_password, aslab.rows[0].aslab_password);
      if (!match) {
        res
          .status(402)
          .json({message: "Incorrect Password"});
        return;
      }

      res.status(200).json(aslab.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err);
      return;
    }
}

async function loginAccountPraktikan(req, res) {
    const { praktikan_email, praktikan_password } = req.body;
    if (!praktikan_email || !praktikan_password) {
      res
        .status(400)
        .json({message: "Missing field"});
      return;
    }

    try {
      const praktikan = await pool.query(
        `SELECT * FROM praktikan WHERE praktikan_email = '${praktikan_email}';`
      );
      if (praktikan.rows.length === 0) {
        res
          .status(401)
          .json({message: "User not found"});
        return;
      }

      const match = await validateUser(praktikan_password, praktikan.rows[0].praktikan_password);
      if (!match) {
        res
          .status(402)
          .json({message: "Incorrect Password"});
        return;
      }

      res.status(200).json(praktikan.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err);
      return;
    }
}

async function updateAccountPraktikan (req, res) {
  try {
      const { praktikan_id, praktikan_name, praktikan_npm, praktikan_bio, praktikan_profile_picture, praktikan_email, praktikan_password } = req.body;
      const hashedPassword = await hashPassword(praktikan_password);
      
      if (!praktikan_password) {
          const result = await pool.query(
            'UPDATE praktikan SET praktikan_name = $1, praktikan_npm = $2, praktikan_bio = $3, praktikan_profile_picture = $4, praktikan_email = $5 WHERE praktikan_id = $6 RETURNING *' ,
            [praktikan_name, praktikan_npm, praktikan_bio, praktikan_profile_picture, praktikan_email, praktikan_id]
          );
          res.status(201).json(result.rows[0]);
      }
      else {
        const result = await pool.query(
          'UPDATE praktikan SET praktikan_name = $1, praktikan_npm = $2, praktikan_bio = $3, praktikan_profile_picture = $4, praktikan_email = $5, praktikan_password = $6 WHERE praktikan_id = $7 RETURNING *' ,
          [praktikan_name, praktikan_npm, praktikan_bio, praktikan_profile_picture, praktikan_email, hashedPassword, praktikan_id]
        );
        res.status(201).json(result.rows[0]);
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}

async function updateAccountAslab (req, res) {
  try {
      const { aslab_id, aslab_name, aslab_npm, aslab_bio, aslab_profile_picture, aslab_email, aslab_password } = req.body;
      const hashedPassword = await hashPassword(aslab_password);
      
      if (!aslab_password) {
          const result = await pool.query(
            'UPDATE aslab SET aslab_name = $1, aslab_npm = $2, aslab_bio = $3, aslab_profile_picture = $4, aslab_email = $5 WHERE aslab_id = $6 RETURNING *' ,
            [aslab_name, aslab_npm, aslab_bio, aslab_profile_picture, aslab_email, aslab_id]
          );
          res.status(201).json(result.rows[0]);
      }
      else {
        const result = await pool.query(
          'UPDATE aslab SET aslab_name = $1, aslab_npm = $2, aslab_bio = $3, aslab_profile_picture = $4, aslab_email = $5, aslab_password = $6 WHERE aslab_id = $7 RETURNING *' ,
          [aslab_name, aslab_npm, aslab_bio, aslab_profile_picture, aslab_email, hashedPassword, aslab_id]
        );
        res.status(201).json(result.rows[0]);
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}

async function deleteAccountAslab(req, res) {
  const {aslab_id} = req.body;

  try {
      const result = await pool.query(
          'DELETE FROM aslab WHERE aslab_id = $1 RETURNING *',
          [aslab_id]
      )

      const deletedAslab = result.rows[0];
      res.status(200).json(deletedAslab);
  } catch (err) {
      res.status(500).json({
          error: err
      })
  }
}

async function deleteAccountPraktikan(req, res) {
  const {praktikan_id} = req.body;

  try {
      const result = await pool.query(
          'DELETE FROM praktikan WHERE praktikan_id = $1 RETURNING *',
          [praktikan_id]
      )

      const deletedPraktikan= result.rows[0];
      res.status(200).json(deletedPraktikan);
  } catch (err) {
      res.status(500).json({
          error: err
      })
  }
}

module.exports = {
    createAccountAslab,
    createAccountPraktikan,
    loginAccountAslab,
    loginAccountPraktikan,
    updateAccountPraktikan,
    updateAccountAslab,
    deleteAccountAslab,
    deleteAccountPraktikan
}