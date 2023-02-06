const getUser = async (req, res) => {
    const { avatarUrl, name, email, birthday, phone, address, _id } = req.user;
    
    res.json({
        avatarUrl,
        name,
        email,
        birthday,
        phone,
        address,
        _id,
    });
};


module.exports = getUser;