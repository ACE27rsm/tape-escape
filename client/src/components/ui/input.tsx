import React, { ReactNode } from "react";
import cn, { TCnProps } from "../../utils/cn";

export interface IInputProps extends React.ComponentProps<"input"> {
  classeNames?: {
    base?: TCnProps;
    inputWrapper?: TCnProps;
    input?: TCnProps;
    label?: TCnProps;
  };
  InputProps?: React.ComponentProps<"input">;
  label?: string;
  endContent?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const Input = (props: IInputProps) => {
  return (
    <div
      className={cn([
        "flex flex-col",
        // "!border-4 !border-pink-500 !rounded-md !translate-z-96",
        props.classeNames?.base,
      ])}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='15' stroke-dasharray='8%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
      }}
    >
      <div
        className={cn([
          "!text-[1rem] !text-[#8103ff] !p-1 !px-3",
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
            "!text-[1.5rem] h-8 outline-0 w-full",
            props.classeNames?.input,
          ])}
          value={props.value}
          onChange={props.onChange}
        />
        {props.endContent}
      </div>
    </div>
  );
};
