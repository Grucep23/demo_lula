import pool from "../configs/connectDB";
import multer from "multer";

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

const deleteUser = async (req, res) => {
    let userID = req.body.userID;
    await pool.execute('delete from users where id=?', [userID]);
    return res.redirect('/');
}

const editUser = async (req, res) => {
    let userID = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users where id = ?', [userID]);
    return res.render('update', { dataUser: user[0] });
}

const updateUser = async (req, res) => {
    let { firstname, lastname, email, phonenumber, id } = req.body;
    await pool.execute('update users set Firstname=?, Lastname=?, Email=?, Phonenumber=? where ID=?',
        [firstname, lastname, email, phonenumber, id]);
};

const uploadFile = async (req, res) => {
    return res.render('upload')
}

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // Display uploaded image for user validation
    res.send(`<hr /><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMutipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    return res.send(result);

}
module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    uploadFile,
    handleUploadFile,
    handleUploadMutipleFiles,
};