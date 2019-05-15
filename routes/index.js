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
    .post(function(req, res) {userController.createUser});

router.route('/adress')
    .get(userController.indexAdress)
    .post(function(req, res) {userController.createAdress});

router.route('/account_login')
    .get(userController.indexAccountsLogin)
    .post(function(req, res) {userController.createAccountLogin});

router.route('/account_bank')
    .get(userController.indexAccountsBank)
    .post(function(req, res) {userController.createAccountBank});

router.route('/credit_card_by_account_bank_id')
    .get(userController.getCreditCardById);

router.route('/account_bank_by_id')
    .get(userController.getAccountBankByID);

router.route('/login')
    .get(userController.loginAccount);

router.route('/insert_deposit')
    .post(function(req, res) {userController.insertDeposit});

router.route('/update_debit_balance')
    .post(function(req, res) {userController.udpateDebitBalance});

router.route('/create_credit_card')
    .post(function(req, res) { userController.createCreditCard });

router.route('/list_users')
    .get(userController.getUsers);

router.route('/list_of_possible_friends')
    .get(userController.getPossibleFriends);

module.exports = router;