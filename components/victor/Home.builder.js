import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

const Text = dynamic(async () => {
  return (await import('./Home')).default
})

Builder.registerComponent(Text, {
  name: "Home",

  inputs: [

  ],
});