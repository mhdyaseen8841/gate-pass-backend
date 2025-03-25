import AsyncHandler from "express-async-handler";
import { Request, TYPES } from "tedious";
import connectDB from "../config/connection.js";
import { generateAccessToken } from "../utils/generateToken.js";
import {decryptPassword} from "../utils/decrypt.js";
const createUser = AsyncHandler(async (req, res) => {
    let pool = await connectDB();
    if (!pool) {
      return res.status(500).send("Database connection not available");
    }

    const { user_name, address, email, phone, company, psw} = req.body;

    try {
      await pool.connect();
      const result = await pool.request()
          .input('user_name', user_name)
          .input('address', address)
          .input('email', email)
          .input('phone', phone)
          .input('company', company)
          .input('password', psw)
          .execute(`create_user`);
      const user = result.recordset;

      res.json(user);
  } catch (error) {
      res.status(500).json(error);
  }
});

const userLogin = AsyncHandler(async (req, res) => {

    let pool = await connectDB();
    if (!pool) {
      return res.status(500).send("Database connection not available");
    }

    const decryptedPassword = decryptPassword(req.body.psw);

    try {
      await pool.connect();
      const result = await pool.request()
          .input('user_name', req.body.user_name)
          .input('password',decryptedPassword)
          .execute(`user_login`);
      const user = result.recordset;
      if (user.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      res.json({
        accessToken: generateAccessToken(user._id),
        user
      });
  } catch (error) {
      res.status(500).json(error);
  }
})



const updatePassword = AsyncHandler(async (req, res) => {
  let pool = await connectDB();
  if (!pool) {
    return res.status(500).send("Database connection not available");
  }

  const { user_id, password } = req.body;

  try {
    await pool.connect();
    const result = await pool.request()
        .input('user_id', TYPES.Int, user_id)
        .input('password', TYPES.NVarChar, password)
        .execute(`update_password`);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});




export { createUser, userLogin, updatePassword };
