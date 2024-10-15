
// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import React from "react";

// Replace with your Public API Key
builder.init("81994bd6a6634c5e899ff6a840c845a1");

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const model = "vercel";
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("vercel", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
       //urlPath: "/" + (props?.params?.page?.join("/") || ""),
        urlPath :"/" + (props.params.page ? props.params.page.join("/") : ""),

      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={model} />
    </>
  );
}
