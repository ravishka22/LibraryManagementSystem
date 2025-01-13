import db from "../config/database.js";

export const getReadingList = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `reading_list` INNER JOIN `users` ON `reading_list`.`users_id`=`users`.`id` INNER JOIN `books` ON `reading_list`.`books_id`=`books`.`id` WHERE `users_id`= ?", [id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, readingList: results });
    });
};

export const addBookToReadingList = (req, res) => {
    const { users_id, books_id } = req.body;

    const date = new Date();

    if (books_id === 0) {
        return res.json({ success: false, message: "Please select a Book" });
    } else if (!users_id) {
        return res.json({ success: false, message: "User id field is required" });
    }

    db.query("SELECT * FROM `reading_list` WHERE users_id = ? AND books_id = ?", [users_id, books_id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }
        if (results.length === 1) {
            return res.json({ success: false, message: "Book already added" });
        }

        db.query("INSERT INTO `reading_list` (users_id, books_id, added_date) VALUES (?, ?, ?)", [users_id, books_id, date], (err, result) => {
            if (err) {
                return res.json({ success: false, message: "Database error: " + err.message });
            }

            return res.json({ success: true, message: "Book added to reading list" });
        });
    });
};

export const removeBookFromReadingList = (req, res) => {
    const books_id = req.params.id;
    const userID  = req.query.userID;
    if (!userID) {
        return res.json({ success: false, message: "User ID not found" });
    }
    if (!books_id) {
        return res.json({ success: false, message: "Book ID not found" });
    }

    db.query("DELETE FROM `reading_list` WHERE users_id = ? AND books_id = ? ", [userID, books_id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }
        if (results.affectedRows === 0) {
            return res.json({ success: false, message:"Book not found in reading list"});
        }

        return res.json({ success: true, message: "Book removed from reading list" });

    });
}