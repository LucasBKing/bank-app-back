let db_connection = require('../models/db_connection');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

// Getting all users
exports.indexUser = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM Users`, (err, results) => {
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

// Getting all users, but not the current
exports.getUsers = (req, res) => {
    const { user_id } = req.query;
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM Users WHERE Id != '${user_id}'`, (err, results) => {
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

// Getting all users, but not the current
exports.getUser = (req, res) => {
    const { user_id } = req.query;
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM Users WHERE Id = '${user_id}'`, (err, results) => {
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

// Getting an specific login account
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

// Getting all credit cards
exports.indexCreditCards = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM CreditCards`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.json( results );
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};

// Getting an specific creditcard
exports.getCreditCardById = (req, res) => {
    const { account_bank_id } = req.query;
    
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM CreditCards WHERE account_bank_id = '${account_bank_id}'`, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    if(results.length > 0 )
                        return res.json({ results });
                    
                }  
            });
        } finally {
            db_connection.end();
        }
    })()
};

exports.getFriendsList = (req, res) => {
    const { user_id } = req.query;
    (async () => {
        try {
            let GET_FRIENDS = `SELECT *
            FROM Friends
            WHERE account_login_id = '${user_id}'`;

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

exports.getPossibleFriends = (req, res) => {
    const { user_id, account_login_id } = req.query;

    (async () => {
        try {
            let GET_POSSIBLE_FRIENDS = `SELECT Users.Id, Users.first_name, Users.last_name
            FROM Users
            LEFT JOIN Friends
            on Users.Id != Friends.account_to
            WHERE Users.id != '${user_id}' AND Friends.account_login_id != '${account_login_id}'`;

            await db_connection.query(GET_POSSIBLE_FRIENDS, (err, result) => {
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
};

exports.addFriend = (req, res) => {
    const { account_to, account_login_id } = req.body;

    (async () => {
        try {
            let ADD_TO_FRIEND_LIST= `INSERT INTO Friends (account_to, status, account_login_id)
            VALUES ('${account_to}', 'Enviado', '${account_login_id}')`;

            await db_connection.query(ADD_TO_FRIEND_LIST, (err, result) => {
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

exports.createUser = (req, res) => {
    const { first_name, last_name, email, phone, CPF } = req.body;

    (async () => {
        try {
            let INSERT_USER = `INSERT INTO Users (first_name, last_name, email, phone, CPF) 
            VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${CPF}')`;

            await db_connection.query(INSERT_USER, (err, results) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.send(JSON.stringify(results));
                }
            })
        } finally {
            db_connection.end();
        }
    })()
};

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

exports.createCreditCard = (req, res) => {
    const { code, balance, credit_line, password_cd, due_date, account_bank_id } = req.body;

    console.log(req.body)

    bcrypt.hash(password_cd, 10, (err, hash) => {
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

