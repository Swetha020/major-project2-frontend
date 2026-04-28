import { useState } from "react";
import useLeadContext from "../context/LeadContext";
import { Link } from "react-router-dom";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Leads() {
  const { filterLeads } = useLeadContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const agent = searchParams.get("agent");

  const { data: agents } = useFetch("https://major-project2-backend-mu.vercel.app/agents");

  function getStatusClass(status) {
    switch (status) {
      case "New":
        return "list-group-item-primary";
      case "Contacted":
        return "list-group-item-info";
      case "Qualified":
        return "list-group-item-success";
      case "Proposal Sent":
        return "list-group-item-warning";
      case "Closed":
        return "list-group-item-dark";
    }
  }

  const priorityValue = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const priorityIcons = {
    Low: <FcLowPriority />,
    Medium: <FcMediumPriority />,
    High: <FcHighPriority />,
  };

  // const [status, setStatus] = useState("");
  // const [agent, setAgent] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredLeads = filterLeads(status, agent);

  const sortedLeads = [...filteredLeads];
  if (sortBy == "priority") {
    sortedLeads.sort(
      (a, b) => priorityValue[b.priority] - priorityValue[a.priority],
    );
  }

  if (sortBy == "timeToClose") {
    sortedLeads.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  return (
    <>
      <h1 className="heading">Lead List</h1>
      <section className="filter d-flex gap-5 m-4">
        <div className="flex-grow-1">
          <label className="form-label" htmlFor="statusSelect">
            Filter By Status:
          </label>
          <select
            name="statusSelect"
            className="form-select"
            id="statusSelect"
            value={status || ""}
            onChange={(e) =>
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("status", e.target.value);
                return params;
              })
            }
          >
            <option value="" disabled>
              - Select -
            </option>

            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="flex-grow-1">
          <label className="form-label" htmlFor="agentSelect">
            Filter By Agent:
          </label>
          <select
            name="agentSelect"
            className="form-select"
            id="agentSelect"
            value={agent || ""}
            onChange={(e) =>
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("agent", e.target.value);
                return params;
              })
            }
          >
            <option value="" disabled>
              - Select -
            </option>
            {agents.map((agent) => (
              <option value={agent.name}>{agent.name}</option>
            ))}
           
          </select>
        </div>
      </section>
      <div className="sort m-4 d-flex align-items-center gap-3">
        <label
          className="form-label"
          htmlFor="priority"
          style={{ width: "80px" }}
        >
          Sort By:
        </label>
        <select
          name="priority"
          className="form-select "
          id="priority"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="" disabled>
            - Select -
          </option>
          <option value="priority">Priority</option>
          <option value="timeToClose">Time To Close</option>
        </select>
        <button
          className="btn btn-primary px-5 mx-5"
          onClick={() => {
            setSearchParams({});
            setSortBy("");
          }}
        >
          Clear
        </button>
      </div>
      <ul className="list-group m-3">
        <li className="list-group-item fw-bold m-1 list-group-item-secondary">
          <div className="row">
            <div className="col-3 fs-5">Name</div>
            <div className="col-3 fs-5">Status</div>
            <div className="col-3 fs-5">Priority</div>
            <div className="col-3 fs-5">Agent</div>
          </div>
        </li>
        {sortedLeads.map((lead) => (
          <li className={`list-group-item m-1 ${getStatusClass(lead.status)}`}>
            <Link
              to={`/leads/${lead._id}`}
              className="text-decoration-none text-dark"
            >
              <div className="row">
                <div className="col-3">{lead.name}</div>
                <div className="col-3">{lead.status}</div>
                <div className="col-3">
                  {priorityIcons[lead.priority]} <span>{lead.priority}</span>
                </div>
                <div className="col-3">
                  {lead.salesAgent?.name || "No Agent"}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
