import React, { useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "./supabaseClient"; // adjust path

function EditRetailerForm({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      address: "",
      email: "",
      contact_number: "",
    }
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact_number") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let error;

      if (initialData?.id) {
        // --- UPDATE ---
        ({ error } = await supabase
          .from("retailer_supplier")
          .update({
            name: formData.name,
            address: formData.address,
            email: formData.email,
            contact_number: formData.contact_number,
            type: "retailer", // ensure it always stays "retailer"
          })
          .eq("id", initialData.id));
      } else {
        // --- INSERT ---
        ({ error } = await supabase.from("retailer_supplier").insert([
          {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            contact_number: formData.contact_number,
            type: "retailer", // auto-set type
          },
        ]));
      }

      if (error) {
        console.error("Database error:", error.message);
        alert("❌ Failed to save retailer: " + error.message);
      } else {
        alert("✅ Retailer saved successfully!");
        if (onSave) onSave(formData);
        if (onClose) onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Page Header */}
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#fff",
        }}
      >
        Retailer & Billing
      </h2>

      {/* Card */}
      <div
        style={{
          backgroundColor: "#363B5E",
          borderRadius: "0.75rem",
          padding: "2rem",
          color: "#fff",
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Header with Save Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>
            {initialData ? "Edit Retailer Details" : "Add Retailer Details"}
          </h3>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
          {/* Retailer Name */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Retailer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Input..."
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #475569",
                background: "#1E293B",
                color: "#fff",
              }}
            />
          </div>

          {/* Address */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Input..."
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #475569",
                background: "#1E293B",
                color: "#fff",
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Input..."
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #475569",
                background: "#1E293B",
                color: "#fff",
              }}
            />
          </div>

          {/* contact_number */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Contact Number
            </label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              placeholder="Input..."
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #475569",
                background: "#1E293B",
                color: "#fff",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRetailerForm;
