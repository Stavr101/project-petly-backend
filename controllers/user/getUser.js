const getUser = async (req, res) => {
    const { avatarURL, name, email, birthday, phone, address } = req.user;
    
    res.json({
        avatarUrl: avatarURL,
        name,
        email,
        birthday,
        phone,
        address,
    });
};


module.exports = getUser;