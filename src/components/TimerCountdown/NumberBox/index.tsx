type numProp = {
  num: string | number;
  unit: string;
  flip: boolean;
};

export const NumberBox = ({ num, unit, flip }: numProp) => {
  return (
    <div className="flex flex-col items-center mt-4 px-2">
      <div className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-16 h-16  text-2xl md:text-4xl mt-4 ">
        <div className="rounded-t-lg rounded-b-lg bg-accent w-full h-full"></div>

        <div className="text-xl absolute text-primary z-10 font-bold font-redhat font-mono ">{num}</div>

        <div className=" rounded-b-lg rounded-t-lg bg-accent w-full h-full"></div>

        <div className={`absolute  w-full h-1/2 top-0  rounded-t-lg z-5 ${flip ? "animate-flip bg-secondary/20" : "bg-transparent"}`}></div>
        <div className="absolute -right-1 top-[25px] rounded-full w-[12px] h-[12px] bg-accent/80"></div>
        <div className="absolute -left-1 top-[25px] rounded-full w-[12px] h-[12px] bg-accent/80"></div>
      </div>
      <p className="text-base mt-3 font-semibold text-primary">{unit}</p>
    </div>
  );
};
