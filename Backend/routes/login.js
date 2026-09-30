import express from "express";

const router = express.Router();

/*
 * ============================================================
 * Check authentication
 * GET /login
 * ============================================================
 */
router.get("/", (req, res) => {
  if (req.session?.user) {
    return res.status(200).json({
      success: true,
      authenticated: true,
      user: req.session.user,
    });
  }

  return res.status(401).json({
    success: false,
    authenticated: false,
    message: "المستخدم غير مسجل الدخول",
  });
});

/*
 * ============================================================
 * Login
 * POST /login
 * ============================================================
 */
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username !== "gli-institut" || password !== process.env.SECRET_KEY) {
    return res.status(401).json({
      success: false,
      authenticated: false,
      message: "اسم المستخدم أو كلمة المرور غير صحيحة",
    });
  }

  req.session.user = username;

  return res.status(200).json({
    success: true,
    authenticated: true,
    message: "تم تسجيل الدخول بنجاح",
    user: req.session.user,
  });
});

/*
 * ============================================================
 * Logout
 * GET /login/out
 * ============================================================
 */
router.get("/out", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy error:", err);

      return res.status(500).json({
        success: false,
        message: "حدث خطأ أثناء تسجيل الخروج",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      success: true,
      authenticated: false,
      message: "تم تسجيل الخروج بنجاح",
    });
  });
});

export default router;
