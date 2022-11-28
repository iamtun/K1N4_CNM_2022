'use strict';
const jwt = require("jsonwebtoken");

//Oke
const updateText = async (req, res, next) => {
    try {
        let _id = req.params.adminId;
        const { fullName, birthday, bio, gender } = req.body;
        let _gender;
        if(gender == 'Nam'){
            _gender = 0;
        }else if(gender == "Nữ"){
            _gender = 1;
        }
        let _date = new Date(birthday)
        let _data = {
            fullName: fullName,
            gender: _gender,
            birthday:_date,
            bio: bio
        }
        console.log("body:" , _data);
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then(data=>res.redirect('/profile')) 
    } catch (error) {
        console.log(error);
    }
}
//test
const changeAvatar = async (req, res, next) => {
    try {
        let _token = req.session.token
        let _user
        const _decode = jwt.verify(_token, 'secretMeChat');
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
        .then(res => res.json())
        .then(data => _user = data.data)
        res.render('page-404',{data:_user});
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    updateText,
    changeAvatar
}