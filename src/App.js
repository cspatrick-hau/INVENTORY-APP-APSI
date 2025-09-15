import React, { useState } from "react";
import {
  Download, Plus, Tag, Eye
} from "lucide-react";
import AddPurchaseForm from "./components/AddPurchaseForm.js";
import EditInboundForm from "./components/EditInboundForm.js";
import EditOutboundForm from "./components/EditOutboundForm.js";
import EditStockForm from "./components/EditStockForm.js";
import AssignmentForm from "./components/AssignmentForm.js";
import EditRetailerForm from "./components/EditRetailerForm.js";
import EditInvoiceForm from "./components/EditInvoiceForm.js";
import Login from "./components/Login.js";
import RestrictedPage from "./components/RestrictedPage.js";
import Sidebar from "./components/Sidebar.js";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartData = [
  { name: "Item 1", value: 400 },
  { name: "Item 2", value: 300 },
  { name: "Item 3", value: 200 },
  { name: "Item 4", value: 500 },
];

const categories = [
  { name: "Fashion & Apparel", value: 120 },
  { name: "Groceries & Household Supplies", value: 90 },
  { name: "Pet Supplies", value: 70 },
  { name: "Sports & Outdoors", value: 80 },
  { name: "Automotive", value: 60 },
  { name: "Hobbies & Collectibles", value: 50 },
  { name: "Health & Beauty", value: 110 },
  { name: "Home & Living", value: 95 },
  { name: "Electronics & Gadgets", value: 130 },
  { name: "Baby & Kids Essentials", value: 85 },
];

const customersMost = [
  { name: "Customer A", value: 500 },
  { name: "Customer B", value: 400 },
  { name: "Customer C", value: 350 },
  { name: "Customer D", value: 300 },
  { name: "Customer E", value: 250 },
];

const customersLeast = [
  { name: "Customer F", value: 100 },
  { name: "Customer G", value: 120 },
  { name: "Customer H", value: 130 },
  { name: "Customer I", value: 140 },
  { name: "Customer J", value: 150 },
];

const itemsLeast = [
  { name: "Item X", value: 50 },
  { name: "Item Y", value: 70 },
  { name: "Item Z", value: 40 },
  { name: "Item W", value: 60 },
  { name: "Item V", value: 30 },
];

const COLORS = [
  "#3b82f6", 
  "#22c55e", 
  "#ef4444", 
  "#f59e0b", 
  "#8b5cf6", 
  "#ec4899", 
  "#06b6d4", 
  "#84cc16", 
  "#f97316", 
  "#14b8a6", 
];



