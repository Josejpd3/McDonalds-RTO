import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import RequestList from '../components/RequestList';
import RoleUpdateForm from '../components/RoleUpdateForm';

const UserDetail = () => {
  const { userId } = useParams();
  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId },
  });

  const currentUserData = useQuery(QUERY_ME);
  const currentUser = currentUserData?.data?.me || {};
  const user = userId ? data?.user : currentUser;

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  if (loading) {
    return <LoadingSpinner/>;
  }

  // Check if the user has an admin role
  if (currentUser.role !== 'admin') {
    return <div>Access denied. Only admins can view this page.</div>;
  }

    return (
      <div className="userDetailComponent">
        <a className='go-back' href='/users'>&#10132;</a>
        <h2>User Detail</h2>
        <p>EID<br/>{user.username}</p>
        <p>Name<br/>{user.firstName} {user.lastName}</p>
        <p className='role-edit-button' onClick={openModal}>Role<br/>{user.role}</p>
        <h3>Requests</h3>
        <RequestList
          requests={user.requests}
          title={`${user.username}'s requests...`}
          showTitle={false}
          showUsername={false}
        />
      </div>
    );
};

export default UserDetail;