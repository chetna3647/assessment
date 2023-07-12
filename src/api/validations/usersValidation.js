const { check, validationResult } = require('express-validator');
const userModel = require('../models/userModel');
const commonQueryModel = require('../models/commonQueryModel');

exports.registerValidation = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail').custom(value => {
        return commonQueryModel.get_data_by_field('users', 'email', value).then(user => {
            if (user[0]) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    check('mobile').trim().notEmpty().withMessage('Mobile is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];

exports.createValidation = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('role_id').trim().notEmpty().withMessage('Role is required'),
    check('mobile').trim().notEmpty().withMessage('Mobile is required'),
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail').custom(value => {
        return commonQueryModel.get_data_by_field('users', 'email', value).then(user => {
            if (user[0]) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];

exports.updateValidation = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('mobile').trim().notEmpty().withMessage('Mobile is required').custom((value, { req }) => {
        return commonQueryModel.get_data_by_field_except_id('users', 'mobile', value, req.params.id).then(user => {
            if (user[0]) {
                return Promise.reject('Mobile No. already in use');
            }
        });
    }),
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail').custom((value, { req }) => {
        return commonQueryModel.get_data_by_field_except_id('users', 'email', value, req.params.id).then(user => {
            if (user[0]) {
                return Promise.reject('E-mail already in use');
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

exports.forgotPasswordValidation = [
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];

exports.changePasswordValidation = [
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail'),
    check('otp').trim().notEmpty().withMessage('OTP is required').isNumeric({ min: 6, max: 6 }),
    check('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];

exports.refreshTokenValidation = [
    check('refresh_token').trim().notEmpty().withMessage('Refresh token is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];

exports.deleteValidation = [
    check('id').trim().notEmpty().withMessage('User Id is required').custom((value, { req }) => {
        return userModel.get_user_by_id(req.params.id).then(user => {
            if (user.data.id == undefined) {
                return Promise.reject('User not found');
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
]