import Link from "next/link";
import { BreadcrumbsProps } from "./types";
import { paths } from "@/src/layouts/paths";

export default function CustomBreadcrumbs({
  heading,
  links,
  action,
  activeLast,
}: BreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {heading && (
            <h4 className="text-2xl font-semibold text-black">{heading}</h4>
          )}
          {!!links.length && (
            <div className="flex items-center py-4 overflow-x-auto flex-wrap">
              {links.map((link, index) => (
                <span key={link.name || ""}>
                  <Link
                    href={link.href ?? ""}
                    className={`text-gray-600 hover:underline  ${
                      link.name === lastLink &&
                      "pointer-events-none text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {lastLink !== link.name && (
                    <span className="mx-5 text-gray-500">/</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
