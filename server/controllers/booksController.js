import e from "express";
import db from "../config/database.js";

export const getBooks = (req, res) => {
    db.query("SELECT * FROM `books`", (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, books: results });
    });
};

export const getBook = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM `books` WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Book not found" });
        }

        return res.json({ success: true, book: results[0] });
    });
};

export const addBook = (req, res) => {
    const { title, author, publication_year, category } = req.body;

    if (!title) {
        return res.json({ success: false, message: "Title field is required" });
    } else if (!author) {
        return res.json({ success: false, message: "Author field is required" });
    } else if (!publication_year) {
        return res.json({ success: false, message: "Publication year field is required" });
    } else if (isNaN(publication_year)) {
        return res.json({ success: false, message: "Publication year must be a number" });
    } else if (publication_year < 0) {
        return res.json({ success: false, message: "Publication year can't be a negative number" });
    } else if (publication_year > new Date().getFullYear()) {
        return res.json({ success: false, message: "Publication year cannot be in the future" });
    } else if (publication_year.toString().length !== 4) {
        return res.json({ success: false, message: "Publication year must be a 4-digit number" });
    } else if (!category) {
        return res.json({ success: false, message: "Category field is required" });
    }


    db.query("SELECT * FROM `books` WHERE title = ?", [title], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }
        if (results.length === 1) {
            return res.json({ success: false, message: "Book already added" });
        }

        db.query("INSERT INTO `books` (title, author, publication_year, categories_id) VALUES (?, ?, ?, ?)", [title, author, publication_year, category], (err, result) => {
            if (err) {
                return res.json({ success: false, message: "Database error: " + err.message });
            }

            return res.json({ success: true, message: "Book added successfully" });
        });
    });



};

export const updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author, publication_year, category } = req.body;

    if (!title) {
        return res.json({ success: false, message: "Title field is required" });
    } else if (!author) {
        return res.json({ success: false, message: "Author field is required" });
    } else if (!publication_year) {
        return res.json({ success: false, message: "Publication year field is required" });
    } else if (isNaN(publication_year)) {
        return res.json({ success: false, message: "Publication year must be a number" });
    } else if (publication_year < 0) {
        return res.json({ success: false, message: "Publication year must be a positive number" });
    } else if (publication_year > new Date().getFullYear()) {
        return res.json({ success: false, message: "Publication year cannot be in the future" });
    } else if (publication_year.toString().length !== 4) {
        return res.json({ success: false, message: "Publication year must be a 4-digit number" });
    } else if (!category) {
        return res.json({ success: false, message: "Category field is required" });
    }

    db.query("UPDATE `books` SET title = ?, author = ?, publication_year = ?, categories_id = ? WHERE id = ?", [title, author, publication_year, category, id], (err, result) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: "Book not found" });
        }

        return res.json({ success: true, message: "Book updated successfully" });
    });
};

export const deleteBook = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM `books` WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: "Book not found" });
        }

        return res.json({ success: true, message: "Book deleted successfully" });
    });
}

export const getCategories = (req, res) => {
    db.query("SELECT * FROM `categories`", (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, categories: results });
    });
};