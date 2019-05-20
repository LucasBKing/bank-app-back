let db_connection = require('../models/db_connection');

exports.insertDeposit = (req, res) => {
    const { user_id, value } = req.body;

    (async () => {
        try {
            let INSERT_DEBIT_TRACK = `INSERT INTO DepositTrack (user_id, value)
            VALUES ('${user_id}', '${value}')`;
            await db_connection.query(INSERT_DEBIT_TRACK, (err, results) => {
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

exports.udpateDebitBalance = (req, res) => {
    const { user_id, value } = req.body;

    (async () => {
        try {
            let UPDATE_DEBIT_BALANCE = 
            `UPDATE AccountsBank SET balance = balance + ${value} WHERE user_id = ${user_id}`;
            await db_connection.query(UPDATE_DEBIT_BALANCE, (err, results) => {
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