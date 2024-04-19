import Image from "next/image";
import React from "react";
// import roja from '../../../public/assets/pillers/kalima.png'

export default function IslamPillars() {
  const pillers = [
    {
      image: "/assets/pillers/kalima.png",
      title: "Shahadah",
      meaning: "Faith",
    },
    {
      image: "/assets/pillers/salat.png",
      title: "Salah",
      meaning: "Prayer",
    },
    {
      image: "/assets/pillers/planning.png",
      title: "Sawm",
      meaning: "Fasting",
    },
    {
      image: "/assets/pillers/money.png",
      title: "Zakat",
      meaning: "Almsgiving",
    },
    {
      image: "/assets/pillers/kaaba.png",
      title: "Hajj",
      meaning: "Pilgrimage",
    },
  ];
  return (
    <section className="">
      <div className="py-10 md:py-20 mx-auto max-w-6xl px-7 md:px-0">
        <h1 className="text-2xl font-bold text-teal-700 text-center">
          About Essential
        </h1>
        <h1 className="max-w-4xl mx-auto text-3xl md:text-4xl lg:text-6xl font-bold text-white text-center mt-2">
          Pillars Of Islam
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center mt-16 gap-7">
          {pillers.map((item, index) => (
            <div
              key={index}
              className="flex items-center flex-col cursor-pointer group"
            >
              <div className=" h-40 w-40 rounded-full border-2 border-white bg-yellow-700 opacity-70 flex items-center justify-center">
                <Image
                  src={item.image}
                  height="80"
                  width="80"
                  alt="pillers"
                  className="text-white group-hover:scale-110 transition-transform "
                />
              </div>
              <h1 className="text-[25px] font-medium text-white mt-5">
                {item.title}
              </h1>
              <h1 className="text-lg text-yellow-400">({item.meaning})</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
