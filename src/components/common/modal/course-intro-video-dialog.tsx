import React from "react";
import { Dialog } from "../../material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

interface ICourseIntroVideoDialog {
  dialog: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
  videoId: string;
}

export default function CourseIntroVideoDialog({
  dialog,
  videoId,
}: ICourseIntroVideoDialog) {
  return (
    <div>
      <Dialog
        size="lg"
        open={dialog.value}
        handler={dialog.toggle}
        className="rounded-3xl"
      >
        <div className="relative">
          <iframe
            width="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="rounded-3xl h-56 lg:h-[600px]"
          ></iframe>
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
