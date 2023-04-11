import React from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_REQUEST_STATUS } from "../../utils/mutations";



const StatusController = ({
    requestId
}) => {

    const [updateRequestStatus] = useMutation(UPDATE_REQUEST_STATUS);

    const handleUpdate = async (id, requestStatus) => {

    };
