'use strict';

var router = require('express').Router();
const path = require('path');
var multer = require('multer');
let fs = require('fs-extra');

const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null,  file.originalname );
        let type = file.originalname.split('.');
        let dirName = type[0] + type[1];
        let path = `./client/src/assets/uploads/${dirName}`;
        let fss = fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let type = file.originalname.split('.');
        cb(null, file.fieldname + '-' + type[2] + '.png');
    }
});
let upload = multer({ storage: storage });


exports = module.exports = function (app) {

    router.post('/test', upload.single('photo'), function (req, res) {
        var path = '';
        // console.log(req.body);
        if (!req.file) {
            console.log("No file received");
            return res.send({
                success: false
            });

        } else {
            console.log('file received');
            return res.send({
                success: true
            })
        }

    });
    router.get('/:id', function (req, res, next) {
        app.models.Candidate.find({ cand_org_id: req.params.id }, { _v: 0, cand_dealer_id: 0, cand_org_id: 0 })
            .exec(function (err, candidate) {
                if (err) next(err);

                res.status(200)
                    .json(candidate || []);
            });
    });



    router.put('/:id', function (req, res, next) {


        var data = {
            cand_org_id: req.body.cand_org_id,
            cand_dealer_id: req.body.cand_dealer_id,
            cand_image_fold: req.body.cand_image_fold,
            cand_image_name: req.body.cand_image_name,
            cand_image_base: req.body.cand_image_base,
            feeds: []
        }

        console.log(req.body);
        for (var i in req.body) {
            // data.feeds= i:req.body[i];
            alert(i); // alerts key
            alert(foo[i]); //alerts key's value
        }
        var data = {};




        app.models.Candidate.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, function (err, candidate) {
            if (err) return next(err);

            res.status(200).json({
                candidate: candidate,
                message: 'candidate status has been updated successfully.',
                status: true
            });

        });
    });

    router.post('/', function (req, res, next) {
        var data = {
            // cand_firstName: req.body.cand_firstName,
            // cand_MiddleName: req.body.cand_MiddleName,
            // cand_LastName: req.body.cand_LastName,
            // cand_DOB: req.body.cand_DOB,
            // cand_age: req.body.cand_age,
            // cand_blood_group: req.body.cand_blood_group,
            // cand_gender: req.body.cand_gender,
            // cand_phoneNumber: req.body.cand_phoneNumber,
            feeds: req.body,
            cand_org_id: req.body.cand_org_id,
            cand_dealer_id: req.body.cand_dealer_id,
            cand_image_fold: req.body.cand_image_fold,
            cand_image_name: req.body.cand_image_name,
            cand_image_base: req.body.cand_image_base
        }

        console.log(data);

        app.models.Candidate.create(data, function (err, candidate) {
            if (err) next(err);

            res.status(200).json({
                candidate: candidate,
                message: 'Candidate has been added successfully.'
            })
        });
    });

    return router;
}
