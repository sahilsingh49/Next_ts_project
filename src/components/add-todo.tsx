"use client"

import {FormEvent, useState} from "react";
import {useTodos} from "@/store/todos";


const AddTodo = () => {
    const [todo, setTodo] = useState("")

    const {handleAddTodo} = useTodos();
    const handleFormSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(todo);
        handleAddTodo(todo);
        setTodo("")
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text"  placeholder="Write your todo"
                   name="" value={todo} onChange={(event) => setTodo(event.target.value)} />
            <button type="submit"> ADD </button>
        </form>
    );
};

export default AddTodo;