import React, { useState, useEffect } from "react";
import { X, Save, Plus, Minus } from "lucide-react";

function EditInboundForm({ onClose, onSave, initialData }) {
  const [quantity, setReceivedQty] = useState(0);
  const [damaged, setDamaged] = useState(0);
  const [spoiled, setSpoiled] = useState(0);
  const [missing, setMissing] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [poNumber, setPoNumber] = useState("");

  // Generate random PO number if not provided
  useEffect(() => {
    if (initialData?.poNumber) {
      setPoNumber(initialData.poNumber);
    } else {
      const randomPO = `PO-${Math.floor(1000 + Math.random() * 9000)}`;
      setPoNumber(randomPO);
    }

    if (initialData) {
      setReceivedQty(initialData.quantity || 0);
      setDamaged(initialData.damaged || 0);
      setSpoiled(initialData.spoiled || 0);
      setMissing(initialData.missing || 0);
      setRejected(initialData.rejected || 0);
    }
  }, [initialData]);

  const handleSave = () => {
    const updatedOrder = {
      ...initialData,
      poNumber,
      quantity,
      damaged,
      spoiled,
      missing,
      rejected,
    };
    onSave(updatedOrder);
  };

  const CounterInput = ({ label, value, setValue, width = "100%" }) => (
    <div style={{ width }}>
      <label>{label}</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #475569",
          borderRadius: "0.5rem",
          padding: "0.25rem 0.5rem",
          backgroundColor: "#262C4B",
          width: "100%",
        }}
      >
        <input
          type="text"
          value={value}
          readOnly
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        />
        <button
          onClick={() => setValue(value > 0 ? value - 1 : 0)}
          style={{
            flexShrink: 0,
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            marginLeft: "0.25rem",
          }}
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => setValue(value + 1)}
          style={{
            flexShrink: 0,
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
  );

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
            Edit Inbound Details
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
            fontSize: "2.5rem",
            fontWeight: "500",
            marginBottom: "1.5rem",
            color: "#ffffffff",
          }}
        >
          Auto-Generated Purchase Order Number...
        </h4>

        <div style={{ marginBottom: "1rem" }}>
          <label>Supplier ID</label>
          <input
            type="text"
            value={initialData?.supplierId || "Auto-Assigned Supplier ID"}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <label>Ordered Quantity</label>
            <input
              type="text"
              value={initialData?.quantity || "Auto-Assigned Ordered Qty"}
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

          <CounterInput
            label="Received Quantity"
            value={quantity}
            setValue={setReceivedQty}
          />
        </div>

        {/* Editable Counters */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 200px)",
            gap: "2rem",
            marginTop: "1rem",
            width: "250px",
          }}
        >
          <CounterInput label="Damaged" value={damaged} setValue={setDamaged} />
          <CounterInput label="Spoiled" value={spoiled} setValue={setSpoiled} />
          <CounterInput label="Missing" value={missing} setValue={setMissing} />
          <CounterInput label="Rejected" value={rejected} setValue={setRejected} />
        </div>
      </div>
    </div>
  );
}

export default EditInboundForm;
