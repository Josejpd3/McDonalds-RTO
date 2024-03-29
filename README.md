McDonald's Request Time Off App
=========================

This web application allows crew members to request days off and managers to approve or deny those requests. Managers can also block dates in advance to prevent crew members from request unavailable days off.

Technologies Used
-----------------

-   Front-end: React, Apollo Client, React Router, Bootstrap
-   Back-end: Node.js, Express.js, Apollo Server, GraphQL, MongoDB
-   Authentication: JSON Web Tokens (JWT)
-   Deployment: Heroku

Features
--------

-   Crew members can create and submit time off requests, view their own requests, and cancel requests before they are approved.
-   Managers can view all time off requests, approve or deny requests, and block dates in advance.
-   Authentication is required for all actions. Crew members and managers have different levels of access to the app.


<!-- ![home rto](rto-home.png) -->
<img src="imgs/rto-home.png" alt= “” width="500px" height="500px">
<img src="imgs/rto-request.png" alt= “” width="500px" height="500px">
<img src="imgs/rto-create_request.png" alt= “” width="500px" height="500px">
<img src="imgs/rto-blockdates.png" alt= “” width="500px" height="500px">

Deployment
----------

This app is currently deployed on Heroku. No installation is required because the app is available online. To view the app, please go to [https://mcd-rto.com/](https://mcd-rto.com/).

Credits
-------

This app was created by [Jose Plasencia](https://www.linkedin.com/in/jose-plasencia-50b387241/). If you have any questions or issues, please contact me.