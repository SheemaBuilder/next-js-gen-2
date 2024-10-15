"use client";

import Link from "next/link";
import getLocalizedValue from "@/lib/getLocalizedValue";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import ModelSelector from "@/components/ModelSelector/ModelSelector";
import camelCaseToWords from "@/lib/camelCaseToWords";
import { Fragment, useState } from "react";
import CapacityIndicator from "../CapacityIndicator/CapacityIndicator";
import getStaticLocalizedValue from "@/lib/getStaticLocalizedValue";

interface ModelResult {
  model?: {
    value: Model;
  };
  data?: Model;
}

export interface Model {
  name: string;
  capacity: string;
  images: {
    image: string;
  }[];
  referenceNumber: string;
  specs: {
    weight?: string;
    dimensions?: string;
    capacity: {
      min: number;
      max: number;
    };
    energySource?: string;
    placement?: string;
    color?: string;
    additional?: {
      [key: string]: string;
    };
  };
}

function Spec({ name, value }: { name: string; value: any }) {
  let content: any = value;
  if (name === "capacity") {
    content = (
      <div className="flex items-center space-x-2">
        <CapacityIndicator max={(value as Model["specs"]["capacity"]).max} />
        <span>
          {value.min}/{value.max}{" "}
          {getStaticLocalizedValue({
            Default: "chickens",
            "en-GB": "chickens",
            "fr-FR": "poulets",
          })}
        </span>
      </div>
    );
  }
  if (name === "additional") {
    return (
      <>
        {Object.entries(getLocalizedValue(value)).map(([key, value]) => (
          <Spec key={key} name={key} value={value} />
        ))}
      </>
    );
  }
  return (
    <div className="flex space-x-2 pt-2">
      <div className="min-w-[223px]">
        <span className="text-primary text-xl font-black uppercase">
          {camelCaseToWords(name)} :
        </span>
      </div>
      <div>
        <span className="text-primary text-xl">
          {getLocalizedValue(content)}
        </span>
      </div>
    </div>
  );
}

export default function ProductDetails({
  productFamily,
  models: modelResults,
  children,
}: {
  productFamily: {
    value: {
      data: {
        title: string;
        description: string;
      };
    };
  };
  models: ModelResult[];
  children?: React.ReactNode;
}) {
  const models: Model[] = modelResults.map(
    (model: any) => model.model?.value?.data || model.data
  );

  const [currentModel, setCurrentModel] = useState<Model | null>(
    models ? models[0] : null
  );

  if (!currentModel) return;

  return (
    <>
      <section className="pt-7 pb-12">
        <div className="container">
          <Link
            href="/products"
            className="text-primary uppercase font-medium tracking-widest text-sm flex items-center space-x-1 [&_.hover]:hover:text-tertiary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              viewBox="0 0 6 6">
              <path
                id="Polygon_15"
                d="M3,0,6,6H0Z"
                transform="translate(0 6) rotate(-90)"
                fill="#20304d"
              />
            </svg>
            <span>
              <span className="hover">Products</span> /{" "}
              <span className="font-black">
                {getLocalizedValue(productFamily.value.data.title)}
              </span>
            </span>
          </Link>
        </div>
      </section>
      <section className="pb-12">
        <div className="container overflow-hidden">
          <div className="flex -mx-10 [&>*]:px-10">
            <div className="w-[55%]">
              {currentModel.images?.length > 0 && (
                <ProductSlider
                  images={currentModel.images.map((img) => img.image)}
                />
              )}

              <ModelSelector
                models={models}
                currentModel={currentModel}
                setCurrentModel={setCurrentModel}
              />
            </div>
            <div className="w-[45%]">
              <h1
                className=" border-[3px] pt-6 pb-5 px-7 text-primary border-secondary text-[50px] font-bold relative mb-7
               after:h-[3px] after:w-1/4 after:absolute after:bottom-[14px] after:left-7 after:-translate-x-full after:bg-tertiary">
                {getLocalizedValue(productFamily.value.data.title)}
              </h1>
              <p className="text-[22px] text-almost-black -tracking-[.01em] leading-[1.9] mb-2">
                {getLocalizedValue(productFamily.value.data.description)}
              </p>
              <div className="px-2">
                <Spec
                  name="Style"
                  value={
                    getLocalizedValue(productFamily.value.data.title) +
                    " " +
                    getLocalizedValue(currentModel.referenceNumber)
                  }
                />
                {[
                  "weight",
                  "dimensions",
                  "capacity",
                  "energySource",
                  "placement",
                  "color",
                  "additional",
                ].map((key) => (
                  <Fragment key={`${currentModel.referenceNumber}-${key}`}>
                    {getLocalizedValue(
                      currentModel.specs[key as keyof Model["specs"]]
                    ) && (
                      <Spec
                        name={key}
                        value={currentModel.specs[key as keyof Model["specs"]]}
                      />
                    )}
                  </Fragment>
                ))}
              </div>
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
