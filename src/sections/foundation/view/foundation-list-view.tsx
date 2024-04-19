"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IIslamicLectureItem } from "@/src/types/feature";
import { paths } from "@/src/layouts/paths";
import IslamicLectureItemCard from "@/src/layouts/common/islamic-lecture-item-card";
import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { Button } from "../../../components/material-tailwind-component/material-tailwind";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

export const FoundationListView = () => {
  return (
    <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
      <CustomBreadcrumbs
        heading="Foundation List"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          {
            name: "Foundatios",
          },
        ]}
        action={
          <Link href={paths.dashboard.foundation.create}>
            <Button className="bg-teal-600 capitalize flex items-center gap-2">
              <Icon icon="ri:add-fill" className="text-xl" />
              New Item
            </Button>
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-7"></div>
    </div>
  );
};
