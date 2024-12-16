"use client";
import {
  builder,
  Builder,
  BuilderComponent,
  Button,
  Section,
  withChildren,
} from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import ListWithOnChange from "./components/listWithOnChange/ListWithOnChange";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);


Builder.registerComponent(Counter, {
  name: "Counter",
  models: ["page"],
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});


Builder.registerComponent(ListWithOnChange, {
  name: "ListWithOnChange",

  inputs: [
    {
      name: "items",
      type: "list",
      friendlyName: "Tiles",
      required: true,
      subFields: [
        {
          name: "title",
          type: "string",
          required: true,
        },
        {
          name: "description",
          type: "string",
          required: true,
        },
        {
          name: "imageUrl",
          type: "file",
          //allowedFileTypes: IMAGE_FILE_TYPES,
          required: true,
        },
      ],
      defaultValue: [
        {
          title: "Tile 1",
          description: "Description 1",
          imageUrl:
            "https://cdn.builder.io/api/v1/image/assets%2F90293f7dc9704cb5935f357315020051%2F3e46fb8430fe462ab939ca10bbe34289",
        },
        {
          title: "Tile 2",
          description: "Description 2",
          imageUrl:
            "https://cdn.builder.io/api/v1/image/assets%2F90293f7dc9704cb5935f357315020051%2F3e46fb8430fe462ab939ca10bbe34289",
        },
        {
          title: "Tile 3",
          description: "Description 3",
          imageUrl:
            "https://cdn.builder.io/api/v1/image/assets%2F90293f7dc9704cb5935f357315020051%2F3e46fb8430fe462ab939ca10bbe34289",
        },
      ],
      // onChange: (options) => {
      //   if (options.get('items').length > 6) {
      //     options.set('items', options.get('items').slice(0, 6))
      //     alert('maximum items is 6, delete items to continue')
      //   }
      // }
      onChange: (options: Map<string, unknown>) => {
        const items = options.get("items");
        if (Array.isArray(items) && items.length > 4) {
          options.set("items", items.slice(0, 4));
          alert("You can add maximum 4 tiles");
        }
      },
    },
  ],
});