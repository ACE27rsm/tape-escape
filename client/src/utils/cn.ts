import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type TCnProps = ClassValue[];

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cn;
