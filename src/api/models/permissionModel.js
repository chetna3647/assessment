const db = require('../../config/db');
const { getCurrentDateTime } = require('../helpers/commonHelper');

//Funtion to get permissions
exports.get_permissions = async () => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const permissions = await db.query(
            `SELECT * FROM permissions`, []
        );

        message = "No permissions found", code = 404, data = [];
        if (permissions.length) {
            message = "Permission list fetched successfully";
            code = 200;
            data = permissions;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

//Funtion to get permission by id
exports.get_permission_by_id = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const permission = await db.query(
            `SELECT * FROM permissions WHERE id = ?`, [id]
        );

        message = "No permission found", code = 404, data = [];
        if (permission.length) {
            message = "permission fetched successfully";
            code = 200;
            data = permission[0];
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

//Funtion to create permissions
exports.store = async (params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();
        const result = await db.query(
            `INSERT INTO permissions(name, action, controller) VALUES (?,?,?)`, [params.name, params.action, params.controller]
        );

        message = 'Error in creating permission', code = 400, data = {};
        if (result) {
            message = 'Permission created successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

//Funtion to update permissions
exports.update = async (id, params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();
        const result = await db.query(
            `UPDATE permissions SET name = ?, action = ?, controller = ? WHERE id = ?`, [params.name, params.action, params.controller, id]
        );

        message = 'Error in updating permission', code = 400, data = {};
        if (result) {
            message = 'Permission updated successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

exports.get_permission_by_name = async (param) => {
    const permission = await db.query(
        `SELECT * FROM permissions WHERE name = '${param.name}' AND action = '${param.action}'`
    );

    return permission;
}

exports.get_permission_by_name_except_id = async (param, id) => {
    const permission = await db.query(
        `SELECT * FROM permissions WHERE name = '${param.name}' AND action = '${param.action}' AND id != '${id}'`
    );

    return permission;
}