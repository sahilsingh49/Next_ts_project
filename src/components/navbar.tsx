'use client'
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import { useTodos } from "@/store/todos";

const Navbar = () => {
    const { allCount, activeCount, completedCount } = useTodos();

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get("todos");
    console.log('navbar ' +  todosFilter);

    return (
        <nav >
            <Link href="/" className={(todosFilter === null) ? "active" : ""}> All ({allCount}) </Link>
            <Link href="/?todos=active" className={todosFilter === "active" ? "active" : ""}> Active ({activeCount}) </Link>
            <Link href="/?todos=completed" className={todosFilter === "completed" ? "active" : ""}> Completed ({completedCount})</Link>
        </nav>
    );
};

export default Navbar;