'use client'
import axios from 'axios';
export type Todo = {
    id: string;
    task: string;
    completed: boolean;
}
const API_URL = "http://localhost:4000/todos";
export const getAllTodos = async (): Promise<Todo[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching all todos:", error);
        return [];
    }

    };

export const getTodoById = async (id: string): Promise<Todo | null> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching todo with ID ${id}:`, error);
        return null;
    }
};

export const addTodo = async (task: string): Promise<Todo | null> => {
    try {
        const newTodo = { task, completed: false };
        const response = await axios.post(API_URL, newTodo);
        return response.data;
    }catch (error) {
        console.error("Error adding todo:", error);
        return null;
    }
};

export const toggleTodoCompletionStatus = async (id: string): Promise<boolean> => {
     try {
        await axios.patch(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error(`Error toggling completion status for todo with ID ${id}:`, error);
        return false;
    }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting todo with ID ${id}:`, error);
        return false;
    }
};

