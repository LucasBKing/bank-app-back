let router = require('express').Router();
let cors = require('cors');
let userController = require('../controllers/userController');

router.use(cors());

//Set default API response
router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'Welcome from express API'
    });
});

router.route('/user')
    .get(userController.indexUser)
    .post(userController.createUser);


router.route('/adress')
    .get(userController.indexAdress)
    .post(userController.createAdress);

router.route('/account_login')
    .get(userController.indexAccountsLogin)
    .post(userController.createAccountLogin);

router.route('/account_bank')
    .get(userController.indexAccountsBank)
    .post(userController.createAccountBank);

module.exports = router;