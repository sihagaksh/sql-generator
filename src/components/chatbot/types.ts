// types.ts
export interface MessageType {
  text?: string;
  sender: "bot" | "user";
  explanation?: string;
  raw_query?: string;
  results?: Array<Record<string, any>>;
  suggested_queries?: string[];
}
