import db from "../config/database.js";
import bcrypt from "bcryptjs";

export const getUsers = (req, res) => {
    db.query("SELECT * FROM `users`", (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        return res.json({ success: true, users: results });
    });
};

export const getUser = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM `users` WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ 
            success: true, 
            userData: results});
    });
};

export const addUser = (req, res) => {
    const {name, email, password } = req.body;

    if (!name) {
        return res.json({ success: false, message: "Name field is required" });
    } else if (!email) {
        return res.json({ success: false, message: "Email field is required" });
    } else if (!/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(email)) {
        return res.json({ success: false, message: "Invalid Email" });
    } else if (!password) {
        return res.json({ success: false, message: "Password field is required" });
    } else if (password.length < 6) {
        return res.json({ success: false, message: "Password must be at least 6 characters" });
    } else if (password.length > 20) {
        return res.json({ success: false, message: "Password must be at most 20 characters" });
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(password)) {
        return res.json({ success: false, message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" });
    }

    db.query ("SELECT * FROM `users` WHERE email = ?", [email], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: `${email} is already added` });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.json({ success: false, message: "Error hashing password: " + err.message });
            }

            db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.json({ success: false, message: "Database error: " + err.message });
                }

                return res.json({ success: true, message: "User added successfully" });
            });
        });
    });
};