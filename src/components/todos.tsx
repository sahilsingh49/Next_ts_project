"use client"
import {useTodos} from "@/store/todos";
import { useSearchParams } from "next/navigation";

/*const TodoList = () => {
    const {todos} = useTodos();


    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </div>
    );
};
    export default TodoList;*/


export  const Todos = () => {
    const {todos, toggleTodoAsCompleted, handleTodoDelete} = useTodos();

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos');
    console.log("params " + todosFilter);

    let filteredTodos = todos;

    if (todosFilter === "active") {
        filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (todosFilter === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
    }


    return (
        <ul className="main-task">
            {
                filteredTodos.map((todo) => {
                    return <li key={todo.id}>

                        <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => {
                            console.log(todo.completed)
                            toggleTodoAsCompleted(todo.id)}
                        } />

                        <label htmlFor={`todo-${todo.id}`}> {todo.task}</label>

                        {
                            todo.completed && (
                                <button type="button" onClick={() => handleTodoDelete(todo.id)}>
                                    Delete
                                </button>
                            )
                        }
                    </li>
                })
            }
        </ul>
    );
};