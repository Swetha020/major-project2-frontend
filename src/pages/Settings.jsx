import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

export default function Settings() {
  const {
    data: agents,
    loading,
    refetch,
  } = useFetch("https://major-project2-backend-mu.vercel.app/agents");

  function handleDelete(leadId) {
    fetch(`https://major-project2-backend-mu.vercel.app/agents/${leadId}`, {
      method: "DELETE",
    }).then(() => refetch());
  }

  return (
    <>
      <h1 className="heading">Settings</h1>
      <h4 className="text-decoration-underline mt-4">User Profile</h4>
      <div className="d-flex justify-content-center">
        <div className="card w-50 text-center">
          <div className="card-body">
            <img
              src="http://placehold.co/100"
              alt="img"
              className="rounded mb-3"
            />
            <p>User Name: Swetha Mahesh</p>
            <p>Mail Id: Swetha@anvayacrm.com</p>
            <p>Ph-No: +91 98765 43210</p>
            <p className=" appBtn">Edit Profile</p>
          </div>
        </div>
      </div>
      <h4 className="text-decoration-underline mt-4">Sales Agents</h4>
      <div className="mx-5">
        {loading && (
          <div className="display-5 text-center bg-success-subtle text-secondary py-5 rounded">
            Loading ...
          </div>
        )}
        <div className="row">
          {agents?.map((agent) => (
            <div className="col-lg-3 col-12 mb-3 d-flex">
              <div className="card w-100">
                <div className="card-body text-center">
                  <img src={agent.image} alt={agent.name} className="rounded" />
                  <p className="mt-2 mb-0">{agent.name}</p>
                  <p>{agent.email}</p>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
