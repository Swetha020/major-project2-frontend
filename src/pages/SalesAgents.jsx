import useFetch from "../hooks/useFetch";
import AgentForm from "../components/AgentForm";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SalesAgent() {
  const { data: agents, refetch } = useFetch("https://major-project2-backend-mu.vercel.app/agents");

  function handleDelete(leadId) {
    fetch(`https://major-project2-backend-mu.vercel.app/agents/${leadId}`, {
      method: "DELETE",
    }).then(() => refetch());
  }
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <h1 className="heading">Sales Agent Management</h1>
      <ul className="list-group">
        {agents.map((agent) => (
          <li key={agent._id} className="list-group-item p-4">
            <div className="row align-items-center">
              <div className="col-3">
                {agent.image && (
                  <img
                    src={agent.image}
                    alt={agent.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "20%",
                    }}
                  />
                )}
              </div>
              <div className="col-3">{agent.name}</div>
              <div className="col-3">{agent.email}</div>
              <div className="col-3 text-end px-5">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(agent._id);
                    toast.error("Agent Deleted");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="appBtn my-2 mt-4"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Cancel" : "Add New Agent"}
      </button>
      {showForm && <AgentForm refetch={refetch} setShowForm={setShowForm} />}
    </>
  );
}
