import { useState } from "react";
import useLeadContext from "../context/LeadContext";
import LeadForm from "../components/LeadForm";
import { toast } from "react-toastify";

export default function AddLeadForm() {
  const [lead, setLead] = useState({
    _id: null,
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: "",
    priority: "",
  });
  const { addLead } = useLeadContext();

  return (
    <>
      <h1 className="heading">Add New Lead</h1>
      <div className="container my-3">
        <div className="card shadow p-4">
          <LeadForm
            lead={lead}
            setLead={setLead}
            isUpdate={false}
            onSubmit={(e) => {
              e.preventDefault();
              addLead(lead);
              setLead({
                _id: null,
                name: "",
                source: "",
                salesAgent: "",
                status: "",
                tags: [],
                timeToClose: "",
                priority: "",
              });
              toast.success("New Lead Added");
            }}
          />
        </div>
      </div>
    </>
  );
}
