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
          <img src={light_house_illustration} alt="lighthouse-illustration"/>
        </div>
      ) : (
        <div className="requestContainer">
          {requests &&
            requests.map((request) => (
              <div key={request._id} className="request">
                <div className="view-button-container requestItem">
                  <Link to={`/requests/${request._id}`}>View Request</Link>
                </div>
                {role === 'admin' ? (
                  <div className="statusController requestItem">
                    <StatusController requestId={request._id} status={request.requestStatus}/>
                  </div>
                ) : (
                  <div style={{display: "none"}}>your status will update soon</div>
                )}
                <div className="request-date-container requestItem">
                  <p>Request</p>
                  <p>{request.startDate} - {request.endDate}</p>
                </div>
                <div className="status-container requestItem">
                  <p>Status</p>
                  <p className={request.requestStatus}>{request.requestStatus}</p>
                </div>

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
      )}

    </div>
  );
};

export default RequestList;
