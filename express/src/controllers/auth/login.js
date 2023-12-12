import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/user/user.js";
import { HttpError } from "../../helpers/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  if (!user.token) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      name: user.name,
      email,
      token,
    });
  }

  res.json({
    name: user.name,
    email,
    token: user.token,
  });
};

export default login;
