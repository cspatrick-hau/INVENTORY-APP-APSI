// src/Login.js
import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function Login({ onLogin }) {
  const [page, setPage] = useState("welcome"); // "welcome" | "login" | "register"
  const [username, setUsername] = useState(""); // email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Register form state
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [registerStep, setRegisterStep] = useState(1);

  // --- Login with Supabase ---
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setError("Please confirm your email before logging in.");
      } else {
        setError(error.message);
      }
    } else {
      setError("");

      // ✅ Fetch role from your "login" table
      const { data: profile, error: profileError } = await supabase
        .from("login")
        .select("roles")
        .eq("email", username)
        .maybeSingle();

      if (profileError) {
        console.error("Role fetch error:", profileError.message);
        setError("Could not fetch role.");
        return;
      }

      const userRole = profile?.roles || null;

      // ✅ Pass both user + role back to App.js
      onLogin({ user: data.user, role: userRole });
    }
  };

  // --- Step 1 Register (name + role) ---
  const handleRegisterStep1 = (e) => {
    e.preventDefault();
    if (!fullName || !role) {
      setError("Please enter your full name and select a role.");
      return;
    }
    setError("");
    setRegisterStep(2);
  };

  // --- Step 2 Register (account) ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords Do Not Match. Try Again.");
      return;
    }

    // 1. Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
      options: {
        data: { fullName, role },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      // 2. Insert into your "login" table
      const { error: insertError } = await supabase.from("login").insert([
        {
          username: fullName, // full name
          roles: role,        // role
          email: username,    // email
        },
      ]);

      if (insertError) {
        console.error("Insert into table failed:", insertError.message);
        setError(`Table insert failed: ${insertError.message}`);
      } else {
        console.log("User added to login table successfully!");
        setError("");
        // Reset form
        setFullName("");
        setRole("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setRegisterStep(1);
        setPage("login");
      }
    }
  };

  // --- Styling ---
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #1e293b, #3b4a84, #475569)",
  };

  const cardStyle = {
    background: "#2f3453",
    padding: "2rem",
    borderRadius: "0.75rem",
    textAlign: "center",
    width: "350px",
    color: "#fff",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
  };

  // --- Pages ---
  if (page === "welcome") {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "1.5rem" }}>
            Welcome to ASCDC <br /> Inventory System!
          </h2>
          <button
            onClick={() => setPage("login")}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              background: "transparent",
              border: "1px solid #64748b",
              borderRadius: "0.25rem",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            LOG IN
          </button>
          <button
            onClick={() => setPage("register")}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#fff",
              color: "#000",
              borderRadius: "0.25rem",
              cursor: "pointer",
              border: "none",
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h4 style={{ fontSize: "0.85rem", marginBottom: "0.5rem", opacity: 0.8 }}>
            ASCDC Inventory System
          </h4>
          <h2 style={{ marginBottom: "1rem" }}>Log In</h2>
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
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div style={{ textAlign: "left", marginBottom: "1rem" }}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
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
            <div style={{ textAlign: "left", marginBottom: "1rem" }}>
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
                marginTop: "0.5rem",
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
          <button
            onClick={() => setPage("welcome")}
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              background: "none",
              border: "none",
              color: "#93c5fd",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (page === "register") {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h4 style={{ fontSize: "0.85rem", marginBottom: "0.5rem", opacity: 0.8 }}>
            ASCDC Inventory System
          </h4>
          <h2 style={{ marginBottom: "1rem" }}>Register</h2>
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
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          {registerStep === 1 && (
            <form onSubmit={handleRegisterStep1}>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  <option value="">Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="Purchasing Officer">Purchasing Officer</option>
                  <option value="Warehouse Staff">Warehouse Staff</option>
                  <option value="CSR">CSR</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  background: "transparent",
                  border: "1px solid #64748b",
                  borderRadius: "0.25rem",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                NEXT
              </button>
            </form>
          )}
          {registerStep === 2 && (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "none",
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
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginTop: "0.5rem",
                  background: "transparent",
                  border: "1px solid #64748b",
                  borderRadius: "0.25rem",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                REGISTER
              </button>
            </form>
          )}
          <button
            onClick={() => {
              setPage("welcome");
              setRegisterStep(1);
            }}
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              background: "none",
              border: "none",
              color: "#93c5fd",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Login;
