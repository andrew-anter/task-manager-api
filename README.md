
# Task Manager REST API - Backend Only

This is a simple task manager backend API that enables the user
to do CRUD operations on both user and task model which is used 
to create tasks for a specific users and save all that data to 
a mongodb database which is either saved locally or cloud database

The API runs using MongoDB server so before you run it install
 [MongoDB](https://www.mongodb.com/) and make sure it's running
 as it should
## Installation

Install project dependencies with npm

```bash
  npm install
```


## How to use the backend API

Install the API locaclly or use the [Heroku](https://andrew-anter-task-manager-api.herokuapp.com/) server to make requests
using a frontend of yours

Note: {{url}} is either your localhost or the heroku server
Note: First request shall be either to create a request or to login or you won't be able to run any request 

### Users related requests

**(POST request)** Create User
```
    {{url}}/users

    //Request body :
    // {
    //      "name" : "your name",
    //      "email": "yourEmail@examble.com",
    //      "password" : "yourpassword"
    // } 
```

**(POST request)** Login User

```
    {{url}}/users/login
    
    // Request body :
    // {
    //      "email" : "your email",
    //      "password" : "yourpassword"
    // } 

```

**(POST request)** Logout User
```
    {{url}}/users/logout
```

**(POST request)** Logout User from All Sessions
```
    {{url}}/users/logoutAll
```
**(GET request)** Read My Profile Data
```
    {{url}}/users/me/avatar
```

**(GET request)** Read a user by its ID  
Note : replace 'id' with the id of the user you want to read 
```
    {{url}}/users/'id'
```
**(DELETE request)** Delete your account profile
```
    {{url}}/users/me
```

**(PATCH request)** Update your user profile data
```
    {{url}}/users/me
    
    // Request body :
    // 
    // {
    //      the property to update : new value 
    // }
```

### Tasks related requests
Note : all requests is associated to the currently logged user 

**(POST request)** Create a task
```
    {{url}}/tasks

    // Request Body :
    // { 
    //    "description" : "this is a test description",
    //    "completed" : "FALSE or TRUE"
    // }
```

**(GET request)** Read all requests
```
    {{url}}/tasks?sortBy=createdAt:asc
```

**(GET request)** Read a specific task by ID
Note: replace 'id' with the task ID you want to read
```
    {{url}}/tasks/'id'
```

**(DELETE request)** Delete a specific task by ID
Note: replace 'id' with the task ID you want to delete
```
    {{url}}/tasks/'id'
```

**(PATCH request)** Updata a specific task by ID
```
    {{url}}/tasks/'id'

    // Request body :
    // { 
    //      "the property to upadte" : "the new value"
    // }
```
