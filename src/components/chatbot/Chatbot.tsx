"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Image from "next/image";

interface MessageType {
  text?: string;
  sender: "bot" | "user";
  explanation?: string;
  raw_query?: string;
  results?: Array<Record<string, any>>;
  suggested_queries?: string[];
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);

  const greetings = [
    "Welcome to our SQL query generator! Ready to turn your text into SQL?",
    "Hello! Let's transform your query into a perfect SQL statement. What would you like to generate?",
    "Hi there! I can help you craft SQL queries from your text. Just let me know your request.",
    "Greetings! Need help converting your query into a structured SQL command?",
    "Welcome! Feel free to ask for any SQL query generation based on your text input.",
  ];

  // Show a random greeting message when the component mounts
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      const randomGreeting =
        greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{ text: randomGreeting, sender: "bot" }]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (text: string) => {
    const userMessage: MessageType = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://web-production-44b1.up.railway.app/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: text }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (!data || Object.keys(data).length === 0) {
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, I didn't get a valid response.", sender: "bot" },
        ]);
        return;
      }

      // Prepare all messages in a batch
      const newMessages: MessageType[] = [];

      if (data.explanation) {
        newMessages.push({
          text: `Explanation:\n${data.explanation}`,
          sender: "bot",
        });
      }

      if (data.raw_query) {
        newMessages.push({
          text: `Raw Query:\n${data.raw_query}`,
          sender: "bot",
        });
      }

      if (Array.isArray(data.results) && data.results.length > 0) {
        const formattedResults = data.results
          .map(
            (item: Record<string, any>, index: number) =>
              `${index + 1}. ${Object.keys(item)[0]}: ${Object.values(item)[0]}`
          )
          .join("\n");

        newMessages.push({ text: `Results:\n${formattedResults}`, sender: "bot" });
      }

      if (
        Array.isArray(data.suggested_queries) &&
        data.suggested_queries.length > 0
      ) {
        newMessages.push({
          text: `**Suggested Queries:**\n${data.suggested_queries.join("\n")}`,
          sender: "bot",
        });
      }

      // Update state once with all new messages
      setMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "There was an error processing your request.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [onBottom, setOnBottom] = useState(true);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setOnBottom(true);
    }
  }, [messages]);

  // Handle manual scroll to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setOnBottom(true);
    }
  };

  // Handle scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        const isBottom = scrollTop + clientHeight >= scrollHeight - 130;
        setOnBottom(isBottom);
      }
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
    setTimeout(scrollToBottom, 1000);
  };

  return (
    <div className="flex w-full xlg:flex-row flex-col items-center xlg:items-start sm:p-5 gap-10 lg:gap-2 xl:gap-10">
      <div className="flex bg-[rgb(30,30,30)] rounded-3xl px-4 flex-col items-center w-full md:w-[80%] xlg:w-[40%] min-w-[330px] overflow-x-clip relative pb-16">
        <div className="relative sm:px-5 w-full">
          <div
            ref={chatContainerRef}
            className={`text-black w-full ${
              expanded ? "min-h-[70vh] max-h-[70vh]" : "min-h-[35vh] max-h-[35vh]"
            } flex flex-col transition-all duration-300 gap-2 py-8 px-3 overflow-y-auto chatbox`}
          >
            {messages.map((msg, index) => (
              <ChatMessage key={`${msg.sender}-${index}`} message={msg} index={index} />
            ))}
            {loading && (
              <span className="flex flex-row items-center gap-5">
                <div className="min-w-[40px] flex items-center justify-center max-w-[40px] max-h-[40px] min-h-[40px] bg-[rgb(50,50,50)] rounded-[50%]">
                  <Image
                    src="/openai.png"
                    alt="AI"
                    className="invert h-[20px] w-[20px]"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="text-white flex font-black flex-row gap-1">
                  <span className="animate-bounce delay-0">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </span>
            )}
          </div>
          {!onBottom && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-2 p-2 text-[0.5rem] rounded-full right-7 bg-gray-300 hover:bg-gray-400 transition"
            >
              <ArrowDownwardIcon />
            </button>
          )}
        </div>
        <ChatInput onSend={handleSend} />
        <button onClick={toggleExpand} className="absolute bottom-4 text-[rgb(100,100,100)]">
          {expanded ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
