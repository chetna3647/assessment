const db = require('../../config/db');
const { getCurrentDateTime } = require('../helpers/commonHelper');

exports.get_list = async () => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const userHasRoles = await db.query(
            `SELECT * FROM user_has_roles`, []
        );

        message = "No user roles found";
        code = 404;
        data = [];
        if (userHasRoles.length) {
            message = "User Role list fetched successfully";
            code = 200;
            data = userHasRoles;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.get_users_by_role = async (role_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const userHasRoles = await db.query(
            `SELECT * FROM user_has_roles WHERE role_id = ?`, [role_id]
        );

        message = "No user roles found", code = 404, data = [];
        if (userHasRoles.length) {
            message = "User Role list fetched successfully";
            code = 200;
            data = userHasRoles;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.get_roles_by_user = async (user_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const userHasRoles = await db.query(
            `SELECT * FROM user_has_roles WHERE user_id = ?`, [user_id]
        );

        message = "No user roles found", code = 404, data = [];
        if (userHasRoles.length) {
            message = "User Role list fetched successfully";
            code = 200;
            data = userHasRoles;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.store = async (user_id, role_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();
        const result = await db.query(
            `INSERT INTO user_has_roles(user_id, role_id) VALUES (?,?)`, [user_id, role_id]
        );

        message = 'Error In Creating User Role', code = 400, data = [];
        if (result) {
            message = 'User Role Created Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

exports.delete_user_role = async (user_id, role_id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `DELETE FROM user_has_roles WHERE user_id = ? AND role_id = ?`, [user_id, role_id]
        );

        message = 'Error in deleting user role', code = 400, data = {};

        if (result) {
            message = 'User Role deleted successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}