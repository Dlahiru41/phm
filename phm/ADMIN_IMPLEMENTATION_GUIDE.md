# Admin & MOH Account Management - Frontend Implementation Guide

## Overview

This document describes the frontend implementation to support the admin user role and MOH account creation workflow using OTP verification.

## Files Created/Modified

### New Files Created

1. **`src/services/AdminService.ts`**
   - Service class for admin-related API calls
   - Methods for:
     - `requestMohOtp()` - Request OTP for MOH account creation
     - `completeMohAccount()` - Complete account creation with OTP verification
     - `getMohUsers()` - Retrieve list of all MOH users
     - `getAdminDashboard()` - Get admin dashboard statistics
     - `resendOtp()` - Resend OTP if expired

2. **`src/pages/AdminDashboardPage.tsx`**
   - Main admin dashboard component
   - Three tabs:
     - **Dashboard**: Overview with statistics and quick actions
     - **Create MOH**: Form to create MOH accounts with OTP workflow
     - **MOH Users**: View all MOH users in the system
   - Handles:
     - OTP request form
     - OTP verification form
     - Password setup for new MOH accounts
     - Resend OTP functionality
     - Error handling and success notifications

3. **`src/components/OtpVerificationModal.tsx`**
   - Reusable OTP verification modal component
   - Can be used across the application for any OTP verification needs
   - Features:
     - OTP code input (numeric only, 6 digits)
     - Auto-formatting and validation
     - Resend functionality
     - Error messages
     - Loading states

### Modified Files

1. **`src/types/models.ts`**
   - Added `ADMIN = 'admin'` to `UserRole` enum

2. **`src/services/AuthService.ts`**
   - Added `isAdmin()` method to check if user is admin
   - Updated `getDashboardPath()` to return `/admin` for admin users
   - Updated first login handling for MOH officers

3. **`src/App.tsx`**
   - Added import for `AdminDashboardPage`
   - Added route: `<Route path="/admin" element={<AdminDashboardPage />} />`
   - Updated login credentials display to include admin

4. **`src/pages/LoginPage.tsx`**
   - Updated test credentials display to include admin account
   - Updated first login logic to handle both PHM and MOH roles

## User Workflows

### 1. Admin Creates MOH Account

```
Admin Login → Admin Dashboard → Create MOH Tab
    ↓
Admin fills MOH employee form (Employee ID, Name, NIC, Email, Phone, Area)
    ↓
Admin clicks "Request OTP"
    ↓
System sends OTP via WhatsApp → Admin sees "OTP sent" message
    ↓
Admin enters OTP code from their phone
    ↓
Admin sets password for MOH officer
    ↓
MOH account created successfully → Admin sees confirmation
```

### 2. MOH Officer First Login

```
MOH Login with temporary credentials
    ↓
System detects firstLogin = true
    ↓
Redirect to /change-password page
    ↓
MOH changes password
    ↓
firstLogin set to false
    ↓
Redirect to MOH Dashboard
```

### 3. Admin Dashboard Navigation

```
Admin Dashboard (Default)
    ├─ View Statistics (MOH Officers, PHM Officers, Total Children)
    ├─ Quick Actions
    │   ├─ Create MOH Account
    │   └─ View MOH Users
    ├─ Create MOH Tab
    │   ├─ Request OTP (Step 1)
    │   └─ Complete Account (Step 2)
    └─ MOH Users Tab
        └─ View all MOH users in table format
```

## Component Details

### AdminDashboardPage

**Props**: None (uses React Router and AuthService)

**State**:
```typescript
- activeTab: 'dashboard' | 'create-moh' | 'moh-users'
- loading: boolean
- mohUsers: MohUser[]
- stats: { totalMohUsers, totalPhmUsers, totalChildren }
- createStep: 'form' | 'otp'
- otpData: MohAccountRequestResponse | null
- createError: string | null
- createSuccess: boolean
- formData: MOH employee details
- otpFormData: { otpCode, password, confirmPassword }
```

**Key Functions**:
- `loadData()` - Fetch admin dashboard data and MOH users
- `handleRequestOtp()` - Send OTP request
- `handleCompleteAccount()` - Verify OTP and complete account creation
- `handleResendOtp()` - Resend OTP if expired
- `handleLogout()` - Logout admin

### OtpVerificationModal

**Props**:
```typescript
interface OtpVerificationModalProps {
  isOpen: boolean
  otpId: string
  maskedDestination: string
  expiresInSeconds: number
  loading?: boolean
  onSubmit: (otpCode: string) => Promise<void>
  onResend: () => Promise<void>
  onCancel: () => void
  error?: string | null
  title?: string
  description?: string
}
```

**Usage Example**:
```tsx
<OtpVerificationModal
  isOpen={showOtpModal}
  otpId={otpData.otpId}
  maskedDestination={otpData.maskedDestination}
  expiresInSeconds={300}
  onSubmit={handleVerifyOtp}
  onResend={handleResendOtp}
  onCancel={() => setShowOtpModal(false)}
  error={otpError}
/>
```

## API Integration

All API calls are made through `AdminService` which uses the configured API client with proper:
- Authorization headers
- Error handling
- Type safety
- Token management

### API Endpoints Used

```
POST /api/v1/admin/moh-accounts/request-otp
POST /api/v1/admin/moh-accounts/complete
GET /api/v1/admin/moh-accounts
GET /api/v1/admin/dashboard
POST /api/v1/admin/moh-accounts/resend-otp
```

