const getUser = async (req, res) => {
    const { avatarUrl, name, email, birthday, phone, address, _id, favorite } =
      req.user;
    
    res.json({
        avatarUrl,
        name,
        email,
        birthday,
        phone,
        address,
        _id,
        favorite,
    });
};


module.exports = getUser;