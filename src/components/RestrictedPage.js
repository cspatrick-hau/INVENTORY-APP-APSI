import React from "react";

function RestrictedPage({ pageName, allowedRoles = [], component: Component, userRole }) {
  // Normalize roles for comparison
  const normalizedRole = String(userRole || "").trim().toLowerCase();
  const allowed = allowedRoles.map((r) => r.trim().toLowerCase());

  // If role not allowed → deny access
  if (!allowed.includes(normalizedRole)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#2f3453",
            padding: "2rem",
            borderRadius: "0.75rem",
            width: "420px",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Access Denied</h2>
          <p>
            You do not have permission to access <strong>{pageName}</strong>.
            <br />
            (Your role: {userRole || "Unknown"})
          </p>
        </div>
      </div>
    );
  }

  // If allowed → render the component
  return Component ? <Component /> : null;
}

export default RestrictedPage;
