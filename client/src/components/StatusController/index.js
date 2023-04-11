import React from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_REQUEST_STATUS } from "../../utils/mutations";



const StatusController = ({
    requestId
}) => {

    const [updateRequestStatus] = useMutation(UPDATE_REQUEST_STATUS);

    const handleUpdate = async (id, requestStatus) => {
        try {
            await updateRequestStatus({ variables: { id, requestStatus } });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div>
      <button onClick={() => handleUpdate(requestId, 'approved')}>Approve</button>
      <button onClick={() => handleUpdate(requestId, 'denied')}>Deny</button>
    </div>
  );

};
  
export default StatusController;
  