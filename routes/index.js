let router = require('express').Router();
let cors = require('cors');
let userController = require('../controllers/userController');

router.use(cors());

process.env.SECRET_KEY = 'secret';

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

router.route('/account_bank_by_id')
    .get(userController.getAccountBankByID);

router.route('/login')
    .get(userController.loginAccount);

router.route('/insert_deposit')
    .post(userController.insertDeposit);

router.route('/update_debit_balance')
    .post(userController.udpateDebitBalance);


module.exports = router;