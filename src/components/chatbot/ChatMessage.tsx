import React from "react";
import { MessageType } from "./types";
import Image from "next/image";
interface ChatMessageProps {
  message: MessageType;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  // Split the message into words


  return (
    <div
      key={index}
      className={`mb-[8px] flex  flex-row py-[1rem] max-w-[90%] enter ${
        index === 0 ? "mt-auto" : ""
      } ${
        message.sender === "bot"
          ? " text-white mr-auto pr-[1rem] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl font-kodchasan"
          : "bg-[rgb(50,50,50)] px-[1rem] text-white ml-auto rounded-3xl font-kodchasan"
      }`}
    >
       
        <span
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
          }}
          className=" flex flex-row items-center    gap-5 "
        >
          <div className={`min-w-[40px] max-w-[20px] max-h-[40px] min-h-[40px] bg-[rgb(50,50,50)] rounded-[50%] ${
        message.sender === "bot"
          ? " flex items-center justify-center"
          : "hidden "
      }  `}>
         <Image src="/openai.png" alt='AI' className=' invert-[45%] h-[20px] w-[20px] '  width={20} height={20} />
          </div>
          {message.text}
        </span>

    </div>
  );
};

export default ChatMessage;
