import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL DB connection settings
const pool = new Pool({
  user: 'postgres', // Replace with your actual username
  password: 'summer2023',
  host: 'postgres', // Replace with your actual host
  database: 'mydb', // Replace with your actual database name
  port: 5432, // Replace with your actual port number, if different
});

export async function dbExecute(query: string, params: any[] = []) {
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    return result;
  } catch (error) {
    console.error('Error in dbExecute:', error);
    throw error; // Rethrow error to be handled by the caller
  }
}

export async function dbQuery(query: string, params: any[] = []) {
  try {
    const result = await pool.query(query, params);
    return { rows: result.rows || [] };
  } catch (error) {
    console.error('Error in dbQuery:', error);
    throw error; // Rethrow error to be handled by the caller
  }
}
