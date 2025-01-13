import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

interface ModuleProps {
  modules: any[]; // Define the shape of your data if possible
}

const Modules: React.FC<ModuleProps> = ({ modules }) => {
  useEffect(() => {
    console.log("Modules prop has changed:", modules);
  }, [modules]); // This will trigger a log every time modules prop changes

  return (
    <div className="   xlg:w-[60%] w-[100%]  rounded-3xl  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 xl:grid-cols-2 3xl:grid-cols-3  place-items-center ">
        <div className="text-black w-[300px] h-full flex flex-col rounded-bl-[1rem] bg-gradient-to-br pb-[1.5rem] px-[1.5rem] from-[rgb(20,20,20)] to-[rgb(30,30,30)] border-[1px] border-[rgb(60,60,60)]">
          <div className="h-[6rem] mb-[0.75rem] w-full flex justify-center overflow-clip">
            <div className="h-[6rem] w-[6rem] bg-[rgb(60,60,60)] animate-pingcustom relative rounded-[50%] translate-x-[50%] -translate-y-[50%]"></div>
            <div className="h-[6rem] w-[6rem] bg-[rgb(60,60,60)] border-[3px] border-[rgb(30,30,30)] wiggle relative z-10 rounded-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
          </div>
          <div className="flex flex-col gap-2 items-center mb-[1.5rem]">
            <div className="w-[70%] rounded-r-2xl rounded-tl-none rounded-bl-2xl bg-[rgb(50,50,50)] py-[0.5rem] h-[2.125rem]"></div>
            <div className="text-center  text-white pl-[0.75rem] pr-[1.24rem] text-[0.875rem] flex flex-row rounded-r-2xl rounded-tl-none rounded-bl-2xl bg-[rgb(50,50,50)] py-[0.5rem]">
              <div className="h-[1.25rem] text-[rgb(40,40,40)] w-[1.25rem] animate-spin rounded-[50px] border-2 border-[white] border-r-[rgba(0,0,0,0.1)] mr-[0.875rem]"></div>
              {"Tell me about your idea.."}
            </div>
            <div className="w-[70%] rounded-r-2xl rounded-tl-none rounded-bl-2xl bg-[rgb(50,50,50)] py-[0.5rem] h-[2.125rem]"></div>
          </div>
          <div className="text-center text-[#bcbcbc] opacity-80 text-[0.875rem]">
            {
              "I'll use our conversation to find the relevant app features for you."
            }
          </div>
        </div>

        {/* Rendering modules if available */}
        {modules && modules.length > 0 ? (
          modules.map((module: any, index: any) => (
            <div
              key={index}
              className="text-white w-[300px] h-full transition-all duration-300 hover:shadow-[0_0_2rem_rgba(0,0,0,0.04)] hover:border-[rgb(100,100,100)] flex flex-col rounded-bl-[1rem] justify-between bg-[rgb(40,40,40)] border-[1px] border-[rgb(60,60,60)]"
            >
              <div className="flex flex-row pt-[1.5rem] justify-between items-start px-[1.5rem] pb-[1rem]">
                <div className="uppercase flex flex-col">
                  <div className="w-[3.25rem] h-[3.25rem] bg-[rgb(150,150,150)] rounded-[0.5rem]"></div>
                  <div className="mt-[1rem] flex flex-col">
                    <span className="uppercase text-[0.875rem]">
                      Build an app like
                    </span>
                    <span className="uppercase text-[1.25rem]">APP</span>
                  </div>
                </div>
                <div className="mt-[0.125rem]">
                  <Tooltip title="Add Base">
                    <button className="bg-[rgb(60,60,60)] hover:scale-105 hover:shadow-[5px_5px_0px_0px_rgba(100,100,100)] hover:translate-x-[-5px] hover:translate-y-[-5px] transition-all duration-300 rounded-[0.5rem] h-[3rem] w-[3rem] flex justify-center items-center">
                      <AddIcon className="text-white text-[1.85rem]" />
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col px-[1.5rem] gap-[0.25rem] mb-[2rem]">

                {module.plan.map((plan: any, index: any) => (
                  <span
                    key={index}
                    className="leading-7 text-white font-light justify-between flex  capitalize text-[1rem]"
                  >
                    <span>{String(plan)}</span>
                    <span className=" text-[0.7rem] text-[#bcbcbc]">
                      &#x20b9;
                    </span>
                  </span>
                ))}
                
              </div>
              <div className="bg-[rgb(60,60,60)] rounded-bl-[1rem] border-t-[1px] border-[rgb(40,40,40)] py-[2px] flex flex-row">
                <div className="p-[1rem] rounded-bl-[1rem] w-[calc(50%-1px)] flex flex-col">
                  <span className="uppercase text-[#bcbcbc] text-[0.625rem] font-medium">
                    features
                  </span>
                  <span className="font-bold text-[white] text-[1rem]">
                    {module.plan.length}
                  </span>
                </div>
                <div className="p-[1rem] w-[50%] flex border-l-[1px] border-[rgb(40,40,40)] flex-col">
                  <span className="font-light uppercase text-[#bcbcbc] text-[0.625rem]">
                    per platform
                  </span>
                  <span className="font-bold text-[1rem] text-[white] tracking-[-0.02em]">
                    &#x20b9;{module.total_price}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Modules;
