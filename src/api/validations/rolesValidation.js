const { check, validationResult } = require('express-validator');
const roleModel = require('../models/roleModel');
const commonQueryModel = require('../models/commonQueryModel');

exports.createValidation = [
    check('name').notEmpty().withMessage('Role name is required').custom((value) => {
        return commonQueryModel.get_data_by_field('roles', 'name', value).then(role => {
            if (role[0]) {
                return Promise.reject('Role name already in use');
            }
        });
    }),
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
    check('id').notEmpty().withMessage('Role name is required').custom((value, { req }) => {
        return roleModel.get_role_by_id(req.params.id).then(role => {
            if (role == undefined) {
                return Promise.reject('Role not found');
            }
        });
    }),
    check('name').notEmpty().withMessage('Role name is required').custom((value, { req }) => {
        return commonQueryModel.get_data_by_field_except_id('roles', 'name', value, req.params.id).then(role => {
            if (role[0]) {
                return Promise.reject('Role name already in use');
            }
        });
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];

exports.deleteValidation = [
    check('id').notEmpty().withMessage('Role is required').custom((value, { req }) => {
        return roleModel.get_role_by_id(req.params.id).then(role => {
            if (role.data.id == undefined && role.data.id == null) {
                return Promise.reject('Role not found');
            }
        });
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];