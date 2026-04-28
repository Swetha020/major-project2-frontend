import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";

const LeadContext = createContext();
const useLeadContext = () => useContext(LeadContext);
export default useLeadContext;

export function LeadProvider({ children }) {
  const { data: leads = [], refetch } = useFetch("https://major-project2-backend-mu.vercel.app/leads");

  const topNewLeads = leads
    .filter((lead) => lead.status === "New")
    .sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const filterLeads = (status = "", agent = "") => {
    const filteredLeadsByStatus = status
      ? leads.filter((lead) => lead.status === status)
      : leads;
    const filteredLeads = agent
      ? filteredLeadsByStatus.filter((lead) => lead.salesAgent.name == agent)
      : filteredLeadsByStatus;
    return filteredLeads;
  };

  const leadCount = (status) => {
    const count = leads.reduce(
      (total, lead) => (lead.status === status ? total + 1 : total),
      0,
    );
    return count;
  };

  const addLead = async (lead) => {
    await fetch("https://major-project2-backend-mu.vercel.app/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    refetch();
  };

  const updateLead = async (leadData, leadId) => {
    await fetch(`https://major-project2-backend-mu.vercel.app/leads/${leadId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });

    refetch();
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        topNewLeads,
        leadCount,
        filterLeads,
        addLead,
        updateLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
