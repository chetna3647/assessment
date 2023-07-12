const db = require('../../config/db');

//Function to get categories
exports.get_list = async () => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const categories = await db.query(
            `SELECT * FROM categories WHERE is_deleted = ?`, [0]
        );

        message = "No categories found", code = 404, data = [];
        if (categories.length) {
            message = "Categories list fetched successfully";
            code = 200;
            data = categories;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

//Function to get category by id
exports.get_by_id = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const categories = await db.query(
            `SELECT * FROM categories WHERE id = ? AND is_deleted = ?`, [id, 0]
        );

        message = "No categories found", code = 404, data = [];
        if (categories.length) {
            message = "Categories fetched successfully";
            code = 200;
            data = categories[0];
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}

//Function to create category
exports.store = async (params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `INSERT INTO categories(name, price) VALUES (?,?)`, [params.name, params.price]
        );

        message = 'Error in creating categories', code = 400, data = {};
        if (result) {
            message = 'categories Created Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

//Function to update category
exports.update = async (id, params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `UPDATE categories SET name = ?, price = ? WHERE id = ?`, [params.name, params.price, id]
        );

        message = 'Error in updating categories', code = 400, data = {};
        if (result) {
            message = 'categories Updated Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

//Function to delete category
exports.delete = async (id) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const result = await db.query(
            `UPDATE categories SET is_deleted = ? WHERE id = ?`, [1, id]
        );

        message = 'Error in deleting categories', code = 400, data = {};
        if (result) {
            message = 'categories Deleted Successfully';
            data = result;
            code = 201
        }
    } catch (error) {
        message = error;
    }

    return { message, data, code };
}

//Function to get categories search results
exports.searchResult = async (query) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const categories = await db.query(
            `SELECT * FROM categories WHERE name LIKE '%${query.search}%' OR price LIKE '%${query.search}%'`, []
        );

        message = "No categories found", code = 404, data = [];
        if (categories.length) {
            message = "Categories list fetched successfully";
            code = 200;
            data = categories;
        }
    } catch (error) {
        message = error;
    }

    return { message, code, data };
}