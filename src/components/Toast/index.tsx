import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import "./style.css";

type Props = {
  message: string;
};

const ToastDemo = ({ message }: Props) => {
  const [open, setOpen] = React.useState(!!message);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="mb-0 ToastTitle">{message}</Toast.Title>
        <Toast.Description asChild>{message}</Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Close Toast">
          <button className="p-1 text-xs text-center text-red-800 align-middle bg-red-200 rounded-md aspect-square">
            close
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default ToastDemo;
