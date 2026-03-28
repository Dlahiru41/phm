# Mobile Number Change - Flow Diagrams

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARENT PROFILE PAGE                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
          ┌─────────────────────────────────┐
          │  CHANGE MOBILE TAB SELECTED     │
          └─────────────────────────────────┘
                            │
                            ▼
          ┌──────────────────────────────────────┐
          │  STEP 1: REQUEST OTP                 │
          ├──────────────────────────────────────┤
          │ User enters phone number             │
          │ Format: +94XXXXXXXXX                 │
          └──────────────────────────────────────┘
                            │
                ┌───────────┴────────────┐
                ▼                        ▼
         ✅ VALID              ❌ INVALID
                │                        │
                ▼                        ▼
    POST request-mobile-change    Show Error
                │                  (422/409/429)
                ▼                        │
    ┌──────────────────────┐            │
    │ BACKEND:             │            │
    │ • Validates format   │            │
    │ • Checks conflicts   │            │
    │ • Generates OTP      │            │
    │ • Sends SMS          │            │
    │ • Returns masked #   │            │
    └──────────────────────┘            │
                │                        │
                ▼                        │
    ┌──────────────────────┐            │
    │ START COUNTDOWN      │            │
    │ Timer: 300 seconds   │            │
    └──────────────────────┘            │
                │                        │
                ▼                        │
          ┌──────────────┐               │
          │ STEP 2: OTP  │               │
          │   ENTRY      │               │
          └──────────────┘               │
                │                        │
                ▼                        │
    ┌──────────────────────┐            │
    │ Show:                │            │
    │ • Masked # (****4567)│            │
    │ • Countdown (298s)   │            │
    │ • 6-digit input      │            │
    └──────────────────────┘            │
                │                        │
        ┌───────┼────────────┬──────┐   │
        ▼       ▼            ▼      ▼   ▼
    ✅ 6 DIG  ❌ <6 DIG  ⏰ EXPIRE  CANCEL
        │       │            │       │
        │       ▼            ▼       ▼
        │   Show Error   Show Error Return to
        │   "6 digits"   "Expired"  Step 1
        │       │            │       │
        │       └────────────┴───────┘
        │
        ▼
    POST verify-mobile-change
    { newPhoneNumber, otpCode }
        │
        ▼
    ┌──────────────────────┐
    │ BACKEND:             │
    │ • Validates OTP      │
    │ • Checks attempts    │
    │ • Updates DB         │
    │ • Returns new #      │
    └──────────────────────┘
        │
    ┌───┴───┐
    ▼       ▼
   ✅OK   ❌ERROR
    │       │
    ▼       ▼
  SUCCESS  Show Error
  MESSAGE  (400/422)
    │       │
    ▼       │
  REFRESH  Allow
  PROFILE  RETRY
    │       │
    ▼       │
  SHOW NEW  │
  NUMBER    │
    │       │
    ▼       │
  CLEAR     │
  FORM      │
    │       │
    ▼       │
  RESET TO  │
  STEP 1    │
    │       │
    └───┬───┘
        │
        ▼
    ┌─────────────────┐
    │  READY FOR      │
    │  NEXT CHANGE    │
    └─────────────────┘
