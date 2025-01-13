import db from '../config/database.js';

export const getAllCategories = (req, res) => {
    db.query("SELECT * FROM `categories`", (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, categories: results });
    });
}

export const getSingleCategoryBooks = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM `books` INNER JOIN `categories` ON `categories`.`id`=`books`.`categories_id` WHERE `categories`.id = ?", [id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Books not found" });
        }

        return res.json({ success: true, catBooks: results });
    });
}

export const updateBookCategory = (req, res) => {
    const { bookID, categories_id  } = req.body;

    if (!categories_id) {
        return res.json({ success: false, message: "Category ID field is required" });
    }

    if (!bookID) {
        return res.json({ success: false, message: "Book ID field is required" });
    }
    

    db.query("UPDATE `books` SET `categories_id` = ? WHERE `id` = ?", [categories_id, bookID], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, message: "Book added to "+categories_id+" successfully" });
    });
}

export const deleteBookCategory = (req, res) => {
    const { book_id } = req.params;

    db.query("UPDATE `books` SET `categories_id` = '1' WHERE `id` = ?", [book_id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, message: "Book removed from category successfully" });
    });
}