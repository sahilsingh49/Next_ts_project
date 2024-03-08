/* import React, { useState, FormEvent } from 'react';
import { createTodo } from './api';

const TodoForm = () => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task.trim() === '') return; // Skip if task is empty

        try {
            await createTodo(task);
            setTask('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;*/
