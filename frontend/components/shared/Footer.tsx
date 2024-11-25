import React from 'react'
import { Component220 } from '../../icons/Component220'
import { Component222 } from '../../icons/Component222'
import { Component223 } from '../../icons/Component223'
import { Component224 } from '../../icons/Component224'
import { Component } from '../Component'
import { Component4 } from '../Component4'
import { Component6 } from '../Component6'
import { VariantHoverTrueWrapper } from '../VariantHoverTrueWrapper'



const Footer = () => {
    return (
        <footer className="flex flex-col w-[1920px] items-center pt-[49px] pb-24 px-48 absolute top-[7353px] left-0 bg-[#f0f0f0] border-t [border-top-style:solid] [border-right-style:none] [border-bottom-style:none] [border-left-style:none] border-neutral-950">
            <div className="relative max-w-screen-2xl w-[1536px] h-[172px]">
                <div className="flex flex-col max-w-[1920px] w-24 h-4 items-start absolute top-0 left-6">
                    <div className="flex flex-col w-24 h-4 items-center justify-center px-0 py-[0.44px] relative">
                        <Component220 className="!relative !w-24 !h-[15.12px]" />
                    </div>
                </div>

                <div className="flex flex-col w-[744px] items-start gap-3 absolute top-10 left-6">
                    <p className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        ARTWORKS &amp; NEWS TO YOUR INBOX
                    </p>

                    <div className="flex w-[496px] items-start p-[5px] relative flex-[0_0_auto] bg-white rounded border border-solid border-[#bdbdbd]">
                        <div className="flex flex-col items-start pl-2 pr-0 py-1.5 relative flex-1 self-stretch grow rounded overflow-hidden">
                            <input
                                className="relative self-stretch w-full border-[none] [background:none] mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-[normal] p-0"
                                placeholder="Email address..."
                                type="email"
                            />
                        </div>

                        <Component
                            className="!flex-[0_0_auto]"
                            hover={false}
                            text="SUBSCRIBE"
                            variant="one"
                        />
                    </div>
                </div>

                <Component4
                    className="!absolute !left-6 !top-[136px]"
                    hover={false}
                    href="https://docs.google.com/forms/d/e/1FAIpQLScTZhB9On31j-uoFzMD3hg0gGNf3hgjVyBz1xwCHsOBSydvPw/viewform"
                    href1="https://docs.google.com/forms/d/e/1FAIpQLScTZhB9On31j-uoFzMD3hg0gGNf3hgjVyBz1xwCHsOBSydvPw/viewform"
                    text="Submit Artist application"
                    variant="one"
                />
                <div className="absolute w-[77px] h-[18px] -top-px left-[768px] [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    COMMUNITY
                </div>

                <div className="flex flex-col w-[248px] items-start gap-2 absolute top-[34px] left-[768px]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a0a0a0] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        <a href="https://discord.gg/superrare">Discord</a>
                        <a href="https://www.instagram.com/superrare.co/">Instagram</a>
                        <a href="https://twitter.com/SuperRare">Twitter</a>
                    </div>
                </div>

                <div className="flex w-[248px] items-center gap-3 absolute top-[134px] left-[768px]">
                    <Component6
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://discord.gg/superrare"
                        icon={<Component222 className="!relative !w-5 !h-5" />}
                        variant="one" href1={""} />
                    <Component6
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://www.instagram.com/superrare.co/"
                        icon={<Component223 className="!relative !w-[15px] !h-[15px]" />}
                        variant="two" href1={""} />
                    <Component6
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href1="https://twitter.com/SuperRare"
                        variant="three" icon={<Component224 className="!relative !w-6 !h-[38px]" />} href={""} />
                    <Component6
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://www.youtube.com/channel/UCp9loE7UzFpFxtQHNK8TbKg"
                        icon={<Component224 className="!relative !w-6 !h-[38px]" />}
                        variant="four" href1={""} />
                    <Component6
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://www.reddit.com/r/SuperRare/"
                        variant="five"
                        href1={""}
                        icon={<Component224 className="!relative !w-5 !h-5" />} />
                </div>

                <div className="absolute w-[57px] h-[18px] -top-px left-[1016px] [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    RAREDAO
                </div>

                <div className="flex flex-col w-[248px] items-start gap-2 absolute top-[34px] left-[1016px]">
                    {/* <VariantHoverTrueWrapper
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://www.rare.xyz/"
                        text="Rare Protocol"
                        variant="one" textClassName={undefined} />
                    <VariantHoverTrueWrapper
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://app.rare.xyz/"
                        text="$RARE Curation Staking"
                        variant="one" textClassName={undefined} />
                    <VariantHoverTrueWrapper
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://forum.superrare.com/"
                        text="Forum"
                        variant="one" textClassName={undefined} /> */}
                </div>

                <div className="absolute w-[38px] h-[18px] -top-px left-[1264px] [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    LEGAL
                </div>

                <div className="flex flex-col w-[248px] items-start gap-2 absolute top-[34px] left-[1264px]">
                    {/* <VariantHoverTrueWrapper
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://campaigns.superrare.com/terms"
                        text="Terms of Service"
                        variant="one" textClassName={undefined} />
                    <VariantHoverTrueWrapper
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="https://campaigns.superrare.com/privacy"
                        text="Privacy Notice"
                        variant="one" textClassName={undefined} />
                    <VariantHoverTrueWrapper
                        className="!flex-[0_0_auto]"
                        hover={false}
                        href="mailto:ip@superrare.com"
                        text="Report content"
                        variant="one" textClassName={undefined} /> */}
                    <Component
                        className="!flex-[0_0_auto]"
                        hover={false}
                        text="Cookie Preferences"
                        variant="two"
                    />
                    <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#a0a0a0] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                        © 2024 SuperRare
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer