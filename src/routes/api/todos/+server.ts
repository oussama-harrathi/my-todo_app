import type { RequestHandler } from '@sveltejs/kit';
import { dbQuery } from '$lib/db';

export const GET: RequestHandler = async () => {
  try {
    const result = await dbQuery('SELECT id, text, completed FROM todo_items');
    console.log("Queried Todos:", result.rows);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return new Response(JSON.stringify({ error: 'A database error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
