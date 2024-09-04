"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "@/animimations/animations";
import Link from "next/link";

export default function TransitionLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    const router = useRouter();

    const handleClick = () => {
        animatePageOut(href, router);
    };

    return (
        <button
            className="cursor-pointer"
            onClick={handleClick}
        >
            {label}
        </button>
    );
}