```

---

## API Call Sequence Diagram

```
Frontend (Browser)                Backend API                    Database
       │                               │                            │
       │                               │                            │
       │ 1. REQUEST OTP                │                            │
       │ POST /api/v1/users/           │                            │
       │ request-mobile-change         │                            │
       ├──────────────────────────────►│                            │
       │ {newPhoneNumber}              │ 2. Validate format         │
       │                               ├──────────────────────────►│
       │                               │ 3. Check if exists        │
       │                               │◄──────────────────────────┤
       │                               │                            │
       │                               │ 4. Generate OTP           │
       │                               │ 5. Save OTP (300s expiry) │
       │ 6. RESPONSE (200)             ├──────────────────────────►│
       │ {message, masked, expires}    │                            │
       │◄──────────────────────────────┤                            │
       │                               │ 6b. Send SMS              │
       │                               │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─►
       │                               │ (OTP: 123456)             │
       │                               │                            │
       │ 7. START COUNTDOWN (300s)     │                            │
       ├─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤                            │
       │ (Client-side timer)           │                            │
       │                               │                            │
       │ [User receives SMS]           │                            │
       │ [User enters OTP: 123456]     │                            │
       │                               │                            │
       │ 8. VERIFY OTP                 │                            │
       │ POST /api/v1/users/           │                            │
       │ verify-mobile-change          │                            │
       ├──────────────────────────────►│                            │
       │ {newPhoneNumber, otpCode}     │ 9. Validate OTP           │
       │                               ├──────────────────────────►│
       │                               │ 10. Check expiry          │
       │                               │◄──────────────────────────┤
       │                               │ 11. Update user profile   │
       │                               ├──────────────────────────►│
       │                               │◄──────────────────────────┤
       │                               │ 12. Delete used OTP       │
       │                               ├──────────────────────────►│
       │                               │◄──────────────────────────┤
       │                               │                            │
       │ 13. RESPONSE (200)            │                            │
       │ {message, phoneNumber}        │                            │
       │◄──────────────────────────────┤                            │
       │                               │                            │
       │ 14. REFRESH PROFILE           │                            │
       │ GET /api/v1/users/me          │                            │
       ├──────────────────────────────►│                            │
       │                               │ 15. Fetch user data       │
       │                               ├──────────────────────────►│
       │ 16. RESPONSE (200)            │◄──────────────────────────┤
       │ {user with new phone}         │                            │
       │◄──────────────────────────────┤                            │
       │                               │                            │
       ▼ UPDATE UI                     ▼                            ▼
```

---

## Error Handling Flow

```
┌────────────────────────────────────────────────────────────────┐
│                    STEP 1: REQUEST OTP                         │
└────────────────────────────────────────────────────────────────┘
                            │
                    POST request-mobile-change
                            │
            ┌───────────────┬────────────┬──────────┬──────────┐
            ▼               ▼            ▼          ▼          ▼
        ✅ 200          422 VALIDATION 409 CONFLICT 429 RATE  500 SERVER
                         ERROR          ERROR      LIMIT      ERROR
            │             │             │          │          │
            ▼             ▼             ▼          ▼          ▼
        SUCCESS      INVALID FORMAT  ALREADY USED COOLDOWN   RETRY
        OTP SENT                      OR CURRENT   WAIT       LATER
            │             │             │          │          │
            ▼             ▼             ▼          ▼          ▼
        Show masked    Show: "Invalid Show: "This Show: "Wait Show:
        destination    phone format"  number is   1 minute"  "Server
        & timer                       taken/       OR         error,
                                      current"     "Retry in  retry
                                                   60 sec"    later"
            │             │             │          │          │
            ▼             ▼             ▼          ▼          ▼
        Go to OTP   Stay on form   Stay on form  Stay on    Stay on
        entry step  Input focused  Input focused form       form
                                                Disable btn Disable btn

┌────────────────────────────────────────────────────────────────┐
│                    STEP 2: VERIFY OTP                          │
└────────────────────────────────────────────────────────────────┘
                            │
                    POST verify-mobile-change
                            │
            ┌───────────┬───────────┬──────────┬──────────┬──────────┐
            ▼           ▼           ▼          ▼          ▼          ▼
        ✅ 200    400 BAD_REQUEST 422 VALIDATION 401 UNAUTHORIZED 500
                    (Wrong OTP)   ERROR          (Session        SERVER
                    (Expired OTP) (Not 6 digits) expired)        ERROR
                    (Max attempts)
            │           │           │          │          │
            ▼           ▼           ▼          ▼          ▼
        SUCCESS     SHOW: "Invalid Show: "OTP REDIRECT   RETRY
        UPDATED     OTP" or        must be" to login     LATER
                    "Expired" or
                    "Max attempts"
            │           │           │          │          │
            ▼           ▼           ▼          ▼          ▼
        Refresh     Allow OTP   Show error Logout   Disable
        profile     re-entry    Show form  user      button
        Clear form              Allow      Go to
        Show new #              cancel     login
        Go back to                         page
        step 1
