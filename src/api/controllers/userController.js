const userModel = require('../models/userModel');

/*Get user list*/
exports.get_user_list = async function (req, res, next) {
    try {
        const response = await userModel.get_users();
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Get user by id*/
exports.get_user = async function (req, res, next) {
    try {
        const response = await userModel.get_user_by_id(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Store user*/
exports.create = async function (req, res, next) {
    try {
        const response = await userModel.store(req.body, req.file);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Update user*/
exports.update = async function (req, res, next) {
    try {
        const response = await userModel.update(req.params.id, req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Delete user*/
exports.delete = async function (req, res, next) {
    try {
        const response = await userModel.delete(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}