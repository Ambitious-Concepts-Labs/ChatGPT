interface Validation {
  type: "positive" | "negative";
  message: string;
}

interface RankResponse {
  score: number;
  validations: Array<ProcessedValidation>;
}

interface Rank {
  score: number;
  message?: string;
  type?: "positive" | "negative";
}

interface AnalysisResult {
  score: number;
  comparative: number;
  calculation: Array<{
    [token: string]: number;
  }>;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
}
interface PostData {
  post: string;
  note: string;
  prompt: string;
  input: string;
  originalPost: string;
  sentiment: AnalysisResult;
  postMedia: boolean;
}

export enum Role {
  user = "user",
  admin = "admin",
}
declare module "next-auth" {
  interface User {
    role?: Role;
    subscribed: boolean;
    id: string
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}