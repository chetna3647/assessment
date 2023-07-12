const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');

//Controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const userHasPermissionController = require('../controllers/userHasPermissionController');
const roleHasPermissionController = require('../controllers/roleHasPermissionController');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController');
const categoriesController = require('../controllers/categoriesController');

//Validation
const usersValidation = require('../validations/usersValidation');
const rolesValidation = require('../validations/rolesValidation');
const permissionsValidation = require('../validations/permissionsValidation');
const categoriesValidation = require('../validations/categoriesValidation');


/*Routes for Auth*/
router.post('/login', authController.login);
router.post('/register', usersValidation.registerValidation, authController.register);
router.post('/refresh-token', usersValidation.refreshTokenValidation, authController.refreshToken);

router.get('/', verify, (req, res) => {
    res.json({ message: "ok" });
});

/*Routes for User*/
router.get('/users', verify, userController.get_user_list);
router.get('/users/:id', verify, userController.get_user);
router.post('/users', verify, usersValidation.createValidation, userController.create);
router.put('/users/:id', verify, usersValidation.updateValidation, userController.update);
router.delete('/users/:id', verify, usersValidation.deleteValidation, userController.delete);

/*Route for Role*/
router.get('/roles', verify, roleController.get_list);
router.get('/roles/:id', verify, roleController.get_role_by_id);
router.post('/roles', verify, rolesValidation.createValidation, roleController.create);
router.put('/roles/:id', verify, rolesValidation.updateValidation, roleController.update);
router.delete('/roles/:id', verify, rolesValidation.deleteValidation, roleController.delete);

/*Route for Permission*/
router.get('/permissions', verify, permissionController.get_list);
router.get('/permissions/:id', verify, permissionController.get_permission_by_id);
router.post('/permissions', verify, permissionsValidation.createValidation, permissionController.create_permission);
router.put('/permissions/:id', verify, permissionsValidation.updateValidation, permissionController.update_permission);

/*Route for Role Permission*/
router.get('/role_has_permissions/:role_id', verify, roleHasPermissionController.get_permisssions_by_role);
router.post('/role_has_permissions', verify, roleHasPermissionController.store_role_permission);
router.delete('/role_has_permissions/:id', verify, roleHasPermissionController.delete_role_permission);

/*Route for User Permission*/
router.get('/user-has-permissions/:id', verify, userHasPermissionController.get_user_permission_by_id);
router.get('/user-has-permissions/user/:user_id', verify, userHasPermissionController.get_permissions_by_user);
router.post('/user-has-permissions', verify, userHasPermissionController.store_user_permissions);
router.delete('/user-has-permissions/:user_id', verify, userHasPermissionController.delete_user_permission);

/*Route for Category*/
router.get('/categories', verify, categoriesController.get_list);
router.get('/categories/:id', verify, categoriesController.get_by_id);
router.post('/categories', verify, categoriesValidation.create, categoriesController.store);
router.put('/categories/:id', verify, categoriesValidation.update, categoriesController.update);
router.delete('/categories/:id', verify, categoriesValidation.delete, categoriesController.delete);
router.get('/categories/:id', verify, categoriesValidation.delete, categoriesController.delete);
router.post('/categories/search', verify, categoriesController.searchResult);


module.exports = router;