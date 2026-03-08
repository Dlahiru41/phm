# SuwaCare LK – Backend API Endpoints

> **Project:** National Child Vaccination Management System (NCVMS)
> **Base URL:** `/api/v1`
> **Auth:** Bearer JWT token in the `Authorization` header (except public endpoints).
> **Roles:** `parent` | `phm` | `moh`

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Users](#2-users)
3. [Children](#3-children)
4. [Vaccines](#4-vaccines)
5. [Vaccination Records](#5-vaccination-records)
6. [Vaccination Schedule](#6-vaccination-schedule)
7. [Growth Records](#7-growth-records)
8. [Notifications](#8-notifications)
9. [Reports](#9-reports)
10. [Audit Logs](#10-audit-logs)
11. [Analytics & Dashboard](#11-analytics--dashboard)

---

## 1. Authentication

### 1.1 Login

| Field  | Value              |
|--------|--------------------|
| Method | `POST`             |
| URL    | `/auth/login`      |
| Auth   | Public (no token)  |

**Request Body**

```json
{
  "usernameOrEmail": "parent@ncvms.gov.lk",
  "password": "parent123"
}
```

*Accepted identifiers: email address, NIC number, or username.*

**Response `200 OK`**

```json
{
  "token": "<JWT>",
  "user": {
    "userId": "user-parent-001",
    "email": "parent@ncvms.gov.lk",
    "nic": "987654321V",
    "role": "parent",
    "name": "Amara Perera",
    "phoneNumber": "+94771234567",
    "address": "123 Main Street, Colombo",
    "languagePreference": "en",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Meaning                       |
|--------|-------------------------------|
| `401`  | Invalid credentials           |
| `422`  | Validation error (empty fields) |

---

### 1.2 Register

| Field  | Value              |
|--------|--------------------|
| Method | `POST`             |
| URL    | `/auth/register`   |
| Auth   | Public (no token)  |

**Request Body**

```json
{
  "fullName": "Amara Perera",
  "nic": "987654321V",
  "email": "parent@ncvms.gov.lk",
  "phoneNumber": "+94771234567",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "role": "parent"
}
```

*`role` must be one of: `parent`, `phm`, `moh`.*

**Response `201 Created`**

```json
{
  "message": "Account created successfully.",
  "userId": "user-parent-002"
}
```

**Error Responses**

| Status | Meaning                           |
|--------|-----------------------------------|
| `409`  | Email or NIC already registered   |
| `422`  | Validation error (e.g. passwords do not match, password < 6 chars) |

---

### 1.3 Logout

| Field  | Value              |
|--------|--------------------|
| Method | `POST`             |
| URL    | `/auth/logout`     |
| Auth   | Required           |

**Request Body** – *(none)*

**Response `200 OK`**

```json
{
  "message": "Logged out successfully."
}
```

---

### 1.4 Forgot Password

| Field  | Value                    |
|--------|--------------------------|
| Method | `POST`                   |
| URL    | `/auth/forgot-password`  |
| Auth   | Public (no token)        |

**Request Body**

```json
{
  "email": "parent@ncvms.gov.lk"
}
```

**Response `200 OK`**

```json
{
  "message": "Password reset email sent."
}
```

---

### 1.5 Reset Password

| Field  | Value                   |
|--------|-------------------------|
| Method | `POST`                  |
| URL    | `/auth/reset-password`  |
| Auth   | Public (no token)       |

**Request Body**

```json
{
  "token": "<reset-token-from-email>",
  "newPassword": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
```

**Response `200 OK`**

```json
{
  "message": "Password reset successfully."
}
```

---

## 2. Users

### 2.1 Get Current User Profile

| Field  | Value           |
|--------|-----------------|
| Method | `GET`           |
| URL    | `/users/me`     |
| Auth   | Required (any role) |

**Response `200 OK`**

```json
{
  "userId": "user-parent-001",
  "email": "parent@ncvms.gov.lk",
  "nic": "987654321V",
  "name": "Amara Perera",
  "role": "parent",
  "phoneNumber": "+94771234567",
  "address": "123 Main Street, Colombo",
  "languagePreference": "en",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

---

### 2.2 Update Current User Profile

| Field  | Value               |
|--------|---------------------|
| Method | `PUT`               |
| URL    | `/users/me`         |
| Auth   | Required (any role) |

**Request Body** *(all fields optional)*

```json
{
  "name": "Amara Perera Silva",
  "phoneNumber": "+94771234568",
  "address": "456 New Road, Colombo",
  "languagePreference": "si"
}
```

**Response `200 OK`**

```json
{
  "message": "Profile updated successfully.",
  "user": { "...updated user object..." }
}
```

---

### 2.3 Update User Settings

| Field  | Value                    |
|--------|--------------------------|
| Method | `PUT`                    |
| URL    | `/users/me/settings`     |
| Auth   | Required (any role)      |

**Request Body**

```json
{
  "languagePreference": "ta",
  "notifications": {
    "email": true,
    "sms": false,
    "push": true
  }
}
```

**Response `200 OK`**

```json
{
  "message": "Settings saved successfully."
}
```

---

## 3. Children

### 3.1 Register a New Child (PHM only)

| Field  | Value                   |
|--------|-------------------------|
| Method | `POST`                  |
| URL    | `/children`             |
| Auth   | Required (`phm`)        |

**Request Body**

All fields except optional ones are required. The authenticated user must have role `phm`; the backend should associate the new child with that PHM (e.g. set `registeredBy` and `areaCode` from the JWT). Optional `phmId` and `areaCode` may be sent by the client so the backend can explicitly associate the child with that PHM area.

```json
{
  "firstName": "Kavindu",
  "lastName": "Perera",
  "dateOfBirth": "2020-04-15",
  "gender": "male",
  "birthWeight": 3.2,
  "birthHeight": 50.0,
  "headCircumference": 34.0,
  "bloodGroup": "B+",
  "motherName": "Amara Perera",
  "motherNIC": "987654321V",
  "fatherName": "Sunil Perera",
  "fatherNIC": "123456789V",
  "district": "Colombo",
  "dsDivision": "Colombo West",
  "gnDivision": "Colombo 01",
  "address": "123 Main Street, Colombo",
  "phmId": "phm-001",
  "areaCode": "COL-01"
}
```

*Optional: `headCircumference`, `bloodGroup`, `phmId`, `areaCode`.*

**Response `201 Created`**

```json
{
  "childId": "child-005",
  "registrationNumber": "NCVMS-2024-0415-1234",
  "message": "Child registered successfully."
}
```

---

### 3.2 Get Child by ID

| Field  | Value                          |
|--------|-------------------------------|
| Method | `GET`                         |
| URL    | `/children/:childId`          |
| Auth   | Required (any role)           |

**Response `200 OK`**

```json
{
  "childId": "child-001",
  "registrationNumber": "NCVMS-2024-0415-1234",
  "firstName": "Kavindu",
  "lastName": "Perera",
  "dateOfBirth": "2020-04-15",
  "gender": "male",
  "bloodGroup": "B+",
  "birthWeight": 3.2,
  "birthHeight": 50.0,
  "headCircumference": 34.0,
  "parentId": "user-parent-001",
  "registeredBy": "phm-001",
  "areaCode": "COL-01",
  "areaName": "Colombo 01",
  "createdAt": "2024-04-15T08:00:00.000Z"
}
```

---

### 3.3 Search Child by Registration Number

| Field  | Value                                              |
|--------|----------------------------------------------------|
| Method | `GET`                                              |
| URL    | `/children/search?registrationNumber=NCVMS-2024-0415-1234` |
| Auth   | Required (any role)                                |

**Query Parameters**

| Param                | Type     | Required | Description                     |
|----------------------|----------|----------|---------------------------------|
| `registrationNumber` | `string` | Yes      | Child registration number       |

**Response `200 OK`**

```json
{
  "childId": "child-001",
  "registrationNumber": "NCVMS-2024-0415-1234",
  "firstName": "Kavindu",
  "lastName": "Perera",
  "dateOfBirth": "2020-04-15",
  "gender": "male"
}
```

---

### 3.4 Link Child to Parent Account (Parent only)

| Field  | Value                              |
|--------|------------------------------------|
| Method | `POST`                             |
| URL    | `/children/:childId/link-parent`   |
| Auth   | Required (`parent`)                |

**Request Body**

```json
{
  "registrationNumber": "NCVMS-2024-0415-1234"
}
```

**Response `200 OK`**

```json
{
  "message": "Child successfully linked to your account."
}
```

---

### 3.5 Get Children by Parent

| Field  | Value                                        |
|--------|----------------------------------------------|
| Method | `GET`                                        |
| URL    | `/children?parentId=user-parent-001`         |
| Auth   | Required (`parent`, `phm`, `moh`)            |

**Query Parameters**

| Param      | Type     | Required | Description          |
|------------|----------|----------|----------------------|
| `parentId` | `string` | Yes      | Parent user ID       |

**Response `200 OK`**

```json
[
  {
    "childId": "child-001",
    "registrationNumber": "NCVMS-2024-0415-1234",
    "firstName": "Kavindu",
    "lastName": "Perera",
    "dateOfBirth": "2020-04-15",
    "gender": "male",
    "vaccinationStatus": "on-track"
  }
]
```

---

### 3.5a Get Children by Registered By (PHM)

| Field  | Value                                          |
|--------|------------------------------------------------|
| Method | `GET`                                          |
| URL    | `/children?registeredBy=user-phm-657e6271`     |
| Auth   | Required (Bearer token)                        |

Returns all children **registered by** the given PHM user id. The frontend sends the logged-in PHM’s `userId` (e.g. `user-phm-657e6271`) as `registeredBy` and the backend returns children where `registeredBy` equals that id.

**Query Parameters**

| Param          | Type     | Required | Description                          |
|----------------|----------|----------|--------------------------------------|
| `registeredBy` | `string` | Yes      | PHM user ID (e.g. `user-phm-657e6271`) |
| `page`         | `number` | No       | Page number (default: 1)              |
| `limit`        | `number` | No       | Items per page (default: 10)         |

**Response `200 OK`**

- Without `page`/`limit`: array of child objects (same shape as **3.5**).
- With `page`/`limit`: paginated response:

```json
{
  "total": 120,
  "page": 1,
  "limit": 10,
  "data": [ "...array of child objects (same shape as 3.5)..." ]
}
```

---

### 3.6 Get Children by PHM Area

| Field  | Value                                    |
|--------|------------------------------------------|
| Method | `GET`                                    |
| URL    | `/children?phmId=phm-001`                |
| Auth   | Required (`phm`, `moh`)                  |

**Backend requirement:** Return only children that belong to this PHM. Typically that means children where **`registeredBy`** (or your equivalent column) equals the given `phmId`. When a child is created via `POST /children`, the backend must set `registeredBy` to the authenticated PHM’s user id (from JWT or from the request body `phmId`). If that is not set, the child will exist in the database but will not appear in this list.

**Query Parameters**

| Param          | Type     | Required | Description                        |
|----------------|----------|----------|------------------------------------|
| `phmId`        | `string` | Yes      | PHM user ID (e.g. `user-phm-657e6271`) |
| `registeredBy` | `string` | No       | Same as phmId; frontend may send both so backend can filter by either. |
| `page`         | `number` | No       | Page number (default: 1)           |
| `limit`        | `number` | No       | Items per page (default: 10)       |

**Response `200 OK`**

- If `page` and `limit` are **not** sent: array of child objects (same shape as **3.5**).
- If `page` and/or `limit` **are** sent: paginated response:

```json
{
  "total": 120,
  "page": 1,
  "limit": 10,
  "data": [ "...array of child objects (same shape as 3.5)..." ]
}
```

---

### 3.7 Get All Children (MOH only)

| Field  | Value                                |
|--------|--------------------------------------|
| Method | `GET`                                |
| URL    | `/children`                          |
| Auth   | Required (`moh`)                     |

**Query Parameters** *(all optional)*

| Param        | Type     | Description                       |
|--------------|----------|-----------------------------------|
| `areaCode`   | `string` | Filter by PHM area code           |
| `status`     | `string` | `on-track` \| `behind` \| `up-to-date` |
| `search`     | `string` | Search by name or reg number      |
| `page`       | `number` | Page number (default: 1)          |
| `limit`      | `number` | Items per page (default: 20)      |

**Response `200 OK`**

```json
{
  "total": 120,
  "page": 1,
  "limit": 20,
  "data": [ "...array of child objects..." ]
}
```

---

### 3.8 Update Child Profile

| Field  | Value                         |
|--------|-------------------------------|
| Method | `PUT`                         |
| URL    | `/children/:childId`          |
| Auth   | Required (`phm`, `moh`)       |

**Request Body** *(all fields optional)*

```json
{
  "firstName": "Kavindu",
  "lastName": "Perera",
  "bloodGroup": "A+",
  "address": "789 New Lane, Colombo"
}
```

**Response `200 OK`**

```json
{
  "message": "Child profile updated successfully."
}
```

---

## 4. Vaccines

### 4.1 Get All Active Vaccines

| Field  | Value             |
|--------|-------------------|
| Method | `GET`             |
| URL    | `/vaccines`       |
| Auth   | Required (any role) |

**Response `200 OK`**

```json
[
  {
    "vaccineId": "vaccine-001",
    "name": "BCG",
    "manufacturer": "Serum Institute",
    "dosageInfo": "0.05ml",
    "recommendedAge": 0,
    "intervalDays": 0,
    "description": "Bacillus Calmette-Guérin vaccine",
    "isActive": true
  },
  {
    "vaccineId": "vaccine-002",
    "name": "OPV",
    "manufacturer": "WHO",
    "dosageInfo": "2 drops",
    "recommendedAge": 60,
    "intervalDays": 60,
    "description": "Oral Polio Vaccine",
    "isActive": true
  }
]
```

---

### 4.2 Get Vaccine by ID

| Field  | Value                     |
|--------|---------------------------|
| Method | `GET`                     |
| URL    | `/vaccines/:vaccineId`    |
| Auth   | Required (any role)       |

**Response `200 OK`** – single vaccine object (same shape as above).

---

## 5. Vaccination Records

### 5.1 Create Vaccination Record (PHM only)

| Field  | Value                      |
|--------|----------------------------|
| Method | `POST`                     |
| URL    | `/vaccination-records`     |
| Auth   | Required (`phm`)           |

**Request Body**

```json
{
  "childId": "child-001",
  "vaccineId": "vaccine-003",
  "administeredDate": "2024-08-22",
  "batchNumber": "BATCH-2024-001",
  "administeredBy": "Dr. Perera",
  "location": "Colombo MOH Clinic",
  "site": "left-thigh",
  "doseNumber": 3,
  "nextDueDate": "2024-10-22",
  "status": "administered",
  "notes": "No adverse reactions observed."
}
```

**Response `201 Created`**

```json
{
  "recordId": "rec-001",
  "message": "Vaccination recorded successfully."
}
```

---

### 5.2 Get Vaccination Records for a Child

| Field  | Value                                          |
|--------|------------------------------------------------|
| Method | `GET`                                          |
| URL    | `/vaccination-records?childId=child-001`       |
| Auth   | Required (any role)                            |

**Query Parameters**

| Param     | Type     | Required | Description    |
|-----------|----------|----------|----------------|
| `childId` | `string` | Yes      | Child ID       |

**Response `200 OK`**

```json
[
  {
    "recordId": "rec-001",
    "childId": "child-001",
    "vaccineId": "vaccine-003",
    "vaccineName": "Pentavalent",
    "administeredDate": "2024-08-22",
    "batchNumber": "BATCH-2024-001",
    "administeredBy": "Dr. Perera",
    "location": "Colombo MOH Clinic",
    "site": "left-thigh",
    "doseNumber": 3,
    "nextDueDate": "2024-10-22",
    "status": "administered",
    "notes": "No adverse reactions observed.",
    "createdAt": "2024-08-22T10:00:00.000Z"
  }
]
```

---

### 5.3 Get All Vaccination Records (MOH only)

| Field  | Value                       |
|--------|-----------------------------|
| Method | `GET`                       |
| URL    | `/vaccination-records`      |
| Auth   | Required (`moh`)            |

**Query Parameters** *(all optional)*

| Param       | Type     | Description                                    |
|-------------|----------|------------------------------------------------|
| `areaCode`  | `string` | Filter by PHM area code                        |
| `vaccineId` | `string` | Filter by vaccine                              |
| `status`    | `string` | `pending` \| `administered` \| `missed` \| `cancelled` |
| `startDate` | `string` | ISO date – start of date range                 |
| `endDate`   | `string` | ISO date – end of date range                   |
| `page`      | `number` | Page number (default: 1)                       |
| `limit`     | `number` | Items per page (default: 20)                   |

**Response `200 OK`** – paginated array of vaccination record objects.

---

### 5.4 Get Vaccination Record by ID

| Field  | Value                                  |
|--------|----------------------------------------|
| Method | `GET`                                  |
| URL    | `/vaccination-records/:recordId`       |
| Auth   | Required (any role)                    |

**Response `200 OK`** – single vaccination record object (same shape as **5.2**).

---

### 5.5 Update Vaccination Record (PHM only)

| Field  | Value                                  |
|--------|----------------------------------------|
| Method | `PUT`                                  |
| URL    | `/vaccination-records/:recordId`       |
| Auth   | Required (`phm`)                       |

**Request Body** *(all fields optional)*

```json
{
  "vaccineId": "vaccine-003",
  "administeredDate": "2024-08-23",
  "batchNumber": "BATCH-2024-002",
  "administeredBy": "Dr. Perera",
  "location": "Colombo MOH Clinic",
  "site": "right-thigh",
  "doseNumber": 3,
  "nextDueDate": "2024-10-23",
  "status": "administered",
  "notes": "Updated record – no adverse reactions."
}
```

**Response `200 OK`**

```json
{
  "message": "Vaccination record updated successfully."
}
```

---

### 5.6 Delete Vaccination Record (MOH only)

| Field  | Value                                  |
|--------|----------------------------------------|
| Method | `DELETE`                               |
| URL    | `/vaccination-records/:recordId`       |
| Auth   | Required (`moh`)                       |

**Response `200 OK`**

```json
{
  "message": "Vaccination record deleted successfully."
}
```

---

## 6. Vaccination Schedule

### 6.1 Get Vaccination Schedule for a Child

| Field  | Value                                    |
|--------|------------------------------------------|
| Method | `GET`                                    |
| URL    | `/schedules?childId=child-001`           |
| Auth   | Required (any role)                      |

**Query Parameters**

| Param     | Type     | Required | Description    |
|-----------|----------|----------|----------------|
| `childId` | `string` | Yes      | Child ID       |

**Response `200 OK`**

```json
[
  {
    "scheduleId": "sch-001",
    "childId": "child-001",
    "vaccineId": "vaccine-001",
    "vaccineName": "BCG",
    "scheduledDate": "2020-04-15",
    "dueDate": "2020-04-15",
    "status": "completed",
    "reminderSent": true
  },
  {
    "scheduleId": "sch-002",
    "childId": "child-001",
    "vaccineId": "vaccine-002",
    "vaccineName": "OPV",
    "scheduledDate": "2020-06-15",
    "dueDate": "2020-06-15",
    "status": "pending",
    "reminderSent": false
  }
]
```

---

### 6.2 Create Schedule Item (PHM / System)

| Field  | Value                  |
|--------|------------------------|
| Method | `POST`                 |
| URL    | `/schedules`           |
| Auth   | Required (`phm`)       |

**Request Body**

```json
{
  "childId": "child-001",
  "vaccineId": "vaccine-002",
  "scheduledDate": "2020-06-15",
  "dueDate": "2020-06-22"
}
```

**Response `201 Created`**

```json
{
  "scheduleId": "sch-003",
  "message": "Schedule item created successfully."
}
```

---

### 6.3 Update Schedule Item Status

| Field  | Value                                |
|--------|--------------------------------------|
| Method | `PUT`                                |
| URL    | `/schedules/:scheduleId/status`      |
| Auth   | Required (`phm`, `moh`)              |

**Request Body**

```json
{
  "status": "completed"
}
```

*`status` must be one of: `pending`, `scheduled`, `completed`, `missed`, `cancelled`.*

**Response `200 OK`**

```json
{
  "message": "Schedule status updated successfully."
}
```

---

### 6.4 Send Reminder for Schedule Item (System / PHM)

| Field  | Value                                   |
|--------|-----------------------------------------|
| Method | `POST`                                  |
| URL    | `/schedules/:scheduleId/send-reminder`  |
| Auth   | Required (`phm`, `moh`)                 |

**Request Body** – *(none)*

**Response `200 OK`**

```json
{
  "message": "Reminder sent successfully."
}
```

---

## 7. Growth Records

### 7.1 Create Growth Record (PHM only)

| Field  | Value                   |
|--------|-------------------------|
| Method | `POST`                  |
| URL    | `/growth-records`       |
| Auth   | Required (`phm`)        |

**Request Body**

```json
{
  "childId": "child-001",
  "recordedDate": "2024-08-22",
  "height": 95.5,
  "weight": 15.2,
  "headCircumference": 48.5,
  "recordedBy": "Dr. Perera",
  "notes": "Child appears healthy. Normal growth trajectory."
}
```

**Response `201 Created`**

```json
{
  "recordId": "growth-001",
  "message": "Growth data recorded successfully."
}
```

---

### 7.2 Get Growth Records for a Child

| Field  | Value                                    |
|--------|------------------------------------------|
| Method | `GET`                                    |
| URL    | `/growth-records?childId=child-001`      |
| Auth   | Required (any role)                      |

**Query Parameters**

| Param       | Type     | Required | Description                       |
|-------------|----------|----------|-----------------------------------|
| `childId`   | `string` | Yes      | Child ID                          |
| `startDate` | `string` | No       | ISO date – start of date range    |
| `endDate`   | `string` | No       | ISO date – end of date range      |

**Response `200 OK`**

```json
[
  {
    "recordId": "growth-001",
    "childId": "child-001",
    "recordedDate": "2024-08-22",
    "height": 95.5,
    "weight": 15.2,
    "headCircumference": 48.5,
    "recordedBy": "Dr. Perera",
    "notes": "Child appears healthy.",
    "createdAt": "2024-08-22T09:30:00.000Z"
  }
]
```

---

## 8. Notifications

### 8.1 Get Notifications for Current User

| Field  | Value                      |
|--------|----------------------------|
| Method | `GET`                      |
| URL    | `/notifications`           |
| Auth   | Required (any role)        |

**Query Parameters** *(all optional)*

| Param    | Type      | Description                                 |
|----------|-----------|---------------------------------------------|
| `unread` | `boolean` | If `true`, return only unread notifications |
| `page`   | `number`  | Page number (default: 1)                    |
| `limit`  | `number`  | Items per page (default: 20)                |

**Response `200 OK`**

```json
{
  "total": 5,
  "unreadCount": 2,
  "data": [
    {
      "notificationId": "notif-001",
      "recipientId": "user-parent-001",
      "type": "vaccination_due",
      "message": "Kavindu Perera is due for OPV vaccination on 2024-09-01.",
      "relatedChildId": "child-001",
      "sentDate": "2024-08-25T08:00:00.000Z",
      "isRead": false
    }
  ]
}
```

---

### 8.2 Mark Notification as Read

| Field  | Value                                        |
|--------|----------------------------------------------|
| Method | `PUT`                                        |
| URL    | `/notifications/:notificationId/read`        |
| Auth   | Required (any role)                          |

**Request Body** – *(none)*

**Response `200 OK`**

```json
{
  "message": "Notification marked as read."
}
```

---

### 8.3 Mark All Notifications as Read

| Field  | Value                          |
|--------|--------------------------------|
| Method | `PUT`                          |
| URL    | `/notifications/read-all`      |
| Auth   | Required (any role)            |

**Request Body** – *(none)*

**Response `200 OK`**

```json
{
  "message": "All notifications marked as read."
}
```

---

### 8.4 Create / Send Notification (PHM / MOH / System)

| Field  | Value                    |
|--------|--------------------------|
| Method | `POST`                   |
| URL    | `/notifications`         |
| Auth   | Required (`phm`, `moh`)  |

**Request Body**

```json
{
  "recipientId": "user-parent-001",
  "type": "upcoming",
  "message": "Reminder: Kavindu Perera has a vaccination appointment on 2024-09-01.",
  "relatedChildId": "child-001"
}
```

*`type` must be one of: `reminder`, `missed`, `upcoming`, `info`, `vaccination_due`, `growth_record`.*

**Response `201 Created`**

```json
{
  "notificationId": "notif-002",
  "message": "Notification sent successfully."
}
```

---

## 9. Reports

### 9.1 Generate Report (MOH only)

| Field  | Value               |
|--------|---------------------|
| Method | `POST`              |
| URL    | `/reports/generate` |
| Auth   | Required (`moh`)    |

**Request Body**

```json
{
  "reportType": "vaccination_coverage",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "district": "Colombo",
  "dsDivision": "Colombo West",
  "vaccineId": "vaccine-001",
  "format": "pdf"
}
```

*`reportType` must be one of: `vaccination_coverage`, `area_performance`, `audit_report`, `growth_analysis`, `monthly_summary`.*
*`format` must be one of: `pdf`, `excel`, `csv`.*
*`district`, `dsDivision`, and `vaccineId` are optional filters.*

**Response `201 Created`**

```json
{
  "reportId": "rpt-001",
  "reportType": "vaccination_coverage",
  "generatedBy": "user-moh-001",
  "generatedDate": "2024-08-25T10:00:00.000Z",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "downloadUrl": "/api/v1/reports/rpt-001/download",
  "message": "Report generated successfully."
}
```

---

### 9.2 List Reports for Current User (MOH only)

| Field  | Value            |
|--------|------------------|
| Method | `GET`            |
| URL    | `/reports`       |
| Auth   | Required (`moh`) |

**Query Parameters** *(all optional)*

| Param        | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| `reportType` | `string` | Filter by report type                            |
| `page`       | `number` | Page number (default: 1)                         |
| `limit`      | `number` | Items per page (default: 20)                     |

**Response `200 OK`**

```json
[
  {
    "reportId": "rpt-001",
    "reportType": "vaccination_coverage",
    "generatedDate": "2024-08-25T10:00:00.000Z",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "downloadUrl": "/api/v1/reports/rpt-001/download"
  }
]
```

---

### 9.3 Download Report

| Field  | Value                          |
|--------|--------------------------------|
| Method | `GET`                          |
| URL    | `/reports/:reportId/download`  |
| Auth   | Required (`moh`)               |

**Query Parameters**

| Param    | Type     | Required | Description                     |
|----------|----------|----------|---------------------------------|
| `format` | `string` | No       | `pdf` \| `excel` \| `csv` (default: `pdf`) |

**Response `200 OK`** – binary file stream with appropriate `Content-Type` header.

---

## 10. Audit Logs

### 10.1 Get Audit Logs (MOH only)

| Field  | Value             |
|--------|-------------------|
| Method | `GET`             |
| URL    | `/audit-logs`     |
| Auth   | Required (`moh`)  |

**Query Parameters** *(all optional)*

| Param        | Type     | Description                                       |
|--------------|----------|---------------------------------------------------|
| `userId`     | `string` | Filter by user ID                                 |
| `userRole`   | `string` | Filter by role: `parent` \| `phm` \| `moh`       |
| `entityType` | `string` | `Child` \| `VaccinationRecord` \| `GrowthRecord` \| `Report` \| `User` |
| `action`     | `string` | `CREATE` \| `UPDATE` \| `DELETE` \| `VIEW` \| `LOGIN` \| `LOGOUT` |
| `startDate`  | `string` | ISO datetime – start of date range                |
| `endDate`    | `string` | ISO datetime – end of date range                  |
| `search`     | `string` | Free-text search across user, action, and details |
| `page`       | `number` | Page number (default: 1)                          |
| `limit`      | `number` | Items per page (default: 50)                      |

**Response `200 OK`**

```json
{
  "total": 200,
  "page": 1,
  "limit": 50,
  "data": [
    {
      "logId": "log-001",
      "userId": "user-phm-001",
      "userRole": "phm",
      "userName": "Dr. Perera",
      "action": "CREATE",
      "entityType": "VaccinationRecord",
      "entityId": "rec-001",
      "details": "Recorded Pentavalent (3rd Dose) for Kavindu Perera",
      "timestamp": "2024-08-22T10:30:00.000Z",
      "ipAddress": "192.168.1.100"
    }
  ]
}
```

---

### 10.2 Export Audit Logs (MOH only)

| Field  | Value                        |
|--------|------------------------------|
| Method | `GET`                        |
| URL    | `/audit-logs/export`         |
| Auth   | Required (`moh`)             |

**Query Parameters** – same as **10.1** (all optional), plus:

| Param    | Type     | Description                     |
|----------|----------|---------------------------------|
| `format` | `string` | `csv` \| `excel` (default: `csv`) |

**Response `200 OK`** – binary file stream with appropriate `Content-Type` header.

---

## 11. Analytics & Dashboard

### 11.1 Get MOH Dashboard Statistics (MOH only)

| Field  | Value                         |
|--------|-------------------------------|
| Method | `GET`                         |
| URL    | `/analytics/dashboard`        |
| Auth   | Required (`moh`)              |

**Query Parameters** *(all optional)*

| Param      | Type     | Description                        |
|------------|----------|------------------------------------|
| `areaCode` | `string` | Filter stats by PHM area code      |
| `period`   | `string` | `monthly` \| `quarterly` \| `yearly` (default: `monthly`) |

**Response `200 OK`**

```json
{
  "totalChildren": 1250,
  "vaccinatedCount": 1050,
  "coveragePercentage": 84.0,
  "missedVaccinations": 80,
  "upcomingVaccinations": 120,
  "newRegistrationsThisMonth": 45,
  "growthRecordsThisMonth": 200
}
```

---

### 11.2 Get Vaccination Coverage (MOH only)

| Field  | Value                               |
|--------|-------------------------------------|
| Method | `GET`                               |
| URL    | `/analytics/vaccination-coverage`   |
| Auth   | Required (`moh`)                    |

**Query Parameters** *(all optional)*

| Param       | Type     | Description                          |
|-------------|----------|--------------------------------------|
| `areaCode`  | `string` | Filter by PHM area code              |
| `vaccineId` | `string` | Filter by specific vaccine           |
| `startDate` | `string` | ISO date – start of date range       |
| `endDate`   | `string` | ISO date – end of date range         |

**Response `200 OK`**

```json
{
  "overall": {
    "totalPopulation": 1250,
    "vaccinatedCount": 1050,
    "coveragePercentage": 84.0
  },
  "byArea": [
    {
      "areaCode": "COL-01",
      "areaName": "Colombo 01",
      "totalChildren": 300,
      "vaccinatedCount": 270,
      "coveragePercentage": 90.0
    }
  ],
  "byVaccine": [
    {
      "vaccineId": "vaccine-001",
      "vaccineName": "BCG",
      "administered": 1200,
      "coveragePercentage": 96.0
    }
  ]
}
```

---

### 11.3 Get Area Performance (MOH only)

| Field  | Value                              |
|--------|------------------------------------|
| Method | `GET`                              |
| URL    | `/analytics/area-performance`      |
| Auth   | Required (`moh`)                   |

**Query Parameters** *(all optional)*

| Param       | Type     | Description                         |
|-------------|----------|-------------------------------------|
| `startDate` | `string` | ISO date – start of date range      |
| `endDate`   | `string` | ISO date – end of date range        |

**Response `200 OK`**

```json
[
  {
    "areaCode": "COL-01",
    "areaName": "Colombo 01",
    "phmId": "phm-001",
    "phmName": "Dr. Perera",
    "totalChildren": 300,
    "vaccinated": 270,
    "missed": 15,
    "upcoming": 30,
    "coveragePercentage": 90.0,
    "growthRecordsThisMonth": 60
  }
]
```

---

### 11.4 Get PHM Dashboard Statistics (PHM only)

| Field  | Value                        |
|--------|------------------------------|
| Method | `GET`                        |
| URL    | `/analytics/phm-dashboard`   |
| Auth   | Required (`phm`)             |

**Response `200 OK`**

```json
{
  "totalChildrenInArea": 120,
  "vaccinatedCount": 105,
  "missedVaccinations": 8,
  "upcomingVaccinations": 15,
  "growthRecordsThisMonth": 30,
  "recentRegistrations": 5
}
```

---

### 11.5 Get Parent Dashboard Summary (Parent only)

| Field  | Value                           |
|--------|---------------------------------|
| Method | `GET`                           |
| URL    | `/analytics/parent-dashboard`   |
| Auth   | Required (`parent`)             |

**Response `200 OK`**

```json
{
  "children": [
    {
      "childId": "child-001",
      "name": "Kavindu Perera",
      "age": "4 years",
      "nextVaccinationDate": "2024-09-01",
      "nextVaccineName": "OPV Booster",
      "vaccinationStatus": "on-track",
      "upcomingCount": 2,
      "missedCount": 0
    }
  ],
  "unreadNotifications": 3
}
```

---

## Common HTTP Status Codes

| Code  | Meaning                          |
|-------|----------------------------------|
| `200` | OK                               |
| `201` | Created                          |
| `400` | Bad Request                      |
| `401` | Unauthorized (missing/invalid token) |
| `403` | Forbidden (insufficient role)    |
| `404` | Not Found                        |
| `409` | Conflict (e.g. duplicate record) |
| `422` | Unprocessable Entity (validation) |
| `500` | Internal Server Error            |

---

## Common Error Response Shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Passwords do not match.",
    "details": [
      { "field": "confirmPassword", "message": "Must match the password field." }
    ]
  }
}
```
