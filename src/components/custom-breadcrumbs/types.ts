import React from "react";

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: string;
};

export interface BreadcrumbsProps {
  heading?: string;
  action?: React.ReactNode;
  activeLast?: boolean;
  links: BreadcrumbsLinkProps[];
}
