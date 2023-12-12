import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/user/user.js";
import { HttpError } from "../../helpers/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1w" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    email,
    name,
    token,
  });
};

export default register;
