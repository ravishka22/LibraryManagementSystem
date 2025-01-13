import db from "../config/database.js";

export const getUserData = (req, res) => {
    const { id } = req.body;

    db.query("SELECT * FROM `users` WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.json({ success: false, message: "Database error: " + err.message });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ 
            success: true, 
            userData: {
                id: results[0].id,
                name: results[0].name,
                email: results[0].email
            } });
    });
}