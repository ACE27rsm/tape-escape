import type {
  ButtonProps as ChakraButtonProps,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import {
  AbsoluteCenter,
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  Span,
  Spinner,
} from "@chakra-ui/react";
import * as React from "react";

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (
      <ChakraButton
        className="!translate-z-96 !bg-[#8103ff] hover:!bg-pink-500 !text-white"
        disabled={loading || disabled}
        ref={ref}
        {...rest}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23FFF' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
        }}
      >
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          <div className="!text-2xl">{children}</div>
        )}
      </ChakraButton>
    );
  }
);

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  ChakraIconButtonProps
>(function IconButton(props, ref) {
  const { loading, disabled, loadingText, children, ...rest } = props;
  return (
    <ChakraIconButton
      className="!translate-z-96 !bg-[#8103ff] hover:!bg-pink-500 !text-white"
      disabled={loading || disabled}
      ref={ref}
      {...rest}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23FFF' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
      }}
      size="xs"
    >
      {children}
    </ChakraIconButton>
  );
});
