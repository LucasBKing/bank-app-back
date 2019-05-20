let router = require('express').Router();
let cors = require('cors');
let userController = require('../controllers/userController');
let loginAccountController = require('../controllers/loginAccountController')
let transactionsController = require('../controllers/transactionsController');
let accountBankController = require('../controllers/accountBankController');
let creditCardController = require('../controllers/creditCardController');
let friendsController = require('../controllers/friendsController');
let depositController = require('../controllers/depositController');

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

router.route('/account_login')
    .get(loginAccountController.indexAccountsLogin)
    .post(loginAccountController.createAccountLogin);

router.route('/account_bank')
    .get(accountBankController.indexAccountsBank)
    .post(accountBankController.createAccountBank);

router.route('/credit_card_by_account_bank_id')
    .get(creditCardController.getCreditCardById);

router.route('/user_id_by_account_login_id')
    .get(userController.getUserIdByAccountLogin);    

router.route('/account_bank_by_id')
    .get(accountBankController.getAccountBankByID);

router.route('/login')
    .get(loginAccountController.loginAccount);

router.route('/insert_deposit')
    .post(depositController.insertDeposit);

router.route('/insert_transaction')
    .post(transactionsController.insertTransaction);

router.route('/update_debit_balance')
    .post(depositController.udpateDebitBalance);

router.route('/update_credit_card_balance')
    .post(creditCardController.updateCreditCardBalance);

router.route('/get_current_debit_balance')
    .get(accountBankController.getCurrentAccountBankBalance);

router.route('/create_credit_card')
    .post(creditCardController.createCreditCard);

router.route('/list_users')
    .get(userController.getUsers);

router.route('/list_of_possible_friends')
    .get(friendsController.getPossibleFriends);

router.route('/add_friend')
    .post(friendsController.addFriend);

router.route('/friends_list')
    .get(friendsController.getFriendsList);

router.route('/update_request_friend')
    .post(friendsController.updateFriendRequest);

router.route('/get_user')
    .get(userController.getUser);

router.route('/user_by_account_bank_id')
    .get(accountBankController.getUserByAccountBankId);

router.route('/get_friends_requests')
    .get(friendsController.getFriendsRequests);

router.route('/get_stats_users_request')
    .get(userController.getStatUserRequest);

router.route('/account_login_by_id')
    .get(loginAccountController.getAccountLoginById);

router.route('/get_transactions')
    .get(transactionsController.getListTransactions);

router.route('/udpate_transaction_status')
    .post(transactionsController.updateTransactionStatus);
    
module.exports = router;