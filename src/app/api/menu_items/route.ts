import { NextRequest, NextResponse } from "next/server";
import pool from '@/src/lib/db';
import MenuItem from '@/src/lib/types';
import { Result } from 'pg';

// API Endpoint for accessing menu items available

// Returns a list of all menu items, their prices, whether or not they are active, and whether or not they are seasonal
// Specifying no parameters gives a comprehensiive list
// Specifying an item name gives only the data for that one item
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let query_appendix: string = "";

  if (searchParams.get("name") != null) {
    const name: string = (searchParams.get("name") as string);
    query_appendix = " WHERE name = '" + name + "';";
  }
  
  const query_prefix = "SELECT name, cost, active, seasonal_menu_item FROM menu_items";
  const search_query = query_prefix + query_appendix;

  const results: Result = await pool.query(search_query);

  if (results.rows.length === 0) {
    return new NextResponse(null, {status: 418});
  }
  else {
    return NextResponse.json(results.rows);
  }
}

// Inserts a new item into the database
export async function POST(request: NextRequest) {
  const new_item: MenuItem = await request.json();

  const insert_query: string = "INSERT INTO menu_items (name, cost, active, seasonal_menu_item) "
    + "VALUES ('" + new_item.name + "', " + new_item.cost + ", " + new_item.active + ", " + new_item.seasonal_menu_item + ");";

  console.log(insert_query);

  try {
    await pool.query(insert_query);
    return new NextResponse(null, {status: 200});
  }
  catch (err) {
    console.log("Insert failed: ", err);
    return new NextResponse("New Menu Item failed.", {status: 500});
  }
}