let db_connection = require('../models/db_connection');
let bcrypt = require('bcrypt');

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