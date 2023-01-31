const getUser = (req, res) => {
    const { avatarUrl, name, email, birthday, phone, city } = req.user;

    res.json({
        avatarUrl,
        name,
        email,
        birthday,
        phone,
        city,
    });
};


module.exports = getUser;