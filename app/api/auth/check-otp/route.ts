import { NextRequest, NextResponse } from 'next/server';
import { normalizeSriLankanPhone } from '@/lib/phone';

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    const normalized = normalizeSriLankanPhone(phone);
    const cookieOtp = req.cookies.get('ec_otp')?.value;
    const cookiePhone = req.cookies.get('ec_phone_tmp')?.value;

    if (!cookieOtp || !cookiePhone) {
      return NextResponse.json(
        { error: 'OTP session expired. Please request a new code.' },
        { status: 400 }
      );
    }

    if (cookiePhone !== normalized) {
      return NextResponse.json(
        { error: 'Phone number mismatch.' },
        { status: 400 }
      );
    }

    if (code !== cookieOtp) {
      return NextResponse.json(
        { error: 'Invalid verification code.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      message: 'Phone verified successfully',
    });

    response.cookies.set('ec_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    response.cookies.set('ec_user_phone', normalized, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    response.cookies.delete('ec_otp');
    response.cookies.delete('ec_phone_tmp');

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}