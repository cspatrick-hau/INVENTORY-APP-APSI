import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { supabase } from "./supabaseClient"; // ✅ correct path

const categories = [
  { name: "Fashion & Apparel" },
  { name: "Groceries & Household Supplies" },
  { name: "Pet Supplies" },
  { name: "Sports & Outdoors" },
  { name: "Automotive" },
  { name: "Hobbies & Collectibles" },
  { name: "Health & Beauty" },
  { name: "Home & Living" },
  { name: "Electronics & Gadgets" },
  { name: "Baby & Kids Essentials" },
];

function AddPurchaseForm({ onClose, onSave, initialData }) {
  const [supplierId, setSupplierId] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("Fashion & Apparel");
  const [quantity, setQuantity] = useState(1);
  const [receivingStatus, setReceivingStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  // ✅ Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setSupplierId(initialData.supplier_id || "");
      setItem(initialData.item || "");
      setCategory(initialData.category || "Fashion & Apparel");
      setQuantity(initialData.quantity || 1);
      setReceivingStatus(initialData.receiving_status || "Pending");
      setPaymentStatus(initialData.payment_status || "Unpaid");
    }
  }, [initialData]);

  // ✅ Fetch suppliers (only those with type = supplier)
  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from("retailer_supplier")
        .select("id, name, type")
        .eq("type", "supplier");

      if (error) {
        console.error("Error fetching suppliers:", error.message);
      } else {
        setSuppliers(data || []);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const newOrder = {
      po_number: initialData?.po_number || `PO-${Date.now()}`,
      supplier_id: supplierId,
      item,
      category,
      quantity,
      total: quantity * 100, 
      date: initialData?.date || new Date().toISOString().split("T")[0],
      receiving_status: receivingStatus,
      payment_status: paymentStatus,
    };

    try {
      let result;
      if (initialData) {
        result = await supabase
          .from("purchasing")
          .update(newOrder)
          .eq("id", initialData.id); // ✅ safer to use id
      } else {
        result = await supabase.from("purchasing").insert([newOrder]);
      }

      if (result.error) throw result.error;

      if (onSave) onSave(); // ✅ trigger refresh, no duplicate insert
      onClose();
    } catch (err) {
      console.error("Error saving order:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
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
              disabled={loading}
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
                opacity: loading ? 0.6 : 1,
              }}
            >
              <Save size={16} /> {loading ? "Saving..." : "Save"}
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

        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

        {/* Supplier Dropdown */}
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <label>Supplier</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              color: supplierId ? "#f1f5f9" : "#94a3b8",
            }}
          >
            <option value="">-- Select Supplier --</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Item */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Item</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter Item Name"
            style={{
              width: "100%",
              backgroundColor: "#262C4B",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              color: "#f1f5f9",
            }}
          />
        </div>

        {/* Category Dropdown + Quantity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
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
                color: "#f1f5f9",
              }}
            >
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                width: "100%",
                backgroundColor: "#262C4B",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                color: "#f1f5f9",
              }}
            />
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
