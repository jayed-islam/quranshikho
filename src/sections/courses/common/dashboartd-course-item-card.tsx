import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "../../../components/material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { ICourse } from "@/src/types/course";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/src/layouts/paths";

interface ICourseItemProps {
  course: ICourse;
}

export default function CourseItemCard({ course }: ICourseItemProps) {
  return (
    <div>
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none relative"
        >
          <Image
            src={course.banner}
            className="h-48 object-cover bg-gray-300 w-full"
            height={1500}
            width={1500}
            alt=""
          />
          <div className="flex items-center gap-3 px-3 pb-3 absolute right-3 top-3">
            <Link href={`${paths.dashboard.course.root}/${course._id}/edit`}>
              <IconButton
                size="sm"
                color="white"
                className="rounded-full "
                variant="outlined"
              >
                <Icon
                  icon="solar:clapperboard-edit-line-duotone"
                  className="text-xl flex items-center justify-center"
                />
              </IconButton>
            </Link>
            <IconButton
              size="sm"
              color="white"
              className="rounded-full"
              variant="outlined"
            >
              <Icon
                icon="ic:round-view-in-ar"
                className="text-xl flex items-center justify-center"
              />
            </IconButton>
            <Link href={`${paths.dashboard.course.root}/${course._id}/class`}>
              <Tooltip content="Add Class in the course" placement="bottom">
                <IconButton
                  size="sm"
                  color="white"
                  className="rounded-full"
                  variant="outlined"
                >
                  <Icon
                    icon="carbon:add-alt"
                    className="text-xl flex items-center justify-center"
                  />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </CardHeader>
        <CardBody className="p-3 h-32">
          <h2
            className="text-md font-semibold line-clamp-2 overflow-hidden overflow-ellipsis"
            color="blue-gray"
          >
            {course.title}
          </h2>
          <h2 className="mt-2 font-normal text-base line-clamp-2 overflow-hidden overflow-ellipsis ">
            {course.description}
          </h2>
        </CardBody>
      </Card>
    </div>
  );
}
