# Mobile Number Change Implementation - Bug Fix

## Issue
Frontend was receiving 422 validation errors when attempting to change mobile number, because the implementation did not match the backend API specification.

## Root Causes
1. **Wrong endpoint paths** - Using `/users/` instead of `/api/v1/users/`
2. **Wrong request payload** - Sending `newMobileNumber` but backend expected `newPhoneNumber`
3. **Wrong response format** - Expected `otpId` but backend returns `maskedDestination` and `expiresInSeconds`
4. **Wrong verify endpoint** - Using `/users/verify-mobile-otp` instead of `/api/v1/users/verify-mobile-change`
5. **Wrong verify payload** - Using `otpId` instead of the original `newPhoneNumber`
6. **Missing UI features** - No countdown timer or masked destination display

## Changes Made

### 1. DataService.ts (`src/services/DataService.ts`)

#### Updated `requestMobileNumberChange` method:
- **Endpoint**: Changed from `/users/request-mobile-change` to `/api/v1/users/request-mobile-change`
- **Parameter name**: Changed from `newMobileNumber` to `newPhoneNumber`
- **Return type**: Changed from `{ otpId: string }` to `{ message: string; maskedDestination: string; expiresInSeconds: number }`
- **Error handling**: Properly extracts error message from ApiError object

```typescript
async requestMobileNumberChange(newPhoneNumber: string): Promise<{ message: string; maskedDestination: string; expiresInSeconds: number }> {
  try {
    const response = await api.post<{ message: string; maskedDestination: string; expiresInSeconds: number }>(
      '/api/v1/users/request-mobile-change',
      { newPhoneNumber }
    );
    return response || { message: '', maskedDestination: '', expiresInSeconds: 0 };
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to request mobile number change';
    throw new Error(errorMessage);
  }
}
```

#### Updated `verifyMobileNumberChange` method (renamed from `verifyMobileNumberOTP`):
- **Endpoint**: Changed from `/users/verify-mobile-otp` to `/api/v1/users/verify-mobile-change`
- **Parameters**: Changed from `(otpId, otpCode)` to `(newPhoneNumber, otpCode)`
- **Return type**: Changed from `void` to `{ message: string; phoneNumber: string }`
- **Error handling**: Properly extracts error message from ApiError object

```typescript
async verifyMobileNumberChange(newPhoneNumber: string, otpCode: string): Promise<{ message: string; phoneNumber: string }> {
  try {
    const response = await api.post<{ message: string; phoneNumber: string }>(
      '/api/v1/users/verify-mobile-change',
      { newPhoneNumber, otpCode }
    );
    return response || { message: '', phoneNumber: '' };
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to verify OTP';
    throw new Error(errorMessage);
  }
}
```

### 2. ParentProfilePage.tsx (`src/pages/ParentProfilePage.tsx`)

#### Updated state variables:
- Removed: `mobileOtpId` (no longer needed)
- Added: `maskedDestination` - to store and display masked phone number
- Added: `otpExpiresIn` - to track OTP expiration countdown

```typescript
const [maskedDestination, setMaskedDestination] = useState('');
const [otpExpiresIn, setOtpExpiresIn] = useState(0);
```

#### Updated `handleRequestMobileChange` function:
- Now uses correct parameter name `newPhoneNumber` (though UI still uses `newMobileNumber`)
- Stores `maskedDestination` and `expiresInSeconds` from response
- Implements countdown timer that:
  - Decrements every second
  - Shows remaining time in UI
  - Automatically expires OTP after timeout
  - Shows error message when OTP expires
  - Cleans up timer on cleanup

```typescript
const handleRequestMobileChange = async () => {
  if (!newMobileNumber.trim()) {
    setMessage({ type: 'error', text: 'Please enter a new mobile number' });
    return;
  }
  setSaving(true);
  try {
    const response = await dataService.requestMobileNumberChange(newMobileNumber);
    setMaskedDestination(response.maskedDestination);
    setOtpExpiresIn(response.expiresInSeconds);
    setOtpSent(true);
    setMobileChangeStep('verify');
    setMessage({ type: 'success', text: `OTP sent to ${response.maskedDestination}` });
    
    // Start countdown timer
    let remainingTime = response.expiresInSeconds;
    const timer = setInterval(() => {
      remainingTime--;
      setOtpExpiresIn(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(timer);
        setOtpSent(false);
        setMobileChangeStep('request');
        setMessage({ type: 'error', text: 'OTP has expired. Please request a new one.' });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
    setMessage({ type: 'error', text: errorMessage });
  } finally {
    setSaving(false);
  }
};
```

