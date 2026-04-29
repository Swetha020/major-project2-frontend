import useFetch from "../hooks/useFetch";
import AgentForm from "../components/AgentForm";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SalesAgent() {
  const {
    data: agents,
    loading,
    refetch,
  } = useFetch("https://major-project2-backend-mu.vercel.app/agents");

  const [showForm, setShowForm] = useState(false);

  const targetRef = useRef(null);
  useEffect(() => {
    if (showForm && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);
  return (
    <>
      <h1 className="heading">Sales Agent Management</h1>
      {loading && (
        <div className="display-5 text-center bg-success-subtle text-secondary py-5 rounded">
          Loading ...
        </div>
      )}

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
              <div className="col-3 text-end ">
                <Link
                  to={`/leads?agent=${agent.name}`}
                  className="appBtn text-decoration-none"
                >
                  View Leads
                </Link>
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
      <div ref={targetRef}>
        {showForm && <AgentForm refetch={refetch} setShowForm={setShowForm} />}
      </div>
    </>
  );
}
