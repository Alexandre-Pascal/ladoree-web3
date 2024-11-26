'use client';
import React from 'react'

import { Component } from "../../components/Component";
import { Component2 } from "../../components/Component2";
import { VariantHoverTrueWrapper } from "../../components/VariantHoverTrueWrapper";
import { Component217 } from "../../icons/Component217";
import { Component218 } from "../../icons/Component218";
import { Component219 } from "../../icons/Component219";


const page = () => {
    return (
        <div className="flex flex-col w-[1920px] h-[7668px] items-start relative bg-white">
            <div className="relative self-stretch w-full h-[7670px] mb-[-2.00px]">
                <div className="flex flex-col w-[1920px] h-[7288px] items-center absolute top-[65px] left-0">
                    <div className="flex flex-col max-w-screen-2xl w-[1536px] items-center justify-center pl-[718.38px] pr-[718.39px] pt-20 pb-[31px] relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[28px] tracking-[0] leading-[42px] whitespace-nowrap">
                            Explore
                        </div>

                        <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#a0a0a0] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                            72,193 results
                        </div>
                    </div>

                    <div className="flex flex-col items-center pt-0 pb-px px-48 relative self-stretch w-full flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#dcdcdc]">
                        <div className="flex max-w-screen-2xl w-[1536px] items-start gap-8 pt-2 pb-0 px-6 relative flex-[0_0_auto] overflow-scroll">
                            <button className="all-[unset] box-border inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                                    Artworks
                                </div>

                                <div className="w-[60.11px] h-px border-b [border-bottom-style:solid] relative border-black" />
                            </button>

                            <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                                Series
                            </div>

                            <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                                Releases
                            </div>
                        </div>
                    </div>

                    <div className="relative max-w-screen-2xl w-[1536px] h-[7075px]">
                        <div className="flex flex-col w-[298px] items-start absolute top-[72px] left-6">
                            <div className="flex flex-col max-h-[900px] items-start gap-8 relative self-stretch w-full flex-[0_0_auto] overflow-scroll">
                                <div className="flex flex-col items-start pt-[9px] pb-2 px-0 self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] relative border-black">
                                    <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                                            TAGS
                                        </div>

                                    </div>

                                    {/* Les tags de recherche */}
                                    <div className="flex flex-col items-start px-0 py-6 relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative self-stretch w-full h-[172px]">
                                            <Component
                                                className="!absolute !left-0 !top-0"
                                                hover={false}
                                                text="3d"
                                                variant="three"
                                            />
                                            <Component
                                                className="!absolute !left-[49px] !top-0"
                                                hover={false}
                                                text="animation"
                                                variant="three"
                                            />
                                            <Component
                                                className="!absolute !left-[138px] !top-0"
                                                hover={false}
                                                text="surreal"
                                                variant="three"
                                            />
                                            <Component
                                                className="!absolute !left-[211px] !top-0"
                                                hover={false}
                                                text="abstract"
                                                variant="three"
                                            />
                                            <Component
                                                className="!absolute !left-0 !top-9"
                                                hover={false}
                                                text="art"
                                                variant="three"
                                            />
                                            <Component
                                                className="!absolute !left-[49px] !top-9"
                                                hover={false}
                                                text="illustration"
                                                variant="three"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start pt-[9px] pb-2 px-0 self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] relative border-black">
                                    <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                                            STATUS
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col items-start pt-[9px] pb-2 px-0 self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] relative border-black">
                                    <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                                            CURRENCY
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col items-start pt-[9px] pb-2 px-0 self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] relative border-black">
                                    <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                                            PRICE RANGE
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col items-start pt-[9px] pb-2 px-0 self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] relative border-black">
                                    <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                                            MEDIA
                                        </div>

                                    </div>
                                </div>

                                <div className="flex flex-col items-start pt-[9px] pb-2 px-0 self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] relative border-black">
                                    <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                                            ARTISTS
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Oeuvre d'art n°1 */}
                        <div className="absolute w-[1142px] h-[7003px] top-[72px] left-[370px] overflow-scroll">

                            <div className="absolute w-[349px] h-[575px] top-0 left-0">
                                <a
                                    className="flex w-[349px] items-center justify-center pt-[50.48px] pb-[50.49px] px-4 absolute top-0 left-0 bg-neutral-100 rounded overflow-hidden"
                                    href="https://superrare.com/artwork/eth/0x5d1e1e0fa6cbdd0ee0ad5729596c3c6239b89f2e/48"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <div className="h-[316.8px] bg-[url(https://c.animaapp.com/szwXUNN3/img/https-3a-2f-2fsuperrare-myfilebase-com-2fipfs-2fqmukpln2sqzq6fmd@2x.png)] relative flex-1 max-w-[348.8px] grow bg-cover bg-[50%_50%]" />
                                </a>

                                <div className="flex flex-col items-start justify-center gap-3 pt-4 pb-[17px] px-0 w-[349px] absolute top-[418px] left-0 border-b [border-bottom-style:solid] border-[#f0f0f0]">
                                    <VariantHoverTrueWrapper
                                        className="!flex-[0_0_auto]"
                                        hover={false}
                                        text="PALM SPRINGS ROMANTICS #47"
                                        variant="three" textClassName={undefined} href={""} />
                                    <div className="flex w-[174.39px] items-center gap-2 relative flex-[0_0_auto]">
                                        <a
                                            className="flex flex-col w-7 h-7 items-start justify-center relative rounded-full overflow-hidden"
                                            href="https://superrare.com/robnessv3#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <div className="relative flex-1 self-stretch max-w-7 w-full grow bg-[url(https://c.animaapp.com/szwXUNN3/img/-lu981ko-400x400-jpg@2x.png)] bg-cover bg-[50%_50%]" />
                                        </a>

                                        <a
                                            className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                                            href="https://superrare.com/robnessv3#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            robnessv3
                                        </a>
                                    </div>
                                </div>

                                <p className="absolute w-[84px] h-9 top-[525px] left-0 [font-family:'Inter',Helvetica] font-normal text-transparent text-xs tracking-[0.30px] leading-[18px]">
                                    <span className="text-[#a0a0a0] tracking-[0.04px]">
                                        List price
                                        <br />
                                    </span>

                                    <span className="text-black tracking-[0.04px]">
                                        0.100Ξ ($345)
                                    </span>
                                </p>
                            </div>

                            {/* Oeuvre d'art n°2 */}

                            <div className="h-[575px] top-0 left-[397px] absolute w-[349px]">
                                <a
                                    className="flex w-[349px] items-center justify-center pt-[50.48px] pb-[50.49px] px-4 absolute top-0 left-0 bg-neutral-100 rounded overflow-hidden"
                                    href="https://superrare.com/artwork/eth/0x5d1e1e0fa6cbdd0ee0ad5729596c3c6239b89f2e/47"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <div className="max-w-[348.8px] h-[316.8px] bg-[url(https://c.animaapp.com/szwXUNN3/img/https-3a-2f-2fsuperrare-myfilebase-com-2fipfs-2fqmqeqruqiyl8pd6u@2x.png)] relative flex-1 grow bg-cover bg-[50%_50%]" />
                                </a>

                                <div className="flex flex-col items-start justify-center gap-3 pt-4 pb-[17px] px-0 w-[349px] absolute top-[418px] left-0 border-b [border-bottom-style:solid] border-[#f0f0f0]">
                                    <VariantHoverTrueWrapper
                                        className="!flex-[0_0_auto]"
                                        hover={false}
                                        href="https://superrare.com/artwork/eth/0x5d1e1e0fa6cbdd0ee0ad5729596c3c6239b89f2e/47"
                                        text="PALM SPRINGS ROMANTICS #46"
                                        variant="three" textClassName={undefined} />
                                    <div className="flex w-[174.39px] items-center gap-2 relative flex-[0_0_auto]">
                                        <a
                                            className="flex flex-col w-7 h-7 items-start justify-center relative rounded-full overflow-hidden"
                                            href="https://superrare.com/robnessv3#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <div className="relative flex-1 self-stretch max-w-7 w-full grow bg-[url(https://c.animaapp.com/szwXUNN3/img/-lu981ko-400x400-jpg-1@2x.png)] bg-cover bg-[50%_50%]" />
                                        </a>

                                        <a
                                            className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                                            href="https://superrare.com/robnessv3#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            robnessv3
                                        </a>
                                    </div>
                                </div>

                                <p className="absolute w-[84px] h-9 top-[525px] left-0 [font-family:'Inter',Helvetica] font-normal text-transparent text-xs tracking-[0.30px] leading-[18px]">
                                    <span className="text-[#a0a0a0] tracking-[0.04px]">
                                        List price
                                        <br />
                                    </span>

                                    <span className="text-black tracking-[0.04px]">
                                        0.100Ξ ($345)
                                    </span>
                                </p>
                            </div>

                            <div className="h-[575px] top-0 left-[794px] absolute w-[349px]">
                                <a
                                    className="flex w-[349px] items-center justify-center pt-[50.48px] pb-[50.51px] px-4 absolute top-0 left-0 bg-neutral-100 rounded overflow-hidden"
                                    href="https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/49738"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <div className="max-w-[348.81px] h-[316.81px] bg-[url(https://c.animaapp.com/szwXUNN3/img/https-3a-2f-2fsuperrare-myfilebase-com-2fipfs-2fqmaomjv52mx3ahgv@2x.png)] relative flex-1 grow bg-cover bg-[50%_50%]" />
                                </a>

                                <div className="flex flex-col items-start justify-center gap-3 pt-4 pb-[17px] px-0 w-[349px] absolute top-[418px] left-0 border-b [border-bottom-style:solid] border-[#f0f0f0]">
                                    <VariantHoverTrueWrapper
                                        className="!flex-[0_0_auto]"
                                        hover={false}
                                        href="https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/49738"
                                        text="Fragments of Connection"
                                        variant="three" textClassName={undefined} />
                                    <div className="w-[174.41px] gap-2 relative flex-[0_0_auto] flex items-center">
                                        <a
                                            className="flex flex-col w-7 h-7 items-start justify-center relative rounded-full overflow-hidden"
                                            href="https://superrare.com/ryanseslow#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <div className="relative flex-1 self-stretch max-w-7 w-full grow bg-[url(https://c.animaapp.com/szwXUNN3/img/rms2022-jpg@2x.png)] bg-cover bg-[50%_50%]" />
                                        </a>

                                        <a
                                            className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                                            href="https://superrare.com/ryanseslow#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            ryanseslow
                                        </a>
                                    </div>
                                </div>

                                <p className="absolute w-24 h-9 top-[525px] left-0 [font-family:'Inter',Helvetica] font-normal text-transparent text-xs tracking-[0.30px] leading-[18px]">
                                    <span className="text-[#a0a0a0] tracking-[0.04px]">
                                        List price
                                        <br />
                                    </span>

                                    <span className="text-black tracking-[0.04px]">
                                        4.000Ξ ($13.8K)
                                    </span>
                                </p>
                            </div>

                            <div className="h-[575px] top-[623px] left-0 absolute w-[349px]">
                                <a
                                    className="flex w-[349px] items-center justify-center pt-[100.51px] pb-[100.53px] px-4 absolute top-0 left-0 bg-neutral-100 rounded overflow-hidden"
                                    href="https://superrare.com/artwork/eth/0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e/33"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <div className="h-[216.73px] bg-[url(https://c.animaapp.com/szwXUNN3/img/https-3a-2f-2farweave-net-2fpqpbrxbvwy3gyydy4ycd2ldcdmhhfzeazfxk@2x.png)] relative flex-1 max-w-[348.8px] grow bg-cover bg-[50%_50%]" />
                                </a>

                                <div className="h-[97px] w-[349px] absolute top-[418px] left-0 border-b [border-bottom-style:solid] border-[#f0f0f0]">
                                    <VariantHoverTrueWrapper
                                        className="!absolute !left-0 !top-4"
                                        hover={false}
                                        href="https://superrare.com/artwork/eth/0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e/33"
                                        text="Whispers of Nature&#39;s Tapestry"
                                        variant="three" textClassName={undefined} />
                                    <div className="w-[174px] gap-2 absolute top-[52px] left-0 flex items-center">
                                        <a
                                            className="flex flex-col w-7 h-7 items-start justify-center relative rounded-full overflow-hidden"
                                            href="https://superrare.com/botto#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <div className="relative flex-1 self-stretch max-w-7 w-full grow bg-[url(https://c.animaapp.com/szwXUNN3/img/botto-avatar-long-dark-jpg@2x.png)] bg-cover bg-[50%_50%]" />
                                        </a>

                                        <a
                                            className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                                            href="https://superrare.com/botto#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            botto
                                        </a>
                                    </div>

                                    <div className="w-[174px] gap-2 absolute top-[52px] left-[174px] flex items-center">
                                        <a
                                            className="flex flex-col w-7 h-7 items-start justify-center relative rounded-full overflow-hidden"
                                            href="https://superrare.com/ellllllbarto#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <div className="relative flex-1 self-stretch max-w-7 w-full grow bg-[url(https://c.animaapp.com/szwXUNN3/img/image@2x.png)] bg-cover bg-[50%_50%]" />
                                        </a>

                                        <a
                                            className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px] whitespace-nowrap"
                                            href="https://superrare.com/ellllllbarto#top"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            ellllllbarto
                                        </a>
                                    </div>
                                </div>

                                <p className="absolute w-[93px] h-9 top-[525px] left-0 [font-family:'Inter',Helvetica] font-normal text-transparent text-xs tracking-[0.30px] leading-[18px]">
                                    <span className="text-[#a0a0a0] tracking-[0.04px]">
                                        List price
                                        <br />
                                    </span>

                                    <span className="text-black tracking-[0.04px]">
                                        8.999Ξ ($31.1K)
                                    </span>
                                </p>

                                <p className="absolute w-[94px] h-9 top-[525px] left-[174px] [font-family:'Inter',Helvetica] font-normal text-transparent text-xs tracking-[0.30px] leading-[18px]">
                                    <span className="text-[#a0a0a0] tracking-[0.04px]">
                                        Last sale price
                                        <br />
                                    </span>

                                    <span className="text-black tracking-[0.04px]">
                                        4.465Ξ ($11.6K)
                                    </span>
                                </p>
                            </div>




                            <div className="flex flex-col max-w-[1920px] w-6 h-1.5 items-start absolute top-[6997px] left-[559px] overflow-hidden">
                                <div className="flex flex-col w-6 h-6 items-center justify-center relative mr-[-0.01px]">
                                    <Component2 variant="two" text={""} hover={false} className={undefined} />
                                </div>
                            </div>
                        </div>

                        <div className="absolute w-[1488px] h-[60px] top-0 left-6 bg-white">

                            <div className="absolute w-[67px] h-[18px] top-5 left-11 [font-family:'Inter',Helvetica] font-normal text-[#6b6b6b] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                                Showing All
                            </div>

                            <div className="inline-flex h-9 items-center gap-1.5 pl-1 pr-2.5 py-1 absolute top-3 left-[1384px] bg-neutral-100 rounded">
                                <div className="flex w-7 h-7 items-center justify-center px-[6.5px] py-1.5 relative rounded">
                                    <div className="absolute w-[26px] h-[26px] top-px left-px bg-white rounded border border-solid border-[#bdbdbd]" />

                                    <Component217 className="!relative !w-[15px] !h-4" />
                                </div>

                                <Component218 className="!relative !w-4 !h-4" />
                            </div>

                            <div className="w-8 h-8 justify-center px-[9px] py-[12.5px] absolute top-3.5 left-[1456px] rounded border border-solid border-[#dcdcdc] flex items-center">
                                <Component219 className="!relative !w-3.5 !h-[7px]" />
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            <div className="absolute w-px h-px top-0 left-0 overflow-hidden">
                <div className="h-2 bg-white" />
            </div>
        </div>
    )
}

export default page