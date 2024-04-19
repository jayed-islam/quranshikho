import { ICourse } from "@/src/types/course";

export async function getAllCourses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/course`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  const coursesData: ICourse[] = data.data;
  return coursesData;
}
