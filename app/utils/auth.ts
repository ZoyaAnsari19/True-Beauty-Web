// Auth utility functions for OTP login

export interface OtpResponse {
  success: boolean;
  message?: string;
  otp?: string; // Only for development/testing
}

export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    phone: string;
    isNewUser: boolean;
  };
}

// Mock API functions - Replace with actual API calls
export async function sendOtp(phone: string): Promise<OtpResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    return {
      success: false,
      message: 'Please enter a valid 10-digit mobile number'
    };
  }

  // Mock: Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP in sessionStorage (in production, this would be handled by backend)
  sessionStorage.setItem('otp', otp);
  sessionStorage.setItem('otpPhone', phone);
  sessionStorage.setItem('otpExpiry', (Date.now() + 3 * 60 * 1000).toString()); // 3 minutes
  sessionStorage.setItem('otpAttempts', '0');

  // In development, log OTP to console
  if (process.env.NODE_ENV === 'development') {
    console.log('OTP for', phone, ':', otp);
  }

  return {
    success: true,
    message: 'OTP sent successfully',
    otp: process.env.NODE_ENV === 'development' ? otp : undefined
  };
}

export async function verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  const storedOtp = sessionStorage.getItem('otp');
  const storedPhone = sessionStorage.getItem('otpPhone');
  const storedExpiry = sessionStorage.getItem('otpExpiry');
  const attempts = parseInt(sessionStorage.getItem('otpAttempts') || '0');

  // Check attempts limit (max 5)
  if (attempts >= 5) {
    return {
      success: false,
      message: 'Maximum verification attempts reached. Please request a new OTP.'
    };
  }

  // Check if OTP exists
  if (!storedOtp || !storedPhone || !storedExpiry) {
    return {
      success: false,
      message: 'OTP expired or invalid. Please request a new OTP.'
    };
  }

  // Check phone match
  if (storedPhone !== phone) {
    return {
      success: false,
      message: 'Phone number mismatch'
    };
  }

  // Check expiry (3 minutes)
  if (Date.now() > parseInt(storedExpiry)) {
    sessionStorage.removeItem('otp');
    sessionStorage.removeItem('otpPhone');
    sessionStorage.removeItem('otpExpiry');
    return {
      success: false,
      message: 'OTP has expired. Please request a new OTP.'
    };
  }

  // Verify OTP
  if (storedOtp !== otp) {
    sessionStorage.setItem('otpAttempts', (attempts + 1).toString());
    return {
      success: false,
      message: 'Invalid OTP. Please try again.'
    };
  }

  // OTP verified successfully
  sessionStorage.removeItem('otp');
  sessionStorage.removeItem('otpPhone');
  sessionStorage.removeItem('otpExpiry');
  sessionStorage.removeItem('otpAttempts');

  // Generate mock JWT token
  const token = `mock-jwt-token-${Date.now()}-${phone}`;
  
  // Check if user exists (mock - in production, check database)
  const existingUser = localStorage.getItem(`user_${phone}`);
  const isNewUser = !existingUser;

  // Store user data
  const userData = {
    id: existingUser ? JSON.parse(existingUser).id : `user_${Date.now()}`,
    phone,
    createdAt: existingUser ? JSON.parse(existingUser).createdAt : new Date().toISOString()
  };

  localStorage.setItem(`user_${phone}`, JSON.stringify(userData));
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify({ phone, id: userData.id }));

  return {
    success: true,
    message: isNewUser ? 'Account created successfully!' : 'Login successful!',
    token,
    user: {
      id: userData.id,
      phone,
      isNewUser
    }
  };
}

export function clearOtpData() {
  sessionStorage.removeItem('otp');
  sessionStorage.removeItem('otpPhone');
  sessionStorage.removeItem('otpExpiry');
  sessionStorage.removeItem('otpAttempts');
}
