import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.delete('ec_session');
  response.cookies.delete('ec_user_phone');
  response.cookies.delete('ec_otp');
  response.cookies.delete('ec_phone_tmp');

  return response;
}