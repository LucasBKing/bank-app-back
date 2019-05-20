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

exports.updateTransactionStatus = (req, res) => {
    const { Id } = req.body;

    (async () => {
        try {
            let GET_FRIENDS = `UPDATE Transactions
            SET status = 1
            WHERE Id = '${Id}'`;

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

exports.insertTransaction = (req, res) => {
    const { to_who, account_bank_id, value } = req.body;

    (async () => {
        try {
            let INSERT_TRANSACTION = `INSERT INTO Transactions (to_who, account_bank_id, value)
            VALUES ('${to_who}','${account_bank_id}','${value}')`;
            await db_connection.query(INSERT_TRANSACTION, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.send(JSON.stringify(results));
                }
            });
        } finally {
            db_connection.end()
        }
    })()
}