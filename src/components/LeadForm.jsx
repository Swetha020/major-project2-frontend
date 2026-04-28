import useFetch from "../hooks/useFetch";

export default function LeadForm({ lead, setLead, isUpdate, onSubmit }) {
  const checkboxHandler = (e) => {
    const { value, checked } = e.target;

    setLead((prev) => ({
      ...prev,
      tags: checked
        ? [...prev.tags, value]
        : prev.tags.filter((tag) => tag !== value),
    }));
  };

  const { data: agents } = useFetch("https://major-project2-backend-mu.vercel.app/agents");

  return (
    <>
      <div className="container my-3">
        <div className="card shadow p-4">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Lead Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={lead.name}
                placeholder="Enter Lead's name"
                onChange={(e) =>
                  setLead((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sourceSelect" className="form-label">
                Lead Source
              </label>
              <select
                id="sourceSelect"
                className="form-select"
                value={lead.source}
                onChange={(e) =>
                  setLead((prev) => ({
                    ...prev,
                    source: e.target.value,
                  }))
                }
                required
              >
                <option value="" disabled>
                  - Select -
                </option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="agentSelect" className="form-label">
                Sales Agent
              </label>
              <select
                id="agentSelect"
                className="form-select"
                value={lead.salesAgent._id}
                onChange={(e) =>
                  setLead((prev) => ({
                    ...prev,
                    salesAgent: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  - Select -
                </option>

                {agents?.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="statusSelect" className="form-label">
                Lead Status
              </label>
              <select
                id="statusSelect"
                className="form-select"
                value={lead.status}
                onChange={(e) => {
                  const newStatus = e.target.value;

                  setLead((prev) => ({
                    ...prev,
                    status: newStatus,
                    closedAt:
                      newStatus === "Closed" ? new Date().toISOString() : null,
                  }));
                }}
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

            <div className="mb-3">
              <label htmlFor="prioritySelect" className="form-label">
                Priority
              </label>
              <select
                id="prioritySelect"
                className="form-select"
                value={lead.priority}
                onChange={(e) =>
                  setLead((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  - Select -
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="timeToClose" className="form-label">
                Time To Close (Days)
              </label>
              <input
                type="number"
                id="timeToClose"
                className="form-control"
                min={1}
                value={lead.timeToClose || 1}
                onChange={(e) =>
                  setLead((prev) => ({
                    ...prev,
                    timeToClose: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Lead Tags</label>

              <div className="tag-container">
                {[
                  "Hot Buyer",
                  "1BHK",
                  "2BHK",
                  "3BHK",
                  "Family",
                  "Independent",
                  "Investor",
                  "Villa",
                  "Plot",
                  "Apartment",
                  "Luxury",
                  "Duplex",
                  "Premium",
                  "Budget",
                  "Rental",
                  "PentHouse",
                ].map((tag) => (
                  <label className="tag-item">
                    <input
                      type="checkbox"
                      value={tag}
                      checked={lead.tags?.includes(tag)}
                      onChange={checkboxHandler}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="appBtn w-100">
              {isUpdate ? "Update Lead" : "Add New Lead"}{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
