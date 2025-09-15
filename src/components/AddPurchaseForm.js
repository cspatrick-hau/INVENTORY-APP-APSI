import React, { useState, useEffect } from "react";
import { X, Save, Plus, Minus } from "lucide-react";

function AddPurchaseForm({ onClose, onSave, initialData }) {
  const [supplierId, setSupplierId] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("Auto-Assigned Category");
  const [quantity, setQuantity] = useState(1);
  const [receivingStatus, setReceivingStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");

  useEffect(() => {
    if (initialData) {
      setSupplierId(initialData.supplierId || "");
      setItem(initialData.item || "");
      setCategory(initialData.category || "Auto-Assigned Category");
      setQuantity(initialData.quantity || 1);
      setReceivingStatus(initialData.receivingStatus || "Pending");
      setPaymentStatus(initialData.paymentStatus || "Unpaid");
    }
  }, [initialData]);

  const handleSave = () => {
    const newOrder = {
      poNumber: initialData?.poNumber || `PO-${Date.now()}`,
      supplierId,
      item,
      category,
      quantity,
      total: quantity * 100,
      date: initialData?.date || new Date().toLocaleDateString(),
      receivingStatus,
      paymentStatus,
    };

    if (onSave) {
      onSave(newOrder);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          backgroundColor: "#363B5E",
          borderRadius: "0.75rem",
          padding: "2rem",
          margin: "2rem auto",
          maxWidth: "900px",
          width: "100%",
          color: "#fff",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>
              {initialData ? "Edit Purchasing Details" : "Add Purchasing Details"}
            </h2>
            <p style={{ fontSize: "1.5rem", color: "#ffffffff" }}>
              Auto-Generate Purchase Order Number...
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                backgroundColor: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              <Save size={16} /> Save
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                color: "#ef4444",
                border: "1px solid #ef4444",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              <X size={16} /> Close
            </button>
          </div>
        </div>

        {/* Supplier ID */}
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <label>Supplier ID</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 2rem 0.5rem 0.5rem",
              color: supplierId ? "#f1f5f9" : "#94a3b8",
              appearance: "none",
            }}
          >
            <option value="" disabled>
              Search..
            </option>
            <option value="SUP-001">SUP-001</option>
            <option value="SUP-002">SUP-002</option>
            <option value="SUP-003">SUP-003</option>
          </select>

          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="25"
            fill="none"
            stroke="white"
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
        </div>

        {/* Item */}
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <label>Item</label>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 2rem 0.5rem 0.5rem",
              color: item ? "#f1f5f9" : "#94a3b8",
              appearance: "none",
            }}
          >
            <option value="" disabled>
              Search..
            </option>
            <option value="Item A">Item A</option>
            <option value="Item B">Item B</option>
            <option value="Item C">Item C</option>
          </select>

          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="25"
            fill="none"
            stroke="white"
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
        </div>

        {/* Category + Quantity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              disabled
              style={{
                width: "97%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: "#94a3b8",
              }}
            />
          </div>

          <div>
            <label>Quantity</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #475569",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "#262C4B",
              }}
            >
              <input
                type="text"
                value={quantity}
                readOnly
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              />
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                }}
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  marginLeft: "0.25rem",
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Receiving + Payment */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div>
            <label>Receiving Status</label>
            <select
              value={receivingStatus}
              onChange={(e) => setReceivingStatus(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: "#f1f5f9",
              }}
            >
              <option>Received</option>
              <option>Pending</option>
            </select>
          </div>

          <div>
            <label>Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: "#f1f5f9",
              }}
            >
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPurchaseForm;
