import { Pencil } from "lucide-react";

function ItemApproval({ assignments = [], onEdit }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return { backgroundColor: "#22c55e", color: "#fff" };
      case "Disapproved":
        return { backgroundColor: "#ef4444", color: "#fff" };
      case "Pending":
        return { backgroundColor: "#f59e0b", color: "#fff" };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#1E293B", borderRadius: "12px" }}>
      <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>
        Approval of Item Assignment
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#cbd5e1" }}>
            <th style={{ padding: "0.75rem 0" }}>Order Number</th>
            <th style={{ padding: "0.75rem 0" }}>Retailer ID</th>
            <th style={{ padding: "0.75rem 0" }}>Item</th>
            <th style={{ padding: "0.75rem 0" }}>Category</th>
            <th style={{ padding: "0.75rem 0" }}>Quantity</th>
            <th style={{ padding: "0.75rem 0" }}>Status</th>
            <th style={{ padding: "0.75rem 0" }}></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, idx) => (
            <tr
              key={idx}
              style={{
                borderTop: "1px solid #334155",
                color: "#f1f5f9",
              }}
            >
              <td style={{ padding: "0.75rem 0" }}>{assignment.orderNumber}</td>
              <td style={{ padding: "0.75rem 0" }}>{assignment.retailerId}</td>
              <td style={{ padding: "0.75rem 0" }}>{assignment.item}</td>
              <td style={{ padding: "0.75rem 0" }}>Label Item</td>
              <td style={{ padding: "0.75rem 0" }}>{assignment.quantity}</td>
              <td style={{ padding: "0.75rem 0" }}>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    ...getStatusStyle(assignment.status),
                  }}
                >
                  {assignment.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => onEdit(idx)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#fbbf24",
                  }}
                >
                  <Pencil size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemApproval;
