import pool from "../configs/connectDB";

const getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('home', { dataUser: rows });
};
const getDetailUser = async (req, res) => {
    let userID = req.params.id;
    let user = await pool.execute('SELECT * FROM users where id = ?', [userID]);
    return res.send(JSON.stringify(user[0]));
};

const createNewUser = async (req, res) => {
    let { firstname, lastname, email, phonenumber } = req.body;
    await pool.execute('insert into users(Firstname, Lastname, Email, Phonenumber) values(?,?,?,?)',
        [firstname, lastname, email, phonenumber]);
    return res.redirect('/');
};

module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
};