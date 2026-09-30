import express from "express";
import db, { uuidv4 } from "../database.js";

import "dotenv/config";

const router = express.Router();

function requireLogin(req, res, next) {
  if (req.session?.user) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: "تسجيل الدخول مطلوب",
  });
}

router.use(requireLogin);

/*
|--------------------------------------------------------------------------
| Delete dashboard/null-id
|--------------------------------------------------------------------------
| delete exception case where id is null
|
*/

router.delete("/null-id", async (req, res) => {
  try {
    const result = await db.run(`
      DELETE FROM registrations
      WHERE rowid = (
        SELECT rowid
        FROM registrations
        WHERE id IS NULL
        LIMIT 1
      )
    `);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: "No registration with NULL id found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Search /dashboard/search
|--------------------------------------------------------------------------
| Search among registrations
|
*/

router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q?.trim();

    // إذا لم توجد كلمة بحث
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required.",
      });
    }

    const searchPattern = `%${keyword}%`;

    const registrations = await db.all(
      `
      SELECT *
      FROM registrations
      WHERE
        id LIKE ?
        OR first_name LIKE ?
        OR last_name LIKE ?
        OR email LIKE ?
        OR phone LIKE ?
        OR gender LIKE ?
        OR course_level LIKE ?
        OR course_type LIKE ?
        OR preferred_start_date LIKE ?
        OR addInfo LIKE ?
        OR status LIKE ?
        OR created_at LIKE ?
      ORDER BY created_at DESC
      `,
      [
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
      ],
    );

    return res.status(200).json({
      success: true,
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
| GET /restfull
|--------------------------------------------------------------------------
| Get all registrations
|
*/

router.get("/", async (req, res) => {
  try {
    const registrations = await db.all(`
      SELECT *
      FROM registrations
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch registrations.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /api/registrations/:id
|--------------------------------------------------------------------------
| Get one registration by UUID
|
*/

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await db.get(
      `
      SELECT *
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error("Error fetching registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch registration.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| POST /api/registrations
|--------------------------------------------------------------------------
| Create a new registration
|
*/

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      courseLevel,
      courseType,
      preferredStartDate,
      addInfo,
      status,
      privacyPolicy,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !courseLevel ||
      !courseType ||
      !status ||
      !preferredStartDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Validate privacy policy
    if (privacyPolicy !== true) {
      return res.status(400).json({
        success: false,
        message: "Privacy Policy agreement is required.",
      });
    }

    // Generate UUID
    const id = uuidv4();

    // Insert into database
    await db.run(
      `
      INSERT INTO registrations (
        id,
        first_name,
        last_name,
        email,
        phone,
        gender,
        course_level,
        course_type,
        preferred_start_date,
        addInfo,
        status,
        privacy_policy
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        firstName,
        lastName,
        email,
        phone,
        gender,
        courseLevel,
        courseType,
        preferredStartDate,
        addInfo || null,
        status || "bewerber",
        privacyPolicy ? 1 : 0,
      ],
    );

    // Get newly created registration
    const registration = await db.get(
      `
      SELECT *
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    return res.status(201).json({
      success: true,
      message: "Registration created successfully.",
      data: registration,
    });
  } catch (error) {
    console.error("Error creating registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create registration.",
    });
  }
});

/*
Adding without Privacy Policy
 */

router.post("/add", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      courseLevel,
      courseType,
      preferredStartDate,
      addInfo,
      status,
      privacyPolicy,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !courseLevel ||
      !courseType ||
      !status ||
      !preferredStartDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Generate UUID
    const id = uuidv4();

    // Insert into database
    await db.run(
      `
      INSERT INTO registrations (
        id,
        first_name,
        last_name,
        email,
        phone,
        gender,
        course_level,
        course_type,
        preferred_start_date,
        addInfo,
        status,
        privacy_policy
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        firstName,
        lastName,
        email,
        phone,
        gender,
        courseLevel,
        courseType,
        preferredStartDate,
        addInfo || null,
        status || "bewerber",
        privacyPolicy,
      ],
    );

    // Get newly created registration
    const registration = await db.get(
      `
      SELECT *
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    return res.status(201).json({
      success: true,
      message: "Registration created successfully.",
      data: registration,
    });
  } catch (error) {
    console.error("Error creating registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create registration.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| PUT /api/registrations/:id
|--------------------------------------------------------------------------
| Replace/update a complete registration
|
*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      courseLevel,
      courseType,
      preferredStartDate,
      addInfo,
      status,
    } = req.body;

    // *Check if registration exists*
    const existingRegistration = await db.get(
      `
      SELECT id
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    // *Validate required fields*
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !courseLevel ||
      !courseType ||
      !preferredStartDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // *Validate status*
    const allowedStatuses = ["bewerber", "student", "archive"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration status.",
      });
    }

    // *Update registration*
    await db.run(
      `
      UPDATE registrations
      SET
        first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?,
        gender = ?,
        course_level = ?,
        course_type = ?,
        preferred_start_date = ?,
        addInfo = ?,
        status = ?
      WHERE id = ?
      `,
      [
        firstName,
        lastName,
        email,
        phone,
        gender,
        courseLevel,
        courseType,
        preferredStartDate,
        addInfo || null,
        status,
        id,
      ],
    );

    // *Get updated registration*
    const registration = await db.get(
      `
      SELECT *
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    return res.status(200).json({
      success: true,
      message: "Registration updated successfully.",
      data: registration,
    });
  } catch (error) {
    console.error("Error updating registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update registration.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| PATCH /api/registrations/:id
|--------------------------------------------------------------------------
| Update specific fields
|
*/

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = {
      firstName: "first_name",
      lastName: "last_name",
      email: "email",
      phone: "phone",
      gender: "gender",
      courseLevel: "course_level",
      courseType: "course_type",
      preferredStartDate: "preferred_start_date",
      addInfo: "addInfo",
      privacyPolicy: "privacy_policy",
    };

    const updates = [];
    const values = [];

    for (const [field, value] of Object.entries(req.body)) {
      if (allowedFields[field] !== undefined) {
        updates.push(`${allowedFields[field]} = ?`);

        if (field === "privacyPolicy") {
          values.push(value ? 1 : 0);
        } else {
          values.push(value);
        }
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    // Check if registration exists
    const existingRegistration = await db.get(
      `
      SELECT id
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    values.push(id);

    await db.run(
      `
      UPDATE registrations
      SET ${updates.join(", ")}
      WHERE id = ?
      `,
      values,
    );

    const registration = await db.get(
      `
      SELECT *
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    return res.status(200).json({
      success: true,
      message: "Registration updated successfully.",
      data: registration,
    });
  } catch (error) {
    console.error("Error patching registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update registration.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE /api/registrations/:id
|--------------------------------------------------------------------------
| Delete one registration
|
*/

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if registration exists
    const existingRegistration = await db.get(
      `
      SELECT id
      FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    await db.run(
      `
      DELETE FROM registrations
      WHERE id = ?
      `,
      [id],
    );

    return res.status(200).json({
      success: true,
      message: "Registration deleted successfully.",
      id,
    });
  } catch (error) {
    console.error("Error deleting registration:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete registration.",
    });
  }
});

export default router;
