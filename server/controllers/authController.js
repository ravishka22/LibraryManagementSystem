import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
import e from "express";

export const register = (req, res) => {
    const { name, email, password } = req.body;

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
            return res.json({ success: false, message: `${email} is already registered` });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.json({ success: false, message: "Error hashing password: " + err.message });
            }

            db.query("INSERT INTO users (name, email, password, stetus) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, 1], (err, result) => {
                if (err) {
                    return res.json({ success: false, message: "Database error: " + err.message });
                }

                const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '7d' });

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                return res.json({ success: true, message: "User registered successfully" });
            });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email field is required" });
    } else if (!/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(email)) {
        return res.json({ success: false, message: "Invalid Email" });
    } else if (!password) {
        return res.json({ success: false, message: "Password field is required" });
    }

    db.query("SELECT * FROM `users` WHERE email = ?", [email], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                return res.json({ success: false, message: "Error comparing passwords: " + err.message });
            }

            if (!isMatch) {
                return res.json({ success: false, message: "Invalid email or password" });
            }

            const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

                if (results[0].stetus === 1) {
                    return res.json({ success: true, stetus: true, message: "User logged in successfully" });
                }else{
                    return res.json({ success: true, stetus: false, message: "User logged in successfully" });
                }
            



            
        });
    });
};

export const logout = (req, res) => {
    res.clearCookie("token");

    return res.json({ success: true, message: "User logged out successfully" });
};


