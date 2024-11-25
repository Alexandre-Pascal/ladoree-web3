/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";

interface Props {
    text: string;
    variant: "two" | "three" | "one";
    hover: boolean;
    className: any;
}

export const Component2 = ({
    text = "Subscribe",
    variant,
    hover,
    className,
}: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        variant: variant || "one",

        hover: hover,
    });

    return (
        <div
            className={`inline-flex items-center relative ${state.variant === "three" ? "border border-solid" : ""} ${state.variant === "three" ? "border-[#bdbdbd]" : ""} ${state.variant === "two" ? "flex-col" : ""} ${state.variant === "one" ? "px-6 py-[5.5px]" : (state.variant === "three") ? "px-[13px] py-[5px]" : ""} ${state.variant === "one" ? "h-8" : ""} ${["one", "three"].includes(state.variant) ? "rounded" : ""} ${["one", "three"].includes(state.variant) ? "justify-center" : ""} ${state.variant === "one" ? "bg-black" : ""} ${className}`}
            onMouseLeave={() => {
                dispatch("mouse_leave");
            }}
            onMouseEnter={() => {
                dispatch("mouse_enter");
            }}
        >
            <div
                className={`[font-family:'Inter',Helvetica] w-fit mt-[-1.00px] tracking-[0] relative font-normal text-center whitespace-nowrap ${state.variant === "one" ? "text-sm" : "text-xs"} ${state.variant === "one" && !state.hover ? "text-white" : (["three", "two"].includes(state.variant)) ? "text-black" : "text-[#a0a0a0]"} ${state.variant === "two" && state.hover ? "underline" : ""} ${state.variant === "one" ? "leading-[21px]" : "leading-[18px]"}`}
            >
                {text}
            </div>
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
