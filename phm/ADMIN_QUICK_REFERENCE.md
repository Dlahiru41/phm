# Admin Account & MOH Management - Quick Reference

## Quick Start for Admin Users

### 1️⃣ Login as Admin

```
URL: http://localhost:8080/login
Email/NIC: admin@moh.lk
Password: [Your admin password]
```

After login, you'll be automatically redirected to `/admin` dashboard.

---

## 2️⃣ Create MOH Account (Complete Workflow)

### Step 1: Navigate to Create MOH Tab

From Admin Dashboard:
1. Click **"Create MOH Account"** button in Quick Actions
2. Or click the **"Create MOH"** tab at the top

### Step 2: Fill Employee Details Form

```
┌─────────────────────────────────────────┐
│ Create MOH Account Form                 │
├─────────────────────────────────────────┤
│ Employee ID*          │ MOH-2024-001    │
│ Full Name*            │ Dr. Ruwan Silva │
│ National ID (NIC)*    │ 987654321V      │
│ Email*                │ rsilva@moh.lk   │
│ Phone Number*         │ +94711234567    │
│ Assigned Area*        │ Colombo District│
└─────────────────────────────────────────┘
```

✅ All fields are required (marked with *)

### Step 3: Click "Request OTP"

- System sends OTP to the provided phone number via WhatsApp
- OTP is valid for 5 minutes
- You'll see a success message with masked phone number

```
✓ OTP sent successfully
Masked destination: +94**1234567
Expires in: 300 seconds
```

### Step 4: MOH Officer Receives OTP

- MOH officer receives 6-digit OTP on WhatsApp
- OTP format: `123456`

### Step 5: Complete Account Creation

Admin enters:

```
┌─────────────────────────────────────────┐
│ Complete Account Form                   │
├─────────────────────────────────────────┤
│ OTP Code* (6 digits)  │ 123456          │
│ Password*             │ ••••••••        │
│ Confirm Password*     │ ••••••••        │
└─────────────────────────────────────────┘
```

### Step 6: Success Confirmation

```
✓ MOH account created successfully!
  User ID: user-moh-xyz789
  Email: rsilva@moh.lk
  First Login Status: Pending password change
```

MOH Officer can now login!

---

## 3️⃣ View All MOH Users

From Admin Dashboard:
1. Click **"MOH Users"** tab
2. View table of all MOH officers with status

### Table Columns
| Column | Shows |
|--------|-------|
| Employee ID | MOH-2024-001 |
| Name | Dr. Ruwan Silva |
| Email | rsilva@moh.lk |
| Assigned Area | Colombo District |
| Status | First Login Pending / Active |
| Created | Date created |

**Status Meanings**:
- 🟡 **First Login Pending** - MOH must change password on first login
- 🟢 **Active** - MOH fully activated and can create PHM accounts

---

## 4️⃣ MOH Officer First Login Process

### For MOH Officer (After Account Creation)

1. **Go to Login Page**
   ```
   URL: http://localhost:8080/login
   Email: rsilva@moh.lk
   Password: [Password set during OTP process]
   ```

2. **System Detects First Login**
   - Automatically redirects to `/change-password`
   - Shows "Complete Your First Login" message

3. **Change Password**
   ```
   Current Password: [Password from admin]
   New Password: [Choose your own]
   Confirm: [Repeat new password]
   ```

4. **Login Complete**
   - Redirected to MOH Dashboard (`/moh`)
   - Can now:
     - Create PHM accounts
     - View regional analytics
     - Generate reports
     - Manage audit logs

---

## Common Scenarios

### Scenario 1: Resend OTP (if expired)

**Problem**: OTP expired during 5-minute window

**Solution**:
1. On OTP entry form, click **"Resend OTP"** button
2. New OTP sent immediately
3. Enter new code

### Scenario 2: Email Already Registered

**Problem**: Error: "Email already registered"

**Solution**:
1. Use a different email address for new MOH officer
2. Or delete existing account (contact backend admin)

### Scenario 3: Too Many Failed OTP Attempts

