'use strict';
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const logOut = async (req, res, next) => {
    try {
        req.session.token = null
        req.session.save(function (err) {
            if (err) next(err)
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.redirect('/')
            })
        })
    } catch (error) {
        console.log(error);
    }
}

const postLogin = async (req, res, next) => {
    try {
        const { phoneNumber, passWord } = req.body;
        let _checkMK = false, _checkPhone = false, _datas;
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/admin')
            .then(res => res.json())
            .then(data => _datas = data.data)
        for (let i of _datas) {
            if (i.role) {
                let _account;
                await fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts/' + i.phoneNumber)
                    .then(res => res.json())
                    .then(data => _account = data.data)
                if (_account.phoneNumber == phoneNumber) {
                    _checkPhone = true
                    if (await bcrypt.compare(passWord, _account.passWord)) {
                        _checkMK = true;
                        let _data = {
                            phoneNumber: phoneNumber,
                            passWord: passWord
                        }
                        let _login = await fetch('https://backend-mechat-v3.cyclic.app/api/v3/auths/login', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(_data)
                        })
                        const _jsonData = await _login.json();
                        req.session.regenerate(function (err) {
                            if (err) next(err)
                            req.session.token = _jsonData._token;
                            req.session.save(function (err) {
                                if (err) return next(err)
                                res.redirect('/')
                            })
                        })
                    }
                    else {
                        _checkMK = false;
                    }
                } else {
                    _checkPhone = false;
                }
            }
        }
        if (_checkPhone == false) {
            _checkMK = true;
            res.render('login', { checkPhone: _checkPhone, checkMK: _checkMK, layout: 'loginlayout' })
        }
        else if (_checkMK == false) {
            res.render('login', { checkPhone: _checkPhone, checkMK: _checkMK, layout: 'loginlayout' })
        }
    } catch (error) {
        console.log(error);
    }
}

const postChangePassword = async (req, res) => {
    try {
        let _token = req.session.token;
        let _user,_account;
        const _decode = jwt.verify(_token, 'secretMeChat');
        const { passWord, newPassword, confirmPassword } = req.body;
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _decode._id)
            .then(res => res.json())
            .then(data => _user = data.data)
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts/' + _user.phoneNumber)
            .then(res => res.json())
            .then(data => _account = data.data)

        if (!await bcrypt.compare(passWord, _account.passWord)) {
            res.render('change-password', { data: _user, checkNewPassword: true, checkOldPassword: false, confirm: false })
        }
        else if (newPassword != confirmPassword) {
            res.render('change-password', { data: _user, checkNewPassword: false, checkOldPassword: true, confirm: false })
        }
        let _data1 = {
            oldPass: passWord,
            newPassword: newPassword
        }
        await fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts/change-password/' + req.params.userId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data1)
        }).then(function (res) {
            res.json();
        })
        res.render('change-password', { data: _user, checkNewPassword: true, checkOldPassword: true, confirm: true })
    } catch (error) {
        console.log(error);
    }
}

const loginView = async (req, res, next) => {
    try {
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/accounts')
            .then(res => res.json())
            .then(data => res.render('login', { data: data.data, layout: 'loginlayout', checkMK: true, checkPhone: true, checkRole: true }))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginView,
    logOut,
    postLogin,
    postChangePassword,
    logOut,
}