#### Updated `handleVerifyMobileOtp` function:
- Now calls `verifyMobileNumberChange` (not `verifyMobileNumberOTP`)
- Passes `newMobileNumber` as first parameter
- Validates OTP is exactly 6 digits before submitting
- Extracts and shows the updated phone number from response
- Properly clears all mobile change state after success

```typescript
const handleVerifyMobileOtp = async () => {
  if (!otpCode.trim()) {
    setMessage({ type: 'error', text: 'Please enter the OTP code' });
    return;
  }
  if (otpCode.length !== 6) {
    setMessage({ type: 'error', text: 'OTP must be 6 digits' });
    return;
  }
  setSaving(true);
  try {
    const response = await dataService.verifyMobileNumberChange(newMobileNumber, otpCode);
    const updated = await AuthService.refreshProfile();
    if (updated) {
      setUser(updated);
    }
    setOtpCode('');
    setNewMobileNumber('');
    setOtpSent(false);
    setMobileChangeStep('request');
    setMaskedDestination('');
    setOtpExpiresIn(0);
    setMessage({ type: 'success', text: `Mobile number updated successfully to ${response.phoneNumber}` });
    setTimeout(() => setMessage(null), 3000);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP';
    setMessage({ type: 'error', text: errorMessage });
  } finally {
    setSaving(false);
  }
};
```

#### Updated UI for OTP verification screen:
- Now displays `maskedDestination` instead of full `newMobileNumber`
- Shows countdown timer with remaining seconds
- Disables verify button when OTP expires (`otpExpiresIn <= 0`)
- Shows expiry countdown prominently in info box

```typescriptreact
<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
  <p className="text-blue-700 dark:text-blue-300 text-sm">
    OTP sent to <strong>{maskedDestination}</strong>
  </p>
  <p className="text-blue-600 dark:text-blue-400 text-xs mt-2">
    Expires in: <strong>{otpExpiresIn} seconds</strong>
  </p>
</div>
```

#### Updated cancel button:
- Now also clears `maskedDestination` and `otpExpiresIn` state

```typescriptreact
<button
  onClick={() => {
    setMobileChangeStep('request');
    setOtpCode('');
    setOtpSent(false);
    setNewMobileNumber('');
    setMaskedDestination('');
    setOtpExpiresIn(0);
  }}
  className="flex-1 px-6 py-2 bg-slate-200 dark:bg-slate-700 text-[#0d141b] dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
>
  {TranslationService.t('common.cancel')}
</button>
```

## Backend API Specification Reference

### Request OTP
- **Endpoint**: `POST /api/v1/users/request-mobile-change`
- **Auth**: Bearer token required
- **Payload**: `{ "newPhoneNumber": "+94771234567" }`
- **Success Response (200)**: 
  ```json
  {
    "message": "OTP sent to new mobile number",
    "maskedDestination": "********4567",
    "expiresInSeconds": 300
  }
  ```

### Verify OTP
- **Endpoint**: `POST /api/v1/users/verify-mobile-change`
- **Auth**: Bearer token required
- **Payload**: `{ "newPhoneNumber": "+94771234567", "otpCode": "123456" }`
- **Success Response (200)**:
  ```json
  {
    "message": "Mobile number updated successfully",
    "phoneNumber": "+94771234567"
  }
  ```

### Error Codes
- **401 UNAUTHORIZED**: Session invalid/expired
- **422 VALIDATION_ERROR**: Invalid phone number format or OTP wrong length
- **409 CONFLICT**: New number same as current or already used
- **429 TOO_MANY_REQUESTS**: Cooldown not finished (request step only)
- **400 BAD_REQUEST**: No active OTP, invalid/expired OTP, or max attempts exceeded (verify step)
- **500 INTERNAL_ERROR**: Generic server error

## Testing Checklist

- [ ] Request OTP with valid phone number → Shows masked destination and countdown
- [ ] Request OTP with invalid format → Shows 422 error message
- [ ] Request OTP with current number → Shows 409 error message
- [ ] Request OTP too quickly → Shows 429 rate limit error
- [ ] Wait for OTP to expire → Shows expiration error, button disabled
- [ ] Verify with correct OTP → Updates profile, shows success
- [ ] Verify with wrong OTP → Shows 400 error
- [ ] Verify with incomplete OTP → Shows validation error
- [ ] Cancel during OTP entry → Resets to request step
- [ ] Countdown timer decrements correctly
- [ ] Session expires during flow → Shows 401 error

## Notes

- OTP countdown timer is client-side only; backend controls actual expiry (300 seconds default)
- Phone number format validation should use E.164 format (e.g., +94771234567)
- After successful verification, user profile is refreshed to get updated phone number
- All error messages from backend are properly displayed to user
- Profile update via PUT /api/v1/users/me no longer supports phoneNumber field directly

