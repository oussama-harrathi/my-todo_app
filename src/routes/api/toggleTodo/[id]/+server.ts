import type { RequestHandler } from '@sveltejs/kit';
import { dbExecute } from '$lib/db';

export const PUT: RequestHandler = async ({ params }) => {
  console.log('Toggle Todo ID:', params.id);
  try {
    const query = `UPDATE todo_items SET completed = NOT completed WHERE id = $1`;
    await dbExecute(query, [params.id]);

    return new Response(JSON.stringify({ message: 'Todo updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in toggleTodo:', error);
    return new Response(JSON.stringify({ error: 'A database error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
