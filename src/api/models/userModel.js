const db = require('../../config/db');
const { getCurrentDateTime } = require('../helpers/commonHelper');
const bcrypt = require("bcrypt");

const roleModel = require('./roleModel');
const userHasRoleModel = require('./userHasRoleModel');
const roleHasPermissionModel = require('./roleHasPermissionModel');
const userHasPermissionModel = require('./userHasPermissionModel');

/*Get user list*/
exports.get_users = async () => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const users = await db.query(
            `SELECT * FROM users WHERE is_deleted = ?`, [0]
        );

        for (let i = 0; i < users.length; i++) {
            let role = await roleModel.get_role_by_id(users[i].role_id);
            users[i]['role_name'] = role.data ? role.data.name : "";
        }

        message = "No Users found", code = 404, data = [];
        if (users.length) {
            message = "User List Fetched Successfully";
            code = 200;
            data = users;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

/*Get user by id*/
exports.get_user_by_id = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const user = await db.query(
            `SELECT * FROM users WHERE id = ? AND is_deleted = ?`, [id, 0]
        );

        for (let i = 0; i < user.length; i++) {
            let role = await roleModel.get_role_by_id(user[i].role_id);
            user[i]['role_name'] = role.data.name;
        }

        message = "No user found", code = 404, data = [];
        if (user.length) {
            message = "User fetched successfully";
            code = 200;
            data = user[0];
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

exports.get_user_by_email = async (email) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const user = await db.query(
            `SELECT * FROM users WHERE email = ?`, [email]
        );

        message = "No user found", code = 404, data = [];
        if (user.length) {
            message = "User fetched successfully";
            code = 200;
            data = user[0];
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

/*Store user*/
exports.store = async (params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const password = await bcrypt.hash(params.password, 10);

        const result = await db.query(
            `INSERT INTO users(name, email, password, mobile, role_id) VALUES (?,?,?,?,?)`, [params.name, params.email, password, params.mobile, params.role_id]
        );

        if (result.affectedRows) {
            await userHasRoleModel.store(result.insertId, params.role_id);

            const roleHasPermissions = await roleHasPermissionModel.get_permisssions_by_role(params.role_id);

            roleHasPermissions.data.map(async (roleHasPermission) => {
                await userHasPermissionModel.store(result.insertId, params.role_id, roleHasPermission.permission_id);
            });
        }

        message = "Error In Creating User", code = 404, data = [];
        if (result) {
            message = 'User Created Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

/*Update user*/
exports.update = async (id, params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const createdAt = getCurrentDateTime();

        const result = await db.query(
            `UPDATE users SET name= ?, email= ?, mobile= ? WHERE id = ?`, [params.name, params.email, params.mobile, id]
        );

        message = "Error in updating user", code = 404, data = [];
        if (result.affectedRows) {
            message = 'User updated successfully';
            data = result;
            code = 200
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

/*Delete user*/
exports.delete = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `UPDATE users SET is_deleted = ? WHERE id = ?`, [1, id]
        );

        message = 'Error In Deleting User', code = 400, data = [];
        if (result) {
            message = 'User Deleted Successfully';
            data = result;
            code = 200;
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}