"use client";
import React, { useState } from "react";
import { TextField } from "@mui/material"; // Adjust according to your imports
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Adjust according to your imports
import { PlaceholdersAndVanishInput } from "@/components/ui/vanishinput";
interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const placeholders = [
    "Refine your idea"
    
  ];
 
  return (
    <>
      <div className=" relative    w-[100%] text-black  gap-4  flex justify-between  items-center  ">

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
        
      />
        {/* <TextField
          label="Refine your idea"
          InputLabelProps={{ shrink: true }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxRows={10}
          multiline
          margin="normal"
          variant="outlined"
          color="primary"
          className=" bg-[rgba(100,100,100)]   w-[100%] relative -translate-y-1 "
          sx={{
            borderRadius: "15px",

            "& .MuiInputBase-root": {
              borderRadius: "15px",
              pr: "60px",
              maxHeight: `${input ? "" : "56px"}`,
            },
            "& .MuiInputBase-input": {
              pr: "5px",
            },
            "& .MuiFormLabel-root": {},
          }}
        />
        <button
          onClick={handleSubmit}
          className=" absolute right-3 enter bg-[rgba(120,120,120)] p-1 bottom-5 rounded-[50%]  "
        >
          <ArrowUpwardIcon className="    text-white  text-[2rem] " />
        </button> */}
      </div>
    </>
  );
};

export default ChatInput;
