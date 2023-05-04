import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import PrivateRoute from "layouts/private";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />

      <Route path="admin/*" element={<PrivateRoute />} >
        <Route path="admin/*" element={<AdminLayout />} />
      </Route>

      <Route path="rtl/*" element={<PrivateRoute />}>
        <Route path="rtl/*" element={<RtlLayout />} />
      </Route>

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
