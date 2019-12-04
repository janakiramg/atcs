# atcs-api

Air-traffic control system

# prerequisites

- install nodejs version 10.x. To download and install please go through node <a href="https://nodejs.org/en/">official website</a>
- make sure `npm` command working
- install any REST client. Example: https://www.getpostman.com/
- install postgresql database and have database connection details ready

# configuration

- Navigate to root folder and copy .env.example and paste in same folder and rename it to .env
- Update environment variable values for DATABASE, DB_USERNAME and DB_PASSWORD

# install npm packages

- Navigate to root folder and run `npm install` to install required packages

# run application

- From root folder run `npm start`

# access application

- Open REST client that you installed and access application using below URLs
  - GET request to see the status of application: http://localhost:3000
  - GET request to list existing aircrafts: http://localhost:3000/api/aircraft
  - POST request to create aircraft: http://localhost:3000/api/aircraft and example body is `{ "type": "Emergency", "size": "Small" }`
  - DELETE request to dequeue aircraft: http://localhost:3000/api/aircraft
