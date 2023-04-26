import React from "react";
import { Link } from "react-router-dom";


import { useMutation } from '@apollo/client';
import { REMOVE_REQUEST } from "../../utils/mutations";

import StatusController from "../StatusController";

const RequestList = ({
  requests,
  title,
  role,
  showTitle = true,
  showUsername = true,
}) => {
  const [removeRequest] = useMutation(REMOVE_REQUEST);

  const handleDelete = async (requestId) => {
    try {
      await removeRequest({ variables: { requestId } });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  if (!requests) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div className="requestListComponent">
      {showTitle && <h3>{title}</h3>}
      {requests &&
        requests.map((request) => (
          <div key={request._id} className="card mb-3">
            <h4 className="card-header">
              {showUsername ? (
                <Link
                  to={`/profiles/${request.requestAuthor}`}
                >
                  {request.requestAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    had this request on {request.createdAt}
                  </span>
                </Link>
              ) : (
                
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You had this request on {request.createdAt}
                  </span>
                </>
              )}
            </h4>
              <button
                className="deleteBtn"
                onClick={() => {
                  handleDelete(request._id);
                }}
              >
                Delete
              </button>
            <div className="card-body">
              <p>{request.startDate} - {request.endDate}</p>
              <p className={request.requestStatus}>Request Status: {request.requestStatus}</p>
              {role === 'manager' ? (
                <div>
                  <StatusController requestId={request._id} status={request.requestStatus}/>
                </div>
              ) : (
                <p>your status will update soon</p>
              )}
            </div>
            <Link
              to={`/requests/${request._id}`}
            >
              View Request
            </Link>
          </div>
        ))}
    </main>
  );
};

export default RequestList;
