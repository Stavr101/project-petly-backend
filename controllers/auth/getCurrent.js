const getCurrent = (req, res) => {
  const { name, email, _id, avatarUrl } = req.user;

  res.json({
    name,
    email,
    _id,
    avatarUrl,
  });
};

module.exports = getCurrent;
