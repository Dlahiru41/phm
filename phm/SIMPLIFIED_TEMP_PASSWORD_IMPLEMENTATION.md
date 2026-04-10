# MOH Account Creation - Simplified Temporary Password Workflow Implementation

## Overview

Successfully updated the frontend to support the **NEW simplified temporary password workflow** instead of the previous OTP-based process.

---

## Changes Made

### 1. AdminService.ts - Simplified API

**Old (OTP-based):**
```typescript
- requestMohOtp()       // Step 1: Request OTP
- completeMohAccount() // Step 2: Complete with OTP
- resendOtp()          // Resend OTP if expired
```

**New (Temporary Password):**
```typescript
- createMohAccount()   // Single API call
```

**New Interface:**
```typescript
export interface MohAccountCreateResponse {
  message: string;
  mohUserId: string;
  email: string;
  tempPassword: string;              // 12+ char secure password
  maskedDestination: string;         // Phone number mask (+94***234567)
  firstLogin: boolean;               // Always true
}
```

---

### 2. AdminDashboardPage.tsx - Simplified UI

**Changes:**

#### State Management
```typescript
// REMOVED
- createStep: 'form' | 'otp'
- otpData
- otpFormData
- handleRequestOtp()
- handleCompleteAccount()
- handleResendOtp()

// ADDED
- creating: boolean
- createSuccess: MohAccountCreateResponse | null
- handleCreateMohAccount()
```

#### Form UI
**Old:** Two-step process with OTP verification
**New:** Single-step form with instant success

#### Success Message
Shows:
- ✓ User ID
- ✓ Email
- ✓ **Temporary Password** (displayed for admin reference)
- ✓ Masked destination phone
- ✓ Info: "Password valid for 24 hours"

---

## Workflow Comparison

### OLD OTP Workflow (5 steps)
```
1. Admin fills form
2. Clicks "Request OTP"
3. OTP sent to phone via WhatsApp
4. Admin enters 6-digit code
5. Admin sets password manually
6. Account created
```

### NEW Temporary Password Workflow (1 step)
```
1. Admin fills form
2. Clicks "Create MOH Account"
3. System generates 12+ char temp password
4. System sends temp password via WhatsApp
5. Account created immediately ✓
6. Response shows temp password & details
```

---

## API Integration

### Endpoint Change

**Old:**
```
POST /api/v1/admin/moh-accounts/request-otp
POST /api/v1/admin/moh-accounts/complete
```

**New:**
```
POST /api/v1/admin/moh-accounts/create  ← SINGLE CALL
```

### Request & Response

**Request:**
```json
{
  "employeeId": "MOH-2024-001",
  "name": "Dr. Ruwan Silva",
  "nic": "987654321V",
  "email": "rsilva@moh.lk",
  "phoneNumber": "+94771234567",
  "assignedArea": "Colombo District"
}
```

**Response (201 Created):**
```json
{
  "message": "MOH account created successfully",
  "mohUserId": "user-moh-a1b2c3d4",
  "email": "rsilva@moh.lk",
  "tempPassword": "Xy7@pQ2zKm9#Lx1",
  "maskedDestination": "+94***234567",
  "firstLogin": true
}
```

---

## Benefits

✅ **Simpler** - Single API call instead of two
✅ **Faster** - No waiting for OTP codes
✅ **More Secure** - 12+ character random password (vs 6-digit OTP)
✅ **Better UX** - Instant account creation
✅ **More Auditable** - Temporary password logged in database
✅ **Automatic Delivery** - Password sent via WhatsApp immediately

---

## User Experience

### For Admin
1. Fill in MOH employee details (6 fields)
2. Click "Create MOH Account" button
3. See success message with:
   - MOH User ID
   - Email
   - **Temporary Password** (visible in response)
   - Masked phone number
   - Validity period: 24 hours

### For MOH Officer
1. Receive WhatsApp with temporary password
2. Login with email and temp password
3. **MUST** change password on first login (enforced)
4. Account fully activated

---

## Files Updated

### `src/services/AdminService.ts`
- ✅ Removed OTP request/response interfaces
- ✅ Added temp password request/response interfaces
- ✅ Changed from 2 methods to 1 method
- ✅ Updated method names and documentation

