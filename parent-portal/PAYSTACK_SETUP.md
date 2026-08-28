# Paystack Payment Integration Setup Guide

## Step 1: Create Paystack Account

1. Visit https://paystack.com
2. Click "Get Started" and create an account
3. Use your school's official email address

## Step 2: Business Verification

You'll need to provide:
- Business name (School name)
- Business address
- BVN of account owner
- CAC documents (if registered)
- Valid ID (Driver's license, National ID, or International Passport)

## Step 3: Add Settlement Account

1. Go to Settings → Settlements
2. Click "Add Settlement Account"
3. Select "FCMB" as your bank
4. Enter your FCMB account number
5. Verify the account

## Step 4: Get API Keys

1. Go to Settings → API Keys & Webhooks
2. You'll see two sets of keys:
   - **Test Keys** (for testing - use these first)
   - **Live Keys** (for real payments - use after testing)

3. Copy these keys:
   - Test Public Key (starts with `pk_test_`)
   - Test Secret Key (starts with `sk_test_`)

## Step 5: Add Keys to Your Project

1. Open the `.env` file in your project root
2. Add these lines:

```
PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
PAYSTACK_SECRET_KEY=sk_test_your_key_here
```

3. For parent portal, also add to `parent portal/.env`:

```
PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
```

## Step 6: Test the Integration

1. Use test card: 4084 0840 8408 4081
2. CVV: 408
3. Expiry: Any future date
4. PIN: 0000
5. OTP: 123456

## Step 7: Go Live

Once testing is complete:
1. Complete all Paystack verification requirements
2. Replace test keys with live keys in `.env`
3. Test with a small real payment
4. Monitor your FCMB account for settlement (usually 24 hours)

## Fees

Paystack charges:
- Local cards: 1.5% + ₦100 (capped at ₦2,000)
- International cards: 3.9% + ₦100
- Bank transfer: ₦50 flat fee

You can choose to:
- Absorb the fees (school pays)
- Pass to parents (add to payment amount)

## Support

- Paystack Support: support@paystack.com
- Documentation: https://paystack.com/docs
- Phone: +234 1 888 3881
