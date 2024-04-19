import Image from "next/image";
import React from "react";

export default function HomeTestimonials() {
  const testimonials = [
    {
      profile:
        "https://img.freepik.com/premium-photo/arabic-young-people_21730-5004.jpg?w=900",
      title: "Great Learning Experience",
      description:
        "I thoroughly enjoyed the Quran learning course. It provided a comprehensive understanding of the Quranic teachings and improved my recitation skills significantly.",
      writer: "John Doe",
      role: "Student",
    },
    {
      profile:
        "https://img.freepik.com/premium-photo/muslim-man-poses-greetings-green-background_1065782-14479.jpg?w=996",
      title: "Highly Recommend!",
      description:
        "I highly recommend the Quran learning course to anyone seeking to deepen their understanding of the Quran. The instructors are knowledgeable, and the course content is well-structured.",
      writer: "Jane Smith",
      role: "Student",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      title: "Life-changing Experience",
      description:
        "Completing the Quran learning course has been a life-changing experience for me. It has strengthened my faith and provided me with invaluable insights into the teachings of Islam.",
      writer: "Ahmed Khan",
      role: "Student",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      title: "Excellent Course Material",
      description:
        "The course material provided in the Quran learning course is excellent. It covers a wide range of topics and is presented in an engaging and informative manner.",
      writer: "Fatima Ali",
      role: "Student",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-6xl py-16 mx-auto px-5 lg:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Students Feedbacks
        </h2>

        <div className="mt-11 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8 hover:shadow-lg transition-all duration-150 cursor-pointer"
            >
              <h2 className="text-2xl font-bold pb-5">{item.title}</h2>
              <p className="leading-loose text-gray-500 dark:text-gray-300">
                “{item.description}”.
              </p>

              <div className="flex items-center mt-6">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src={item.profile}
                  alt=""
                />

                <div className="mx-4">
                  <h1 className="font-semibold text-blue-500">{item.writer}</h1>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
