/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";

interface Props {
    text: string;
    variant: "two" | "four" | "three" | "one";
    hover: boolean;
    className: any;
    textClassName: any;
    href: string;
}

export const VariantHoverTrueWrapper = ({
    text = "Help Center",
    variant,
    hover,
    className,
    textClassName,
    href,
}: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        variant: variant || "one",

        hover: hover,
    });

    return (
        <div
            className={`relative ${state.variant === "two" ? "w-10" : (state.variant === "four") ? "w-[349px]" : ""} ${["four", "two"].includes(state.variant) ? "flex" : "inline-flex"} ${["four", "one", "three"].includes(state.variant) ? "flex-col" : ""} ${state.variant === "two" ? "items-center" : "items-start"} ${state.variant === "two" ? "p-2" : (state.variant === "four") ? "pl-0 pr-[9.61px] py-0" : ""} ${state.variant === "two" ? "rounded" : ""} ${className}`}
            onMouseLeave={() => {
                dispatch("mouse_leave");
            }}
            onMouseEnter={() => {
                dispatch("mouse_enter");
            }}
        >
            <a
                className={`[font-family:'Inter',Helvetica] mt-[-1.00px] tracking-[0] text-black relative font-normal ${["one", "three", "two"].includes(state.variant) ? "w-fit" : ""} ${state.variant === "four" ? "self-stretch" : ""} ${["four", "three"].includes(state.variant) ? "text-base" : "text-xs"} ${state.variant === "two" ? "mr-[-58.25px]" : ""} ${state.hover ? "underline" : ""} ${["one", "three", "two"].includes(state.variant) ? "whitespace-nowrap" : ""} ${["four", "three"].includes(state.variant) ? "leading-6" : "leading-[18px]"} ${textClassName}`}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
            >
                {text}
            </a>
        </div>
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
