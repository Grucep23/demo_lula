import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: "ok",
        data: rows,
    })
};

let createNewUser = async (req, res) => {
    let { firstname, lastname, email, phonenumber } = req.body;

    if (!firstname || !lastname || !email || !phonenumber) {
        return res.status(200).json({
            message: `missing required params`
        })
    };

    await pool.execute('insert into users(Firstname, Lastname, Email, Phonenumber) values(?,?,?,?)',
        [firstname, lastname, email, phonenumber]);
    return res.status(200).json({
        message: "ok"
    })
};

let updateUser = async (req, res) => {
    let { firstname, lastname, email, phonenumber, id } = req.body;
    if (!firstname || !lastname || !email || !phonenumber || !id) {
        return res.status(200).json({
            message: `missing required params`
        })
    };
    await pool.execute('update users set Firstname=?, Lastname=?, Email=?, Phonenumber=? where ID=?',
        [firstname, lastname, email, phonenumber, id]);
    return res.status(200).json({
        message: "ok"
    })
}

let deleteUser = async (req, res) => {
    let userID = req.params.id;
    if (!userID) {
        return res.status(200).json({
            message: `missing required params`
        })
    };
    await pool.execute('delete from users where id=?', [userID]);
    return res.status(200).json({
        message: "ok"
    })
}
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,

};
