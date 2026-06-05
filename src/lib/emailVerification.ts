// Simple email verification system using Supabase's built-in OTP
// This works WITHOUT needing to change Supabase dashboard settings

import { supabase } from './supabase';

/**
 * Send OTP verification code to email
 * Uses Supabase's signInWithOtp which sends a magic link or code
 */
export async function sendVerificationCode(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // First, check if user already exists
    const { data: existingUsers } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (existingUsers) {
      return { success: false, error: 'Este email ya está registrado' };
    }

    // Use Supabase OTP - sends email with verification code
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Creates user if doesn't exist
      },
    });

    if (error) {
      console.error('OTP send error:', error);
      return { success: false, error: 'Error al enviar código. Intenta de nuevo.' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Send verification error:', err);
    return { success: false, error: err.message || 'Error inesperado' };
  }
}

/**
 * Verify OTP code
 * Returns session if successful
 */
export async function verifyCode(email: string, code: string): Promise<{ 
  success: boolean; 
  session?: any;
  user?: any;
  error?: string 
}> {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });

    if (error || !data.session) {
      console.error('Verify error:', error);
      return { success: false, error: 'Código incorrecto o expirado' };
    }

    return { 
      success: true, 
      session: data.session,
      user: data.user 
    };
  } catch (err: any) {
    console.error('Verify code error:', err);
    return { success: false, error: err.message || 'Error al verificar' };
  }
}

/**
 * Complete registration after email verification
 * Creates user profile in the database
 */
export async function completeRegistration(
  userId: string,
  email: string,
  formData: {
    fullName: string;
    phone: string;
    country: string;
    city: string;
    company?: string;
    userType: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    // Insert into users table
    const { error: profileErr } = await supabase.from('users').insert({
      id: userId,
      email: email.trim(),
      full_name: formData.fullName.trim(),
      company_name: formData.company?.trim() || null,
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      city: formData.city.trim(),
      role: 'distributor', // DB enum only accepts: admin, distributor, visitor
      is_active: true,
    });

    if (profileErr) {
      console.error('Profile insert error:', profileErr);
      // Don't block - user has auth account
    }

    return { success: true };
  } catch (err: any) {
    console.error('Complete registration error:', err);
    return { success: false, error: err.message };
  }
}
