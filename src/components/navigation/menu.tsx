"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

type MenuLinksProps = {
    path: string;
    label: string;
}

const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/work", label: "Work" },
    { path: "/lab", label: "Lab" },
    { path: "/contact", label: "Contact" },
] as MenuLinksProps[];

export const Menu = () => {
    const container = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const tl = useRef(null) as any;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useGSAP(
        () => {
            gsap.set(".menu-link-item-holder", { y: 75 });

            tl.current = gsap.timeline({ paused: true })
                .to(".menu-overlay", {
                    duration: 1.25,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut",
                })
                .to(".menu-link-item-holder", {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                    delay: "-0.75",
                });
        },
        { scope: container }
    )

    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse()
        }
    }, [isMenuOpen])
    return (
        <div
            className="menu-container"
            ref={container}
        >
            <div className="fixed top-0 left-0 right-0 h-auto w-full bg-transparent">
                <div className="flex items-center p-5 px-4 justify-between w-full">
                    <div className="">LewMeta.</div>
                    <div className="flex gap-6">
                        {menuLinks.map((item, index) => (
                            <Link href={item.path} key={index} className="">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="cursor-pointer" onClick={toggleMenu}>
                        <p>Open</p>
                    </div>
                </div>
            </div>
            <div className="menu-overlay fixed top-0 left-0 h-screen w-full bottom-0 flex items-start justify-between p-[2em] bg-[#c5fb45]">
                <div className="menu-logo h-full relative">
                    <Link href={"/"}>Lewmeta</Link>
                    <div className="menu-overlay-bar">
                        <div className="menu-close  absolute bottom-0" onClick={toggleMenu}>
                            <div className="menu-close-icons">
                                <p>&#x2715;</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="menu-copys">
                        <div className="menu-links text-center">
                            {menuLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className="menu-link-item"
                                >
                                    <div
                                        onClick={toggleMenu}
                                        className="menu-link-item-holder"
                                    >
                                        <Link href={link.path}
                                            className="text-[65px] leading-[70px]"
                                        >
                                            {link.label}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="menu-open cursor-pointer" onClick={toggleMenu}>
                    <p>Close</p>
                </div>
            </div>
        </div>
    )
}
