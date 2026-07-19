import svgPaths from "./svg-u0heu526vt";
import imgImage14 from "figma:asset/aeeb52841d7ad4fc94c74c18e722924c7fe1fc34.png";
import imgPolaroid from "figma:asset/178787e0daf962f3b75d7c4d1a7a7bae66c0f02e.png";
import imgPhotoGallery from "figma:asset/af76bb943100ea143a394555d051d9ec40afea59.png";

function Heading() {
  return (
    <div className="absolute h-[60px] left-0 top-0 w-[672px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Figma_Hand:Bold',sans-serif] leading-[60px] left-[336.02px] not-italic text-[#364153] text-[60px] text-center top-0 tracking-[1.5px]">Take a Photo</p>
    </div>
  );
}

function Paragraph() {
  return <div className="absolute h-[24px] left-[64px] top-[220px] w-[536px]" data-name="Paragraph" />;
}

function Button() {
  return (
    <div className="absolute bg-[#1e2939] h-[48px] left-0 rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-0 w-[238px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Kalam',sans-serif] font-bold leading-[28px] left-[118.5px] text-[24px] text-center text-white top-[10px] tracking-[1px]">{` Start ! `}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[48px] relative shrink-0 w-[238px]">
      <Button />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[51px] items-center left-[114px] top-[54px] w-[436px]">
      <div className="h-[115px] relative shrink-0 w-[165px]" data-name="Polaroid">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPolaroid} />
      </div>
      <p className="font-['Figma_Hand:Bold',sans-serif] leading-[36px] min-w-full not-italic relative shrink-0 text-[30px] text-center text-white w-[min-content] whitespace-pre-wrap">Count 3, 2 ,1 and smile!</p>
      <Frame />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute border-4 border-solid border-white h-[410px] left-[0.25px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[128px] w-[672px]" data-name="Container" style={{ backgroundImage: "linear-gradient(121.72deg, rgba(191, 176, 251, 0.6) 17.288%, rgba(251, 172, 212, 0.6) 108.23%)" }}>
      <Paragraph />
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute h-[538px] left-[474.25px] top-[417px] w-[672.25px]">
      <Heading />
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[60px] left-0 top-0 w-[672px]" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Figma_Hand:Bold',sans-serif] leading-[60px] left-[336.52px] not-italic text-[#364153] text-[60px] text-center top-0 tracking-[1.5px]">Upload Your Photo</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Figma_Hand:Bold',sans-serif] leading-[36px] left-[268.09px] not-italic text-[30px] text-center text-white top-0">{`Drag & Drop Your Photo`}</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[20px] top-[6.5px]" data-name="Icon">
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

function Frame3() {
  return (
    <div className="absolute h-[28px] left-[46px] top-[10px] w-[131px]">
      <Icon />
      <p className="-translate-x-1/2 absolute font-['Kalam',sans-serif] font-bold leading-[28px] left-[80.5px] text-[24px] text-center text-white top-0 tracking-[1px]">Choose File</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1e2939] h-[48px] relative rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[238px]" data-name="Button">
      <Frame3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[51px] items-center left-[65px] top-[50px] w-[536px]">
      <div className="h-[118px] relative shrink-0 w-[141px]" data-name="Photo gallery">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPhotoGallery} />
      </div>
      <Paragraph1 />
      <Button1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute border-4 border-solid border-white h-[410px] left-[0.25px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[128px] w-[672px]" data-name="Container" style={{ backgroundImage: "linear-gradient(120.657deg, rgba(154, 223, 248, 0.7) 0%, rgba(192, 176, 247, 0.7) 105.89%)" }}>
      <Frame2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[538px] left-[1369.25px] top-[417px] w-[672.25px]">
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
      <Frame4 />
      <Frame5 />
    </div>
  );
}