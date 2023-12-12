import { ctrlWrapper } from "../../helpers/index.js";

import register from "./register.js";
import login from "./login.js";
import logout from "./logout.js";
import getCurrent from "./current.js";

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
