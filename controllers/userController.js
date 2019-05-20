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

// Get a user
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

















