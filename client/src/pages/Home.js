import React, {useState} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import RequestList from '../components/RequestList';
import Header from '../components/Header';

import DateRangePicker from '../components/DateRangePicker';

import { QUERY_REQUESTS, QUERY_USER, QUERY_ME, } from '../utils/queries';

import Auth from '../utils/auth';
import DateBlocker from '../components/DateBlocker';
import LoadingSpinner from '../components/LoadingSpinner';


const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loadingAll, data: allData } = useQuery(QUERY_REQUESTS);
  const allRequests = allData?.requests || [];

  const sortedRequests = allRequests.slice().sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    } else if (a.createdAt > b.createdAt) {
      return 1;
    } else {
      return 0;
    }
  });

  const user = data?.me || data?.user || {};

  const [showModal, setShowModal] = useState(false);
  const [showModalBlockDates, setShowModalBlockDates] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function openModalBlockDates() {
    setShowModalBlockDates(true);
  }

  function closeModalBlockDates() {
    setShowModalBlockDates(false);
  }

  const tabSession = sessionStorage.getItem('tab');
  const selectedTab = !tabSession ? 'pending' : tabSession;

  const [activeTab, setActiveTab] = useState(selectedTab);

  const pendingRequests = sortedRequests.filter((request) => request.requestStatus === 'pending');
  const approvedRequests = sortedRequests.filter((request) => request.requestStatus === 'approved');
  const deniedRequests = sortedRequests.filter((request) => request.requestStatus === 'denied');

  function setTab(tab) {
    sessionStorage.setItem('tab', tab);
    setActiveTab(tab)
  }

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (!user?.username) {
    window.location.href = '/login';
  }

  if(user.role === 'manager') {
    return (
      <div className='HomeContainer'>
        <Header role={user.role}/>
        <div className='buttonContainer dateBlockContainer'>
          <button className='block-date-button' onClick={openModalBlockDates}>Block Dates</button>
          {showModalBlockDates && (
            <div className='modal dateBlockerModal'>
              <div className='modal-content'>
                <div className='requestFormComponent'>

                </div>
              </div>
            </div>
          )}
        </div>

        <div className='buttonContainer'>
            <button className='create-request-button' onClick={openModal}>Create Request</button>
            {showModal && (
              <div className='modal'>
                <div className='modal-content'>
                  <div className='requestFormComponent'>
                    <div className='formHeader'>
                      <h3>Request Time Off</h3>
                      <span className='close' onClick={closeModal}>
                        &times;
                      </span>
                    </div>
                    {Auth.loggedIn() ? (
                    <div className='DateRangePickerContainer'>
                      <p>Select 2 Dates</p>
                      <DateRangePicker closeModal={closeModal} />
                    </div>
                    ) : (
                      <p>
                        You need to be logged in to share your requests. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className="listContainer">
          {loadingAll ? (
            <LoadingSpinner/>
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
      <div className="mainContainer">
        <Header role={user.role}/>

        <div className='buttonContainer'>
            <button className='create-request-button' onClick={openModal}>Create Request</button>
            {showModal && (
              <div className='modal'>
                <div className='modal-content'>
                  <div className='requestFormComponent'>
                    <div className='formHeader'>
                      <h3>Request Time Off</h3>
                      <span className='close' onClick={closeModal}>
                        &times;
                      </span>
                    </div>

                    {Auth.loggedIn() ? (
                    <div className='DateRangePickerContainer'>
                      <p>Select 2 Dates</p>
                      <DateRangePicker closeModal={closeModal} />
                    </div>
                    ) : (
                      <p>
                        You need to be logged in to share your requests. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              )}
        </div>

        <RequestList
          requests={user.requests}
          title={`${user.username}'s requests...`}
          showTitle={false}
          showUsername={false}
        />
        {!userParam && (
          <div
            className="divider"
            style={{ border: '1px dotted #1a1a1a', display: 'none'}}
          >
          </div>
        )}
      </div>
  );
  }



};

export default Home;
