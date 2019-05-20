let db_connection = require('../models/db_connection');

exports.getFriendsRequests = (req, res) => {
    const { user_id, account_login_id } = req.query;

    (async () => {
        try {
            let GET_FRIENDS = `SELECT *
            FROM Friends
            WHERE account_to = '${user_id}' AND status="Enviado" AND action_id != '${account_login_id}'`;

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
    const { account_to, account_login_id, status, action_id } = req.body;
    (async () => {
        try {
            let UPDATE_REQUEST = `UPDATE Friends
            SET status = "${status}", action_id = '${action_id}'
            WHERE account_to = '${account_to}' AND account_login_id = '${account_login_id}'`;

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
    const { account_to, account_login_id, action_id } = req.body;

    (async () => {
        try {
            let ADD_TO_FRIEND_LIST= `INSERT INTO Friends (account_to, status, account_login_id, action_id)
            VALUES ('${account_to}', 'Enviado', '${account_login_id}', '${action_id}')`;

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

exports.getFriendsList = (req, res) => {
    const { account_login_id } = req.query;
    (async () => {
        try {
            let GET_FRIENDS = `SELECT *
            FROM Friends
            WHERE account_login_id = '${account_login_id}' AND status = 'Aceito'`;

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