# Documentation

## Getting start

1.  Create `.env` file in root directory

```
// .env file example
MONGODB_URI = "MONGODB_URI"
SECRET_ACCESS_TOKEN = 'SECRET_ACCESS_TOKEN'
SECRET_REFRESH_TOKEN = 'SECRET_REFRESH_TOKEN'
GOOGLE_USER = 'email@gmail.com' // enter your Google email
GOOGLE_PASSWORD = 'letykporzrrkyypk' // enter your Google application password
SWEAR_WORDS = ["bad_word1", "bad_word2"]
```

2.  Run `npm install`

## NPM scripts

`npm start` - start develment server  
`npm run build` - start build (builded app saves into `/dist`)

## MONGODB

`mongodb+srv://admin:adminpassword@okten-exam.prpxw59.mongodb.net/auto-market`

## Postman Collection

`https://antonohota-2611608.postman.co/workspace/Anton-Ohota's-Workspace~136fc0f6-86c7-4e84-8f87-c0fd1eb255f1/collection/52211374-1c8dea55-ebd3-4afa-b43a-d717323b2475?action=share&source=copy-link&creator=52211374`

## Docker

`docker build -t auto-market .` - create docker image  
`docker run -d -p 3000:3000 auto-market` - run docker container on 3000 port

# API

## Authorization

**Base url:** `http://localhost:3000/auth`

### Register

**Endpoint:**  
`POST /register`

**Request Body:**

```json
{
    "email": "user@mail.com",
    "firstName": "Alex",
    "lastName": "One",
    "password": "123456",
    "confirmPassword": "123456"
}
```

**Response:**

```json
{
    "userId": <userId>,
    "message": "User created"
}
```

---

### Login

**Endpoint:**  
 `POST /login`

**Request Body:**

```json
{
    "email": "user3@mail.com",
    "password": "123456"
}
```

**Response:**

```json
{
    "message": "Logged in",
    "userId": <userId>,
    "accessToken": <accessToken>
    "refreshToken":<refreshToken>
}
```

---

### Logout

**Endpoint:**  
 `GET /logout`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User logout"
}
```

---

### Delete Account

**Endpoint:**  
 `DELETE /delete`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User was deleted"
}
```

---

### Refresh Access Token

**Endpoint:**  
 `GET /refresh-access-token`

**Headers:**  
`Authorization: Bearer <refreshToken>`

**Response:**

```json
{
    "accessToken": <accessToken>
    "refreshToken":<refreshToken>
}
```

---

## Listings

**Base url:** `http://localhost:3000/listings`

### Create Car

**Endpoint:**  
 `POST /post-car`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
    "title": "Some title",
    "description": "Some description",
    "make": "Audi",
    "modelName": "R8",
    "year": 2013,
    "location": {
        "city": "Kyiv",
        "region": "Kyivska"
    },
    "price": {
        "value": 70500,
        "currency": "EUR" // UAH, USD, EUR
    }
}
```

**Response:**

```json
{
    "message": "Car listing create",
    "id": <carId>
}
```

---

### Update Car

**Endpoint:**  
 `PUT /update-car/:carId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
    "title": "Some title",
    "description": "Some description",
    "make": "Audi",
    "modelName": "R8",
    "year": 2013,
    "location": {
        "city": "Kyiv",
        "region": "Kyivska"
    },
    "price": {
        "value": 70500,
        "currency": "EUR" // UAH, USD, EUR
    }
}
```

**Response:**

```json
{
    "message": "Listing updated"
}
```

---

### Get Car

**Endpoint:**  
 `GET /get-car/:carId`

**Response:**

```json
{
    "car": {
        "_id": "6989b4ccac935a6b5b78bc41",
        "userId": "698911edb16274c8c8d318e3",
        "title": "Some title",
        "description": "Some description",
        "make": "Volkswagen",
        "modelName": "Beetle",
        "year": 2013,
        "location": {
            "city": "Kyiv",
            "region": "Kyivska"
        },
        "status": "active",
        "price": {
            "originCurrency": "USD",
            "UAH": 490475,
            "USD": 11500,
            "EUR": 9780.159521435693
        },
        "createdAt": "2026-02-09T10:19:56.665Z",
        "updatedAt": "2026-02-09T10:21:40.980Z"
    },
    "exchangeRate": {
        "_id": "6986646041f25ad6e7e41dc6",
        "EUR": 50.15,
        "USD": 42.65,
        "date": "2026-02-13T22:00:00.838Z",
        "createdAt": "2026-02-06T22:00:00.844Z",
        "updatedAt": "2026-02-06T22:00:00.844Z"
    }
}
```

---

### Get Cars

**Endpoint:**  
 `GET /get-cars`

**Params:**
| Param | Description |
|-------|-----|
| search |Search car by title or description|
| make |Filter cars by make|
| model |Filter cars by model|
| userId |Filter cars by userId|
| minYear/maxYear |Filter cars by min/max year|
| limit |Number of posts per page|
| page |Set page|

**Response:**

```json
{
    "total": 4,
    "page": 1,
    "totalPages": 2,
    "cars": [
        {
            "_id": "697fd523759466fe6e77f4d0",
            "userId": "697fcce60930c49de2f3f6cb",
            "title": "Reliable Family Car",
            "description": "No description",
            "make": "Toyota",
            "modelName": "Corolla",
            "year": 2018,
            "location": {
                "city": "Kyiv",
                "region": "Kyivska"
            },
            "status": "active",
            "price": {
                "originCurrency": "UAH",
                "UAH": 1250000,
                "USD": 29308.323563892147,
                "EUR": 24925.224327018943
            },
            "createdAt": "2026-02-01T22:35:15.622Z",
            "updatedAt": "2026-02-01T22:35:15.622Z"
        },
        {
            "_id": "697fe6f4759466fe6e77f4ec",
            "userId": "697fcce60930c49de2f3f6cb",
            "title": "Compact City Hatchback",
            "description": "No description",
            "make": "Volkswagen",
            "modelName": "Golf",
            "year": 2015,
            "location": {
                "city": "Lviv",
                "region": "Lvivska"
            },
            "status": "active",
            "price": {
                "originCurrency": "UAH",
                "UAH": 8900,
                "USD": 208.67526377491208,
                "EUR": 177.46759720837488
            },
            "createdAt": "2026-02-01T23:51:16.991Z",
            "updatedAt": "2026-02-01T23:51:16.991Z"
        }
    ],
    "exchangeRate": {
        "_id": "6986646041f25ad6e7e41dc6",
        "EUR": 50.15,
        "USD": 42.65,
        "date": "2026-02-13T22:00:00.838Z",
        "createdAt": "2026-02-06T22:00:00.844Z",
        "updatedAt": "2026-02-06T22:00:00.844Z"
    }
}
```

---

### Delete Car

**Endpoint:**  
`DELETE /delete-car/:carId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "Car deleted"
}
```

## Statistic

**Base url:** `http://localhost:3000/stats`

