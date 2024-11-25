import React from 'react'
import { Component226 } from '../../icons/Component226'
import { Component } from '../Component'
import { VariantHoverTrueWrapper } from '../VariantHoverTrueWrapper'

const Header = () => {
    return (
        <header className="flex flex-col w-[1920px] items-center pt-0 pb-px px-48 absolute top-0 left-0 bg-white [border-top-style:none] [border-right-style:none] border-b [border-bottom-style:solid] [border-left-style:none] border-neutral-950">
            <div className="relative max-w-screen-2xl w-[1536px] h-16">
                <div className="flex flex-col max-w-[1920px] w-32 h-[18px] items-start absolute top-[23px] left-6">
                    <div className="flex flex-col w-32 h-[18px] items-center justify-center px-[6.85px] py-0 relative">
                        <Component226 className="!relative !w-[114.3px] !h-[18px]" />
                    </div>
                </div>

                <div className="absolute w-64 h-8 top-4 left-[436px] rounded">
                    <div className="flex w-64 items-start justify-center pl-[33px] pr-[17px] pt-2 pb-[9px] absolute top-0 left-0 rounded overflow-hidden border border-solid border-[#bdbdbd]">
                        <div className="flex flex-col items-start relative flex-1 grow">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a0a0a0] text-xs tracking-[0] leading-[normal]">
                                SEARCH SUPERRARE
                            </div>
                        </div>
                    </div>

                </div>

                <div className="absolute w-[536px] h-10 top-3 left-[976px]">
                    {/* <VariantHoverTrueWrapper
                        className="!absolute !left-0 !top-[3px]"
                        hover={false}
                        text="ART"
                        textClassName="!mr-[-0.25px]"
                        variant="two" href={""} />
                    <VariantHoverTrueWrapper
                        className="!absolute !left-14 !w-[46px] !top-[3px]"
                        hover={false}
                        href="https://superrare.com/feed"
                        text="FEED"
                        textClassName="!mr-[-0.83px]"
                        variant="two"
                    />
                    <VariantHoverTrueWrapper
                        className="!absolute !left-[118px] !w-[76px] !top-[3px]"
                        hover={false}
                        href="https://superrare.com/explore/releases"
                        text="RELEASES"
                        textClassName="!mr-[-0.17px]"
                        variant="two"
                    /> */}

                    <Component
                        className="!h-10 !px-6 !py-[9.5px] !absolute !left-[419px] !top-0"
                        hover={false}
                        text="CONNECT"
                        variant="one"
                    />
                    <div className="inline-flex items-start justify-between p-2 absolute top-[3px] left-[210px]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                            CURATION
                        </div>

                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header