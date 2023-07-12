const db = require('../../config/db');

exports.get_data_by_field = async (table, field, value) => {
    const response = await db.query(
        `SELECT * FROM ${table} WHERE ${field} = '${value}'`, []
    );

    return response;
}

exports.get_data_by_field_except_id = async (table, field, value, id) => {
    const response = await db.query(
        `SELECT * FROM ${table} WHERE ${field} = '${value}' AND id != '${id}'`, []
    );

    return response;
}