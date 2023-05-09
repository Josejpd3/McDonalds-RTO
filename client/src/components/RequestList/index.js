import React from "react";
import { Link } from "react-router-dom";

import light_house_illustration from './light_house_no-requests.svg'

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
      {requests.length === 0 ? (
        <div className="no-request-container">
          <h3>No Requests</h3>

            {showUsername ? (
              <Link to={`/profiles/${request.requestAuthor}`}>
                {request.requestAuthor} <br />
                <div className="created-date-container requestItem" style={{ fontSize: "1rem" }}>
                  <p>Created On</p>
                  {request.createdAt}
                </div>
              </Link>
            ) : (
              
              <>
                <div className="created-date-container requestItem" style={{ fontSize: "1rem" }}>
                  <p>Created On</p>
                  {request.createdAt}
                </div>
              </>
            )}
            <div className="delete-button-container requestItem">
              <button className="deleteBtn" onClick={() => {handleDelete(request._id);}}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RequestList;
