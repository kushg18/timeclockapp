Simple Time Clock Application
=============================

### About ###
-----------------------------
This is a simple time clock application with some basic features. It is created using MEAN technology stack.

### Deploy Information ###
-----------------------------
The application build is deployed to ***Heroku*** and the link is given below - 
* https://timeclockkg.herokuapp.com/

### Technology Stack ### 
-----------------------------
1. Angular 7
2. Express/Node.js
3. MongoDB with Cloud Storage (MLAB)
4. Authentication using JWT

### Steps To Use ### 
-----------------------------
1. Register as a user to perform your daily punch In and Out. 
2. Enter valid email address to perform this registration (Currently, there is no notification service to send an email upon registration).
3. After registration, use your username and password to perform a login.
4. After logging in, you will see a dashboard (the main page) with three basic operation - 
    - Punch In
    - Break In 
    - Break Out
5. If you punch in, only feasible option left would be ***Punch Out***. Similar is the case with other options. 
6. On the right, you will see your current day's activity.
7. You can go to the profile tab to have a look at your recent activities for the past three days. 
8. Also, there is a management tab which is visible to just the manager of the application to have a look at all the user's activities. You need to acquire a manager role to access this endpoint. 
9. This management tab won't be visible to a normal user of the application. So, if you try to hit the endpoint ( ***/management*** ), then it will redirect to the dashboard endpoint. Hence, restricted endpoints are protected for respective roles.

### Application Screenshots ###
-----------------------------

#### Home Page ####
![alt text](https://github.com/kushg18/timeclockapp/blob/master/screenshots/home.png)

#### Dashboard Page ####
![alt text](https://github.com/kushg18/timeclockapp/blob/master/screenshots/dashboard.png)