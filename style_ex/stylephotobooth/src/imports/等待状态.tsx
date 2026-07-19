import imgY2K1 from "figma:asset/96abe2b49b01f3c787aaf1e9b017d6ba463ecde6.png";

export default function Component() {
  return (
    <div className="relative size-full" data-name="等待状态">
      <div className="absolute h-[1503.628px] left-0 top-0 w-[2694px]" data-name="Y2K照片展示_清新版 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgY2K1} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Orbitron:ExtraBold',sans-serif] font-extrabold leading-[78px] left-[586.5px] text-[54px] text-center text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white top-[729px] w-[749px] whitespace-pre-wrap">Photo will be delivered in a few seconds! : )</p>
      <p className="-translate-x-1/2 absolute font-['Orbitron:ExtraBold',sans-serif] font-extrabold leading-[78px] left-[1940.5px] text-[54px] text-center text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white top-[607px] w-[749px] whitespace-pre-wrap">Your Photo Strips!</p>
    </div>
  );
}