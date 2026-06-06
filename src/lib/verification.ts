// Verification system using WhatsApp
// Stores verification code in user_metadata (no extra table needed)

import { supabase } from './supabase';

const WHATSAPP_NUMBER = '56990117784';

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate and save verification code for a user
 * Returns the code to display to the user
 */
export async function generateVerificationCode(_userId: string): Promise<string> {
  const code = generateCode();
  
  // Save code in user_metadata
  const { error } = await supabase.auth.updateUser({
    data: { 
      verification_code: code,
      verified: false 
    }
  });
  
  if (error) {
    console.error('Error saving verification code:', error);
    throw new Error('Error al generar código');
  }
  
  return code;
}

/**
 * Get WhatsApp link with pre-filled message containing the code
 */
export function getWhatsAppLink(code: string, userName: string): string {
  const message = `Hola NAE, soy ${userName}. Mi código de verificación es: ${code}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Verify user-entered code against stored code
 */
export async function verifyCode(userId: string, enteredCode: string): Promise<boolean> {
  // Get current user metadata
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return false;
  }
  
  const storedCode = user.user_metadata?.verification_code;
  
  if (!storedCode || storedCode !== enteredCode) {
    return false;
  }
  
  // Mark as verified
  await supabase.auth.updateUser({
    data: { 
      verification_code: null, // Clear the code
      verified: true 
    }
  });
  
  // Also update in users table
  await supabase
    .from('users')
    .update({ is_active: true })
    .eq('id', userId);
  
  return true;
}

/**
 * Check if current user is verified
 */
export async function isUserVerified(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.user_metadata?.verified === true;
}

/**
 * Get verification status for display
 */
export function getVerificationStatus(userMetadata?: Record<string, unknown>): {
  verified: boolean;
  code?: string;
} {
  return {
    verified: userMetadata?.verified === true,
    code: userMetadata?.verification_code as string | undefined
  };
}
