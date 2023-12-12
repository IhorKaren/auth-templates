const getCurrent = async (req, res) => {
  const { email, name, token } = req.user;

  res.json({
    email,
    name,
    token,
  });
};

export default getCurrent;
