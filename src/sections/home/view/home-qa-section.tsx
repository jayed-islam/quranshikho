"use client";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "../../../components/material-tailwind-component/material-tailwind";

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

const quranLearningCourseQA = [
  {
    question: "What topics does our Quran learning course cover?",
    answer:
      "Our Quran learning course covers a wide range of topics, including Tajweed (rules of Quranic recitation), Tafsir (exegesis of the Quranic verses), memorization techniques, Islamic ethics, and the application of Quranic teachings in daily life.",
  },
  {
    question: "How is the course structured?",
    answer:
      "The course is structured into modules that progressively build upon each other. Each module focuses on a specific aspect of Quranic studies, with interactive lessons, recitation practice sessions, memorization drills, and quizzes to reinforce learning.",
  },
  {
    question: "Who are the instructors for the Quran learning course?",
    answer:
      "Our Quran learning course is taught by experienced and qualified instructors who are knowledgeable in Quranic studies, Islamic sciences, and education methodologies. They are dedicated to providing personalized guidance and support to each student.",
  },
  {
    question: "What resources are provided for students?",
    answer:
      "Students enrolled in our Quran learning course have access to a variety of resources, including textbooks, audio recordings of Quranic recitations, online lectures, interactive learning platforms, and one-on-one tutoring sessions with instructors.",
  },
  {
    question: "How long does the Quran learning course last?",
    answer:
      "The duration of our Quran learning course varies depending on the program chosen. We offer flexible scheduling options, including full-time and part-time courses, with durations ranging from a few months to several years.",
  },
  {
    question: "Is this course suitable for beginners?",
    answer:
      "Yes, our Quran learning course is designed to cater to students of all levels, including beginners. We provide comprehensive instruction and support to help beginners develop a strong foundation in Quranic studies.",
  },
  {
    question: "Do I need to have prior knowledge of Arabic?",
    answer:
      "No prior knowledge of Arabic is required to enroll in our Quran learning course. We offer courses that accommodate students with varying levels of proficiency in the Arabic language, and our instructors provide guidance in understanding the Quranic text.",
  },
  {
    question: "What are the benefits of learning Tajweed?",
    answer:
      "Learning Tajweed, the proper pronunciation and recitation of the Quran, is essential for every Muslim. It enhances one's spiritual connection with the Quran, improves understanding of its meanings, and fulfills the obligation of reciting the Quran correctly as commanded by Allah.",
  },
  {
    question: "Are there opportunities for group study and interaction?",
    answer:
      "Yes, we encourage collaborative learning and provide opportunities for group study and interaction among students. Group discussions, peer feedback sessions, and collaborative projects are integral parts of our Quran learning course.",
  },
  {
    question: "How do I track my progress in the course?",
    answer:
      "We offer regular assessments, progress reports, and feedback sessions to help students track their progress in the Quran learning course. Our instructors provide individualized feedback and guidance to help students achieve their learning goals.",
  },
  {
    question: "Is there a certificate awarded upon completion of the course?",
    answer:
      "Yes, upon successful completion of the Quran learning course, students receive a certificate of achievement or a diploma, depending on the program completed. This certificate serves as recognition of the student's dedication and proficiency in Quranic studies.",
  },
  {
    question: "What support services are available for students?",
    answer:
      "We provide comprehensive support services to assist students throughout their Quran learning journey. This includes academic counseling, technical support, access to additional resources, and assistance with any challenges or concerns that may arise.",
  },
  {
    question: "Can I customize my learning experience?",
    answer:
      "Yes, we offer flexible learning options and personalized learning plans to accommodate the unique needs and preferences of each student. Whether you prefer self-paced learning, one-on-one tutoring, or group study sessions, we strive to tailor the learning experience to suit your requirements.",
  },
  {
    question: "How can I enroll in the Quran learning course?",
    answer:
      "To enroll in our Quran learning course, simply visit our website or contact our admissions office. Our staff will guide you through the enrollment process, provide information about course options, and assist you in selecting the program that best fits your goals and schedule.",
  },
  {
    question: "What sets our Quran learning course apart from others?",
    answer:
      "Our Quran learning course stands out for its comprehensive curriculum, experienced instructors, personalized approach to learning, flexible scheduling options, and commitment to excellence. We prioritize student success and strive to provide a rewarding and enriching learning experience for all participants.",
  },
];

const HomeQaSection = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto py-16 px-5 xl:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center pb-11">
          Learner General Questions
        </h2>
        <div>
          {quranLearningCourseQA.map((item, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
              animate={CUSTOM_ANIMATION}
              className="mb-3 rounded-lg border border-blue-gray-100 px-4 shadow-sm bg-white"
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="border-none"
              >
                {item.question}
              </AccordionHeader>
              <AccordionBody>
                <h2 className="text-lg">{item.answer}</h2>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeQaSection;
