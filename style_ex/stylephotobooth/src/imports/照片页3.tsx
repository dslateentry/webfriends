import imgImage17 from "figma:asset/aeeb52841d7ad4fc94c74c18e722924c7fe1fc34.png";
import imgImage18 from "figma:asset/8f322759e09ff9defa165e0234f78d7d36916468.png";

export default function Component() {
  return (
    <div className="relative size-full" data-name="照片页3">
      <div className="absolute h-[1404px] left-0 top-0 w-[2515.5px]" data-name="image 17">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage17} />
      </div>
      <div className="absolute h-[1404px] left-[386px] top-0 w-[1743px]" data-name="image 18">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage18} />
      </div>
    </div>
  );
}