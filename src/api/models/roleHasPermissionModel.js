const db = require('../../config/db');
const { getCurrentDateTime } = require('../helpers/commonHelper');

exports.get_permisssions_by_role = async (role_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const roleHasPermissions = await db.query(
            `SELECT * FROM role_has_permissions WHERE role_id = ?`, [role_id]
        );

        message = "No Data Found", code = 404, data = [];
        if (roleHasPermissions.length) {
            message = "Role Permission List Fetched Successfully";
            code = 200;
            data = roleHasPermissions;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.store_role_permission = async (role_id, permission_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const roleHasPermission = await db.query(
            `INSERT INTO role_has_permissions(role_id, permission_id) VALUES (?,?)`, [role_id, permission_id]
        );

        message = 'Error in creating role', code = 400, data = {};
        if (roleHasPermission) {
            message = 'Role permission created successfully';
            data = roleHasPermission;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

exports.delete_role_permission = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `DELETE FROM role_has_permissions WHERE id = ?`, [id]
        );

        message = 'Error in deleting role', code = 400, data = [];
        if (result) {
            message = 'Role deleted successfully';
            code = 200;
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}