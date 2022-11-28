'use strict';

//Oke
const removeBlock = (req, res, next) => {
    try {
        let _id = req.params.userId;
        let _data = {
            status: true
        }
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + _id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then(data=> res.redirect('/table-users'))
    } catch (error) {
        console.log(error);
    }
}

const getUserById = (req, res, next) => {
    try {
        let _id = req.params.userId;
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/users/' + _id)
            .then(res => res.json())
            .then(data => res.render('user-item', { data: data.data }))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeBlock,
    getUserById
}