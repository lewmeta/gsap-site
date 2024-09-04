"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/animimations/animations";

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        animatePageIn();
    }, []);

    return (
        <div>
            <div
                id="transition-element"
                className="w-full h-screen bg-black z-100 fixed top-0 left-0"
            ></div>
            <div className="w-screen">
                {children}
            </div>
        </div>
    );
}