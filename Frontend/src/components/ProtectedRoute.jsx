import React, { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import api from "../api/axios";

export default function ProtectedRoute() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // إرسال طلب إلى راوت التحقق من Session
        const response = await api.get("/login");

        // قراءة authenticated من Backend
        if (response.data?.authenticated === true) {
          // المستخدم مسجل الدخول
          setAuthenticated(true);
        } else {
          // المستخدم غير مسجل الدخول
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        // Backend يرجع 401 عندما لا توجد Session
        setAuthenticated(false);
      } finally {
        // انتهى فحص Session
        setCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  /*
   * أثناء فحص Session
   */
  if (checkingAuth) {
    return null;
  }

  /*
   * المستخدم غير مسجل الدخول
   * يتم تحويله إلى صفحة Login
   */
  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /*
   * المستخدم مسجل الدخول
   * السماح له بالدخول إلى Dashboard
   */
  return <Outlet />;
}
