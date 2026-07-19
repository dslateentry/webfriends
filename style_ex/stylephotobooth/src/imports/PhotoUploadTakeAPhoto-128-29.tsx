import svgPaths from "./svg-uc8f8u125z";
import imgImage14 from "figma:asset/aeeb52841d7ad4fc94c74c18e722924c7fe1fc34.png";
import imgImage20 from "figma:asset/106f0980e625c30478108966255d76cdb8bb472b.png";
import imgImage21 from "figma:asset/fc155c8d3c1ddcd0a30a25aa2a22d81fc9381c69.png";

function Heading() {
  return (
    <div className="absolute h-[60px] left-[474.25px] top-[417px] w-[672px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Orbitron:Bold',sans-serif] font-bold leading-[60px] left-[336.02px] text-[#364153] text-[60px] text-center top-0 tracking-[1.5px]">Take a Photo</p>
    </div>
  );
}

function Paragraph() {
  return <div className="absolute h-[24px] left-[64px] top-[220px] w-[536px]" data-name="Paragraph" />;
}

function Button() {
  return (
    <div className="absolute bg-[#1e2939] h-[48px] left-0 rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-0 w-[238px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Orbitron:Bold',sans-serif] font-bold leading-[28px] left-[119px] text-[20px] text-center text-white top-[10px] tracking-[1px]">{` Start ! `}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[48px] left-[213px] top-[349px] w-[238px]">
      <Button />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute border-4 border-solid border-white h-[471px] left-[475px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[545px] w-[672px]" data-name="Container" style={{ backgroundImage: "linear-gradient(118.282deg, rgba(191, 176, 251, 0.6) 17.288%, rgba(251, 172, 212, 0.6) 108.23%)" }}>
      <Paragraph />
      <div className="absolute left-[259.5px] size-[145px] top-[66px]" data-name="image 20">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage20} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Orbitron:Bold',sans-serif] font-bold leading-[36px] left-[332px] text-[30px] text-center text-white top-[244px] w-[436px] whitespace-pre-wrap">Count 3, 2 ,1 and smile!</p>
      <Frame />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[60px] left-0 top-0 w-[672px]" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Orbitron:Bold',sans-serif] font-bold leading-[60px] left-[336.52px] text-[#364153] text-[60px] text-center top-0 tracking-[1.5px]">Upload Your Photo</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3053b100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p320a7e80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 2.5V12.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[35.41px] top-[10px]">
      <Icon />
      <p className="font-['Orbitron:Bold',sans-serif] font-bold leading-[28px] relative shrink-0 text-[20px] text-center text-white tracking-[1px]">Choose File</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#1e2939] h-[48px] left-[212.59px] rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[349px] w-[238px]" data-name="Button">
      <Frame2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute border-4 border-solid border-white h-[471px] left-px rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[128px] w-[672px]" data-name="Container" style={{ backgroundImage: "linear-gradient(117.293deg, rgba(154, 223, 248, 0.7) 0%, rgba(192, 176, 247, 0.7) 105.89%)" }}>
      <div className="absolute left-[251.59px] size-[160px] top-[61px]" data-name="image 21">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Orbitron:Bold',sans-serif] font-bold leading-[36px] left-[331.75px] text-[30px] text-center text-white top-[244px] w-[405px] whitespace-pre-wrap">{`Drag & Drop Your Photo`}</p>
      <Button1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[599px] left-[1369px] top-[417px] w-[673px]">
      <Heading1 />
      <Container1 />
    </div>
  );
}

export default function PhotoUploadTakeAPhoto() {
  return (
    <div className="relative size-full" data-name="Photo Upload & Take a Photo">
      <div className="absolute h-[1390px] left-[0.25px] top-0 w-[2515px]" data-name="image 14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[101.07%] left-[-0.01%] max-w-none top-[-0.03%] w-[100.02%]" src={imgImage14} />
        </div>
      </div>
      <Heading />
      <Container />
      <Frame1 />
    </div>
  );
}