import React from 'react';
import AddTodo from "@/components/add-todo";
import {Todos} from "@/components/todos";
import Navbar from "@/components/navbar";
//import TodoList from "@/components/todos";
import "./globals.css"
import { RiTodoLine } from "react-icons/ri";

const Page = () => {
    return (
        <main>
              <h2> <RiTodoLine className="icons"/> TODO LIST <RiTodoLine className="icons"/> </h2>
            <Navbar />
            <AddTodo />
            <Todos/>
          </main>

    );
};

export default Page;