import React from "react";
import { Dialog } from "../../material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

interface ISupportSessionDialog {
  dialog: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function SupportSessionDialog({
  dialog,
}: ISupportSessionDialog) {
  return (
    <div>
      <Dialog
        size="xs"
        open={dialog.value}
        handler={dialog.toggle}
        className="rounded-3xl"
      >
        <div className="relative h-32 flex items-center justify-center">
          <h3 className="text-xl text-teal-500">
            No support session is ongoing now
          </h3>
          <div onClick={dialog.setFalse} className="cursor-pointer">
            <Icon
              icon="mingcute:close-line"
              className="absolute top-[-45px] text-4xl text-white right-[25px]"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
