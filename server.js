const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");

// Pagination route
app.get("/users", (req, res) => {
    const limit = 5;                    // records per page
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // Query total count
    const countQuery = "SELECT COUNT(*) AS count FROM users";

    db.query(countQuery, (err, result) => {
        if (err) throw err;
        const totalRecords = result[0].count;
        const totalPages = Math.ceil(totalRecords / limit);

        // Fetch page records
        const dataQuery = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;

        db.query(dataQuery, (err, rows) => {
            if (err) throw err;

            res.render("users", {
                users: rows,
                currentPage: page,
                totalPages
            });
        });
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
