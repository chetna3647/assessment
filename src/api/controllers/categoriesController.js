const categoriesModel = require('../models/categoriesModel');

//Function to get categories
exports.get_list = async (req, res, next) => {
    try {
        const response = await categoriesModel.get_list();
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Function to get category by id
exports.get_by_id = async (req, res, next) => {
    try {
        const response = await categoriesModel.get_by_id(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Function to create category
exports.store = async (req, res, next) => {
    try {
        const response = await categoriesModel.store(req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Function to update category
exports.update = async (req, res, next) => {
    try {
        const response = await categoriesModel.update(req.params.id, req.body);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Function to delete category
exports.delete = async (req, res, next) => {
    try {
        const response = await categoriesModel.delete(req.params.id);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}

//Function to get categories search results
exports.searchResult = async (req, res, next) => {
    try {
        const response = await categoriesModel.searchResult(req.query);
        return res.status(response.code).json({
            "message": response.message,
            "data": response.data,
            "code": response.code
        });
    } catch (error) {
        next(error);
    }
}