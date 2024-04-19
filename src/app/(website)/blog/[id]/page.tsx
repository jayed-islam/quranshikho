import BlogDetailView from "@/src/sections/blogs/view/blog-details-view";
import { FC } from "react";

export const metadata = {
  title: "Blog",
};

interface IBlogProps {
  params: {
    id: string;
  };
}

const BlogDetailsPage: FC<IBlogProps> = ({ params }) => {
  const { id } = params;
  return <BlogDetailView id={id as string} />;
};

export default BlogDetailsPage;
