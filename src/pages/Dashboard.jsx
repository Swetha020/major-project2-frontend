import { Link } from "react-router-dom";
import useLeadContext from "../context/LeadContext";

export default function Dashboard() {
  const { topNewLeads, leadCount } = useLeadContext();

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  return (
    <>
      <h1 className="heading">Dashboard</h1>
      <h5>Latest Leads:</h5>
      <div className="row my-4">
        {topNewLeads.map((lead) => (
          <div className="col-3 m-auto leads">
            <p className="pt-2"> Name: {lead.name}</p>
            <p>{lead.tags.join(", ")}</p>
          </div>
        ))}
      </div>
      <div className="my-5">
        <Link className="appBtn text-decoration-none" to={"/leads"}>
          {" "}
          View All Leads
        </Link>
      </div>

      <hr />
      <div>
        <h5>Status:</h5>
        <ul className="lead-status">
          {statuses.map((status) => (
            <li className="status-item " key={status}>
              <Link
                to={`/leads?status=${status}`}
                className="status-pill"
              >
                {status}: [{leadCount(status)}]
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className=" my-5">
        <Link className="appBtn text-decoration-none " to={"/add-lead"}>
        {" "}
        Add New Lead
      </Link>
      </div>
    </>
  );
}
