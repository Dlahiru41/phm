# Mobile Number Change - Before & After Comparison

## Problem Causing 422 Error

The frontend implementation didn't match the backend API specification, causing validation errors.

## Key Differences

### 1. Request OTP Endpoint & Payload

**BEFORE:**
```typescript
// DataService.ts
const response = await api.post('/users/request-mobile-change', {
  newMobileNumber,  // ❌ Wrong parameter name
});
// Response expected: { otpId: string }
```

**AFTER:**
```typescript
// DataService.ts
const response = await api.post('/api/v1/users/request-mobile-change', {
  newPhoneNumber,  // ✅ Correct parameter name
});
// Response: { message: string; maskedDestination: string; expiresInSeconds: number }
```

### 2. Verify OTP Endpoint & Payload

**BEFORE:**
```typescript
// DataService.ts
await api.post('/users/verify-mobile-otp', {  // ❌ Wrong endpoint
  otpId,           // ❌ Not expected by backend
  otpCode,
});
```

**AFTER:**
```typescript
// DataService.ts
const response = await api.post('/api/v1/users/verify-mobile-change', {
  newPhoneNumber,  // ✅ Backend requires the phone number again
  otpCode,
});
// Response: { message: string; phoneNumber: string }
```

### 3. Frontend State Management

**BEFORE:**
```typescript
const [newMobileNumber, setNewMobileNumber] = useState('');
const [otpCode, setOtpCode] = useState('');
const [otpSent, setOtpSent] = useState(false);
const [mobileOtpId, setMobileOtpId] = useState('');  // ❌ Not used by backend
```

**AFTER:**
```typescript
const [newMobileNumber, setNewMobileNumber] = useState('');
const [otpCode, setOtpCode] = useState('');
const [otpSent, setOtpSent] = useState(false);
const [maskedDestination, setMaskedDestination] = useState('');  // ✅ From backend response
const [otpExpiresIn, setOtpExpiresIn] = useState(0);  // ✅ Countdown timer
```

### 4. Request Handler

**BEFORE:**
```typescript
const handleRequestMobileChange = async () => {
  const response = await dataService.requestMobileNumberChange(newMobileNumber);
  setMobileOtpId(response.otpId);  // ❌ Wrong field
  setOtpSent(true);
  setMobileChangeStep('verify');
};
```

**AFTER:**
```typescript
const handleRequestMobileChange = async () => {
  const response = await dataService.requestMobileNumberChange(newMobileNumber);
  setMaskedDestination(response.maskedDestination);  // ✅ Correct field
  setOtpExpiresIn(response.expiresInSeconds);        // ✅ New feature
  setOtpSent(true);
  setMobileChangeStep('verify');
  
  // ✅ NEW: Countdown timer implementation
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
};
```

### 5. Verify Handler

**BEFORE:**
```typescript
const handleVerifyMobileOtp = async () => {
  await dataService.verifyMobileNumberOTP(mobileOtpId, otpCode);  // ❌ Wrong function
  // ...
};
```

**AFTER:**
```typescript
const handleVerifyMobileOtp = async () => {
  if (otpCode.length !== 6) {  // ✅ Validation
    setMessage({ type: 'error', text: 'OTP must be 6 digits' });
    return;
  }
  const response = await dataService.verifyMobileNumberChange(newMobileNumber, otpCode);  // ✅ Correct function & params
  // ... extract phoneNumber from response
  setMessage({ type: 'success', text: `Mobile number updated successfully to ${response.phoneNumber}` });
};
```

### 6. UI Display

**BEFORE:**
```typescriptreact
<p className="text-blue-700">OTP sent to <strong>{newMobileNumber}</strong></p>
{/* ❌ No countdown timer shown */}
```

**AFTER:**
```typescriptreact
<p className="text-blue-700">OTP sent to <strong>{maskedDestination}</strong></p>
<p className="text-xs">Expires in: <strong>{otpExpiresIn} seconds</strong></p>
{/* ✅ Shows countdown and masked number */}
<button disabled={saving || otpExpiresIn <= 0}>Verify</button>
{/* ✅ Disable button when OTP expires */}
```

## Files Modified

1. **src/services/DataService.ts**
   - Fixed `requestMobileNumberChange()` endpoint and payload
   - Renamed and fixed `verifyMobileNumberOTP()` to `verifyMobileNumberChange()`
   - Updated response type handling
   - Improved error message extraction

2. **src/pages/ParentProfilePage.tsx**
   - Updated state variables to match backend response
   - Implemented countdown timer for OTP expiration
   - Added OTP length validation
   - Improved error handling with backend messages
   - Updated UI to show masked destination and countdown
   - Fixed method calls to match new DataService signatures

## Expected Backend Behavior

Now that the frontend is correctly calling the endpoints:

- **POST /api/v1/users/request-mobile-change** with `{ "newPhoneNumber": "..." }`
  - Returns 200 with OTP details ✅
  - Returns 422 if phone format is invalid (e.g., not E.164) ✅
  - Returns 409 if number is same as current or already registered ✅
  - Returns 429 if rate limited ✅

- **POST /api/v1/users/verify-mobile-change** with `{ "newPhoneNumber": "...", "otpCode": "..." }`
  - Returns 200 with updated phone number ✅
  - Returns 400 if OTP is invalid/expired/max attempts ✅
  - Returns 422 if OTP is not 6 digits ✅

## Testing

Test these scenarios:
1. ✅ Request OTP with valid +94 number → Should work now
2. ✅ Request OTP with invalid format → Shows 422 error
3. ✅ Countdown timer decrements → Shows remaining seconds
4. ✅ OTP expires automatically → Button disabled, error shown
5. ✅ Verify with correct OTP → Phone number updated
6. ✅ Profile refreshes after update → Shows new number