**Problem**: Error: "OTP attempts exceeded"

**Solution**:
1. Click **"Start Over"** button
2. Request new OTP from beginning
3. Try again

### Scenario 4: View MOH Officer Status

1. Go to **"MOH Users"** tab
2. Look for officer in table
3. Check **"Status"** column:
   - 🟡 Yellow badge = First login not done yet
   - 🟢 Green badge = Account fully activated

---

## Role Hierarchy Visualization

```
┌─────────────────────────────────────────────┐
│           SYSTEM ADMIN (You)                │
│  • Create MOH accounts with OTP             │
│  • View all MOH users and stats             │
│  • Only 1 admin in system                   │
│  • Cannot be created via public registration│
└────────────────┬────────────────────────────┘
                 │ Creates via OTP
                 ▼
┌─────────────────────────────────────────────┐
│    MOH (Ministry of Health)                 │
│  • Created by Admin using OTP workflow      │
│  • First login required (password change)   │
│  • Can create PHM accounts                  │
│  • Can view regional analytics & reports    │
└────────────────┬────────────────────────────┘
                 │ Creates with temp password
      ┌──────────┴──────────┐
      ▼                      ▼
┌──────────────┐      ┌──────────────┐
│     PHM      │      │    PARENT    │
│ (Midwife)    │      │   (User)     │
│              │      │              │
│ • Register   │      │ • Register   │
│   children   │      │   account    │
│ • Record     │      │ • Link to    │
│   vaccines   │      │   children   │
└──────────────┘      └──────────────┘
```

---

## Important Notes

✅ **Do's**
- Keep admin credentials secure
- Use strong passwords (min 12 characters)
- Monitor MOH user creation activity
- Check audit logs regularly
- Enable HTTPS in production

❌ **Don'ts**
- Don't share admin password
- Don't share OTP codes
- Don't use simple passwords
- Don't leave admin account inactive
- Don't create multiple admin accounts

---

## Dashboard Statistics

The Admin Dashboard shows real-time stats:

```
┌──────────────────┬──────────────────┬──────────────────┐
│  MOH Officers    │  PHM Officers    │ Total Children   │
│       12         │       45         │      3,240       │
└──────────────────┴──────────────────┴──────────────────┘
```

**What These Mean**:
- **MOH Officers**: Number of active MOH accounts in system
- **PHM Officers**: Total PHM/Midwives created by all MOH officers
- **Total Children**: All children registered across all PHM areas

---

## Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Email already registered" | Email in use | Use different email |
| "Invalid OTP" | Wrong code | Re-enter code, check WhatsApp |
| "OTP expired" | >5 minutes passed | Click "Resend OTP" |
| "OTP attempts exceeded" | >5 failed tries | Click "Start Over" |
| "Passwords don't match" | Confirmation mismatch | Re-enter both passwords |
| "Admin can only view this" | Not admin role | Login with admin account |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Navigate form fields |
| `Enter` | Submit form |
| `Esc` | Close modal/cancel |

---

## Getting Help

1. **Check the logs**
   - Browser console: F12 → Console tab
   - Look for red error messages

2. **Contact backend team**
   - Provide error message
   - Provide username attempted
   - Provide timestamp

3. **Check documentation**
   - Full guide: `ADMIN_IMPLEMENTATION_GUIDE.md`
   - API details: `API_ENDPOINTS.md`

---

## Testing Tips

### Create Test MOH Account

```
Employee ID: TEST-MOH-001
Full Name: Test Officer
NIC: 999999999V
Email: test@moh.lk
Phone: +94711234567
Area: Test Area
OTP: Use code from WhatsApp or console
Password: TestPass123
```

### Verify Account Creation

1. Go to "MOH Users" tab
2. Find "test@moh.lk" in table
3. Status should be "First Login Pending"

### Login as New MOH Officer

1. Go to login page
2. Email: test@moh.lk
3. Password: TestPass123
4. Should redirect to change password page
5. Set new password
6. Redirected to MOH dashboard

---

**Last Updated**: April 2026
**Version**: 1.0

