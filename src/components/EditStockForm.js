import React, { useState } from "react";
import { Save } from "lucide-react"; // ✅ Import from lucide-react

function SearchIcon({ size = 16, color = "white" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={20.9}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        right: "10px",
        top: "65%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
      className="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function EditStockForm({ onClose, onSave, initialData }) {
  const [item, setItem] = useState(initialData?.item || "");
  const [category, setCategory] = useState(initialData?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      const randomQuantity = Math.floor(Math.random() * 100) + 1;
      onSave({ item, category, quantity: randomQuantity });
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Page Header */}
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#fff",
        }}
      >
        Warehouse Operations
      </h2>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#363B5E",
          borderRadius: "0.75rem",
          padding: "2rem",
          margin: "0 auto",
          maxWidth: "600px",
          width: "100%",
          color: "#fff",
        }}
      >
        {/* Title + Save button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
            {initialData ? "Edit Item Details" : "Add Item Details"}
          </h3>
          <button
            type="submit"
            form="stockForm"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#22c55e",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            <Save size={18} /> Save
          </button>
        </div>

        {/* Form */}
        <form
          id="stockForm"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Item Dropdown */}
          <div style={{ position: "relative" }}>
            <label>Item</label>
            <select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: item ? "#f1f5f9" : "#94a3b8",
                marginTop: "0.25rem",
                appearance: "none",
              }}
            >
              <option value="" disabled>
                Search..
              </option>
              <option value="Monitor">Monitor</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Mouse">Mouse</option>
              <option value="Laptop">Laptop</option>
            </select>
            <SearchIcon />
          </div>

          {/* Category Dropdown */}
          <div style={{ position: "relative" }}>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: category ? "#f1f5f9" : "#94a3b8",
                marginTop: "0.25rem",
                appearance: "none",
              }}
            >
              <option value="" disabled>
                Search..
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
            </select>
            <SearchIcon />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStockForm;
