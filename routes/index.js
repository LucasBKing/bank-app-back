let router = require('express').Router();
let userController = require('../controllers/userController');

//Set default API response
router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'Welcome from express API'
    });
});

router.route('/user')
    .get(userController.index);

module.exports = router;