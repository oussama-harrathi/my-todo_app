<script lang="ts">
  import { onMount } from 'svelte';
  import { todoItems } from '$lib/store';

   let newTodoText = '';

  // Fetch todo items on component mount
  onMount(async () => {
    const response = await fetch('/api/todos');
    if (response.ok) {
      const todos = await response.json();
      todoItems.set(todos);
    }
  });

  async function fetchTodos() {
    const response = await fetch('/api/todos');
    if (response.ok) {
      const todos = await response.json();
      todoItems.set(todos);
    }
  }

  // Add a new todo item
  async function addTodo() {
    if (!newTodoText.trim()) return;
    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodoText, completed: false }),
    });
    if (response.ok) {
      newTodoText = '';
      await fetchTodos(); 
    }
  }

  // Toggle the completion status of a todo item
  async function toggleTodo(id: number) {
    await fetch(`/api/toggleTodo/${id}`, { method: 'PUT' });
    todoItems.update((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  // Delete a todo item
  async function deleteTodo(id: number) {
    await fetch(`/api/deleteTodo/${id}`, { method: 'DELETE' });
    todoItems.update((items) => items.filter((item) => item.id !== id));
  }
</script>

<div class="todo-app">
  <input
    type="text"
    class="todo-input"
    placeholder="Add new todo..."
    bind:value={newTodoText}
    on:keyup={(e) => e.key === 'Enter' && addTodo()}
  />
  <button class="add-button" on:click={addTodo}>Add Task</button>

  <ul class="todo-list">
    {#each $todoItems as todo (todo.id)}
      <li class="todo-item">
        <input
          type="checkbox"
          class="checkbox"
          checked={todo.completed}
          on:change={() => toggleTodo(todo.id)}
        />
        <span class="todo-text">{todo.text}</span>
        <button class="delete-button" on:click={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>


<style>
  .todo-app {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }

  .todo-input {
    width: 70%;
    padding: 10px;
    margin-right: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .add-button {
    padding: 10px 20px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .add-button:hover {
    background-color: #4cae4c;
  }

  .todo-list {
    list-style: none;
    margin-top: 20px;
    padding: 0;
  }

  .todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .checkbox {
    margin-right: 10px;
  }

  .todo-text {
    flex-grow: 1;
  }

  .delete-button {
    padding: 5px 10px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .delete-button:hover {
    background-color: #c9302c;
  }
</style>


