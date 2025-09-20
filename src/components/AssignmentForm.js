import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaSave, FaSearch } from "react-icons/fa";
import { supabase } from "./supabaseClient"; // adjust this path as needed

function AssignmentForm({ onClose }) {
  const [orderNumber] = useState(`ORD-${Date.now()}`); // Auto-generated order number
  const [retailerId, setRetailerId] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [retailerOptions, setRetailerOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const onSave = async (data) => {
    const { error } = await supabase.from("item_assign").insert([data]);
    return { success: !error, error };
  };

  // 🔁 Fetch retailers (where type = 'retailer')
  useEffect(() => {
    const fetchRetailers = async () => {
      const { data, error } = await supabase
        .from("retailer_supplier")
        .select("id, name")
        .eq("type", "retailer");

      if (error) {
        console.error("Error fetching retailers:", error);
        return;
      }
      setRetailerOptions(data || []);
    };

    fetchRetailers();
  }, []);

  // 🔁 Fetch items (from purchasing table)
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("purchasing")
        .select("item");

      if (error) {
        console.error("Error fetching items:", error);
        return;
      }

      const uniqueItems = [...new Set(data.map((row) => row.item))];
      setItemOptions(uniqueItems);
    };

    fetchItems();
  }, []);

  // ➕ Quantity Controls
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // ✅ Handle Save to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    if (!retailerId) return setSaveError("Please select a retailer.");
    if (!item) return setSaveError("Please select an item.");

    const payload = {
      order_number: orderNumber, // use the generated order number here
      retailer_id: retailerId,
      item,
      quantity,
      status: "Pending",
    };

    try {
      setSaving(true);
      const result = await onSave(payload);

      if (result?.success) {
        onClose();
      } else {
        const message = result?.error?.message ?? "Save failed";
        setSaveError(message);
      }
    } catch (err) {
      setSaveError(err?.message ?? String(err));
    } finally {
      setSaving(false);
    }
  };

  // 🎨 UI Styles
  const styles = {
    container: {
      backgroundColor: "#363B5E",
      color: "#ffffff",
      padding: "2rem",
      borderRadius: "12px",
      maxWidth: "600px",
      margin: "2rem auto",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
    },
    title: { fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" },
    header: { fontSize: "1rem", marginBottom: "1.5rem", color: "#d1d5db" },
    label: { display: "block", marginBottom: "0.5rem", fontWeight: "500" },
    inputWrapper: { position: "relative", marginBottom: "1.5rem" },
    select: {
      width: "100%",
      padding: "0.8rem 1rem",
      border: "1px solid #555",
      borderRadius: "8px",
      backgroundColor: "#1E233D",
      color: "#ffffff",
      fontSize: "1rem",
      appearance: "none",
    },
    iconButton: {
      position: "absolute",
      right: "1rem",
      top: "70%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#ffffff",
      pointerEvents: "none",
    },
    quantityContainer: { display: "flex", alignItems: "center", gap: "0.5rem" },
    quantityButton: {
      backgroundColor: "#4c4f7a",
      color: "#ffffff",
      border: "none",
      padding: "0.5rem 0.75rem",
      borderRadius: "6px",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    saveButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      backgroundColor: "#22c55e",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      padding: "0.5rem 1rem",
      cursor: saving ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      opacity: saving ? 0.7 : 1,
    },
    saveIcon: { marginRight: "6px" },
    cancelButton: {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      backgroundColor: "#ef4444",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      fontWeight: "600",
    },
    errorText: { color: "#ffb4b4", marginTop: "0.5rem" },
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <button type="button" style={styles.cancelButton} onClick={onClose}>
        Cancel
      </button>

      <button type="submit" style={styles.saveButton} disabled={saving}>
        <FaSave style={styles.saveIcon} />
        {saving ? "Saving..." : "Save"}
      </button>

      <h3 style={styles.header}>Add Assignment</h3>
      <h2 style={styles.title}>Order Number: {orderNumber}</h2>

      {/* Retailer Dropdown */}
      <div style={styles.inputWrapper}>
        <label style={styles.label}>Retailer</label>
        <select
          value={retailerId}
          onChange={(e) => setRetailerId(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>
            Select Retailer...
          </option>
          {retailerOptions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name ?? r.id}
            </option>
          ))}
        </select>
        <span style={styles.iconButton}>
          <FaSearch />
        </span>
      </div>

      {/* Item Dropdown */}
      <div style={styles.inputWrapper}>
        <label style={styles.label}>Item</label>
        <select
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>
            Select Item...
          </option>
          {itemOptions.map((itm) => (
            <option key={itm} value={itm}>
              {itm}
            </option>
          ))}
        </select>
        <span style={styles.iconButton}>
          <FaSearch />
        </span>
      </div>

      {/* Quantity Control */}
      <div style={styles.inputWrapper}>
        <label style={styles.label}>Quantity</label>
        <div style={styles.quantityContainer}>
          <input type="number" readOnly value={quantity} style={styles.select} />
          <button type="button" onClick={decrement} style={styles.quantityButton}>
            <FaMinus />
          </button>
          <button type="button" onClick={increment} style={styles.quantityButton}>
            <FaPlus />
          </button>
        </div>
        {saveError && <div style={styles.errorText}>{saveError}</div>}
      </div>
    </form>
  );
}

export default AssignmentForm;
