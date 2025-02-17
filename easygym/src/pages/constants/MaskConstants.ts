import { Dispatch, SetStateAction } from "react";

const regexPatterns: Record<string, RegExp> = {
   emailPattern :/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
   cpfPattern :/^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
   phonePattern : /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
   datePattern : /^\d{4}-\d{2}-\d{2}$/
};

type ValidateInputType = (
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  setValidity: Dispatch<SetStateAction<boolean>>,
  pattern: RegExp
) => void;


export { regexPatterns };
export type { ValidateInputType };

