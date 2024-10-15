import { Builder, withChildren } from "@builder.io/react";
import {
  Accordion,
  AddToBag,
  Anchor,
  Animation,
  BeforeAfter,
  Box,
  Button,
  Carousel,
  CloseButton,
  FreeShipping,
  Icon,
  JobListings,
  Locations,
  Map,
  Modal,
  ProductGrid,
  ProductHeader,
  ProductReviews,
  Quote,
  Scrollbox,
  Section,
  Spacer,
  StarRating,
  Text,
} from "@/builder";
import { BuilderComponent } from "@/types";
import { SegmentEvent } from "./getSegmentEvents";
import { LocationModel } from "./getLocations";
import { ProductModel } from "./getProducts";
import { getSiteUrl } from "./getSiteUrl";

const components: BuilderComponent[] = [
  Accordion,
  AddToBag,
  Anchor,
  Animation,
  BeforeAfter,
  Box,
  Button,
  Carousel,
  CloseButton,
  FreeShipping,
  Icon,
  JobListings,
  Locations,
  Map,
  Modal,
  ProductGrid,
  ProductHeader,
  ProductReviews,
  Quote,
  Scrollbox,
  Section,
  Spacer,
  StarRating,
  Text,
];

type RegisterBuilderComponentProps = {
  segmentEvents: SegmentEvent[];
  locations: LocationModel[];
  products: ProductModel[];
  host: string;
};

export const registerBuilderComponents = async ({
  segmentEvents,
  locations,
  products,
  host,
}: RegisterBuilderComponentProps) => {
  components.forEach((component) => {
    const { canHaveChildren, hasSegmentEvent, name, image, ...options } =
      component.config;
    const inputs = [...(options.inputs || [])];
    if (hasSegmentEvent) {
      inputs.push({
        name: "segmentEvent",
        type: "string",
        enum: [
          {
            label: "",
            value: "",
          },
          ...(segmentEvents || []).map(({ name, description }) => ({
            label: name,
            value: name,
            helperText: description,
          })),
        ],
      });
    }

    if (name === "Map" || name === "Locations") {
      inputs.push({
        name: "locations",
        type: "list",
        helperText: "Leave empty to show all locations",
        subFields: [
          {
            name: "location",
            type: "string",
            required: true,
            enum: (locations || [])
              .sort((a, b) => (b.title < a.title ? 1 : -1))
              .map(({ id, title }) => ({
                label: title,
                value: `${title} - ${id}`,
              })),
          },
        ],
      });
    }

    const productInput = {
      name: "product",
      type: "string",
      required: true,
      enum: (products || [])
        .sort((a, b) => (b.title < a.title ? 1 : -1))
        .map(({ id, title }) => ({
          label: title,
          value: `${title} - ${id}`,
        })),
    };
    if (name === "ProductGrid") {
      inputs.push({
        name: "products",
        type: "list",
        helperText: "Leave empty to show all products",
        subFields: [productInput],
      });
    }

    if (name === "ProductHeader" || name === "ProductReviews") {
      inputs.unshift(productInput);
    }

    Builder.registerComponent(
      canHaveChildren ? withChildren(component) : component,
      {
        ...options,
        name,
        image: !!image ? getSiteUrl(host) + image : undefined,
        inputs,
      }
    );
  });
};
