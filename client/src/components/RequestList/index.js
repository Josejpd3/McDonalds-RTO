import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


import { useMutation } from '@apollo/client';
import { REMOVE_REQUEST } from "../../utils/mutations";

const RequestList = ({
  requests,
  title,
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
    <main>
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
              >
                Delete
              </button>
          </div>
        ))}
    </main>
  );
};