```

---

## State Machine Diagram

```
                    ┌─────────────────────┐
                    │   INITIAL STATE     │
                    │                     │
                    │ step: 'request'     │
                    │ otpSent: false      │
                    │ timer: 0            │
                    └──────────┬──────────┘
                               │
                               │ User enters phone
                               │ & clicks Send OTP
                               │
                ┌──────────────▼──────────────┐
                │                             │
        ┌───►  │ SENDING OTP STATE           │
        │      │                             │
        │      │ saving: true                │
        │      │ step: 'request'             │
        │      └──┬────────────┬─────────────┘
        │         │            │
        │    SUCCESS       ERROR
        │         │            │
        │    ┌────▼──────┐ ┌───▼────────┐
        │    │ OTP SENT  │ │  ERROR     │
        │    │ STATE     │ │  STATE     │
        │    │           │ │            │
        │    │ saving: f │ │ saving: f  │
        │    │ otpSent:t │ │ message:   │
        │    │ step:     │ │ error text │
        │    │ 'verify'  │ │            │
        │    │ timer: 300│ │            │
        │    │ mask:xxxx7│ │            │
        │    └────┬──────┘ │            │
        │         │        │            │
        │         │        │ User clicks
        │  COUNTDOWN       │ "Try again"
        │  TIMER RUNS      │ or "Back"
        │         │        │            │
        │    ┌────┼────────┼────────┐   │
        │    ▼    ▼        ▼        │   │
        │  USER   TIMEOUT  CANCEL   │   │
        │  SUBMITS         CLICKED  │   │
        │  OTP            │         │   │
        │    │            │        │   │
        │    └────┬────────┴────────┴───┘
        │         │
        │    ┌────▼──────────────┐
        │    │  VERIFYING OTP    │
        │    │  STATE            │
        │    │                   │
        │    │  saving: true     │
        │    │  step: 'verify'   │
        │    │  (timer paused)   │
        │    └────┬──────────┬───┘
        │         │          │
        │    SUCCESS      ERROR
        │         │          │
        │    ┌────▼────┐ ┌───▼────────┐
        │    │ SUCCESS │ │   ERROR    │
        │    │ STATE   │ │   STATE    │
        │    │         │ │            │
        │    │ message:│ │ message:   │
        │    │ success │ │ error text │
        │    │ Refresh │ │            │
        │    │ profile │ │            │
        │    │         │ │            │
        │    │ Clear   │ │            │
        │    │ all     │ │            │
        │    │ state   │ │ Allow      │
        │    │         │ │ re-entry   │
        │    └────┬────┘ │            │
        │         │      │            │
        │         │      │ User enters
        │         │      │ new OTP
        │         │      │            │
        │         │      └─────┬──────┘
        │         │            │
        └─────────┴────────────┘

         All paths lead back to
         INITIAL STATE for next change
