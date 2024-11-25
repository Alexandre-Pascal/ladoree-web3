'use client';

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Component21 } from "../../icons/Component21";
import { Component223 } from "../../icons/Component223";
import { Component224 } from "../../icons/Component224";

interface Props {
    variant:
    | "sixteen"
    | "seventeen"
    | "ten"
    | "twelve"
    | "five"
    | "eight"
    | "four"
    | "eighteen"
    | "one"
    | "thirteen"
    | "twenty"
    | "three"
    | "nine"
    | "fourteen"
    | "seven"
    | "fifteen"
    | "two"
    | "nineteen"
    | "eleven"
    | "six";
}

export const Component2 = ({ variant }: Props): JSX.Element => {
    return (
        <>


            {["four", "seven", "six"].includes(variant) && (
                <img
                    className={`left-0 top-0 absolute ${variant === "six" ? "w-3.5" : (variant === "seven") ? "w-24" : "w-[15px]"} ${variant === "six" ? "h-[7px]" : (variant === "seven") ? "h-[15px]" : "h-4"}`}
                    alt="Variant"
                    src={
                        variant === "six"
                            ? "https://c.animaapp.com/szwXUNN3/img/variant-6.svg"
                            : variant === "seven"
                                ? "https://c.animaapp.com/szwXUNN3/img/variant-7.svg"
                                : "https://c.animaapp.com/szwXUNN3/img/variant-4.svg"
                    }
                />
            )}

            {["nine", "ten"].includes(variant) && (
                <Component21 className="!absolute !w-5 !h-5 !top-0 !left-0" />
            )}

            {["eleven", "twelve"].includes(variant) && (
                <Component223 className="!absolute !w-[15px] !h-[15px] !top-0 !left-0" />
            )}

            {["fourteen", "thirteen"].includes(variant) && (
                <Component224 className="!absolute !w-6 !h-[38px] !top-0 !left-0" />
            )}

        </>
    );
};
