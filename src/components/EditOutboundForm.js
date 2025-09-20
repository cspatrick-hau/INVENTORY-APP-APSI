import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { supabase } from "../components/supabaseClient"; // ✅ adjust path if needed

function EditOutboundForm({ onClose, initialData, refreshOutbound }) {
  const [status, setStatus] = useState("Packed");

  useEffect(() => {
    if (initialData) {
      setStatus(initialData.status || "Packed");
    }
  }, [initialData]);

  const handleSave = async () => {
    if (!initialData?.id) {
      console.error("Missing outbound order ID");
      return;
    }

    const { error } = await supabase
      .from("warehouse_operations")
      .update({ status })
      .eq("id", initialData.id);

    if (error) {
      console.error("Error updating outbound order:", error);
    } else {
      if (refreshOutbound) {
        await refreshOutbound(); // ✅ re-fetch outbound orders
      }
      onClose(); // ✅ close modal after saving
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
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
            Edit Outbound Details
          </h2>
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
        <h4
          style={{
            fontSize: "2rem",
            fontWeight: "500",
            marginBottom: "1.5rem",
            color: "#fff",
          }}
        >
          {initialData?.orderNumber || "Auto-Generated Order Number..."}
        </h4>

        {/* Retailer ID */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Retailer ID</label>
          <input
            type="text"
            value={initialData?.retailerId || "Auto-Assigned Retailer ID"}
            disabled
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              color: "#94a3b8",
            }}
          />
        </div>

        {/* Item */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Item</label>
          <input
            type="text"
            value={initialData?.item || "Auto-Assigned Item"}
            disabled
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              color: "#94a3b8",
            }}
          />
        </div>

        {/* Quantity + Delivery Status */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          {/* Quantity */}
          <div>
            <label>Quantity</label>
            <input
              type="text"
              value={initialData?.quantity || "Auto-Assigned Ordered Quantity"}
              disabled
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: "#94a3b8",
              }}
            />
          </div>

          {/* Delivery Status */}
          <div>
            <label>Delivery Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: "#fff",
              }}
            >
              <option value="Packed">Packed</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>

        {/* Total */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Total</label>
          <input
            type="text"
            value={initialData?.total || "Auto-Assigned Total Amount"}
            disabled
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              color: "#94a3b8",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditOutboundForm;
