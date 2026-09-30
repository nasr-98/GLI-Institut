import express from "express";

import { getDb } from "../database.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET /restfull/sorted
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
    const db = getDb();

    const { sort = "created_at", order = "desc" } = req.query;

    /*
    |--------------------------------------------------------------------------
    | Allowed sorting fields
    |--------------------------------------------------------------------------
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

    const normalizedOrder = String(order).toLowerCase();

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

    const registrations = await db.all(`
      SELECT *
      FROM registrations
      ORDER BY ${sortColumn} ${normalizedOrder}
    `);

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
| GET /restfull/search
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
    const db = getDb();

    const { q } = req.query;

    /*
    |--------------------------------------------------------------------------
    | Validate search query
    |--------------------------------------------------------------------------
    */

    if (!q || !String(q).trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query.",
      });
    }

    const searchValue = String(q).trim();
    const searchTerm = `%${searchValue}%`;

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
      search: searchValue,
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
| GET /restfull/search/first-name
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
    const db = getDb();

    const { q } = req.query;

    if (!q || !String(q).trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a first name to search.",
      });
    }

    const searchValue = String(q).trim();
    const searchTerm = `%${searchValue}%`;

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
      search: searchValue,
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
| GET /restfull/search/last-name
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
    const db = getDb();

    const { q } = req.query;

    if (!q || !String(q).trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a last name to search.",
      });
    }

    const searchValue = String(q).trim();
    const searchTerm = `%${searchValue}%`;

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
      search: searchValue,
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