## UI/UX Features

### Admin Dashboard
- **Dark mode support** - Full dark mode theme support
- **Responsive design** - Works on mobile, tablet, and desktop
- **Tab navigation** - Easy switching between dashboard views
- **Loading states** - Shows loading indicators during API calls
- **Error handling** - Clear error messages for failed operations
- **Success notifications** - Confirms successful actions

### MOH Creation Form
- **Multi-step form** - Step 1: Employee details, Step 2: OTP verification
- **Form validation** - Client-side validation with required fields
- **Password requirements** - Shows password strength suggestions
- **OTP resend** - Option to resend OTP if expired
- **Phone number masking** - Shows masked phone for privacy
- **Countdown timer** - Shows OTP expiration time

### MOH Users Table
- **Responsive table** - Scrolls horizontally on mobile
- **User status badges** - Shows "First Login Pending" or "Active"
- **Sortable data** - Employee ID, Name, Email, Area, Status, Created date
- **Empty state** - Shows helpful message when no users exist

## Security Features

1. **Authorization**: Only users with `role: 'admin'` can access admin dashboard
2. **OTP Validation**: 6-digit numeric OTP with expiration
3. **Password Requirements**: Minimum 6 characters, preferably 12+
4. **Password Confirmation**: Ensures passwords match before submission
5. **Token Management**: Automatic token refresh and cleanup on logout
6. **Session Management**: Uses sessionStorage for secure session handling

## Error Handling

### Common Errors and Handling

```typescript
// Email already registered
{
  status: 409,
  code: 'CONFLICT',
  message: 'Email already registered'
}

// Invalid OTP
{
  status: 400,
  code: 'BAD_REQUEST',
  message: 'Invalid OTP'
}

// OTP Expired
{
  status: 410,
  code: 'GONE',
  message: 'OTP not found or expired'
}

// Too many attempts
{
  status: 429,
  code: 'TOO_MANY_REQUESTS',
  message: 'Please wait 45 seconds before requesting another OTP'
}

// Unauthorized
{
  status: 401,
  code: 'UNAUTHORIZED',
  message: 'Missing or invalid authorization header'
}
```

All errors are caught and displayed to user with appropriate messaging.

## Testing

### Test Admin Account
- **Email**: `admin@moh.lk`
- **Password**: `pass` (or your bcrypt hash)
- **Role**: `admin`

### Test MOH Account
- **Email**: `moh@moh.lk`
- **Password**: Set during account creation via OTP

### Manual Testing Steps

1. **Login as Admin**
   - Use admin@moh.lk credentials
   - Should redirect to /admin

2. **Create MOH Account**
   - Fill in employee details
   - Click "Request OTP"
   - Verify OTP form appears with masked phone
   - Enter OTP (use test OTP from backend response)
   - Set password
   - Verify success message

3. **View MOH Users**
   - New MOH user should appear in list with "First Login Pending" status

4. **MOH First Login**
   - Login with newly created MOH account email and temporary password
   - Should redirect to /change-password
   - Change password
   - Should redirect to /moh dashboard

## Styling

- Uses **Tailwind CSS** for styling
- Follows existing design system with:
  - Primary color variables
  - Dark mode support via `dark:` classes
  - Material Icons for UI elements
  - Consistent spacing and typography
  - Responsive breakpoints (sm, md, lg, xl)

### Color Scheme
- **Primary**: Blue theme (primary color from config)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Light (#f8fafc) / Dark (#0f172a)

## Dependencies

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Routing
- **Tailwind CSS** - Styling (already configured)
- **Material Icons** - Icons

No new dependencies need to be installed.

## Performance Considerations

1. **API Calls**: Debounced and optimized
2. **Re-renders**: Minimal using React hooks
3. **Images**: No heavy images in admin dashboard
4. **Bundle Size**: No new libraries added
5. **Caching**: Uses browser sessionStorage for user data

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Android

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on form inputs
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG AA
- ✅ Loading states have aria-busy
- ✅ Error messages are announced

## Future Enhancements

1. **Bulk MOH Creation**: CSV upload for creating multiple MOH accounts
2. **MOH Account Management**: Edit/disable/delete MOH accounts
3. **Audit Trail**: Track all admin actions
4. **Export MOH Users**: Export user list to CSV/PDF
5. **2FA for Admin**: Two-factor authentication for admin login
6. **Admin Activity Dashboard**: Real-time activity monitoring

## Troubleshooting

### Admin Cannot See Dashboard
- Check if user is logged in: `AuthService.isAdmin()`
- Check if role is set to 'admin' in database
- Clear browser cache and re-login

### OTP Not Sending
- Check if phone number is valid format (+94...)
- Check backend TextLK API credentials
- Check OTP cooldown period hasn't been exceeded

### OTP Form Not Appearing
- Check if API request returned otpId successfully
- Check browser console for errors
- Verify admin has valid authorization token

### Cannot Create MOH Account
- Verify email is not already registered
- Verify NIC is unique
- Check all required fields are filled
- Check backend logs for detailed error

## Support

For issues or questions about the admin implementation:
1. Check the error messages in browser console
2. Review backend logs for API errors
3. Ensure all required environment variables are set
4. Contact the development team with error details

---

**Last Updated**: April 2026
**Version**: 1.0 - Initial Admin & MOH OTP Implementation

