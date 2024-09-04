"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TransitionLink from "../transitionLink"

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

    const container = useRef<HTMLDivElement | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const tl = useRef<gsap.core.Timeline | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
    );

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const showAnim = gsap.from(`.menu-overlays`, {
            yPercent: -100,
            paused: true,
            duration: 0.2,
        }).progress(1);

        ScrollTrigger.create({
            start: 'top top',
            end: 'max',
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse();
            },
        });
    }, []);

    useEffect(() => {
        if (tl.current) {
            if (isMenuOpen) {
                tl.current.play();
            } else {
                tl.current.reverse();
            }
        }
    }, [isMenuOpen]);

    return (
        <div
            className="menu-container"
            ref={container}
        >
            <div className="fixed top-0 left-0 right-0 h-auto w-full bg-transparent menu-overlays">
                <div className="flex items-center p-5 px-4 justify-between w-full">
                    <div className="font-bold text-lg">Lewis.</div>
                    <div className="flex gap-6">
                        {menuLinks.map((item, index) => (
                            <TransitionLink href={item.path} label={item.label} key={index} />
                        ))}
                    </div>
                    <div className="cursor-pointer flex flex-col gap-2" onClick={toggleMenu}>
                        <div className="!w-[20px] h-[1.5px] bg-black" />
                        <div className="!w-[20px] h-[1.5px] bg-black" />
                        <div className="!w-[20px] h-[1.5px] bg-black" />
                    </div>
                </div>
            </div>
            <div className="menu-overlay fixed top-0 left-0 h-screen w-full bottom-0 flex items-start justify-between p-[2em] bg-[#c5fb45]">
                <div className="menu-logo h-full relative">
                    <Link href={"/"} onClick={toggleMenu}>Lewis.</Link>
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
                                        <TransitionLink href={link.path} label={link.label} key={index} />
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
