import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RequestList from '../components/RequestList';

import { QUERY_REQUESTS, QUERY_USER, QUERY_ME, } from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loadingAll, data: allData } = useQuery(QUERY_REQUESTS);
  const allRequests = allData?.requests || [];

            <div>Loading...</div>
          ) : (
            <RequestList
              requests={requests}
              title="Request List"
            />
            
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
