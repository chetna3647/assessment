const { check, validationResult } = require('express-validator');
const roleModel = require('../models/roleModel');
const commonQueryModel = require('../models/commonQueryModel');

exports.create = [
    check('name').notEmpty().withMessage('Category name is required'),
    check('price').notEmpty().withMessage('Category price is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];

exports.update = [
    check('id').notEmpty().withMessage('Category id is required').custom((value, { req }) => {
        return commonQueryModel.get_data_by_field("categories", "id", req.params.id).then(category => {
            if (category[0] == undefined) {
                return Promise.reject('Category not found');
            }
        });
    }),
    check('name').notEmpty().withMessage('Category name is required'),
    check('price').notEmpty().withMessage('Category price is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];

exports.delete = [
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