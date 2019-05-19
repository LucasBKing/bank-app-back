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

exports.getStatUserRequest = (req, res) => {
    const { account_login_id } = req.query;
    (async () => {
        try {
            let GET_FRIENDS = ` SELECT *
            FROM Users AS A
            INNER JOIN AccountsLogin AS B on A.Id = B.user_id WHERE B.Id = '${account_login_id}'`;

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
exports.getUserIdByAccountLogin = (req, res) => {
    const { account_login_id } = req.query;

    (async () => {
        try {
            let GET_USER_ID = `SELECT user_id
            FROM AccountsLogin
            WHERE Id = '${account_login_id}'`;

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

exports.getFriendsRequests = (req, res) => {
    const { user_id } = req.query;

    (async () => {
        try {
            let GET_FRIENDS = `SELECT *
            FROM Friends
            WHERE account_to = '${user_id}' AND status="Enviado"`;

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


exports.updateFriendRequest = (req, res) => {
    const { user_id, id, status } = req.body;
    (async () => {
        try {
            let UPDATE_REQUEST = `UPDATE Friends
            SET status = '${status}'
            WHERE account_to = '${user_id}' AND account_login_id = '${id}'`;

            await db_connection.query(UPDATE_REQUEST, (err, result) => {
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
    const { account_login_id, user_id } = req.query;

    (async () => {
        try {

            let GET_POSSIBLE_FRIENDS = `SELECT U.Id, U.first_name, U.last_name
            FROM Users AS U
            LEFT JOIN Friends AS F
            on (F.account_login_id = '${account_login_id}' AND F.account_to = U.Id)
            WHERE F.account_login_id is null and F.account_to is null and U.Id != '${user_id}'`;

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

exports.updateCreditCardBalance = (req, res) => {
    const { credit_card_id , value } = req.body;

    (async () => {
        try {
            let UPDATE_CREDIT_CARD_BALANCE = 
            `UPDATE CreditCards SET balance = balance + ${value} WHERE Id = ${credit_card_id}`;
            await db_connection.query(UPDATE_CREDIT_CARD_BALANCE, (err, results) => {
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

