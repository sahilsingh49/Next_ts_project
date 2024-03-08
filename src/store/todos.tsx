"use client"
import {createContext, ReactNode, useContext, useState, useEffect, useCallback} from "react";
import { getAllTodos, addTodo, toggleTodoCompletionStatus, deleteTodo } from "@/components/api";

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
}
export type TodosContext = {
    todos: Todo[];
    allCount: number;
    activeCount: number;
    completedCount: number;
    handleAddTodo: (task: string) => void;
    toggleTodoAsCompleted : (id:string) => void;
    handleTodoDelete:(id:string) => void;
}
export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({children}: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [allCount, setAllCount] = useState<number>(todos.length);
    const [activeCount, setActiveCount] = useState<number>(
        todos.filter(todo => !todo.completed).length
    );
    const [completedCount, setCompletedCount] = useState<number>(
        todos.filter(todo => todo.completed).length
    );
    const updateCounts = (todos: Todo[]) => {
        const allCount = todos.length;
        const activeCount = todos.filter(todo => !todo.completed).length;
        const completedCount = todos.filter(todo => todo.completed).length;
        setAllCount(allCount);
        setActiveCount(activeCount);
        setCompletedCount(completedCount);
        return todos;
    };
    const handleAddTodo = async (task: string) => {
        try {
            console.log(addTodo, "add")
            const newTodo = await addTodo(task);
           if (newTodo) {
               setTodos(prevTodos => [...prevTodos, newTodo]);
               updateCounts([...todos, newTodo]);
           } else{
               console.error('Error: New todo is null');
           }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodoAsCompleted =async (id:string) => {
        try {
            await toggleTodoCompletionStatus(id);
            setTodos(prev => prev.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            }));
            setTodos(prev => updateCounts(prev));
        } catch (error) {
            console.error('Error toggling todo completion status:', error);
        }
    };
    const handleTodoDelete = async (id:string) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(task => task.id !== id));
            setTodos(prev => updateCounts(prev));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    // Function to fetch all todos
    const getAllTodosData = useCallback(async () => {
        try {
            const todosData = await getAllTodos();
            setTodos(todosData);
            updateCounts(todosData);
        } catch (error) {
            console.error('Error fetching all todos:', error);
        }
    }, []); // Empty dependency array

    useEffect(() => {
        getAllTodosData().then(() => { // Call the function immediately
        });
    }, [getAllTodosData]);

    return (
        <todosContext.Provider value={{todos, allCount, activeCount, completedCount, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete}}>
            {children}
        </todosContext.Provider>
    );
}
export function useTodos() {
    const todosContextValue = useContext(todosContext)
    if (!todosContextValue) {
        throw new Error('UseTodos used outside of Provider')
    }
    return todosContextValue;
}

