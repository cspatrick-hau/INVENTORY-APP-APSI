import React from "react";
import { Download } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
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

// ================== Data ==================
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
  "#3b82f6", // blue
  "#22c55e", // green
  "#ef4444", // red
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#14b8a6", // teal
];

const linkStyle = {
  width: "100%",
  textAlign: "left",
  padding: "0.5rem",
  backgroundColor: "#334155",
  borderRadius: "0.5rem",
  color: "#FFFFFF",
  cursor: "pointer",
  textDecoration: "none",
};

// ================== Pages ==================
function Dashboard() {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
        Dashboard
      </h2>

      {/* Same Dashboard content here (Item Tracker, Category Distribution, Stats, Charts) */}
      {/* ... keep your existing dashboard JSX ... */}
      <p style={{ marginTop: "1rem" }}>
        📊 Your dashboard content is still here.
      </p>
    </div>
  );
}

function RetailerRecords() {
  return <h2>Retailer Records Page</h2>;
}

function SupplyManagement() {
  return <h2>Supply Management Page</h2>;
}

function Purchasing() {
  return <h2>Purchasing Page</h2>;
}

function WarehouseOps() {
  return <h2>Warehouse Operations Page</h2>;
}

function CustomerBilling() {
  return <h2>Customer & Billing Page</h2>;
}

// ================== App Layout ==================
function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "16rem",
            backgroundColor: "#1E293B",
            padding: "1.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Inventory System
          </h1>

          <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link to="/" style={linkStyle}>Dashboard</Link>
            <Link to="/retailers" style={linkStyle}>Retailer Records</Link>
            <Link to="/supply" style={linkStyle}>Supply Management</Link>
            <Link to="/purchasing" style={linkStyle}>Purchasing</Link>
            <Link to="/warehouse" style={linkStyle}>Warehouse Ops</Link>
            <Link to="/billing" style={linkStyle}>Customer & Billing</Link>
          </nav>
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
            <Route path="/supply" element={<SupplyManagement />} />
            <Route path="/purchasing" element={<Purchasing />} />
            <Route path="/warehouse" element={<WarehouseOps />} />
            <Route path="/billing" element={<CustomerBilling />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
