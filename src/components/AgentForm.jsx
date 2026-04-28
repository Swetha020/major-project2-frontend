import { useState } from "react";

export default function AgentForm({refetch,setShowForm}) {
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    image: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    fetch("https://major-project2-backend-mu.vercel.app/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agent),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed request");
        }
        return res.json();
      })
      .then(() => {
        setAgent({ name: "", email: "", image: "" });
        setShowForm(false)
        refetch(); 

      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="container my-3">
        <div className="card shadow p-4">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Agent Name:</label>
              <input
                className="form-control"
                placeholder="Enter Agent's Name"
                type="text"
                onChange={(e) =>
                  setAgent((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mail Id:</label>
              <input
                className="form-control"
                placeholder="Enter Agent's Mail Id"
                type="email"
                onChange={(e) =>
                  setAgent((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter image URL"
                onChange={(e) =>
                  setAgent((prev) => ({ ...prev, image: e.target.value }))
                }
              />
            </div>

            <div className="text-center">
              <button type="submit" className="appBtn w-50 mx-5">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
