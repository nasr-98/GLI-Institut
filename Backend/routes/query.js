import express from "express";
import db from "../database.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET /api/registrations-query/sorted
|--------------------------------------------------------------------------
| Get registrations with sorting
|
| Examples:
|
| ?sort=first_name&order=asc
| ?sort=first_name&order=desc
| ?sort=last_name&order=asc
| ?sort=created_at&order=desc
|
|--------------------------------------------------------------------------
*/

router.get("/sorted", async (req, res) => {
  try {
    const { sort = "created_at", order = "desc" } = req.query;

    /*
    |--------------------------------------------------------------------------
    | Allowed sorting fields
    |--------------------------------------------------------------------------
    | We use a whitelist here.
    |
    | This is important because column names cannot safely be passed
    | to SQLite using ? placeholders.
    |
    */

    const allowedSortFields = {
      first_name: "first_name",
      last_name: "last_name",
      created_at: "created_at",
    };

    /*
    |--------------------------------------------------------------------------
    | Validate sort field
    |--------------------------------------------------------------------------
    */

    if (!allowedSortFields[sort]) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid sort field. Allowed values: first_name, last_name, created_at.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate order
    |--------------------------------------------------------------------------
    */

    const normalizedOrder = order.toLowerCase();

    if (!["asc", "desc"].includes(normalizedOrder)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order. Allowed values: asc or desc.",
      });
    }

    const sortColumn = allowedSortFields[sort];

    /*
    |--------------------------------------------------------------------------
    | Execute query
    |--------------------------------------------------------------------------
    */

    const registrations = await db.all(
      `
      SELECT *
      FROM registrations
      ORDER BY ${sortColumn} ${normalizedOrder}
      `,
    );

    return res.status(200).json({
      success: true,
      count: registrations.length,
      sortBy: sort,
      order: normalizedOrder,
      data: registrations,
    });
  } catch (error) {
    console.error("Sorting error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to sort registrations.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /api/registrations-query/search
|--------------------------------------------------------------------------
| Search registrations by first name or last name
|
| Examples:
|
| ?q=Ahmed
| ?q=Ali
|
|--------------------------------------------------------------------------
*/

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    /*
    |--------------------------------------------------------------------------
    | Validate search query
    |--------------------------------------------------------------------------
    */

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query.",
      });
    }

    const searchTerm = `%${q.trim()}%`;

    /*
    |--------------------------------------------------------------------------
    | Search first_name OR last_name
    |--------------------------------------------------------------------------
    */

    const registrations = await db.all(
      `
      SELECT *
      FROM registrations
      WHERE
        first_name LIKE ?
        OR last_name LIKE ?
      ORDER BY created_at DESC
      `,
      [searchTerm, searchTerm],
    );

    return res.status(200).json({
      success: true,
      count: registrations.length,
      search: q.trim(),
      data: registrations,
    });
  } catch (error) {
    console.error("Search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search registrations.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /api/registrations-query/search/first-name
|--------------------------------------------------------------------------
| Search only by first name
|
| Example:
|
| ?q=Ahmed
|
|--------------------------------------------------------------------------
*/

router.get("/search/first-name", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a first name to search.",
      });
    }

    const searchTerm = `%${q.trim()}%`;

    const registrations = await db.all(
      `
      SELECT *
      FROM registrations
      WHERE first_name LIKE ?
      ORDER BY first_name ASC
      `,
      [searchTerm],
    );

    return res.status(200).json({
      success: true,
      count: registrations.length,
      search: q.trim(),
      field: "first_name",
      data: registrations,
    });
  } catch (error) {
    console.error("First name search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search by first name.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /api/registrations-query/search/last-name
|--------------------------------------------------------------------------
| Search only by last name
|
| Example:
|
| ?q=Mustermann
|
|--------------------------------------------------------------------------
*/

router.get("/search/last-name", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a last name to search.",
      });
    }

    const searchTerm = `%${q.trim()}%`;

    const registrations = await db.all(
      `
      SELECT *
      FROM registrations
      WHERE last_name LIKE ?
      ORDER BY last_name ASC
      `,
      [searchTerm],
    );

    return res.status(200).json({
      success: true,
      count: registrations.length,
      search: q.trim(),
      field: "last_name",
      data: registrations,
    });
  } catch (error) {
    console.error("Last name search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search by last name.",
    });
  }
});

export default router;
