let db_connection = require('../models/db_connection');

// Getting all users
exports.index = (req, res) => {
    (async () => {
        try {
            await db_connection.query(`SELECT * FROM User`, (err, results) => {
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

// exports.createUser = (req, res) => {
//     const { first_name, last_name, email, phone, birthday,  }
//     (async () => {
//         try {
//             await.db_connection.query(`INSERT INTO Users `)
//         }
//     })()
// }

