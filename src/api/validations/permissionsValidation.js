const { check, validationResult } = require('express-validator');
const permissionModel = require('../models/permissionModel');

exports.createValidation = [
    check('name').notEmpty().withMessage('Permission name is required').custom((value, { req }) => {
        return permissionModel.get_permission_by_name(req.body).then(permission => {
            if (permission[0]) {
                return Promise.reject('Permission name and action already in use');
            }
        });
    }),
    check('action').notEmpty().withMessage('Permission action is required'),
    check('controller').notEmpty().withMessage('Permission controller is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];

exports.updateValidation = [
    check('id').notEmpty().withMessage('Permission is required').custom((value, { req }) => {
        return permissionModel.get_permission_by_id(req.params.id).then(permission => {
            if (permission == undefined) {
                return Promise.reject('Permission not found');
            }
        });
    }),
    check('name').notEmpty().withMessage('Permission name is required').custom((value, { req }) => {
        return permissionModel.get_permission_by_name_except_id(req.body, req.params.id).then(permission => {
            if (permission[0]) {
                return Promise.reject('Permission name and action already in use');
            }
        });
    }),
    check('action').notEmpty().withMessage('Permission action is required'),
    check('controller').notEmpty().withMessage('Permission controller is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];

