const userHasPermissionModel = require('../models/userHasPermissionModel');

/*Get user permissions by id*/
exports.get_user_permission_by_id = async function (req, res, next) {
    try {
        const response = await userHasPermissionModel.get_user_permission_by_id(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Get user permissions by user id*/
exports.get_permissions_by_user = async function (req, res, next) {
    try {
        const response = await userHasPermissionModel.get_permissions_by_user(req.params.user_id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Store user permissions*/
exports.store_user_permissions = async function (req, res, next) {
    try {
        const permission_ids = req.body.permission_ids;

        /*first delete all stored user permissions*/
        const delete_user_permission = await userHasPermissionModel.delete_user_permission(req.body.user_id);

        if (delete_user_permission == 400) {
            return res.status(delete_user_permission.code).json({
                "message": delete_user_permission.message,
                "data": delete_user_permission.data,
                "code": delete_user_permission.code
            });
        }

        /*loop through permission_ids array and store permission_id against user_id and role_id one by one*/
        for(let permission_id of permission_ids) {
             userHasPermissionModel.store(req.body.user_id, req.body.role_id, permission_id);
        };

        const response = {
            message: 'User permission created successfully',
            data: [],
            code: 201
        };

        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

/*Delete all permissions of user*/
exports.delete_user_permission = async function (req, res, next) {
    try {
        const response = await userHasPermissionModel.delete_user_permission(req.params.user_id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}