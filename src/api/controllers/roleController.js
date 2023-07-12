const roleModel = require('../models/roleModel');

exports.get_list = async (req, res, next) => {
    try {
        const response = await roleModel.get_roles();
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

exports.get_role_by_id = async (req, res, next) => {
    try {
        const response = await roleModel.get_role_by_id(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const response = await roleModel.store(req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const response = await roleModel.update(req.params.id, req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const response = await roleModel.delete(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}