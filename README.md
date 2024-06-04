# Headless cms api

CMSMounst is a headless cms api that gives frontend developers a central backend for managing
content for multiple frontend apps. It exposes endpoinds for performing crud operations for possible content types on a system.
Users can register an app on the system and get an api key for the app, which they can then use on the frontend to query content for that specific app

## Requirements

- Node >= 19
- Mongodb
- redis

## Run project

### Development

```
NODE_ENV=development npm start
```

The environment variable will trigger using the local installation of mongodb

### Production

```
npm run build

npm run serve
```

production environment uses mongo atlas which is cloud based version of mongo db

## Endpoints

- Baseurl = /api/v1/

### USERS

- POST /registration: User registration on the system
- GET /login: Obtain a session/access token for system operations
- GET /users: Admin only endpoints for retrieving all users in the system
- GET /users/logout: destroy session
- GET /account: gets a users account data
- PUT /account: update a user
- DELETE /account: delete a user account

### APPLICATIONS

- POST /apps: creates a frontend app on the system
- GET /apps/{appId}: retrieves information about an app
- PUT /apps/{appId}: updates an apps' data
- DELETE /apps/{deletes}: an existing app

### POST CONTENT

- POST /content/posts: create a post content
- GET /content/posts/{postId}: gets a single posts content
- PUT /content/posts/{postId}: updates a posts contents
- DELETE /content/posts/{postId}: deletes a posts content

### PROJECTS CONTENT

POST /content/projects/{projectId}: create a project content
GET /content/projects/{projectId}: get a single projects content
PUT /content/projects/{projectId}: updates a single content
DELETE /content/projects/{projectId}: deletes a single projects

### OTHER content endpoints and resources

- stacks
- categories

[Open API documentation](https://app.swaggerhub.com/apis/Projuanito/CMSMount/0.1)
