import type { RequestHandler } from '@sveltejs/kit';
import { dbExecute } from '$lib/db';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const todo = await request.json();
    const completedValue = todo.completed ? 1 : 0;

    const query = `
      INSERT INTO todo_items (text, completed)
      VALUES ($1, $2) RETURNING id`;

    const params = [todo.text, completedValue];

    const result = await dbExecute(query, params);

    // Assuming the first row contains the inserted ID
    const insertedId = result.rows[0]?.id;

    return new Response(JSON.stringify({ id: insertedId, ...todo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'A database error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
