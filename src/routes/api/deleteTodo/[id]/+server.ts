import type { RequestHandler } from '@sveltejs/kit';
import { dbExecute } from '$lib/db';

export const DELETE: RequestHandler = async ({ params }) => {
  console.log('Delete Todo ID:', params.id);
  try {
    const query = 'DELETE FROM todo_items WHERE id = $1';
    const result = await dbExecute(query, [params.id]);

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Todo deleted successfully' }), {
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
