const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');

/*Function to login user */
exports.login = async function (req, res, next) {
    try {
        const user = await userModel.get_user_by_email(req.body.email);
        const isPasswordValid = await bcrypt.compare(req.body.password, user.data.password);
        const message = isPasswordValid ? 'Password is valid' : 'Password is invalid';
        const status = isPasswordValid ? 200 : 401;
        if (isPasswordValid) {
            const privateKey = process.env.API_SECRET;
            const token = await jwt.sign({ userId: user.data.id }, privateKey, { expiresIn: "8h" });
            const refreshToken = await jwt.sign({ userId: user.data.id }, privateKey, { expiresIn: "30d" });
            return res.status(status).json({
                "message": "User authenticated",
                "token": token,
                "refresh_token": refreshToken,
                "userId": user.data.id,
                "code": status
            });
        } else {
            return res.status(status).json({
                "message": message,
                "code": status
            });
        }
    } catch (error) {
        next(error);
    }
}

/*Function to register user */
exports.register = async function (req, res, next) {
    try {
        const role = await roleModel.get_role_by_name('staff');
        req.body.role_id = role?.data?.id;
        const response = await userModel.store(req.body);
        if (response.code == 201 && response.data.insertId !== undefined) {
            const privateKey = process.env.API_SECRET;
            const token = await jwt.sign({ userId: response.data.insertId }, privateKey, { expiresIn: "8h" });
            const refreshToken = await jwt.sign({ userId: response.data.insertId }, privateKey, { expiresIn: "30d" });
            return res.status(response.code).json({
                "message": "User registered successfully",
                "token": token,
                "refresh_token": refreshToken,
                "userId": response.data.insertId,
                "code": response.code
            });
        } else {
            return res.status(response.code).json({
                "message": response.message,
                "code": response.code
            });
        }
    } catch (err) {
        next(err);
    }
}

/*Function to generate refresh token */
exports.refreshToken = async function (req, res, next) {
    if (req.body.refresh_token) {
        const privateKey = process.env.API_SECRET;
        const decoded = await jwt.verify(req.body.refresh_token, privateKey);
        const user = decoded.userId;
        if (user == null) {
            res.status(204).json({ 'message': "User not found" });
        }
        const accessToken = await jwt.sign({ userId: user }, privateKey, { expiresIn: "8h" });
        const refreshToken = await jwt.sign({ userId: user }, privateKey, { expiresIn: "30d" });

        return res.status(201).json({
            "message": "User token refreshed",
            "token": accessToken,
            "refresh_token": refreshToken,
            "userId": user,
            "code": 201
        });
    }
    res.status(204).json({ 'message': "Refresh token not found" });
}