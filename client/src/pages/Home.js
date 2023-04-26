import React, {useState} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RequestList from '../components/RequestList';
import RequestForm from '../components/RequestForm'


import { QUERY_REQUESTS, QUERY_USER, QUERY_ME, } from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loadingAll, data: allData } = useQuery(QUERY_REQUESTS);
  const allRequests = allData?.requests || [];

  const user = data?.me || data?.user || {};

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const tabSession = sessionStorage.getItem('tab');
  const selectedTab = !tabSession ? 'pending' : tabSession;

  const [activeTab, setActiveTab] = useState(selectedTab);

  const pendingRequests = allRequests.filter((request) => request.requestStatus === 'pending');
  const approvedRequests = allRequests.filter((request) => request.requestStatus === 'approved');
  const deniedRequests = allRequests.filter((request) => request.requestStatus === 'denied');

  function setTab(tab) {
    sessionStorage.setItem('tab', tab);
    setActiveTab(tab)
  }

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    window.location.href = '/login';
  }

  if(user.role === 'manager') {
    return (
      <div>
        <h1>Hello {user.role}</h1>
        <div className="listContainer">
          {loadingAll ? (
            <div>Loading...</div>
          ) : (
          <div className='tab-container'>
            <div className="tabs">
              <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setTab('pending')}>
                Pending Requests ({pendingRequests.length})
              </button>
              <button className={activeTab === 'approved' ? 'active' : ''} onClick={() => setTab('approved')}>
                Approved Requests ({approvedRequests.length})
              </button>
              <button className={activeTab === 'denied' ? 'active' : ''} onClick={() => setTab('denied')}>
                Denied Requests ({deniedRequests.length})
              </button>
            </div>
      
            {activeTab === "pending" && (
              <RequestList
                requests={pendingRequests}
                title="Pending Requests"
                role={user.role}
                tab={activeTab}
              />
            )}
            {activeTab === "approved" && (
              <RequestList
                requests={approvedRequests}
                title="Approved Requests"
                role={user.role}
                tab={activeTab}
              />
            )}
            {activeTab === "denied" && (
              <RequestList
                requests={deniedRequests}
                title="Denied Requests"
                role={user.role}
                tab={activeTab}
              />
            )}
          </div>
          )}
        </div>
      </div>
    )
  } else {
      return (
    <main>
      <div className="mainContainer">
        <h2>
          Welcome {user.username} profile.
        </h2>

        <div className='buttonContainer'>
            <button onClick={openModal}>Create Request</button>
            {showModal && (
              <div className='modal'>
                <div className='modal-content'>
                  <span className='close' onClick={closeModal}>
                    &times;
                  </span>
                  <RequestForm/>  
                </div>
              </div>
            )}
        </div>

        <RequestForm/>

        <div className="listContainer">
          <RequestList
            requests={user.requests}
            title={`${user.username}'s requests...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="divider"
            style={{ border: '1px dotted #1a1a1a' }}
          >
          </div>
        )}
      </div>
    </main>
  );
  }



};

export default Home;
