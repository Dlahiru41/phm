# Login Credentials

This document contains the hardcoded login credentials for testing the three user flows.

## Parent User
- **Username/Email/NIC:** `parent`, `parent@ncvms.gov.lk`, or `987654321V`
- **Password:** `parent123`
- **Role:** Parent
- **Dashboard:** `/parent-dashboard-desktop`
- **Use Cases:** Add Child, Receive Reminder, View Records, Receive Missed Alert, Create Account, Login, Change Language

## PHM (Public Health Midwife) User
- **Username/Email/NIC:** `phm`, `phm@ncvms.gov.lk`, or `123456789V`
- **Password:** `phm123`
- **Role:** PHM (Midwife)
- **Dashboard:** `/phm-dashboard`
- **Use Cases:** Login, Generate Schedule, Record Vaccination, Record Growth Data, View Area Children, Update Vaccination, Register Baby

### Primary PHM test user (verified with API)
- **Email:** `dlahiru412@outlook.com`
- **Password:** `dilshan123`
- **Role:** PHM (backend returns name: "Lahiru Dilshan PHM", userId: e.g. `user-phm-657e6271`)
- Use this account to verify: Login, Register Baby, PHM Dashboard, View Area Children

## MOH (Ministry of Health) User
- **Username/Email/NIC:** `moh`, `moh@ncvms.gov.lk`, or `555555555V`
- **Password:** `moh123`
- **Role:** MOH Officer
- **Dashboard:** `/moh-analytics-dashboard`
- **Use Cases:** Create Account, Change Language, View All Data, View Growth Chart, Generate Reports, View Dashboard, Audit Records

## Testing the Flows

1. **Parent Flow:**
   - Login with parent credentials
   - Redirected to Parent Dashboard
   - Can: Add Child, View Records, View Notifications, View Growth Charts, Change Settings

2. **PHM Flow:**
   - Login with PHM credentials
   - Redirected to PHM Dashboard
   - Can: Register Baby, View Area Children, Record Vaccination, Record Growth Data, Edit Vaccination

3. **MOH Flow:**
   - Login with MOH credentials
   - Redirected to MOH Analytics Dashboard
   - Can: View All Data, Generate Reports, View Audit Logs, View Dashboard
