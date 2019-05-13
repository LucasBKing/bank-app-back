let db_connection = require('../models/db_connection');

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

// Getting all adresses
exports.indexAdress = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM Adresses`, (err, results) => {
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

exports.createAdress = (req, res) => {
    const { city, uf, street, num, neighborhood, zipcode } = req.body;

    (async () => {
        try {
            // First of all register the adress
            let INSERT_ADRESS = `INSERT INTO Adresses (street, num, neighborhood, city, uf, zipcode) 
            VALUES ('${street}', '${num}', '${neighborhood}', '${city}', '${uf}', '${zipcode}')`;

            await db_connection.query(INSERT_ADRESS, (err, result) => {
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

exports.createUser = (req, res) => {
    const { first_name, last_name, email, phone, birthday, adress_id, CPF } = req.body; 

    (async () => {
        try {
            let INSERT_USER = `INSERT INTO Users (first_name, last_name, email, phone, birthday, adress_id, CPF) 
            VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${birthday}', '${adress_id}', '${CPF}')`;

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

    (async () => {
        try {
            let INSERT_LOGIN_USER = `INSERT INTO AccountsLogin (password_login, login_name, user_id)
            VALUES ('${password_login}', '${login_name}', '${user_id}')`;

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

