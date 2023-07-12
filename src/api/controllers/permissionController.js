const permissionModel = require('../models/permissionModel');

//Funtion to get permissions
exports.get_list = async (req, res, next) => {
    try {
        const response = await permissionModel.get_permissions();
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Funtion to get permission by id
exports.get_permission_by_id = async (req, res, next) => {
    try {
        const response = await permissionModel.get_permission_by_id(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Funtion to craete permissions
exports.create_permission = async (req, res, next) => {
    try {
        const response = await permissionModel.store(req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Funtion to update permissions
exports.update_permission = async (req, res, next) => {
    try {
        const response = await permissionModel.update(req.params.id, req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}