import React, { useState } from "react";
import { Button } from "../../components/material-tailwind-component/material-tailwind";

export default function QuranRightSideBar() {
  const [selectedButton, setSelectedButton] = useState<number | null>(1);

  const handleButtonClick = (buttonId: number) => {
    setSelectedButton((prev) => (prev === buttonId ? null : buttonId));
  };

  return (
    <div className="p-5">
      <div className="border-2 border-teal-300 rounded-lg p-1 flex items-center gap-1">
        <Button
          fullWidth
          variant={selectedButton === 1 ? "filled" : "text"}
          className={`bg-teal-600 rounded-lg capitalize ${
            selectedButton === 1 ? "bg-teal-600" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Translation
        </Button>
        <Button
          fullWidth
          variant={selectedButton === 2 ? "filled" : "text"}
          className={`bg-teal-600 rounded-lg capitalize ${
            selectedButton === 2 ? "bg-teal-600" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick(2)}
        >
          Reading
        </Button>
      </div>
    </div>
  );
}
