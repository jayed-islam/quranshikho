import CustomBreadcrumbs from "@/src/components/custom-breadcrumbs/custom-breadcrumbs";
import { paths } from "@/src/layouts/paths";
import React from "react";
import { FoundationCreateForm } from "../foundation-form-for-create";

export default function FoundationCreateView() {
  return (
    <div className="max-w-6xl px-5 md:px-0 mx-auto py-9">
      <CustomBreadcrumbs
        heading=" Create Foundation Item"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          {
            name: "Foundations",
            href: paths.dashboard.foundation.list,
          },
          {
            name: "Create",
          },
        ]}
      />
      <div className="mt-11">
        <FoundationCreateForm />
      </div>
    </div>
  );
}
