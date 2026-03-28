import { NextRequest, NextResponse } from "next/server";
import pool from '@/src/lib/db';
import Employee from '@/src/lib/types';

// API endpoint for Managers to access, create, and manipulate Employee Data

// Retrieves a list of users' names, employee types, and employee IDs
export async function GET() {
  try {
    const users = await pool.query('SELECT employee_id, employee_type, first_name, last_name FROM employee_data ORDER BY employee_id;');
    console.log(users.rows);
    return NextResponse.json(users.rows);
  }
  catch (err) {
    console.error('Error executing query', err);
    return new NextResponse(null, {status: 502});
  }
}

// Creates a new user in the database with the specified employee name, type, and password
// If any required field (first name, last name, type, and password) is not present,
// The query will automatically fail
export async function POST(request: NextRequest) {
  const new_empl: Employee = await request.json();

  const insert_query: string = "INSERT INTO employee_data (employee_type, password, first_name, last_name) " +
  "VALUES ('" + new_empl.employee_type + "', '" + new_empl.password + "', '" + new_empl.first_name + "', '" + new_empl.last_name + "');";
  console.log(insert_query);

  await pool.query(insert_query);

  return new NextResponse(null, {status: 201});
}

// Updates an existing user in the database with the specified employee ID
export async function PUT(request: NextRequest) {
  const empl: Employee = await request.json();

  const insert_query: string = "UPDATE employee_data SET employee_type = '" + empl.employee_type + "', password = '" + empl.password
  + "', first_name = '" + empl.first_name + "', last_name = '" + empl.last_name + "' WHERE employee_id = " + empl.employee_id + ";";
  console.log(insert_query);

  await pool.query(insert_query);

  return new NextResponse(null, {status: 201});
}

// Deletes an existing user from the database
export async function DELETE(request: NextRequest) {
  const empl: Employee = await request.json();

  const insert_query: string = "DELETE FROM employee_data WHERE employee_id = " + empl.employee_id + ";";
  
  await pool.query(insert_query);

  return new NextResponse(null, {status: 201});
}