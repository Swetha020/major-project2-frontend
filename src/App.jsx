import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { LeadProvider } from "./context/LeadContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import NewLead from "./pages/NewLead";
import SalesAgent from "./pages/SalesAgents";
import Report from "./pages/Report";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LeadProvider>
      <Router>
        <div className="layout">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/leads/:leadId" element={<LeadDetail />} />
                <Route path="/add-lead" element={<NewLead />} />
                <Route path="/agents" element={<SalesAgent />} />
                <Route path="/reports" element={<Report />} />{" "}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Zoom}
        />
      </Router>
    </LeadProvider>
  );
}

export default App;
