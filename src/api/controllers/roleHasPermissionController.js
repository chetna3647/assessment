const roleHasPermissionModel = require('../models/roleHasPermissionModel');

exports.get_permisssions_by_role = async (req, res, next) => {
    try {
        const response = await roleHasPermissionModel.get_permisssions_by_role(req.params.role_id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

exports.store_role_permission = async (req, res, next) => {
    try {
        const response = await roleHasPermissionModel.store_role_permission(req.body.role_id, req.body.permission_id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

exports.delete_role_permission = async (req, res, next) => {
    try {
        const response = await roleHasPermissionModel.delete_role_permission(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}