### View

**Endpoint:**  
`GET /views/:carId`

**Params:**
| Param | Description |
|-------|-----|
| period |Set period of views|

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "statistic": [
        {
            "_id": "6989b4ccac935a6b5b78bc41",
            "total": 1 // Number of views
        }
    ]
}
```

---

### Avarage Car Price

**Endpoint:**  
`GET /avg-price`

**Params:**
| Param | Description |
|-------|-----|
| city |Get avarage price by city|
| region |Get avarage price by region|

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "avg": {
        "UAH": 425133.3333333334,
        "USD": 9967.956232903478,
        "EUR": 8477.234961781323
    },
    "exchangeRate": {
        "_id": "6986646041f25ad6e7e41dc6",
        "EUR": 50.15,
        "USD": 42.65,
        "date": "2026-02-13T22:00:00.838Z",
        "createdAt": "2026-02-06T22:00:00.844Z",
        "updatedAt": "2026-02-06T22:00:00.844Z"
    }
}
```

---

## Admin

**baseUrl:** `http://localhost:3000/admin`

### Set Manager

**Endpoint:**  
`GET /set-manager/:userId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User role set to manager"
}
```

---

### Unset Manager

**Endpoint:**  
`GET /unset-manager/:userId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User role set to user"
}
```

---

### Ban User

**Endpoint:**  
`GET /bar-user/:userId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User banned"
}
```

---

### Unban User

**Endpoint:**  
`GET /unbar-user/:userId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User unbanned"
}
```

---

### Get Premium

**Endpoint:**  
`GET /get-premium/:userId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User got premium"
}
```

---

### Remove Premium

**Endpoint:**  
`GET /remove-premium/:userId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "User remove premium"
}
```

---

### Get Listings On Review

**Endpoint:**  
`GET /get-listings-on-review`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "listings": [
        {
            "location": {
                "city": "Kyiv",
                "region": "Kyivska"
            },
            "price": {
                "value": 11500,
                "currency": "USD"
            },
            "_id": "69894fda77a0edbd7c248274",
            "userId": "698911edb16274c8c8d318e3",
            "title": "Some title fuck",
            "description": "Some description",
            "make": "Volkswagen",
            "modelName": "Beetle",
            "year": 2013,
            "status": "on_review",
            "createdAt": "2026-02-09T03:09:14.259Z",
            "updatedAt": "2026-02-09T03:21:19.684Z",
            "warnings": 3
        }
    ]
}
```

---

### Set Listing Status

**Endpoint:**  
 `PUT /set-listing-status/:id`

**Params**
| Param | Description |
|-------|-----|
| status |`active`, `hidden`, `on_review`|

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "Listing status was update"
}
```

---

### Get Reports

**Endpoint:**  
`GET /get-reports`

**Params**
| Param | Description |
|-------|-----|
| userId |Filter reports by userId|

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
 `  "reports": [
        {
            "_id": "698958517ba85aa34be0c249",
            "message": "New report",
            "userId": "698911edb16274c8c8d318e3"
        },
        {
            "_id": "6989586a0c772c5b36b6ae4d",
            "message": "New report 2",
            "userId": "698911edb16274c8c8d318e3"
        }
    ]
}
```

---

### Get Report

**Endpoint:**  
 `GET /get-report/:reportId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "report": {
        "_id": "6989a485ac935a6b5b78bc33",
        "message": "New report 2",
        "userId": "698911edb16274c8c8d318e3"
    }
}
```

---

### Delete Report

**Endpoint:**  
 `DELETE /delete-report/:reportId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Response:**

```json
{
    "message": "Report was deleted"
}
```

---

## Report

**Base url:** `http://localhost:3000/report`

---

### Post Report

**Endpoint:**  
 `POST /post-report`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Request Body:**

```json
{
    "message": "New report"
}
```

**Repsonse:**

```json
{
    reportId: <reportId>,
    message: "Report was send",
}
```

---

### Delete Report

**Endpoint:**  
 `DELETE /delete-report/:reportId`

**Headers:**  
`Authorization: Bearer <accessToken>`

**Repsonse:**

```json
{
    "message": "Report was deleted"
}
```
