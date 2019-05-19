let db_connection = require('../models/db_connection');

exports.getFriendsList = (req, res) => {
    const { account_login_id } = req.query;
    (async () => {
        try {
            let GET_FRIENDS = `SELECT *
            FROM Friends
            WHERE account_login_id = '${account_login_id}' AND status = 'Aceito'`;

            await db_connection.query(GET_FRIENDS, (err, result) => {
                if (err) {
                    res.send(`Error: ${err}`);
                } else {
                    return res.send(JSON.stringify(result));
                }
            })            
        } finally {
            db_connection.end();
        }
    })()
}
