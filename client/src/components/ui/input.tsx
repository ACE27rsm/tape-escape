import React, { ReactNode } from "react";
import cn, { TCnProps } from "../../utils/cn";

export interface IInputProps {
  classeNames?: {
    base?: TCnProps;
    inputWrapper?: TCnProps;
    input?: TCnProps;
    label?: TCnProps;
  };
  InputProps?: React.ComponentProps<"input">;
  label?: string;
  endContent?: ReactNode;
}

const input = (props: IInputProps) => {
  return (
    <div
      className={cn([
        "flex flex-col",
        "!border-4 !border-[#ff00ea] !rounded-md",
        props.classeNames?.base,
      ])}
    >
      <div
        className={cn([
          "!text-[1rem] !text-[#ff00ea] !p-1 !px-3",
          props.classeNames?.label,
        ])}
      >
        {props.label}
      </div>
      <div
        className={cn([
          "flex gap-2 items-center",
          "!p-1 !px-3",
          props.classeNames?.inputWrapper,
        ])}
      >
        <input
          {...props.InputProps}
          className={cn([
            "!text-[1.5rem] h-8 outline-0",
            props.classeNames?.input,
          ])}
        />
        {props.endContent}
      </div>
    </div>
  );
};

export default input;
