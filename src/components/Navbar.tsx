'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <div className="flex column items-center p-2 border-b-4 border-gray-300 shadow-md justify-between">
            <div className="flex column items-center"><Image src="/T.jpeg" alt="task manager logo" width={70} height={70} className="rounded-xl" />
                <h1 className="text-2xl font-bold text-black-500 mx-2">Task Manager</h1>
            </div>
            <div className="flex gap-8 pr-[3%]">
                 <Link href="/">
                <p className="cursor-pointer text-lg hover:underline">Tasks</p>
                </Link>
                <Link href="/recipes">
                    <p className="cursor-pointer text-lg hover:underline">Recipes</p>
                </Link>
            </div>
        </div>
    )
}

export default NavBar