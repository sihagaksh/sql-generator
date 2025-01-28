"use server"

import { sql } from "@vercel/postgres"

export async function getTables() {
  try {
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    return result.rows.map((row) => row.table_name)
  } catch (error) {
    console.error("Error fetching tables:", error)
    return []
  }
}

export async function getTableData(tableName: string) {
  try {
    const result = await sql`
      SELECT * FROM ${sql.identifier(tableName)}
      LIMIT 100
    `
    return {
      columns: result.fields.map((field) => field.name),
      rows: result.rows,
    }
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error)
    return { columns: [], rows: [] }
  }
}

