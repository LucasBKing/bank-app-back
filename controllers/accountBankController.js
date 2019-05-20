let db_connection = require('../models/db_connection');

exports.createAccountBank = (req, res) => {
    const { account_type, balance, user_id } = req.body;

    (async () => {
        try {
            let INSERT_BANK_USER = `INSERT INTO AccountsBank (account_type, balance, user_id)
            VALUES ('${account_type}', '${balance}', '${user_id}')`;

            await db_connection.query(INSERT_BANK_USER, (err, results) => {
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

exports.getCurrentAccountBankBalance = (req, res) => {
    const { account_bank_id } = req.query;

    (async () => {
        try {
            let GET_CURRENT_DEBIT_BALANCE = 
            `SELECT balance FROM AccountsBank WHERE Id = ${account_bank_id}`;
            await db_connection.query(GET_CURRENT_DEBIT_BALANCE, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.send(JSON.stringify(results[0].balance));
                }
            });
        } finally {
            db_connection.end()
        }
    })()
}

// Getting an specific account bank account by id
exports.getAccountBankByID = (req, res) => {
    const { user_id } = req.query;
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM AccountsBank where user_id = '${user_id}'`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    if(results.length > 0)
                        var userAccountBank = {
                            account_bank_id: results[0].Id,
                            account_type: results[0].account_type,
                            balance: results[0].balance
                        } 
                    return res.send(userAccountBank);
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};

// Getting all bank accounts
exports.indexAccountsBank = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM AccountsBank`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.json({ results });
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};

exports.getUserByAccountBankId = (req, res) => {
    const { account_bank_id } = req.query;
    (async () => {
        try {
            await db_connection.query(`SELECT Users.first_name, Users.last_name
            FROM Users
            INNER JOIN AccountsBank
            on Users.Id = AccountsBank.user_id
            WHERE AccountsBank.Id = '${account_bank_id}'`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.send(JSON.stringify(results));
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};