function Dashboard() {
  return (
    <div>
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "2rem",   
        marginBottom: "0.5rem"
      }}>
        Dashboard
      </h2>

      {/* Item Tracker (Left) + Category Distribution & Stats (Right) */}
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "1.5rem",
        }}
      >
        {/* Item Tracker */}
        <div
          style={{
            backgroundColor: "#363B5E",
            padding: "1rem",
            borderRadius: "0.75rem",
            maxHeight: "500px",
            overflowY: "auto",
            width: "770px",
            border: "2px solid #334155", 
            boxSizing: "border-box",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#ffffff",
            }}
          >
            Item Tracker
          </h3>

          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
              color: "#ffffff",
            }}
          >
            <thead>
              <tr style={{ color: "#ffffffff" }}>
                <th style={{ padding: "0.75rem 0" }}>Retailer ID</th>
                <th style={{ padding: "0.75rem 0" }}>Address</th>
                <th style={{ padding: "0.75rem 0" }}>Item</th>
                <th style={{ padding: "0.75rem 0" }}>Quantity</th>
                <th style={{ padding: "0.75rem 0" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: "3px solid #ffffffff" }}>
                <td style={{ padding: "0.75rem 0" }}>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>
                  <span
                    style={{
                      backgroundColor: "#22c55e",
                      color: "#000000ff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Delivered
                  </span>
                </td>
              </tr>
              <tr style={{ borderTop: "3px solid #ffffffff" }}>
                <td style={{ padding: "0.75rem 0" }}>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>
                  <span
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#000000ff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    In Transit
                  </span>
                </td>
              </tr>
              <tr style={{ borderTop: "3px solid #ffffffff" }}>
                <td style={{ padding: "0.75rem 0" }}>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>
                  <span
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#000000ff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Packed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* Category Distribution + Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Category Distribution */}
          <div
            style={{
              backgroundColor: "#363B5E",
              padding: "1rem",
              borderRadius: "0.75rem",
              maxHeight: "350px",
              overflowY: "auto",
              width: "740px",
            }}
          >
            <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0rem" }}>
              Category
            </h3>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Pie Chart */}
              <div style={{ width: 300, height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categories}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category List */}
              <ul style={{ fontSize: "0.9rem", lineHeight: "1.75rem", minWidth: "300px" }}>
                {categories.map((cat, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%", 
                        backgroundColor: COLORS[i % COLORS.length],
                      }}
                    ></span>
                    {cat.name} — {cat.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "1rem", 
            }}
          >
            <div
              style={{
                backgroundColor: "#363B5E",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                height: "50px",
                width: "200px", 
              }}
            >
              <p style={{ fontSize: "2.3rem", fontWeight: "bold", margin: 0 }}>888</p>
              <p style={{ fontSize: "0.90rem", fontWeight: "bold", margin: 0 }}>
                Total Number of Orders
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#363B5E",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                height: "50px",
                width: "200px",
              }}
            >
              <p style={{ fontSize: "2.3rem", fontWeight: "bold", margin: 0 }}>888</p>
              <p style={{ fontSize: "0.90rem", fontWeight: "bold", margin: 0 }}>
                Total Number of Customers
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#22C55E",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                height: "50px",
                width: "200px",
              }}
            >
              <Download size={30} color="green" />
              <p style={{ fontWeight: "600", margin: 0 }}>Download Report</p>
            </div>
          </div>


        </div>
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "1.5rem",
        }}
      >
        {/* Most Ordered Items */}
        <div style={{ backgroundColor: "#363B5E", padding: "1.5rem", borderRadius: "0.75rem", height: "250px" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
            Most Ordered Items
          </h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => {
                    const greenShades = ["#166534", "#15803d", "#16a34a", "#22c55e", "#4ade80"];
                    return <Cell key={`cell-${index}`} fill={greenShades[index % greenShades.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers With Most Orders */}
        <div style={{ backgroundColor: "#363B5E", padding: "1.5rem", borderRadius: "0.75rem", height: "250px" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
            Retailers With Most Orders (Yearly)
          </h3>
          <div style={{ width: "100%", height: 230 }}>
            <ResponsiveContainer>
              <BarChart
                data={customersMost}
                layout="vertical"
                margin={{ top: 20, right: 30, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="value">
                  {customersMost.map((entry, index) => {
                    const greenShades = ["#166534", "#15803d", "#16a34a", "#22c55e", "#4ade80"];
                    return <Cell key={`cell-${index}`} fill={greenShades[index % greenShades.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Least Ordered Items */}
        <div style={{ backgroundColor: "#363B5E", padding: "1.5rem", borderRadius: "0.75rem", height: "250px" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
            Least Orders Items (Yearly)
          </h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={itemsLeast} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value">
                  {itemsLeast.map((entry, index) => {
                    const redShades = ["#ef4444", "#dc2626", "#b91c1c", "#991b1b"];
                    const color = index < redShades.length ? redShades[index] : redShades[redShades.length - 1];
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers With Least Orders */}
        <div style={{ backgroundColor: "#363B5E", padding: "1.5rem", borderRadius: "0.75rem", height: "250px" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
            Retailers With Least Orders (Yearly)
          </h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={customersLeast} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value">
                  {customersLeast.map((entry, index) => {
                    const redShades = ["#ef4444", "#dc2626", "#b91c1c", "#991b1b"];
                    const color = index < redShades.length ? redShades[index] : redShades[redShades.length - 1];
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


function RetailerRecords() {
  const [activeTab, setActiveTab] = useState("retailers");

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Records
      </h2>

      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "1.5rem",
          borderRadius: "0.75rem",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button
            onClick={() => setActiveTab("retailers")}
            style={{
              backgroundColor: activeTab === "retailers" ? "#FFFFFF" : "#262C4B",
              color: activeTab === "retailers" ? "#000000" : "#FFFFFF",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              border: "none",
            }}
          >
            Retailers
          </button>
          <button
            onClick={() => setActiveTab("suppliers")}
            style={{
              backgroundColor: activeTab === "suppliers" ? "#FFFFFF" : "#262C4B",
              color: activeTab === "suppliers" ? "#000000" : "#FFFFFF",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              border: "none",
            }}
          >
            Suppliers
          </button>
        </div>

        {/* Table */}
        <table
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            {activeTab === "retailers" ? (
              <tr style={{ color: "#ffffffff" }}>
                <th style={{ padding: "0.5rem 0" }}>Retailer ID</th>
                <th style={{ padding: "0.5rem 0" }}>Retailer Name</th>
                <th style={{ padding: "0.5rem 0" }}>Address</th>
                <th style={{ padding: "0.5rem 0" }}>Email Address</th>
                <th style={{ padding: "0.5rem 0" }}>Contact Number</th>
              </tr>
            ) : (
              <tr style={{ color: "#94A3B8" }}>
                <th style={{ padding: "0.5rem 0" }}>Supplier ID</th>
                <th style={{ padding: "0.5rem 0" }}>Supplier Name</th>
                <th style={{ padding: "0.5rem 0" }}>Address</th>
                <th style={{ padding: "0.5rem 0" }}>Email Address</th>
                <th style={{ padding: "0.5rem 0" }}>Contact Number</th>
              </tr>
            )}
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i} style={{ borderTop: "2.5px solid #ffffffff", color: "#FFFFFF" }}>
                <td style={{ padding: "2rem 0" }}>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
                <td>Label Item</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Purchasing() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      poNumber: "PO-001",
      supplierId: "SUP-123",
      item: "Laptop",
      category: "Electronics",
      quantity: 5,
      total: "$5000",
      date: "2025-09-08",
      receivingStatus: "Received",
      paymentStatus: "Paid",
    },
    {
      poNumber: "PO-002",
      supplierId: "SUP-123",
      item: "Laptop",
      category: "Electronics",
      quantity: 5,
      total: "$5000",
      date: "2025-09-08",
      receivingStatus: "Received",
      paymentStatus: "Paid",
    },
    {
      poNumber: "PO-003",
      supplierId: "SUP-123",
      item: "Laptop",
      category: "Electronics",
      quantity: 5,
      total: "$5000",
      date: "2025-09-08",
      receivingStatus: "Received",
      paymentStatus: "Paid",
    },
  ]);

  
  const handleOpenForm = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  
  const handleSave = (newOrder) => {
    if (editingOrder !== null) {
      setOrders((prev) =>
        prev.map((order, idx) => (idx === editingOrder ? newOrder : order))
      );
    } else {
      setOrders((prev) => [...prev, newOrder]);
    }
    setShowForm(false);
    setEditingOrder(null);
  };

  
  const handleEdit = (index) => {
    setEditingOrder(index);
    setShowForm(true);
  };

  
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  
  const confirmDelete = () => {
    setOrders((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  
  if (showForm) {
    return (
      <AddPurchaseForm
        onClose={handleCloseForm}
        onSave={handleSave}
        initialData={editingOrder !== null ? orders[editingOrder] : null}
      />
    );
  }

  return (
    <div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Purchasing
      </h2>

      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "1.5rem",
          borderRadius: "0.75rem",
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
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
            Orders for the Warehouse
          </h3>
          <button
            onClick={handleOpenForm}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              backgroundColor: "#ffffffff",
              color: "#000000ff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#cbd5e1" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Purchase Order Number</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Supplier ID</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Item</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Category</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Quantity</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Total</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Date</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Receiving Status</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Payment Status</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                style={{
                  borderTop: "2px solid #ffffffff", 
                  color: "#f1f5f9",
                }}
              >
                <td style={{ padding: "2.3rem 0.5rem" }}>{order.poNumber}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{order.supplierId}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{order.item}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{order.category}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{order.quantity}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{order.total}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{order.date}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span
                    style={{
                      backgroundColor:
                        order.receivingStatus === "Received"
                          ? "#22c55e"
                          : "#ef4444",
                      color: "#fff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    {order.receivingStatus}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span
                    style={{
                      backgroundColor:
                        order.paymentStatus === "Paid" ? "#22c55e" : "#ef4444",
                      color: "#fff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td style={{ display: "flex", gap: "0.5rem", padding: "0.75rem 0.5rem" }}>
                  <button
                    onClick={() => handleEdit(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#fbbf24",
                    }}
                  >
                    <EditIcon size={18} color="#ffffffff" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                  >
                    <DeleteIcon size={18} color="#ffffff" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
          onClick={cancelDelete} 
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              padding: "2rem",
              width: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 style={{ marginBottom: "1rem", color: "#363B5E" }}>Deletion</h3>
            <p
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
                color: "#363B5E",
              }}
            >
              Delete this purchase order?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#86efac",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  backgroundColor: "#fca5a5",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function EditIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
               7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 
               1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 
               1.84-1.82z" />
    </svg>
  );
}

function DeleteIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 0 1-1 .5H7a1 1 0 0 1-1-.5L4 9zm5 2v8h2v-8H9zm4 0v8h2v-8h-2zM9 4V2h6v2h5v2H4V4h5z" />
    </svg>
  );
}



function WarehouseOperations() {
  const [activeTab, setActiveTab] = useState("Inbound");

  
  const [stocks, setStocks] = useState([
    { item: "Monitor", category: "Electronics", quantity: 20 },
    { item: "Keyboard", category: "Accessories", quantity: 50 },
  ]);
  const [showStockForm, setShowStockForm] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  
  const handleSaveStock = (newStock) => {
    if (editingStock !== null) {
      setStocks((prev) =>
        prev.map((s, idx) => (idx === editingStock ? newStock : s))
      );
    } else {
      setStocks((prev) => [...prev, newStock]);
    }
    setShowStockForm(false);
    setEditingStock(null);
  };

  const handleEditStock = (index) => {
    setEditingStock(index);
    setShowStockForm(true);
  };

  const handleAddStock = () => {
    setEditingStock(null);
    setShowStockForm(true);
  };

  const handleDeleteStock = (index) => {
    setDeleteIndex(index);
    setDeleteType("stock");
    setShowDeleteConfirm(true);
  };

  
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 1,
      poNumber: "PO-001",
      supplierId: "SUP-123",
      item: "Laptop",
      orderedquantity: 10,
      quantity: 5,
      total: "$5000",
      date: "2025-09-08",
      receivedQty: 5,
      damaged: 0,
      spoiled: 0,
      missing: 0,
      rejected: 0,
    },
    {
      id: 1,
      poNumber: "PO-001",
      supplierId: "SUP-123",
      item: "Laptop",
      orderedquantity: 10,
      quantity: 5,
      total: "$5000",
      date: "2025-09-08",
      receivedQty: 5,
      damaged: 0,
      spoiled: 0,
      missing: 0,
      rejected: 0,
    },
  ]);

  
  const [outboundOrders, setOutboundOrders] = useState([
    {
      orderNumber: "OUT-1001",
      retailerId: "RET-001",
      item: "Monitor",
      quantity: 10,
      total: "$1500",
      date: "2025-09-08",
      status: "Delivered",
    },
    {
      orderNumber: "OUT-1002",
      retailerId: "RET-002",
      item: "Keyboard",
      quantity: 20,
      total: "$600",
      date: "2025-09-07",
      status: "Returned",
    },
  ]);
  const [showOutboundForm, setShowOutboundForm] = useState(false);
  const [editingOutbound, setEditingOutbound] = useState(null);

  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return { backgroundColor: "#22c55e", color: "#fff" };
      case "Returned":
        return { backgroundColor: "#9ca3af", color: "#fff" };
      case "In Transit":
        return { backgroundColor: "#f59e0b", color: "#fff" };
      case "Packed":
        return { backgroundColor: "#ef4444", color: "#fff" };
      default:
        return { backgroundColor: "#6b7280", color: "#fff" };
    }
  };

  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };
  const handleSave = (newOrder) => {
    if (editingOrder !== null) {
      setOrders((prev) =>
        prev.map((order, idx) => (idx === editingOrder ? newOrder : order))
      );
    } else {
      setOrders((prev) => [...prev, { ...newOrder, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingOrder(null);
  };
  const handleEditInbound = (index) => {
    setEditingOrder(index);
    setShowForm(true);
  };
  
  const handleCloseOutboundForm = () => {
    setEditingOutbound(null);
    setShowOutboundForm(false);
  };
  const handleSaveOutbound = (newOrder) => {
    if (editingOutbound !== null) {
      setOutboundOrders((prev) =>
        prev.map((order, idx) => (idx === editingOutbound ? newOrder : order))
      );
    } else {
      setOutboundOrders((prev) => [...prev, newOrder]);
    }
    setEditingOutbound(null);
    setShowOutboundForm(false);
  };
  const handleEditOutbound = (index) => {
    setEditingOutbound(index);
    setShowOutboundForm(true);
  };

  
  const confirmDelete = () => {
    if (deleteType === "outbound") {
      setOutboundOrders((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    } else if (deleteType === "stock") {
      setStocks((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    }
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
    setDeleteType(null);
  };

  
  if (showForm) {
    return (
      <EditInboundForm
        onClose={handleCloseForm}
        onSave={handleSave}
        initialData={editingOrder !== null ? orders[editingOrder] : null}
      />
    );
  }

  
  if (showOutboundForm) {
    return (
      <EditOutboundForm
        onClose={handleCloseOutboundForm}
        onSave={handleSaveOutbound}
        initialData={
          editingOutbound !== null ? outboundOrders[editingOutbound] : null
        }
      />
    );
  }

  
  if (showStockForm) {
    return (
      <EditStockForm
        onClose={() => {
          setShowStockForm(false);
          setEditingStock(null);
        }}
        onSave={handleSaveStock}
        initialData={editingStock !== null ? stocks[editingStock] : null}
      />
    );
  }

  return (
    <div>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        Warehouse Operations
      </h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {["Inbound", "Outbound", "Stock"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              backgroundColor: activeTab === tab ? "#fff" : "#363B5E",
              color: activeTab === tab ? "#000" : "#fff",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "1.5rem",
          borderRadius: "0.75rem",
        }}
      >
        {/* Inbound Table */}
        {activeTab === "Inbound" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#ffffffff" }}>
                  <th style={{ padding: "0.75rem" }}>Purchasing Order Number</th>
                  <th style={{ padding: "0.75rem" }}>Supplier ID</th>
                  <th style={{ padding: "0.75rem" }}>Item</th>
                  <th style={{ padding: "0.75rem" }}>Ordered Qty</th>
                  <th style={{ padding: "0.75rem" }}>Received Qty</th>
                  <th style={{ padding: "0.75rem" }}>Date</th>
                  <th style={{ padding: "0.75rem" }}>Damaged</th>
                  <th style={{ padding: "0.75rem" }}>Spoiled</th>
                  <th style={{ padding: "0.75rem" }}>Missing</th>
                  <th style={{ padding: "0.75rem" }}>Rejected</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    style={{
                      borderTop: "2.3px solid #ffffffff",
                      color: "#f1f5f9",
                    }}
                  >
                    <td style={{ padding: "2rem" }}>{order.poNumber}</td>
                    <td style={{ padding: "0.75rem" }}>{order.supplierId}</td>
                    <td style={{ padding: "0.75rem" }}>{order.item}</td>
                    <td style={{ padding: "0.75rem" }}>{order.orderedquantity}</td>
                    <td style={{ padding: "0.75rem" }}>{order.quantity}</td>
                    <td style={{ padding: "0.75rem" }}>{order.date}</td>
                    <td style={{ padding: "0.75rem" }}>{order.damaged}</td>
                    <td style={{ padding: "0.75rem" }}>{order.spoiled}</td>
                    <td style={{ padding: "0.75rem" }}>{order.missing}</td>
                    <td style={{ padding: "0.75rem" }}>{order.rejected}</td>
                    <td style={{ display: "flex", gap: "1rem", padding: "0.75rem" }}>
                      <button
                        onClick={() => handleEditInbound(idx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#fbbf24",
                        }}
                      >
                        <EditIcon size={18} color="#ffffffff" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* Outbound Table */}
        {activeTab === "Outbound" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#cbd5e1" }}>
                  <th style={{ padding: "0.75rem" }}>Order Number</th>
                  <th style={{ padding: "0.75rem" }}>Retailer ID</th>
                  <th style={{ padding: "0.75rem" }}>Item</th>
                  <th style={{ padding: "0.75rem" }}>Quantity</th>
                  <th style={{ padding: "0.75rem" }}>Total</th>
                  <th style={{ padding: "0.75rem" }}>Date</th>
                  <th style={{ padding: "0.75rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {outboundOrders.map((order, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderTop: "2.3px solid #ffffffff",
                      color: "#f1f5f9",
                    }}
                  >
                    <td style={{ padding: "2.5rem" }}>{order.orderNumber}</td>
                    <td style={{ padding: "0.75rem" }}>{order.retailerId}</td>
                    <td style={{ padding: "0.75rem" }}>{order.item}</td>
                    <td style={{ padding: "0.75rem" }}>{order.quantity}</td>
                    <td style={{ padding: "0.75rem" }}>{order.total}</td>
                    <td style={{ padding: "0.75rem" }}>{order.date}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <span
                        style={{
                          ...getStatusStyle(order.status),
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: "0.5rem", padding: "0.75rem" }}>
                      <button
                        onClick={() => handleEditOutbound(idx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#fbbf24",
                        }}
                      >
                        <EditIcon size={18} color="#ffffffff" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* Stock Table */}
        {activeTab === "Stock" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem",
              }}
            >
              <button
                onClick={handleAddStock}
                style={{
                  backgroundColor: "#ffffffff",
                  color: "#000000ff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                + Add
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#cbd5e1" }}>
                  <th style={{ padding: "0.75rem" }}>Item</th>
                  <th style={{ padding: "0.75rem" }}>Category</th>
                  <th style={{ padding: "0.75rem" }}>Current Number of Stocks</th>
                  <th style={{ padding: "0.75rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderTop: "2.3px solid #ffffffff",
                      color: "#f1f5f9",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>{stock.item}</td>
                    <td style={{ padding: "0.75rem" }}>{stock.category}</td>
                    <td style={{ padding: "0.75rem" }}>{stock.quantity}</td>
                    <td style={{ display: "flex", gap: "0.5rem", padding: "0.75rem" }}>
                      <button
                        onClick={() => handleEditStock(idx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#fbbf24",
                        }}
                      >
                        <EditIcon size={18} color="#ffffffff" />
                      </button>
                      <button
                        onClick={() => handleDeleteStock(idx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#ef4444",
                        }}
                      >
                        <DeleteIcon size={18} color="#ffffff" />

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#000" }}>
              {deleteType === "outbound"
                ? "Are you sure you want to delete this outbound order?"
                : "Are you sure you want to delete this stock item?"}
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={confirmDelete}
                style={{
                  background: "#B3FFA6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  background: "#FF8686",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function ItemAssignments() {
  const [assignments, setAssignments] = useState([
    {
      orderNumber: "ORD-001",
      retailerId: "RET-001",
      item: "Laptop",
      quantity: 5,
      status: "Approved",
    },
    {
      orderNumber: "ORD-002",
      retailerId: "RET-002",
      item: "Keyboard",
      quantity: 10,
      status: "Disapproved",
    },
    {
      orderNumber: "ORD-003",
      retailerId: "RET-003",
      item: "Mouse",
      quantity: 2,
      status: "Pending",
    },
  ]);



  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  const handleOpenForm = () => {
    setEditingAssignment(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAssignment(null);
  };

  const handleSave = (newAssignment) => {
    if (editingAssignment !== null) {
      setAssignments((prev) =>
        prev.map((a, idx) => (idx === editingAssignment ? newAssignment : a))
      );
    } else {
      setAssignments((prev) => [...prev, newAssignment]);
    }
    setShowForm(false);
    setEditingAssignment(null);
  };

  const handleEdit = (index) => {
    setEditingAssignment(index);
    setShowForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setAssignments((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  if (showForm) {
    return (
      <AssignmentForm
        onClose={handleCloseForm}
        onSave={handleSave}
        initialData={editingAssignment !== null ? assignments[editingAssignment] : null}
      />
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Assignment of Items to the Retailers
      </h2>
      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "1.5rem",
          borderRadius: "0.75rem",
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
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Assignments of Items to the Retailers</h3>
          <button
            onClick={handleOpenForm}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              backgroundColor: "#ffffffff",
              color: "#000000ff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            <Plus size={18} /> Add
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#cbd5e1" }}>
              <th style={{ padding: "0.75rem 0" }}>Order Number</th>
              <th style={{ padding: "0.75rem 0" }}>Retailer ID</th>
              <th style={{ padding: "0.75rem 0" }}>Item</th>
              <th style={{ padding: "0.75rem 0" }}>Quantity</th>
              <th style={{ padding: "0.75rem 0" }}>Status</th>
              <th style={{ padding: "0.75rem 0" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, idx) => (
              <tr
                key={idx}
                style={{
                  borderTop: "2.3px solid #ffffffff",
                  color: "#f1f5f9",
                }}
              >
                <td style={{ padding: "2rem 0" }}>{assignment.orderNumber}</td>
                <td style={{ padding: "2rem 0" }}>{assignment.retailerId}</td>
                <td style={{ padding: "2rem 0" }}>{assignment.item}</td>
                <td style={{ padding: "2rem 0" }}>{assignment.quantity}</td>
                <td style={{ padding: "2rem 0" }}>
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
                <td
                  style={{
                    padding: "2rem 0", 
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => handleEdit(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#fbbf24",
                    }}
                  >
                    <EditIcon size={18} color="#ffffffff" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                  >
                    <DeleteIcon size={18} color="#ffffff" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {showDeleteConfirm && (
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
          onClick={cancelDelete}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.75rem",
              padding: "2rem",
              width: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: "1rem", color: "#363B5E" }}>Deletion</h3>
            <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem", color: "#363B5E" }}>
              Are you sure you want to delete this item?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#86efac",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  backgroundColor: "#fca5a5",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const mockItemAssignments = [
  {
    orderNumber: "12345",
    retailerId: "R-001",
    item: "Label Item",
    category: "Label Item",
    quantity: 10,
    status: "Approved",
  },
  {
    orderNumber: "12346",
    retailerId: "R-002",
    item: "Label Item",
    category: "Label Item",
    quantity: 5,
    status: "Disapproved",
  },
  {
    orderNumber: "12347",
    retailerId: "R-003",
    item: "Label Item",
    category: "Label Item",
    quantity: 8,
    status: "Pending",
  },
];

function Approvals({ assignments = mockItemAssignments }) {
  const [data, setData] = useState(assignments);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return {
          backgroundColor: "#22c55e",
          color: "#fff",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          fontSize: "0.75rem",
          display: "inline-block",
          minWidth: "60px",
          textAlign: "center",
        };
      case "Disapproved":
        return {
          backgroundColor: "#ef4444",
          color: "#fff",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          fontSize: "0.75rem",
          display: "inline-block",
          minWidth: "60px",
          textAlign: "center",
        };
      case "Pending":
        return {
          backgroundColor: "#f59e0b",
          color: "#fff",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          fontSize: "0.75rem",
          display: "inline-block",
          minWidth: "60px",
          textAlign: "center",
        };
      default:
        return {};
    }
  };

  const openModal = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setModalOpen(false);
  };

  const updateStatus = (newStatus) => {
    setData((prev) =>
      prev.map((item, idx) =>
        idx === selectedIndex ? { ...item, status: newStatus } : item
      )
    );
    closeModal();
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#fff",
        }}
      >
        Approvals
      </h2>

      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "1000px",
          margin: "auto",
          color: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>
          Approval of Item Assignment
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#ffffffff",
            fontSize: "0.85rem",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ffffffff", fontWeight: "600" }}>
              <th style={{ padding: "0.75rem" }}>Order Number</th>
              <th style={{ padding: "0.75rem" }}>Retailer ID</th>
              <th style={{ padding: "0.75rem" }}>Item</th>
              <th style={{ padding: "0.75rem" }}>Category</th>
              <th style={{ padding: "0.75rem" }}>Quantity</th>
              <th style={{ padding: "0.75rem" }}>Status</th>
              <th style={{ padding: "0.75rem" }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((assignment, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "2px solid #ffffffff",
                  color: "#ffffffff",
                  fontWeight: "500",
                }}
              >
                <td style={{ padding: "2rem", textAlign: "center" }}>
                  {assignment.orderNumber}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {assignment.retailerId}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {assignment.item}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {assignment.category}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {assignment.quantity}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  <span style={getStatusStyle(assignment.status)}>
                    {assignment.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  <button
                    onClick={() => openModal(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                    aria-label={`Edit assignment ${assignment.orderNumber}`}
                  >
                    <Tag size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {modalOpen && selectedIndex !== null && (
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                maxWidth: "400px",
                width: "90%",
                color: "#363B5E",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                Approvals
              </div>
              <h3 style={{ marginBottom: "1.5rem", fontWeight: "700" }}>
                Approve this item assignment?
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => updateStatus("Approved")}
                  style={{
                    backgroundColor: "#86efac",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#363B5E",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus("Disapproved")}
                  style={{
                    backgroundColor: "#fca5a5",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#7f1d1d",
                  }}
                >
                  Disapprove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



function RetailerAndBilling() {
  const [activeTab, setActiveTab] = useState("retailers");

  
  const [retailers, setRetailers] = useState([
    {
      id: "RET-001",
      name: "Retailer One",
      address: "123 Main St",
      email: "retailer1@email.com",
      contact: "555-1234",
    },
    {
      id: "RET-002",
      name: "Retailer Two",
      address: "456 Market Rd",
      email: "retailer2@email.com",
      contact: "555-5678",
    },
  ]);

  
  const [billing, setBilling] = useState([
    {
      id: 1,
      invoiceNumber: "INV-001",
      orderNumber: "ORD-001",
      date: "2025-09-01",
      retailerId: "RET-001",
      retailerName: "Retailer One",
      address: "123 Main St",
      email: "retailer1@email.com",
      contact: "555-1234",
      item: "Product A",
      quantity: 5,
      total: "$500",
      status: "Paid",
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      orderNumber: "ORD-002",
      date: "2025-09-03",
      retailerId: "RET-002",
      retailerName: "Retailer Two",
      address: "456 Market Rd",
      email: "retailer2@email.com",
      contact: "555-5678",
      item: "Product B",
      quantity: 3,
      total: "$300",
      status: "Pending",
    },
    {
      id: 3,
      invoiceNumber: "INV-003",
      orderNumber: "ORD-003",
      date: "2025-09-05",
      retailerId: "RET-001",
      retailerName: "Retailer One",
      address: "123 Main St",
      email: "retailer1@email.com",
      contact: "555-1234",
      item: "Product C",
      quantity: 10,
      total: "$1000",
      status: "Unbilled",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  
  const [showBillingDeleteConfirm, setShowBillingDeleteConfirm] = useState(false);
  const [deleteBillingId, setDeleteBillingId] = useState(null);

  
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [invoiceMode, setInvoiceMode] = useState("view"); 

  
  const handleAdd = () => {
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setRetailers((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const handleSave = (newRetailer) => {
    if (editingIndex !== null) {
      setRetailers((prev) =>
        prev.map((r, idx) => (idx === editingIndex ? newRetailer : r))
      );
    } else {
      setRetailers((prev) => [
        ...prev,
        { ...newRetailer, id: `RET-${prev.length + 1}` },
      ]);
    }
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingIndex(null);
  };

  
  const openInvoice = (bill, mode = "view") => {
    setSelectedBilling(bill);
    setInvoiceMode(mode);
  };

  const closeInvoice = () => {
    setSelectedBilling(null);
    setInvoiceMode("view");
  };

  const updateBillingStatus = (id, status) => {
    setBilling((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleBillingDeleteClick = (id) => {
    setDeleteBillingId(id);
    setShowBillingDeleteConfirm(true);
  };

  const confirmBillingDelete = () => {
    setBilling((prev) => prev.filter((b) => b.id !== deleteBillingId));
    setShowBillingDeleteConfirm(false);
    setDeleteBillingId(null);
  };

  const cancelBillingDelete = () => {
    setShowBillingDeleteConfirm(false);
    setDeleteBillingId(null);
  };

  
  if (showForm) {
    return (
      <EditRetailerForm
        onSave={handleSave}
        onClose={handleClose}
        initialData={editingIndex !== null ? retailers[editingIndex] : null}
      />
    );
  }

  
  if (selectedBilling) {
    return (
      <EditInvoiceForm
        billing={selectedBilling}
        mode={invoiceMode}
        onClose={closeInvoice}
        onUpdateStatus={updateBillingStatus}
      />
    );
  }

  
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Retailer & Billing
      </h2>

      {/* Card */}
      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "1.5rem",
          borderRadius: "0.75rem",
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
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setActiveTab("retailers")}
              style={{
                backgroundColor: activeTab === "retailers" ? "#FFFFFF" : "#262C4B",
                color: activeTab === "retailers" ? "#000000" : "#FFFFFF",
                fontWeight: "600",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Retailers
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              style={{
                backgroundColor: activeTab === "billing" ? "#FFFFFF" : "#262C4B",
                color: activeTab === "billing" ? "#000000" : "#FFFFFF",
                fontWeight: "600",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Billing
            </button>
          </div>
          {activeTab === "retailers" && (
            <div>
              <button
                onClick={handleAdd}
                style={{
                  backgroundColor: "#ffffffff",
                  color: "#000000ff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                + Add
              </button>
            </div>
          )}
        </div>

        {/* Retailers table */}
        {activeTab === "retailers" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "#cbd5e1", textAlign: "left" }}>
                <th style={{ padding: "0.75rem" }}>ID</th>
                <th style={{ padding: "0.75rem" }}>Name</th>
                <th style={{ padding: "0.75rem" }}>Address</th>
                <th style={{ padding: "0.75rem" }}>Email</th>
                <th style={{ padding: "0.75rem" }}>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {retailers.map((retailer, idx) => (
                <tr
                  key={retailer.id}
                  style={{ borderTop: "2.5px solid #ffffffff", color: "#f1f5f9" }}
                >
                  <td style={{ padding: "2rem" }}>{retailer.id}</td>
                  <td style={{ padding: "0.75rem" }}>{retailer.name}</td>
                  <td style={{ padding: "0.75rem" }}>{retailer.address}</td>
                  <td style={{ padding: "0.75rem" }}>{retailer.email}</td>
                  <td style={{ padding: "0.75rem" }}>{retailer.contact}</td>
                  <td style={{ display: "flex", gap: "0.5rem", padding: "2rem" }}>
                    <button
                      onClick={() => handleEdit(idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#fbbf24",
                      }}
                    >
                      <EditIcon size={18} color="#ffffffff" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#ef4444",
                      }}
                    >
                      <DeleteIcon size={18} color="#ffffff" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Billing table */}
        {activeTab === "billing" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "#cbd5e1", textAlign: "left" }}>
                <th style={{ padding: "0.75rem" }}>Order Number</th>
                <th style={{ padding: "0.75rem" }}>Retailer ID</th>
                <th style={{ padding: "0.75rem" }}>Item</th>
                <th style={{ padding: "0.75rem" }}>Quantity</th>
                <th style={{ padding: "0.75rem" }}>Total</th>
                <th style={{ padding: "0.75rem" }}>Date</th>
                <th style={{ padding: "0.75rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {billing.map((bill) => (
                <tr
                  key={bill.id}
                  style={{ borderTop: "1px solid #ffffffff", color: "#f1f5f9" }}
                >
                  <td style={{ padding: "2rem" }}>{bill.orderNumber}</td>
                  <td style={{ padding: "0.75rem" }}>{bill.retailerId}</td>
                  <td style={{ padding: "0.75rem" }}>{bill.item}</td>
                  <td style={{ padding: "0.75rem" }}>{bill.quantity}</td>
                  <td style={{ padding: "0.75rem" }}>{bill.total}</td>
                  <td style={{ padding: "0.75rem" }}>{bill.date}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        backgroundColor:
                          bill.status === "Paid"
                            ? "#22c55e"
                            : bill.status === "Pending"
                              ? "#f97316"
                              : "#ef4444",
                      }}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: "0.5rem", padding: "2rem" }}>
                    {/* If Paid → show Eye */}
                    {bill.status === "Paid" && (
                      <button
                        onClick={() => openInvoice(bill, "view")}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#3b82f6",
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    )}

                    {/* If NOT Paid → show Edit */}
                    {bill.status !== "Paid" && (
                      <button
                        onClick={() => openInvoice(bill, "charge")}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#fbbf24",
                        }}
                      >
                        <EditIcon size={18} color="#ffffffff" />
                      </button>
                    )}

                    <button
                      onClick={() => handleBillingDeleteClick(bill.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#ef4444",
                      }}
                    >
                      <DeleteIcon size={18} color="#ffffff" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Billing delete confirmation */}
        {showBillingDeleteConfirm && (
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
            onClick={cancelBillingDelete}
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
              <div
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  left: "1rem",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#363B5E",
                }}
              >
                Deletion
              </div>
              <p
                style={{
                  marginTop: "2rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                  color: "#000000ff",
                }}
              >
                <b>Delete this billing?</b>
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button
                  onClick={confirmBillingDelete}
                  style={{
                    backgroundColor: "#B3FFA6",
                    color: "#0E5F00",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={cancelBillingDelete}
                  style={{
                    backgroundColor: "#FF8686",
                    color: "#A50A0A",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Retailer delete confirmation */}
      {showDeleteConfirm && (
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
          onClick={cancelDelete}
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
            <h3 style={{ marginBottom: "1rem", color: "#363B5E" }}>Deletion</h3>
            <p style={{ marginBottom: "1.5rem", textAlign: "center", color: "#000000ff" }}>
              Are you sure you want to delete this retailer?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#86efac",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  backgroundColor: "#fca5a5",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





function App() {
  const [user, setUser] = React.useState(null);

  
  const [users, setUsers] = React.useState([
    { name: "Alice", username: "admin", password: "1234", role: "Admin" },
    { name: "Bob", username: "purchasing", password: "1234", role: "Purchasing Officer" },
    { name: "Charlie", username: "warehouse", password: "1234", role: "Warehouse Staff" },
    { name: "Dana", username: "csr", password: "1234", role: "CSR" },
    { name: "Eve", username: "leader", password: "1234", role: "Team Leader" },
    { name: "Frank", username: "accountant", password: "1234", role: "Accountant" },
  ]);

  if (!user) {
    return (
      <Login
        users={users}
        onLogin={(u) => setUser(u)}
        onRegister={(newUser) => setUsers([...users, newUser])}
      />
    );
  }

  const validateUser = (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  
  const access = {
    purchasing: ["Admin", "Purchasing Officer"],
    warehouse: ["Admin", "Warehouse Staff"],
    assignments: ["Admin", "CSR"],
    approvals: ["Admin", "Team Leader"],
    billing: ["Admin", "Accountant"],
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#262C4B",
          color: "#FFFFFF",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "16rem",
            backgroundColor: "#363B5E",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "2rem",
              }}
            >
              ASCDC Inventory
            </h1>

            <Sidebar />
          </div>

          {/* Logout */}
          <button
            onClick={() => setUser(null)}
            style={{
              marginTop: "2rem",
              padding: "0.5rem",
              background: "transparent",
              border: "1px solid #64748b",
              borderRadius: "0.25rem",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "0 1.5rem 1.5rem 1.5rem",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/retailers" element={<RetailerRecords />} />

            <Route
              path="/purchasing"
              element={
                access.purchasing.includes(user.role) ? (
                  <Purchasing />
                ) : (
                  <RestrictedPage pageName="Purchasing" onValidate={validateUser} />
                )
              }
            />

            <Route
              path="/warehouse"
              element={
                access.warehouse.includes(user.role) ? (
                  <WarehouseOperations />
                ) : (
                  <RestrictedPage pageName="Warehouse Operations" onValidate={validateUser} />
                )
              }
            />

            <Route
              path="/itemassign"
              element={
                access.assignments.includes(user.role) ? (
                  <ItemAssignments />
                ) : (
                  <RestrictedPage pageName="Item Assignment" onValidate={validateUser} />
                )
              }
            />

            <Route
              path="/approvals"
              element={
                access.approvals.includes(user.role) ? (
                  <Approvals />
                ) : (
                  <RestrictedPage pageName="Approvals" onValidate={validateUser} />
                )
              }
            />

            <Route
              path="/retailerandbilling"
              element={
                access.billing.includes(user.role) ? (
                  <RetailerAndBilling />
                ) : (
                  <RestrictedPage pageName="Retailer & Billing" onValidate={validateUser} />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;