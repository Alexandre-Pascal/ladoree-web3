'use client';

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";

interface Props {
    text: string;
    variant: "one";
    hover: boolean;
    className: any;
    href: string;
    href1: string;
}

export const Component4 = ({
    text = "Submit Artist application",
    variant,
    hover,
    className,
    href,
    href1,
}: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        variant: variant || "one",

        hover: hover,
    });

    return (
        <a
            className={`h-[21px] relative ${!state.hover ? "w-[180px]" : "w-[184px]"} ${className}`}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            onMouseEnter={() => {
                dispatch("mouse_enter");
            }}
            onMouseLeave={() => {
                dispatch("mouse_leave");
            }}
        >
            <a
                className="[font-family:'Inter',Helvetica] w-[163px] left-0 tracking-[0] text-sm -top-px text-black h-[21px] font-normal leading-[21px] whitespace-nowrap absolute"
                href={href1}
                rel="noopener noreferrer"
                target="_blank"
            >
                {text}
            </a>


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
