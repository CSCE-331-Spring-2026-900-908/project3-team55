import { NextRequest, NextResponse } from "next/server";
import { Result } from 'pg';
import pool from '@/src/lib/db';
import LoginCreds from '@/src/lib/types';

// API endpoint for checking login data

// Login data is best sent as JSON so we need to send using a request that is not GET
// POST is used here, although it does not actually update any values
// TODO: add some semblance of session authentication (e.g. cookie auth token)
export async function POST(request: NextRequest) {
  const creds: LoginCreds = await request.json();

  const login_query: string = "SELECT employee_id, password FROM employee_data WHERE employee_id = "
    + creds.employee_id;

  const result: Result = await pool.query(login_query);

  if (result.rows.length === 0) {
    return new NextResponse(null, {status: 500});
  }

  if (creds.password === (result.rows[0].password as string)) {
    return new NextResponse(null, {status: 200});
  }
}