import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download, Plus, Tag, Eye
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
import { supabase } from "./components/supabaseClient";



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
  const [tracker, setTracker] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [retailerCount, setRetailerCount] = useState(0);

  useEffect(() => {
    const fetchTracker = async () => {
      const { data, error } = await supabase
        .from("warehouse_operations")
        .select(`
          id,
          item,
          received_quantity,
          status,
          retailer:retailer_id (
            id,
            address
          )
        `)
        .eq("operation_type", "Outbound"); // <-- filter here

      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("Error fetching tracker:", error.message);
        return;
      }

      const formatted = (data || []).map((row) => ({
        retailerId: row.retailer?.id ?? "",
        address: row.retailer?.address ?? "",
        item: row.item ?? "",
        quantity: row.received_quantity ?? 0,
        status: row.status ?? "Pending",
      }));

      setTracker(formatted);
    };

    fetchTracker();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("warehouse_operations")
        .select("category");

      if (error) {
        console.error("Error fetching categories:", error.message);
        return;
      }

      // Aggregate counts per category
      const counts = {};
      data.forEach((row) => {
        const cat = row.category || "Uncategorized";
        counts[cat] = (counts[cat] || 0) + 1;
      });

      const formattedCategories = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
      }));

      setCategories(formattedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      const { data, error } = await supabase
        .from("warehouse_operations")
        .select("ordered_quantity");

      if (error) {
        console.error("Error fetching ordered quantities:", error.message);
        return;
      }

      const total = data.reduce((sum, row) => sum + (row.ordered_quantity || 0), 0);
      setTotalOrders(total);
    };

    fetchTotalOrders();
  }, []);

  useEffect(() => {
    const fetchRetailerCount = async () => {
      const { count, error } = await supabase
        .from("retailer_supplier")
        .select("id", { count: "exact", head: true })
        .eq("type", "retailer");

      if (error) {
        console.error("Error fetching retailer count:", error);
      } else {
        setRetailerCount(count || 0);
      }
    };

    fetchRetailerCount();
  }, []);

  const chartData = [
    { name: "Item A", value: 40 },
    { name: "Item B", value: 30 },
    { name: "Item C", value: 20 },
  ];
  const customersMost = [
    { name: "Retailer A", value: 100 },
    { name: "Retailer B", value: 80 },
  ];
  const itemsLeast = [
    { name: "Item X", value: 5 },
    { name: "Item Y", value: 3 },
  ];
  const customersLeast = [
    { name: "Retailer Z", value: 2 },
    { name: "Retailer W", value: 1 },
  ];

  // ======= PDF Download Function =======
const handleDownloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Dashboard Report", 14, 22);

  doc.setFontSize(12);
  doc.text(`Total Number of Orders: ${totalOrders}`, 14, 32);
  doc.text(`Total Number of Customers: ${retailerCount}`, 14, 40);

  if (categories.length > 0) {
    doc.text("Category Distribution:", 14, 50);

    autoTable(doc, {
      startY: 55,
      head: [["Category", "Count"]],
      body: categories.map(({ name, value }) => [name, value]),
      theme: "striped",
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
  }

  if (tracker.length > 0) {
    const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 80;
    doc.text("Item Tracker:", 14, startY);

    autoTable(doc, {
      startY: startY + 5,
      head: [["Retailer ID", "Address", "Item", "Quantity", "Status"]],
      body: tracker.map(({ retailerId, address, item, quantity, status }) => [
        retailerId,
        address,
        item,
        quantity,
        status,
      ]),
      theme: "striped",
      styles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
      },
    });
  }

  doc.save("dashboard_report.pdf");
};

  return (
    <div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginTop: "2rem",
          marginBottom: "0.5rem",
        }}
      >
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
              {tracker.length > 0 ? (
                tracker.map((row, idx) => (
                  <tr key={idx} style={{ borderTop: "3px solid #ffffffff" }}>
                    <td style={{ padding: "0.75rem 0" }}>{row.retailerId}</td>
                    <td style={{ padding: "0.75rem 0" }}>{row.address}</td>
                    <td>{row.item}</td>
                    <td>{row.quantity}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor:
                            row.status === "Delivered"
                              ? "#22c55e"
                              : row.status === "In Transit"
                              ? "#f59e0b"
                              : row.status === "Packed"
                              ? "#ef4444"
                              : "#9ca3af",
                          color: "#000000ff",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <ul
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.75rem",
              minWidth: "300px",
            }}
          >
            {categories.map((cat, i) => (
              <li
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
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

          {/* Total Orders and Retailers Count */}
<div
  style={{
    display: "flex",
    flexDirection: "row",
    gap: 15,              // no gap between buttons
    justifyContent: "flex-start",
  }}
>
  <div
    style={{
      backgroundColor: "#363B5E",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      textAlign: "center",
      cursor: "default",
      width: "200px",
    }}
  >
    <p style={{ fontWeight: "600", fontSize: "1.5rem", margin: 0 }}>
      {totalOrders}
    </p>
    <p style={{ fontWeight: "600", margin: 0 }}>Total Number of Orders</p>
  </div>
  <div
    style={{
      backgroundColor: "#363B5E",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      textAlign: "center",
      cursor: "default",
      width: "200px",
    }}
  >
    <p style={{ fontWeight: "600", fontSize: "1.5rem", margin: 0 }}>
      {retailerCount}
    </p>
    <p style={{ fontWeight: "600", margin: 0 }}>Total Number of Customers</p>
  </div>
  {/* Download Report Button */}
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
      width: "200px",
    }}
    onClick={handleDownloadReport}
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
        <div
          style={{
            backgroundColor: "#363B5E",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            height: "250px",
          }}
        >
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
                    const greenShades = [
                      "#166534",
                      "#15803d",
                      "#16a34a",
                      "#22c55e",
                      "#4ade80",
                    ];
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={greenShades[index % greenShades.length]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers With Most Orders */}
        <div
          style={{
            backgroundColor: "#363B5E",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            height: "250px",
          }}
        >
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
                    const greenShades = [
                      "#166534",
                      "#15803d",
                      "#16a34a",
                      "#22c55e",
                      "#4ade80",
                    ];
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={greenShades[index % greenShades.length]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Least Ordered Items */}
        <div
          style={{
            backgroundColor: "#363B5E",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            height: "250px",
          }}
        >
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
                    const color =
                      index < redShades.length
                        ? redShades[index]
                        : redShades[redShades.length - 1];
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers With Least Orders */}
        <div
          style={{
            backgroundColor: "#363B5E",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            height: "250px",
          }}
        >
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
                    const color =
                      index < redShades.length
                        ? redShades[index]
                        : redShades[redShades.length - 1];
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
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data when tab changes
  useEffect(() => {
    fetchRecords();
  }, [activeTab]);

  const fetchRecords = async () => {
    setLoading(true);

    const type = activeTab === "retailers" ? "retailer" : "supplier";

    const { data, error } = await supabase
      .from("retailer_supplier")
      .select("*")
      .eq("type", type)
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching records:", error.message);
      setRecords([]);
    } else {
      setRecords(data || []);
    }

    setLoading(false);
  };

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
              <tr style={{ color: "#ffffffff" }}>
                <th style={{ padding: "0.5rem 0" }}>Supplier ID</th>
                <th style={{ padding: "0.5rem 0" }}>Supplier Name</th>
                <th style={{ padding: "0.5rem 0" }}>Address</th>
                <th style={{ padding: "0.5rem 0" }}>Email Address</th>
                <th style={{ padding: "0.5rem 0" }}>Contact Number</th>
              </tr>
            )}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ color: "#fff", textAlign: "center", padding: "1rem" }}>
                  Loading...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ color: "#fff", textAlign: "center", padding: "1rem" }}>
                  No {activeTab} found.
                </td>
              </tr>
            ) : (
              records.map((rec) => (
                <tr
                  key={rec.id}
                  style={{ borderTop: "2.5px solid #ffffffff", color: "#FFFFFF" }}
                >
                  <td style={{ padding: "1rem 0" }}>{rec.id}</td>
                  <td>{rec.name}</td>
                  <td>{rec.address}</td>
                  <td>{rec.email}</td>
                  <td>{rec.contact_number}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Purchasing() {
  const [orders, setOrders] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // ✅ Fetch orders from Supabase
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("purchasing")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error.message);
    } else {
      setOrders(data || []);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Open Add form
  const handleOpenForm = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  // ✅ Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  // ✅ Refresh after save (AddPurchaseForm handles DB writes)
  const handleSave = async () => {
    await fetchOrders();
    setShowForm(false);
    setEditingOrder(null);
  };

  // ✅ Edit order
  const handleEdit = (index) => {
    setEditingOrder(index);
    setShowForm(true);
  };

  // ✅ Delete order
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
  const orderToDelete = orders[deleteIndex];

  console.log("Deleting order:", orderToDelete); // ✅ Check this in the browser console

  if (!orderToDelete || !orderToDelete.id) {
    console.error("No valid order to delete");
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
    return;
  }

  const { error } = await supabase
    .from("purchasing")
    .delete()
    .eq("id", orderToDelete.id);

  if (error) {
    console.error("Error deleting order:", error.message);
  } else {
    console.log("Order deleted successfully");
    await fetchOrders();
  }

  setShowDeleteConfirm(false);
  setDeleteIndex(null);
};



  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  // ✅ Show form when adding/editing
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
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <tr
                  key={order.id}
                  style={{
                    borderTop: "2px solid #ffffffff",
                    color: "#f1f5f9",
                  }}
                >
                  <td style={{ padding: "2.3rem 0.5rem" }}>{order.po_number}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{order.supplier_id}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{order.item}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{order.category}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{order.quantity}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{order.total}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{order.date}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <span
                      style={{
                        backgroundColor:
                          order.receiving_status === "Received"
                            ? "#22c55e"
                            : "#ef4444",
                        color: "#fff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {order.receiving_status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <span
                      style={{
                        backgroundColor:
                          order.payment_status === "Paid" ? "#22c55e" : "#ef4444",
                        color: "#fff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      padding: "0.75rem 0.5rem",
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  style={{ padding: "1rem", textAlign: "center", color: "#9ca3af" }}
                >
                  No purchase orders found.
                </td>
              </tr>
            )}
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
            <div
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
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

  // ------------------- STATE -------------------
  const [stocks, setStocks] = useState([]);
  const [showStockForm, setShowStockForm] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [outboundOrders, setOutboundOrders] = useState([]);
  const [showOutboundForm, setShowOutboundForm] = useState(false);
  const [editingOutbound, setEditingOutbound] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  // ------------------- FETCH DATA -------------------
  useEffect(() => {
    fetchInboundOrders();
    fetchOutboundOrders();
    fetchStocks();
  }, []);

  const fetchInboundOrders = async () => {
    const { data, error } = await supabase
      .from("warehouse_operations")
      .select(
        "id, po_number, supplier_id, item, ordered_quantity, received_quantity, date, damaged, spoiled, missing, rejected"
      )
      .eq("operation_type", "Inbound");

    if (error) console.error("Error fetching inbound orders:", error);
    else {
      const formatted = data.map((o) => ({
        id: o.id,
        poNumber: o.po_number,
        supplierId: o.supplier_id,
        item: o.item,
        orderedquantity: o.ordered_quantity,
        quantity: o.received_quantity,
        date: o.date,
        damaged: o.damaged,
        spoiled: o.spoiled,
        missing: o.missing,
        rejected: o.rejected,
      }));
      setOrders(formatted);
    }
  };

  const fetchOutboundOrders = async () => {
    const { data, error } = await supabase
      .from("warehouse_operations")
      .select(
        "id, order_number, retailer_id, item, received_quantity, total, date, status"
      )
      .eq("operation_type", "Outbound");

    if (error) console.error("Error fetching outbound orders:", error);
    else {
      const formatted = data.map((o) => ({
        id: o.id,
        orderNumber: o.order_number,
        retailerId: o.retailer_id,
        item: o.item,
        quantity: o.received_quantity,
        total: o.total,
        date: o.date,
        status: o.status,
      }));
      setOutboundOrders(formatted);
    }
  };

  const fetchStocks = async () => {
    const { data, error } = await supabase
      .from("purchasing")
      .select("id, item, category, quantity");

    if (error) console.error("Error fetching stocks:", error);
    else {
      const formatted = data.map((s) => ({
        id: s.id,
        item: s.item,
        category: s.category,
        quantity: s.quantity,
      }));
      setStocks(formatted);
    }
  };

  // ------------------- HANDLERS -------------------
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

  // inbound
  const handleAddInbound = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditInbound = (index) => {
    setEditingOrder(index);
    setShowForm(true);
  };

  // outbound
  const handleAddOutbound = () => {
    setEditingOutbound(null);
    setShowOutboundForm(true);
  };

  const handleEditOutbound = (index) => {
    setEditingOutbound(index);
    setShowOutboundForm(true);
  };

  // stock
  const handleAddStock = () => {
    setEditingStock(null);
    setShowStockForm(true);
  };

  const handleEditStock = (index) => {
    setEditingStock(index);
    setShowStockForm(true);
  };

  const handleDeleteStock = (index) => {
  setDeleteIndex(index);
  setDeleteType("stock");
  setShowDeleteConfirm(true);
};


const confirmDelete = async () => {
  if (deleteType === "stock") {
    const stockToDelete = stocks[deleteIndex];

    try {
      const { error } = await supabase
        .from("purchasing")
        .delete()
        .eq("id", stockToDelete.id);

      if (error) throw error;

      // refresh local table
      setStocks((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    } catch (err) {
      console.error("Error deleting stock:", err.message);
      alert("Error deleting stock: " + err.message);
    }
  } else if (deleteType === "outbound") {
    setOutboundOrders((prev) => prev.filter((_, idx) => idx !== deleteIndex));
  }

  setShowDeleteConfirm(false);
  setDeleteIndex(null);
  setDeleteType(null);
};

  
const handleSave = async (newOrder) => {
  // Update in state (optional for instant UI feedback)
  if (editingOrder !== null) {
    setOrders((prev) =>
      prev.map((order, idx) => (idx === editingOrder ? newOrder : order))
    );
  } else {
    setOrders((prev) => [...prev, { ...newOrder, id: Date.now() }]);
  }

  // ✅ Refetch from Supabase to stay in sync
  await fetchInboundOrders();

  setShowForm(false);
  setEditingOrder(null);
};

  // ------------------- CONDITIONAL RENDER -------------------
  if (showForm) {
    return (
      <EditInboundForm
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        initialData={editingOrder !== null ? orders[editingOrder] : null}
      />
    );
  }

  if (showOutboundForm) {
  return (
    <EditOutboundForm
      onClose={() => {
        setEditingOutbound(null);
        setShowOutboundForm(false);
      }}
      initialData={editingOutbound !== null ? outboundOrders[editingOutbound] : null}
      refreshOutbound={fetchOutboundOrders}
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
      initialData={editingStock !== null ? stocks[editingStock] : null}
      refreshStocks={fetchStocks}   // ✅ critical for refreshing the table
    />
  );
}


  // ------------------- RENDER -------------------
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#ffffffff" }}>
                  <th style={{ padding: "0.75rem" }}>PO Number</th>
                  <th style={{ padding: "0.75rem" }}>Supplier ID</th>
                  <th style={{ padding: "0.75rem" }}>Item</th>
                  <th style={{ padding: "0.75rem" }}>Ordered Qty</th>
                  <th style={{ padding: "0.75rem" }}>Received Qty</th>
                  <th style={{ padding: "0.75rem" }}>Date</th>
                  <th style={{ padding: "0.75rem" }}>Damaged</th>
                  <th style={{ padding: "0.75rem" }}>Spoiled</th>
                  <th style={{ padding: "0.75rem" }}>Missing</th>
                  <th style={{ padding: "0.75rem" }}>Rejected</th>
                  <th style={{ padding: "0.75rem" }}>Actions</th>
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
                    <td style={{ padding: "0.75rem" }}>{order.poNumber}</td>
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
                  <th style={{ padding: "0.75rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {outboundOrders.map((order, idx) => (
                  <tr
                    key={order.id}
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
                    <td
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        padding: "0.75rem",
                      }}
                    >
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
                    key={stock.id}
                    style={{
                      borderTop: "2.3px solid #ffffffff",
                      color: "#f1f5f9",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>{stock.item}</td>
                    <td style={{ padding: "0.75rem" }}>{stock.category}</td>
                    <td style={{ padding: "0.75rem" }}>{stock.quantity}</td>
                    <td
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        padding: "0.75rem",
                      }}
                    >
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
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch assignments once on mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const { data, error } = await supabase
      .from("item_assign")
      .select("order_number, retailer_id, item, quantity, status");

    if (error) {
      console.error("Error fetching assignments:", error.message);
    } else {
      const formatted = data.map((a) => ({
        orderNumber: a.order_number,
        retailerId: a.retailer_id,
        item: a.item,
        quantity: a.quantity,
        status: a.status,
      }));
      setAssignments(formatted);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return { backgroundColor: "#22c55e", color: "#fff" };
      case "Approved":
        return { backgroundColor: "#22c55e", color: "#fff" };
      case "disapproved":
        return { backgroundColor: "#ef4444", color: "#fff" };
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

  // Save handler: insert or update + refresh
  const handleSave = async (newAssignment) => {
    try {
      if (editingAssignment !== null) {
        const orderNumber = assignments[editingAssignment].orderNumber;

        const { error } = await supabase
          .from("item_assign")
          .update(newAssignment)
          .eq("order_number", orderNumber);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("item_assign")
          .insert([newAssignment]);

        if (error) throw error;
      }

      await fetchAssignments(); // refresh after save
      setShowForm(false);
      setEditingAssignment(null);
      return { success: true };
    } catch (err) {
      console.error("Error saving assignment:", err.message);
      return { success: false, error: err };
    }
  };

  const handleEdit = (index) => {
    setEditingAssignment(index);
    setShowForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  // Delete handler + refresh
  const confirmDelete = async () => {
    const assignmentToDelete = assignments[deleteIndex];

    try {
      const { error } = await supabase
        .from("item_assign")
        .delete()
        .eq("order_number", assignmentToDelete.orderNumber);

      if (error) throw error;

      await fetchAssignments(); // refresh after delete
    } catch (err) {
      console.error("Error deleting assignment:", err.message);
    }

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
        initialData={
          editingAssignment !== null ? assignments[editingAssignment] : null
        }
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
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
            Assignments of Items to the Retailers
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
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
                key={assignment.orderNumber}
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
            <p
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
                color: "#363B5E",
              }}
            >
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

function Approvals() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // ✅ Fetch assignments from Supabase
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const { data, error } = await supabase
      .from("item_assign")
      .select("order_number, retailer_id, item, category, quantity, status");

    if (error) {
      console.error("Error fetching assignments:", error.message);
    } else {
      const formatted = data.map((a) => ({
        orderNumber: a.order_number,
        retailerId: a.retailer_id,
        item: a.item,
        category: a.category,
        quantity: a.quantity,
        status: a.status,
      }));
      setData(formatted);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return { backgroundColor: "#22c55e", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", fontWeight: "600", fontSize: "0.75rem", display: "inline-block", minWidth: "60px", textAlign: "center" };
      case "disapproved":
        return { backgroundColor: "#ef4444", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", fontWeight: "600", fontSize: "0.75rem", display: "inline-block", minWidth: "60px", textAlign: "center" };
      case "pending":
        return { backgroundColor: "#f59e0b", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", fontWeight: "600", fontSize: "0.75rem", display: "inline-block", minWidth: "60px", textAlign: "center" };
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

  // ✅ Update DB + local state
  const updateStatus = async (newStatus) => {
    const assignment = data[selectedIndex];
    if (!assignment) return;

    try {
      console.log("Updating order:", assignment.orderNumber, "to", newStatus); // ✅ Debug

      const { error } = await supabase
        .from("item_assign")
        .update({ status: newStatus })
        .eq("order_number", assignment.orderNumber)

      if (error) throw error;

      // update local state
      setData((prev) =>
        prev.map((item, idx) =>
          idx === selectedIndex ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem", color: "#fff" }}>
        Approvals
      </h2>

      <div style={{ backgroundColor: "#363B5E", padding: "2rem", borderRadius: "12px", maxWidth: "1000px", margin: "auto", color: "#fff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>
          Approval of Item Assignment
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#ffffffff", fontSize: "0.85rem" }}>
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
              <tr key={assignment.orderNumber} style={{ borderBottom: "2px solid #ffffffff", color: "#ffffffff", fontWeight: "500" }}>
                <td style={{ padding: "2rem", textAlign: "center" }}>{assignment.orderNumber}</td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>{assignment.retailerId}</td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>{assignment.item}</td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>{assignment.category}</td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>{assignment.quantity}</td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  <span style={getStatusStyle(assignment.status)}>
                    {assignment.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  <button
                    onClick={() => openModal(idx)}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}
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
          <div onClick={closeModal} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "12px", maxWidth: "400px", width: "90%", color: "#363B5E", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: "0.75rem", marginBottom: "1rem", fontWeight: "600" }}>Approvals</div>
              <h3 style={{ marginBottom: "1.5rem", fontWeight: "700" }}>
                Approve this item assignment?
              </h3>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button
                  onClick={() => updateStatus("approved")} // ✅ lowercase to match DB
                  style={{ backgroundColor: "#86efac", border: "none", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600", color: "#363B5E" }}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus("disapproved")}
                  style={{ backgroundColor: "#fca5a5", border: "none", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600", color: "#7f1d1d" }}
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

  // retailers from Supabase
  const [retailers, setRetailers] = useState([]);

  // billing from Supabase
  const [billing, setBilling] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showBillingDeleteConfirm, setShowBillingDeleteConfirm] = useState(false);
  const [deleteBillingId, setDeleteBillingId] = useState(null);

  const [selectedBilling, setSelectedBilling] = useState(null);
  const [invoiceMode, setInvoiceMode] = useState("view");

  // ---------------- FETCH RETAILERS ----------------
  useEffect(() => {
    const fetchRetailers = async () => {
      const { data, error } = await supabase
        .from("retailer_supplier")
        .select("id, type, name, address, email, contact_number")
        .eq("type", "retailer");

      if (error) {
        console.error("Error fetching retailers:", error.message);
      } else {
        setRetailers(data || []);
      }
    };

    fetchRetailers();
  }, []);

// ---------------- FETCH BILLING (item_assign + retailer_supplier) ----------------
useEffect(() => {
  const fetchBilling = async () => {
    const { data, error } = await supabase
      .from("billing")
      .select(`
        invoice_id,
        retailer_id,
        retailer_name,
        address,
        email,
        contact_number,
        item,
        quantity,
        total,
        date,
        status
      `);

    if (error) {
      console.error("Error fetching billing:", error.message);
    } else {
      const formatted = (data || []).map((row) => ({
        order_number: row.invoice_id, // 🔹 use invoice_id as order_number if needed
        invoice_id: row.invoice_id,
        retailer_id: row.retailer_id,
        retailerName: row.retailer_name ?? "",
        address: row.address ?? "",
        email: row.email ?? "",
        contact: row.contact_number ?? "",
        item: row.item,
        quantity: row.quantity,
        total: row.total ?? 0,
        date: row.date ?? "",
        status: row.status ?? "Pending",
      }));
      setBilling(formatted);
    }
  };

  fetchBilling();
}, []);



  // ---------------- HANDLERS ----------------
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

  const confirmDelete = async () => {
  const retailerToDelete = retailers[deleteIndex];
  if (!retailerToDelete) return;

  // Delete related item_assign rows
  const { error: errorItems } = await supabase
    .from("item_assign")
    .delete()
    .eq("retailer_id", retailerToDelete.id);

  if (errorItems) {
    alert(`Failed to delete related item assignments: ${errorItems.message}`);
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
    return;
  }

  // Delete related warehouse_operations rows
  const { error: errorWarehouse } = await supabase
    .from("warehouse_operations")
    .delete()
    .eq("retailer_id", retailerToDelete.id);

  if (errorWarehouse) {
    alert(`Failed to delete related warehouse operations: ${errorWarehouse.message}`);
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
    return;
  }

  // Now delete the retailer
  const { error } = await supabase
    .from("retailer_supplier")
    .delete()
    .eq("id", retailerToDelete.id);

  if (error) {
    alert(`Failed to delete retailer: ${error.message}`);
  } else {
    setRetailers((prev) => prev.filter((r) => r.id !== retailerToDelete.id));
    alert("Retailer deleted successfully.");
  }

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

  // ---------------- CONDITIONAL RENDERS ----------------
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

  // ---------------- MAIN UI ----------------
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Retailer & Billing
      </h2>

      <div
        style={{
          backgroundColor: "#363B5E",
          padding: "1.5rem",
          borderRadius: "0.75rem",
        }}
      >
        {/* Tabs */}
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
                  <td style={{ padding: "0.75rem" }}>{retailer.contact_number}</td>
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
        <th style={{ padding: "0.75rem" }}>Invoice ID</th>
        <th style={{ padding: "0.75rem" }}>Retailer ID</th>
        <th style={{ padding: "0.75rem" }}>Retailer Name</th>
        <th style={{ padding: "0.75rem" }}>Email</th>
        <th style={{ padding: "0.75rem" }}>Contact</th>
        <th style={{ padding: "0.75rem" }}>Address</th>
        <th style={{ padding: "0.75rem" }}>Item</th>
        <th style={{ padding: "0.75rem" }}>Quantity</th>
        <th style={{ padding: "0.75rem" }}>Total</th>
        <th style={{ padding: "0.75rem" }}>Date</th>
        <th style={{ padding: "0.75rem" }}>Status</th>
        <th style={{ padding: "0.75rem" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {billing.map((bill) => (
        <tr
          key={bill.invoice_id}
          style={{ borderTop: "1px solid #ffffffff", color: "#f1f5f9" }}
        >
          <td style={{ padding: "0.75rem" }}>{bill.invoice_id}</td>
          <td style={{ padding: "0.75rem" }}>{bill.retailer_id}</td>
          <td style={{ padding: "0.75rem" }}>{bill.retailerName}</td>
          <td style={{ padding: "0.75rem" }}>{bill.email}</td>
          <td style={{ padding: "0.75rem" }}>{bill.contact}</td>
          <td style={{ padding: "0.75rem" }}>{bill.address}</td>
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
          <td style={{ display: "flex", gap: "0.5rem", padding: "0.75rem" }}>
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
              onClick={() => handleBillingDeleteClick(bill.invoice_id)}
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
            <p
              style={{ marginBottom: "1.5rem", textAlign: "center", color: "#000000ff" }}
            >
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
            <Route
              path="/"
              element={
                <RestrictedPage
                  pageName="Dashboard"
                  allowedRoles={[
                    "Admin",
                    "manager",
                    "staff",
                    "CSR",
                    "Team Leader",
                    "Accountant",
                    "Purchasing Officer",
                    "Warehouse Staff",
                  ]}
                  component={Dashboard}
                  userRole={user.role}
                />
              }
            />

            <Route
              path="/retailers"
              element={
                <RestrictedPage
                  pageName="Retailer/Supplier Records"
                  allowedRoles={[
                    "Admin",
                    "manager",
                    "staff",
                    "CSR",
                    "Team Leader",
                    "Accountant",
                    "Purchasing Officer",
                    "Warehouse Staff",
                  ]}
                  component={RetailerRecords}
                  userRole={user.role}
                />
              }
            />

            <Route
              path="/purchasing"
              element={
                <RestrictedPage
                  pageName="Purchasing"
                  allowedRoles={["Admin", "Purchasing Officer"]}
                  component={Purchasing}
                  userRole={user.role}
                />
              }
            />

            <Route
              path="/warehouse"
              element={
                <RestrictedPage
                  pageName="Warehouse Operations"
                  allowedRoles={["Admin", "Warehouse Staff"]}
                  component={WarehouseOperations}
                  userRole={user.role}
                />
              }
            />

            <Route
              path="/itemassign"
              element={
                <RestrictedPage
                  pageName="Item Assignment"
                  allowedRoles={["Admin", "CSR"]}
                  component={ItemAssignments}
                  userRole={user.role}
                />
              }
            />

            <Route
              path="/approvals"
              element={
                <RestrictedPage
                  pageName="Approvals"
                  allowedRoles={["Admin", "Team Leader"]}
                  component={Approvals}
                  userRole={user.role}
                />
              }
            />

            <Route
              path="/retailerandbilling"
              element={
                <RestrictedPage
                  pageName="Retailer & Billing"
                  allowedRoles={["Admin", "Accountant"]}
                  component={RetailerAndBilling}
                  userRole={user.role}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
