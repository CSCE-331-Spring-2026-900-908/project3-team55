import { NextRequest, NextResponse } from "next/server";
import pool from '@/src/lib/db';

export async function GET() {
  try {
    const time = await pool.query('SELECT NOW() AS now');
    console.log(time.rows[0].now);
    return new NextResponse(time.rows[0].now, {status: 200});
  }
  catch (err) {
    console.error('Error executing query', err);
    return new NextResponse(null, {status: 502});
  }
  
  return new NextResponse(null, {status: 204});
}

function query_database() {
}