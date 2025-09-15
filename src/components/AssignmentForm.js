// AssignmentForm.js
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaSave, FaSearch } from "react-icons/fa";

function AssignmentForm({ onSave, onClose, initialData }) {
  const isEditMode = !!initialData;
  const [retailerId, setRetailerId] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderNumber, setOrderNumber] = useState("");

  // Sample options for dropdowns
  const retailerOptions = ["RET-001", "RET-002", "RET-003"];
  const itemOptions = ["Laptop", "Keyboard", "Mouse", "Monitor"];

  useEffect(() => {
    if (isEditMode) {
      setRetailerId(initialData.retailerId || "");
      setItem(initialData.item || "");
      setQuantity(initialData.quantity || 1);
      setOrderNumber(initialData.orderNumber || "");
    } else {
      const randomNum = Math.floor(100 + Math.random() * 900);
      setOrderNumber(`ORD-${randomNum}`);
    }
  }, [initialData, isEditMode]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssignment = {
      orderNumber,
      retailerId,
      item,
      quantity,
      status: isEditMode ? initialData.status : "Pending",
    };
    onSave(newAssignment);
  };

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
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
    },
    header: {
      fontSize: "1rem",
      marginBottom: "1.5rem",
      color: "#d1d5db",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
    },
    inputWrapper: {
      position: "relative",
      marginBottom: "1.5rem",
    },
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
      cursor: "pointer",
      pointerEvents: "none",
    },
    quantityContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
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
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
    },
    saveIcon: {
      marginRight: "6px",
    },
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
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      {/* Save / Cancel Buttons */}
      <button type="submit" style={styles.saveButton}>
        <FaSave style={styles.saveIcon} />
        Save
      </button>

      {/* Header */}
      <h3 style={styles.header}>Add Assignment of Items to the Retailers</h3>
      <h2 style={styles.title}>
        {"Auto-Generated Order Number..."}
      </h2>

      {/* Retailer ID Dropdown */}
      <div style={styles.inputWrapper}>
        <label style={styles.label}>Retailer ID</label>
        <select
          value={retailerId}
          onChange={(e) => setRetailerId(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>
            Search...
          </option>
          {retailerOptions.map((ret) => (
            <option key={ret} value={ret}>
              {ret}
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
            Search...
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

      {/* Quantity */}
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
      </div>
    </form>
  );
}

export default AssignmentForm;
