let db_connection = require('../models/db_connection');

exports.getListTransactions = (req, res) => {
    const { account_bank_id } = req.query;

    (async () => {
        try {
            let GET_FRIENDS = `SELECT *
            FROM Transactions
            WHERE account_bank_id = '${account_bank_id}' or to_who = '${account_bank_id}'`;

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