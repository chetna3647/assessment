const db = require('../../config/db');
const { getCurrentDateTime } = require('../helpers/commonHelper');

exports.get_roles = async () => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const roles = await db.query(
            `SELECT * FROM roles`, []
        );

        message = "No roles found", code = 404, data = [];
        if (roles.length) {
            message = "Role list fetched successfully";
            code = 200;
            data = roles;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.get_role_by_id = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const role = await db.query(
            `SELECT * FROM roles WHERE id = ?`, [id]
        );

        message = "No role found", code = 404, data = [];
        if (role.length) {
            message = "Role fetched successfully";
            code = 200;
            data = role[0];
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.get_role_by_name = async (name) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const role = await db.query(
            `SELECT * FROM roles WHERE name = ?`, [name]
        );

        message = "No role found", code = 404, data = [];
        if (role.length) {
            message = "Role fetched successfully";
            code = 200;
            data = role[0];
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.store = async (params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();
        const result = await db.query(
            `INSERT INTO roles(name) VALUES (?)`, [params.name]
        );

        message = 'Error in creating role', code = 400, data = {};
        if (result) {
            message = 'Role Created Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

exports.update = async (id, params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();
        const result = await db.query(
            `UPDATE roles SET name = ? WHERE id = ?`, [params.name, id]
        );

        message = 'Error in updating role', code = 400, data = {};
        if (result) {
            message = 'Role Updated Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

exports.delete = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `DELETE FROM roles WHERE id = ?`, [id]
        );

        message = 'Error in deleting role', code = 400, data = {};
        if (result) {
            message = 'Role Deleted Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}