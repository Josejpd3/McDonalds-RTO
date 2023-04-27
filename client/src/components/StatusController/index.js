import React from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_REQUEST_STATUS } from "../../utils/mutations";



const StatusController = ({
    requestId,
    status,
}) => {

    const [updateRequestStatus] = useMutation(UPDATE_REQUEST_STATUS);

    const handleUpdate = async (id, requestStatus) => {
      try {
        await updateRequestStatus({ variables: { id, requestStatus } });
        window.location.reload()
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="statusController">
      {status === 'pending' ? (
        <div className="approve-deny-container">
          <button onClick={() => handleUpdate(requestId, 'approved')} className="approve-button">Approve</button>
          <button onClick={() => handleUpdate(requestId, 'denied')} className="deny-button">Deny</button>
        </div>
      ) : (
        <div>
          {status === 'approved' ? (
            <div className="deny-button">
              <button onClick={() => handleUpdate(requestId, 'denied')} className="deny-button">Deny</button>
            </div>
          ) : (
            <div className="approve-button">
              <button onClick={() => handleUpdate(requestId, 'approved')} className="approve-button">Approve</button>
            </div>
          )}
        </div>
      )}

    </div>
  );

};
  
export default StatusController;
  