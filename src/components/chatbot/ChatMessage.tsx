import React from "react";
import { MessageType } from "./types";
import Image from "next/image";

interface ChatMessageProps {
  message: MessageType;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  return (
    <div
      key={index}
      className={`mb-[8px] flex flex-row py-[1rem] max-w-[90%] ${
        index === 0 ? "mt-auto" : ""
      } ${
        message.sender === "bot"
          ? "text-white mr-auto pr-[1rem] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl font-kodchasan"
          : "bg-[rgb(50,50,50)] px-[1rem] text-white ml-auto rounded-3xl font-kodchasan"
      }`}
    >
      <span
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap",
        }}
        className="flex flex-row items-start gap-5"
      >
        {/* Bot Avatar */}
        {message.sender === "bot" && (
          <div className="min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] bg-[rgb(50,50,50)] rounded-full flex items-center justify-center">
            <Image
              src="/openai.png"
              alt="AI"
              className="invert h-[20px] w-[20px]"
              width={20}
              height={20}
            />
          </div>
        )}

        {/* Message Content */}
        <div>
          {/* Text Message */}
          {message.text && <p>{message.text}</p>}

          {/* Explanation */}
          {message.explanation && (
            <div className="mt-2">
              <strong>Explanation:</strong>
              <p>{message.explanation}</p>
            </div>
          )}

          {/* Raw Query */}
          {message.raw_query && (
            <div className="mt-2">
              <strong>Raw Query:</strong>
              <pre className="bg-gray-800 p-2 rounded-md text-white">
                {message.raw_query}
              </pre>
            </div>
          )}

          {/* Results */}
          {message.results && message.results.length > 0 && (
            <div className="mt-2">
              <strong>Results:</strong>
              <ul className="list-disc pl-5">
                {message.results.map((result, idx) => (
                  <li key={idx}>
                    {Object.entries(result).map(([key, value]) => (
                      <span key={key}>
                        {key}: {value}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Queries */}
          {/* {message.suggested_queries && message.suggested_queries.length > 0 && (
            <div className="mt-2">
              <strong>Suggested Queries:</strong>
              <ul className="list-disc pl-5">
                {message.suggested_queries.map((query, idx) => (
                  <li key={idx}>{query}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </span>
    </div>
  );
};

export default ChatMessage;
