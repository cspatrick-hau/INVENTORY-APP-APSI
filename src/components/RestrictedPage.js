import React, { useState } from "react";

function RestrictedPage({ pageName, onValidate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onValidate(username, password);
    if (!success) {
      setError("Invalid Log In Credentials. Try Again.");
    } else {
      setError("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#2f3453",
          padding: "2rem",
          borderRadius: "0.75rem",
          width: "420px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h4 style={{ opacity: 0.8 }}>{pageName} Page</h4>
        <h2 style={{ marginBottom: "1rem" }}>
          This page is restricted.
          <br /> Kindly log in to continue.
        </h2>

        {/* Error message right under the header */}
        {error && (
          <div
            style={{
              background: "#fca5a5",
              border: "1px solid #f87171",
              borderRadius: "0.25rem",
              color: "#000",
              fontSize: "0.9rem",
              padding: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem", textAlign: "left" }}>
            <label>Email Address</label>
            <input
              type="text"
              placeholder="Enter your email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "none",
                marginTop: "0.25rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem", textAlign: "left" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "none",
                marginTop: "0.25rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "transparent",
              border: "1px solid #64748b",
              borderRadius: "0.25rem",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestrictedPage;
