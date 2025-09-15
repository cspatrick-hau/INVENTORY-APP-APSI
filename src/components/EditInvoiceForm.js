import React, { useState } from "react";
import { AlignJustify, Check } from "lucide-react";

export default function EditInvoiceForm({ billing, onClose, onUpdateStatus }) {
  const [step, setStep] = useState("view"); // view | charge | confirmCharge | confirmPaid

  const handleChargeClick = () => setStep("confirmCharge");
  const confirmCharge = () => setStep("charge");
  const handleMarkAsPaid = () => setStep("confirmPaid");
  const confirmPaid = () => {
    onUpdateStatus(billing.id, "Paid");
    onClose();
  };

  return (
    <div
      style={{
        backgroundColor: "#262C4B",
        minHeight: "100vh",
        color: "#f1f5f9",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "1.5rem",
          color: "#ffffff",
        }}
      >
        Retailer & Billing
      </h1>

      {/* CARD */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#363B5E",
          borderRadius: "0.75rem",
          border: "1px solid #475569",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1E293B",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #475569",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#fff" }}>
            Invoice
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#ffffffff",
              color: "#000000ff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.25rem 0.75rem",
              cursor: "pointer",
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Card Content */}
        <div style={{ padding: "1.5rem" }}>
          {/* Invoice Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              rowGap: "0.75rem",
            }}
          >
            <strong>Invoice Number:</strong> <span>{billing.invoiceNumber}</span>
            <strong>Order Number:</strong> <span>{billing.orderNumber}</span>
            <strong>Date:</strong> <span>{billing.date}</span>

            <strong>Retailer ID:</strong> <span>{billing.retailerId}</span>
            <strong>Retailer Name:</strong> <span>{billing.retailerName}</span>
            <strong>Address:</strong> <span>{billing.address}</span>
            <strong>Email:</strong> <span>{billing.email}</span>
            <strong>Contact:</strong> <span>{billing.contact}</span>

            <strong>Item:</strong> <span>{billing.item}</span>
            <strong>Quantity:</strong> <span>{billing.quantity}</span>

            <strong>Total Amount:</strong> <span>{billing.total}</span>
            <strong>Status:</strong> <span>{billing.status}</span>
          </div>

          {/* Payment Instructions */}
          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.85rem",
              color: "#cbd5e1",
              lineHeight: 1.5,
            }}
          >
            Payment instructions: <br />
            Please settle payment within 30 days. <br />
            Bank Transfer to BDO Acct #123-456-789 <br />
            or GCash #09123456789
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
              gap: "1rem",
            }}
          >
            {step === "view" && billing.status !== "Paid" && (
              <button
                onClick={handleChargeClick}
                style={{
                  backgroundColor: "#FFCA89",
                  color: "#9D4100",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: "600",
                }}
              >
                <AlignJustify size={18} />
                Charge Retailer
              </button>
            )}


            {step === "charge" && (
              <button
                onClick={handleMarkAsPaid}
                style={{
                  backgroundColor: "#22c55e",
                  color: "#005824",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: "600",
                }}
              >
                <Check size={18} />
                Mark as Paid
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Confirm Charge Popup */}
      {step === "confirmCharge" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setStep("view")}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              padding: "2rem",
              width: "400px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-left small header */}
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "1rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Status Changes
            </div>

            {/* Main content */}
            <p
              style={{
                marginTop: "2rem",
                marginBottom: "1.5rem",
                color: "#1e293b",
                textAlign: "center",
              }}
            >
              <b>Are you sure you want to charge this retailer?</b>
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={confirmCharge}
                style={{
                  backgroundColor: "#B3FFA6",
                  color: "#0E5F00",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setStep("view")}
                style={{
                  backgroundColor: "#FF8686",
                  color: "#A50A0A",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Confirm Paid Popup */}
      {step === "confirmPaid" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setStep("charge")}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              padding: "2rem",
              width: "400px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-left small header */}
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "1rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Status Changes
            </div>

            {/* Main content */}
            <p
              style={{
                marginTop: "2rem",
                marginBottom: "1.5rem",
                color: "#1e293b",
                textAlign: "center",
              }}
            >
              <b>Confirm Payment for this Order?</b>
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={confirmPaid}
                style={{
                  backgroundColor: "#B3FFA6",
                  color: "#0E5F00",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setStep("charge")}
                style={{
                  backgroundColor: "#FF8686",
                  color: "#A50A0A",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
