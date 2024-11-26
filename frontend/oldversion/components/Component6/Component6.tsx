'use client';


/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";
import { Component21 } from "../../icons/Component21";

interface Props {
    variant: "two" | "three" | "four" | "one" | "five" | "six";
    hover: boolean;
    className: any;
    icon: JSX.Element;
    href: string;
    href1: string;
}

export const Component6 = ({
    variant,
    hover,
    className,
    icon = <Component21 className="!relative !w-5 !h-5" />,
    href,
    href1,
}: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        variant: variant || "one",

        hover: hover,
    });

    return (
        <a
            className={`inline-flex flex-col items-start relative ${state.hover ? "opacity-60" : ""} ${className}`}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            onMouseLeave={() => {
                dispatch("mouse_leave");
            }}
            onMouseEnter={() => {
                dispatch("mouse_enter");
            }}
        >
            {["six", "three"].includes(state.variant) && (
                <span
                    className={`[font-family:'Inter',Helvetica] w-fit mt-[-1.00px] tracking-[0] relative font-normal whitespace-nowrap ${state.variant === "six" ? "text-base" : "text-sm"} ${state.variant === "six" ? "text-black" : "text-[#6b6b6b]"} ${state.variant === "six" ? "leading-6" : "leading-[21px]"}`}
                >
                    {state.variant === "three" && <>𝕏</>}

                    {state.variant === "six" && <>𝙊𝙍𝘿𝙄𝙉𝘼𝙇𝙎 𝙏𝘼𝙃𝘼𝙃𝘼𝙆𝙀𝙊𝙑𝙀𝙍</>}
                </span>
            )}

            {["five", "four", "one", "two"].includes(state.variant) && <>{icon}</>}
        </a>
    );
};

function reducer(state: any, action: any) {
    switch (action) {
        case "mouse_enter":
            return {
                ...state,
                hover: true,
            };

        case "mouse_leave":
            return {
                ...state,
                hover: false,
            };
    }

    return state;
}
