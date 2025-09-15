import React, { useState } from "react";
import { Save } from "lucide-react";

function EditRetailerForm({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      id: `RET-${Date.now()}`,
      name: "",
      address: "",
      email: "",
      contact: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in contact number
    if (name === "contact") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
            }}
          >
            <Save size={16} /> Save
          </button>
        </div>

        {/* Auto-generated ID */}
        <h4
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
          }}
        >
          {formData.id || "Auto-Generated Retailer ID..."}
        </h4>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1.5rem" }}
        >
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

          {/* Contact (only numbers) */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              placeholder="Input..."
              onChange={handleChange}
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
