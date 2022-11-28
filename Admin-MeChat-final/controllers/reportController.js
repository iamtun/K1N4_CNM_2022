'use strict';

//Oke
const deleteReport = (req, res, next) => {
    try {
        let _id = req.params.reportId;
        let _data = {
            status: true
        }
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + _id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then(data=> res.redirect('/'))
    } catch (error) {
        console.log(error);
    }
}
//OKe
const acceptReport = (req, res, next) => {
    try {
        let _id = req.params.reportId;
        let _data = {
            status: true
        }
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + _id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then(data=> res.redirect('/'))
    } catch (error) {
        console.log(error);
    }
}
const reportItem = (req, res, next) => {
    try {
        fetch('https://backend-mechat-v3.cyclic.app/api/v3/reports/' + req.params.reportId)
            .then(res => res.json())
            .then(data => res.render('report-item', { data: data }))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deleteReport,
    acceptReport,
    reportItem
}