```

---

## State Transitions Table

| Current State | Trigger | New State | Actions |
|--------------|---------|-----------|---------|
| REQUEST | Click "Send OTP" | SENDING | Set saving: true |
| SENDING | API success (200) | OTP_SENT | Start timer, show masked #, go to verify step |
| SENDING | API error | ERROR | Show error message, keep on form |
| OTP_SENT | User enters OTP | OTP_ENTERED | Update otpCode state |
| OTP_SENT | Timer runs out | EXPIRED | Stop timer, disable button, show error |
| OTP_SENT | Click "Verify" | VERIFYING | Set saving: true |
| EXPIRED | Click "Cancel" | REQUEST | Clear all state |
| ERROR | Click "Cancel" | REQUEST | Clear all state |
| VERIFYING | API success (200) | SUCCESS | Update profile, clear form, reset state |
| VERIFYING | API error (400) | ERROR | Show error message, stay on verify step |
| SUCCESS | Auto redirect | REQUEST | Ready for next change |

---

## Component Lifecycle

```
┌─────────────────────────────────────────┐
│  ParentProfilePage Component Mounted    │
│                                         │
│  • Load current user profile            │
│  • Initialize mobile change state       │
│  • Set activeTab                        │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│  User navigates to "Change Mobile"│
│  tab (activeTab = 'mobile')      │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│  Render Step 1: Request Form     │
│  • Phone input field              │
│  • Send OTP button                │
└────────────────┬─────────────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ User Action     │
        └────────┬────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
    SEND OTP          CANCEL
        │                 │
        ▼                 ▼
    API CALL        CLEAR STATE
        │
        ├─ Success
        │   ▼
        │ Store masked#
        │ Store expiry
        │ Start timer
        │ Set otpSent: true
        │ Go to Step 2
        │   │
        │   ▼
        │ TIMER LOOP
        │ ├─ Decrement every 1s
        │ ├─ Update UI
        │ └─ Stop when 0
        │
        │   ▼
        │ Render Step 2: OTP Form
        │ • Show masked number
        │ • Show countdown timer
        │ • OTP input field
        │ • Verify button (disabled if timer=0)
        │   │
        │   ▼
        │ User Action
        │ ├─ Enter OTP
        │ ├─ Click Verify
        │ └─ Click Cancel
        │   │
        │   ├─ Verify
        │   │  ▼
        │   │ API CALL
        │   │  │
        │   │  ├─ Success
        │   │  │  ▼
        │   │  │ Refresh profile
        │   │  │ Show success msg
        │   │  │ Clear all state
        │   │  │ Reset to Step 1
        │   │  │
        │   │  └─ Error
        │   │     ▼
        │   │  Show error msg
        │   │  Allow retry
        │   │
        │   └─ Cancel
        │      ▼
        │   Clear state
        │   Go back to Step 1
        │
        └─ Error
            ▼
        Show error msg
        Clear sending state
        Stay on Step 1
```

---

## Data Flow Diagram

```
┌────────────────┐
│ User Input     │
│ • newMobileNum │◄──────────┐
│ • otpCode      │           │
└────────┬───────┘           │
         │                   │
         ▼                   │
┌────────────────────────┐   │
│ Component State        │   │
│ • mobileChangeStep     │   │
│ • newMobileNumber      │   │
│ • otpCode              │   │
│ • otpSent              │   │
│ • maskedDestination    │   │
│ • otpExpiresIn         │   │
│ • saving               │   │
│ • message              │   │
└────────┬───────────────┘   │
         │                   │
         ▼                   │
┌────────────────────────┐   │
│ DataService Methods    │   │
│ • request...           │   │
│ • verify...            │   │
└────────┬───────────────┘   │
         │                   │
         ▼                   │
┌────────────────────────┐   │
│ API Client             │   │
│ • POST request         │   │
│ • POST verify          │   │
│ • Bearer token auth    │   │
└────────┬───────────────┘   │
         │                   │
         ▼                   │
┌────────────────────────┐   │
│ Backend API            │   │
│ • Validate phone       │   │
│ • Generate OTP         │   │
│ • Send SMS             │   │
│ • Update profile       │   │
└────────┬───────────────┘   │
         │                   │
         ▼                   │
┌────────────────────────┐   │
│ API Response           │   │
│ • message              │   │
│ • maskedDestination    │   │
│ • expiresInSeconds     │   │
│ • phoneNumber          │   │
└────────┬───────────────┘   │
         │                   │
         ▼                   │
┌────────────────────────┐   │
│ Response Handling      │   │
│ • Extract data         │   │
│ • Update state         │   │
│ • Start timer          │   │
│ • Handle errors        │   │
└────────┬───────────────┘   │
         │                   │
         ▼                   │
│ Return to Component ────────┘
│ State Updated
│ UI Re-renders
```

---

## Summary

- **3 main states**: REQUEST → OTP_SENT → VERIFY → SUCCESS or ERROR
- **Countdown timer**: 300 seconds (5 minutes), decrements every 1 second
- **Error handling**: Display backend messages, allow retry or cancel
- **State cleanup**: All state cleared after success or explicit cancel
- **API calls**: 2 POST requests, 1 GET refresh after verification

