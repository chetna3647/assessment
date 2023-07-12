const db = require('../../config/db');
const { getCurrentDateTime } = require('../helpers/commonHelper');

exports.get_permissions_by_user = async (user_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const userPermissions = await db.query(
            `SELECT * FROM user_has_permissions WHERE user_id = ?`, [user_id]
        );

        message = "No user permissions found", code = 404, data = [];
        if (userPermissions.length) {
            message = "User permission list fetched successfully";
            code = 200;
            data = userPermissions;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.get_user_permission_by_id = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const userPermission = await db.query(
            `SELECT * FROM user_has_permissions WHERE id = ?`, [id]
        );

        message = "No user permission found", code = 404, data = [];
        if (userPermission.length) {
            message = "User permission fetched successfully";
            code = 200;
            data = userPermission;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.store = async (user_id, role_id, permission_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();

        const result = await db.query(
            `INSERT INTO user_has_permissions(user_id, role_id, permission_id) VALUES (?,?,?)`, [user_id, role_id, permission_id]
        );

        message = 'Error In Creating User Permission', code = 400, data = {};
        if (result) {
            message = 'User Permission Created Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

exports.delete_user_permission = async (user_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `DELETE FROM user_has_permissions WHERE user_id = ?`, [user_id]
        );

        message = 'Error in deleting user permission', code = 400, data = {};
        if (result) {
            message = 'User permission deleted successfully';
            data = result;
            code = 200
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}