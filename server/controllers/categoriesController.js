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

    db.query("SELECT `books`.`id`, `title` FROM `books` INNER JOIN `categories` ON `categories`.`id`=`books`.`categories_id` WHERE `categories`.id = ?", [id], (err, results) => {
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

        return res.json({ success: true, message: "Book added to category successfully" });
    });
}

export const deleteBookCategory = (req, res) => {
    const book_id  = req.params.id
    const category_id = 1;

    console.log("Book ID:", book_id); 
    console.log("Category ID:", category_id); 

    if (!book_id) {
        return res.json({ success: false, message: "Book ID not found" });
    }

    db.query("UPDATE `books` SET `categories_id` = ? WHERE `id` = ?", [category_id, book_id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }
        console.log("Query Results:", results);

        return res.json({ success: true, message: "Book removed from category " });
    });
}