# Quick Reference - Mobile Number Change API

## For Developers

### DataService Method Signatures

```typescript
// Request OTP
dataService.requestMobileNumberChange(newPhoneNumber: string)
  → Promise<{ 
      message: string; 
      maskedDestination: string;  // e.g., "********4567"
      expiresInSeconds: number;   // e.g., 300
    }>

// Verify OTP
dataService.verifyMobileNumberChange(newPhoneNumber: string, otpCode: string)
  → Promise<{ 
      message: string; 
      phoneNumber: string;  // Updated phone number
    }>
```

### Frontend Usage Example

```typescript
import { dataService } from '../services/DataService';

// Step 1: User enters phone and clicks Send OTP
try {
  const response = await dataService.requestMobileNumberChange('+94771234567');
  console.log(response.maskedDestination);  // "********4567"
  console.log(response.expiresInSeconds);   // 300
  // Start countdown timer, move to OTP screen
} catch (error) {
  console.error(error.message);  // User-friendly error from backend
}

// Step 2: User enters OTP and clicks Verify
try {
  const response = await dataService.verifyMobileNumberChange('+94771234567', '123456');
  console.log(response.phoneNumber);  // "+94771234567"
  // Update profile, show success message
} catch (error) {
  console.error(error.message);  // User-friendly error from backend
}
```

### Common Error Messages

```
"Invalid phone format" 
→ User entered invalid E.164 format

"Number already registered" 
→ Phone number already used by another account

"Mobile number same as current number"
→ User tried to change to their current number

"Wait 60 seconds before next request"
→ Rate limited, too many OTP requests

"Invalid or expired OTP"
→ OTP code is wrong or has expired

"OTP must be 6 digits"
→ OTP code validation failed

"Session expired"
→ User needs to login again
```

### State Management Pattern

```typescript
// In component using this feature
const [newMobileNumber, setNewMobileNumber] = useState('');
const [otpCode, setOtpCode] = useState('');
const [otpSent, setOtpSent] = useState(false);
const [maskedDestination, setMaskedDestination] = useState('');
const [otpExpiresIn, setOtpExpiresIn] = useState(0);
const [mobileChangeStep, setMobileChangeStep] = useState<'request' | 'verify'>('request');
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
```

### Countdown Timer Implementation

```typescript
// After OTP is sent, start countdown
let remainingTime = response.expiresInSeconds;  // Usually 300
const timer = setInterval(() => {
  remainingTime--;
  setOtpExpiresIn(remainingTime);
  
  if (remainingTime <= 0) {
    clearInterval(timer);
    setOtpSent(false);
    setMobileChangeStep('request');
    setMessage({ 
      type: 'error', 
      text: 'OTP has expired. Please request a new one.' 
    });
  }
}, 1000);  // Update every second

// Cleanup on unmount or cancel
return () => clearInterval(timer);
```

### Validation

```typescript
// Phone number validation
const isValidPhoneNumber = (phone: string): boolean => {
  // E.164 format: +94XXXXXXXXX
  return /^\+94\d{9}$/.test(phone);
};

// OTP validation
const isValidOTP = (otp: string): boolean => {
  return otp.length === 6 && /^\d{6}$/.test(otp);
};
```

### API Response Handling

All errors come wrapped in this structure:
```typescript
// Success Response (200)
{
  "message": "OTP sent to new mobile number",
  "maskedDestination": "********4567",
  "expiresInSeconds": 300
}

// Error Response (any status)
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid phone format",
    "details": []
  }
}
```

### Backend Integration Notes

- **No phoneNumber field in PUT /api/v1/users/me**: Use the OTP flow instead
- **Bearer Token Required**: All requests need valid auth token
- **Phone Format**: Must be valid E.164 format (e.g., +94771234567)
- **OTP Length**: Must be exactly 6 digits, numeric only
- **Expiry Default**: Usually 300 seconds, check backend config
- **Rate Limiting**: Check X-RateLimit headers in responses

### Component Integration

Use ParentLayout wrapper:
```tsx
<ParentLayout activeNav="profile">
  {/* Your form here */}
</ParentLayout>
```

Redirect after success:
```typescript
// Phone number was updated, profile already refreshed
// User can navigate away or stay on page
navigate('/parent-dashboard-desktop');
```

---

## Troubleshooting

### Still Getting 422 Error?

**Checklist:**
- [ ] Using correct endpoint: `/api/v1/users/request-mobile-change`
- [ ] Parameter name: `newPhoneNumber` (not `newMobileNumber`)
- [ ] Phone format: E.164 (starts with +94, 11-12 digits total)
- [ ] Bearer token included in header (apiClient does this automatically)
- [ ] Server proxy is working (dev Vite config, prod BFF)

### OTP Not Appearing?

- Check backend SMS gateway is configured
- Check user's internet connection
- Check backend logs for delivery errors
- Try requesting again after rate limit cooldown

### Verify Always Fails?

**Checklist:**
- [ ] Using correct endpoint: `/api/v1/users/verify-mobile-change`
- [ ] Sending both: `newPhoneNumber` AND `otpCode`
- [ ] OTP is exactly 6 digits
- [ ] OTP hasn't expired (check countdown)
- [ ] Same phone number used in verify as request

### Timer Not Countdown?

- Check `setInterval` is being called
- Check component isn't re-rendering and resetting timer
- Verify `remainingTime` variable is being decremented
- Check for console errors

---

## Performance Tips

1. **Debounce phone input**: Prevent API calls on every keystroke
2. **Disable button while saving**: Use `disabled={saving}` pattern
3. **Cancel timer on cleanup**: Prevent memory leaks
4. **Cache API responses**: Don't make duplicate requests
5. **Show loading state**: Give user feedback during API calls

---

## Security Considerations

- ✅ Masked destination shows only last 4 digits
- ✅ OTP never logged or displayed in full
- ✅ Bearer token required for all requests
- ✅ Phone number normalized on backend
- ✅ Rate limiting prevents brute force
- ✅ Session validation enforced
- ❌ Don't store OTP in localStorage
- ❌ Don't send OTP over email
- ❌ Don't bypass expiry timer validation

