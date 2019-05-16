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

router.route('/account_login')
    .get(userController.indexAccountsLogin)
    .post(userController.createAccountLogin);

router.route('/account_bank')
    .get(userController.indexAccountsBank)
    .post(userController.createAccountBank);

router.route('/credit_card_by_account_bank_id')
    .get(userController.getCreditCardById);

router.route('/account_bank_by_id')
    .get(userController.getAccountBankByID);

router.route('/login')
    .get(userController.loginAccount);

router.route('/insert_deposit')
    .post(userController.insertDeposit);

router.route('/update_debit_balance')
    .post(userController.udpateDebitBalance);

router.route('/create_credit_card')
    .post(userController.createCreditCard);

router.route('/list_users')
    .get(userController.getUsers);

router.route('/list_of_possible_friends')
    .get(userController.getPossibleFriends);

router.route('/add_friend')
    .post(userController.addFriend);

router.route('/friends_list')
    .get(userController.getFriendsList);

router.route('/update_request_friend')
    .post(userController.updateFriendRequest);

router.route('/get_user')
    .get(userController.getUser);

router.route('/get_friends_requests')
    .get(userController.getFriendsRequests);

router.route('/get_stats_users_request')
    .get(userController.getStatUserRequest);

router.route('/account_login_by_id')
    .get(userController.getAccountLoginById);

module.exports = router;