let db_connection = require('../models/db_connection');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


exports.loginUser = (req, res) => {
    const { login_name, password } = req.body;

    bcrypt.compareSync(password_cd, 10, (err, hash) => {
        (async () => {
            try {
                let INSERT_CREDIT_CARD = `INSERT INTO CreditCards (code, balance, credit_line, password_cd, due_date, account_bank_id)
                VALUES ('${code}', '${balance}', '${credit_line}', '${hash}', '${due_date}', '${account_bank_id}')`;
                await db_connection.query(INSERT_CREDIT_CARD, (err, results) => {
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
    })
}

exports.createAccountLogin = (req, res) => {
    const { login_name, password_login, user_id } = req.body;

    bcrypt.hash(password_login, 10, (err, hash) => {
        (async () => {
            try { 
                let INSERT_LOGIN_USER = `INSERT INTO AccountsLogin (password_login, login_name, user_id)
                VALUES ('${hash}', '${login_name}', '${user_id}')`;

                await db_connection.query(INSERT_LOGIN_USER, (err, results) => {
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
    })       
}


exports.getAccountLoginById = (req, res) => {
    const { user_id } = req.query;

    (async () => {
        try {
            let GET_USER_ID = `SELECT Id
            FROM AccountsLogin
            WHERE user_id = '${user_id}'`;

            await db_connection.query(GET_USER_ID, (err, result) => {
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

// Getting all login accounts
exports.indexAccountsLogin = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM AccountsLogin`, (err, results) => {
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

exports.loginAccount = (req, res) => {
    const { login_name, password } = req.query;
    (async () => {
        try {
            await db_connection.query(`SELECT login_name, password_login, user_id, Id FROM AccountsLogin WHERE login_name='${login_name}'`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    if (results.length > 0) {
                        
                        let dataValues = {
                            login: results[0].login_name,
                            password: results[0].password_login,
                            user_id: results[0].user_id,
                            login_id: results[0].Id
                        }
                        
                        if(bcrypt.compareSync(password, dataValues.password)) {
                            
                            let token = jwt.sign({ dataValues }, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            return res.send(token);
                            
                        } else {
                            return res.status(400).json({ error: 'user does not exits' });
                        }
                    } else {
                        return res.status(400).json({ error: 'user does not exits' });
                    }                    
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};


