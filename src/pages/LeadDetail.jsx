import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import LeadForm from "../components/LeadForm";
import useLeadContext from "../context/LeadContext";
import { toast } from "react-toastify";

export default function LeadDetail() {
  const { leadId } = useParams();
  const { updateLead } = useLeadContext();

  const [showForm, setShowForm] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [comment, setComment] = useState({ commentText: "", author: "" });

  const targetRef = useRef(null);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://major-project2-backend-mu.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newComment: comment }),
        },
      );
      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]);

      toast.success("Comment Added");
      setComment({ commentText: "", author: "" });
    } catch {}
  };

  const {
    data: lead,
    loading,
    error,
    refetch: refetchLead,
  } = useFetch(`https://major-project2-backend-mu.vercel.app/leads/${leadId}`);

  const {
    data: allComments,
    loading: commentsLoading,
    error: commentsError,
  } = useFetch(
    `https://major-project2-backend-mu.vercel.app/leads/${leadId}/comments`,
  );

  useEffect(() => {
    if (allComments) {
      setComments(allComments);
    }
  }, [allComments]);

  const { data: agents } = useFetch(
    `https://major-project2-backend-mu.vercel.app/agents`,
  );

  const [comments, setComments] = useState(allComments);

  useEffect(() => {
    if (lead) {
      setLeadData(lead);
    }
  }, [lead]);

  useEffect(() => {
    if (showForm && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  return (
    <>
      <h1 className="heading">Lead Detail</h1>

      <div className="d-flex gap-4">
        <div className="flex-grow-1">
          <div className="card">
            <div className="card-body">
             

              {error && (
                <div className="display-5 text-center bg-danger-subtle text-secondary py-5 rounded">
                  Error Occurred
                </div>
              )}
              <table className="table">
                <tbody>
                  <tr>
                    <th>Lead Name</th>
                    <td>{loading?"Loading...":lead?.name}</td>
                  </tr>
                  <tr> 
                    <th>Sales Agent</th>
                    <td>{loading?"Loading...":lead?.salesAgent?.name}</td>
                  </tr>
                  <tr>
                    <th>Source</th>
                    <td>{loading?"Loading...":lead?.source}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{loading?"Loading...":lead?.status}</td>
                  </tr>
                  <tr>
                    <th>Priority</th>
                    <td>{loading?"Loading...":lead?.priority}</td>
                  </tr>
                  <tr>
                    <th>Time To Close</th>
                    <td>{loading?"Loading...":lead?.timeToClose}</td>
                  </tr>
                  {lead?.closedAt && (
                    <tr>
                      <th>Closed At</th>
                      <td>{loading?"Loading...":new Date(lead.closedAt).toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <hr />

          <button className="appBtn" onClick={() => setShowForm(true)}>
            Edit Lead
          </button>

          <hr />
        </div>

        <div className="flex-grow-1">
          <div className="card">
            <div className="card-body">
              <h4>Comments:</h4>

              {commentsLoading && (
                <div className="display-5 text-center bg-success-subtle text-secondary py-5 rounded">
                  Loading Comments...
                </div>
              )}

              {commentsError && (
                <div className="display-5 text-center bg-danger-subtle text-secondary py-5 rounded">
                  Error loading comments
                </div>
              )}

              {comments?.map((comment) => (
                <div className="card m-2" key={comment._id}>
                  <div className="card-body">
                    <p>{comment.commentText}</p>
                    <p className="text-end">-{comment.author?.name}</p>
                    <p className="text-end">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <hr />
              <form onSubmit={handleAddComment} className="mt-3">
                <textarea
                  className="form-control"
                  placeholder="Enter comment..."
                  value={comment.commentText}
                  onChange={(e) =>
                    setComment((prev) => ({
                      ...prev,
                      commentText: e.target.value,
                    }))
                  }
                  required
                />

                <div className="mt-2 d-flex gap-2">
                  <select
                    value={comment.author}
                    onChange={(e) =>
                      setComment((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    className="form-select"
                    required
                  >
                    <option value="">-- Select Author --</option>
                    {agents.map((agent) => (
                      <option value={agent._id}>{agent.name}</option>
                    ))}
                  </select>
                  <button type="submit" className="appBtn w-100">
                    Add Comment
                  </button>
                </div>
              </form>

              <hr />
            </div>
          </div>
        </div>
      </div>

      {showForm && leadData && (
        <div ref={targetRef}>
          <LeadForm
            lead={leadData}
            setLead={setLeadData}
            isUpdate={true}
            onSubmit={(e) => {
              e.preventDefault();
              updateLead(leadData, leadData._id);
              setShowForm(false);
              toast.success("Lead Updated");
              refetchLead();
            }}
          />
        </div>
      )}
    </>
  );
}
