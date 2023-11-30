import { writable } from 'svelte/store';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export const todoItems = writable<TodoItem[]>([]);