### `src/pages/AdminDashboardPage.tsx`
- ✅ Removed OTP state management
- ✅ Simplified to single-step form
- ✅ Removed OTP verification step
- ✅ Updated success message to show temp password
- ✅ Updated descriptions and labels

---

## Testing

### Test the New Workflow

```bash
# 1. Login as admin
Email: admin@moh.lk
Password: [your admin password]

# 2. Navigate to "Create MOH Account"

# 3. Fill in form with test data:
Employee ID:    MOH-2024-001
Full Name:      Dr. Test Officer
NIC:            999999999V
Email:          test@moh.lk
Phone:          +94711234567
Assigned Area:  Test District

# 4. Click "Create MOH Account"

# 5. See success message with temp password

# 6. MOH officer receives WhatsApp with temp password

# 7. MOH officer logs in with email + temp password

# 8. System redirects to change password (first login)

# 9. MOH changes password and completes login
```

---

## API Deprecation

The old endpoints are still available but **NOT RECOMMENDED**:

```
POST /api/v1/admin/moh-accounts/request-otp   (deprecated)
POST /api/v1/admin/moh-accounts/complete      (deprecated)
```

### Migration Path

1. **Current:** Use new endpoint (`/create`)
2. **Future:** Keep old endpoints for backwards compatibility
3. **Later:** Deprecate and remove old endpoints

---

## Code Examples

### How to Create MOH Account

```typescript
// Simple one-line call
const response = await AdminService.createMohAccount({
  employeeId: 'MOH-2024-001',
  name: 'Dr. Ruwan Silva',
  nic: '987654321V',
  email: 'rsilva@moh.lk',
  phoneNumber: '+94771234567',
  assignedArea: 'Colombo District'
});

// Response contains:
// - mohUserId: 'user-moh-a1b2c3d4'
// - tempPassword: 'Xy7@pQ2zKm9#Lx1'
// - maskedDestination: '+94***234567'
// - firstLogin: true
```

---

## Error Handling

All previous error codes still apply:

```json
// 401 Unauthorized
{
  "status": 401,
  "code": "UNAUTHORIZED",
  "message": "Missing or invalid authorization header"
}

// 403 Forbidden
{
  "status": 403,
  "code": "FORBIDDEN",
  "message": "Only admin users can create MOH accounts"
}

// 409 Conflict
{
  "status": 409,
  "code": "CONFLICT",
  "message": "Email already registered"
}

// 500 Error
{
  "status": 500,
  "code": "ERROR",
  "message": "Failed to send temporary password via WhatsApp"
}
```

---

## Security Notes

✅ Temporary password is 12+ characters (vs 6-digit OTP)
✅ Random secure generation with uppercase, lowercase, numbers, symbols
✅ Hashed in database (never stored in plain text)
✅ Valid for 24 hours (configurable)
✅ Audit trail maintained in `moh_account_temp_passwords` table
✅ First login password change **enforced**

---

## Summary

| Aspect | OLD OTP | NEW Temp Password |
|--------|---------|------------------|
| **Steps** | 2 (request + complete) | 1 (create) |
| **API Calls** | 2 | 1 |
| **Complexity** | Multi-step | Single-step |
| **Password** | Admin sets | System generates |
| **Security** | 6-digit code | 12+ char password |
| **Speed** | Slower | Instant |
| **UX** | Manual entry | Automatic send |

---

## Next Steps

1. ✅ Frontend updated with simplified workflow
2. ✅ API service refactored
3. ✅ UI simplified to single-step form
4. ⏭️ Test with backend API
5. ⏭️ Deploy to development environment
6. ⏭️ User acceptance testing
7. ⏭️ Production deployment

---

**Status:** ✅ FRONTEND IMPLEMENTATION COMPLETE
**Date:** April 10, 2026
**Version:** 2.0 - Simplified Temporary Password Workflow

---

## Files Modified

```
src/services/AdminService.ts                    (simplified)
src/pages/AdminDashboardPage.tsx               (refactored)
```

**No new files needed. OTP modal component (OtpVerificationModal.tsx) can be deprecated.**

