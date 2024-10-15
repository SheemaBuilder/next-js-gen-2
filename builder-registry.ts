"use client";
import { builder, Builder, BuilderComponent, Button, Section, withChildren } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
//import ProductSelect from "./components/ProductSelect/ProductSelect";
import { HeroWithBuilderChildren } from "./components/HeroWithBuilderChildren/HeroWithBuilderChildren";
import MyCustomComponent from './components/myComp/MyComp';
import NumberSelect from "./components/numberSelect/numberSelect";
import Tabs  from "./components/Tabs/Tabs";
import { numbers } from './components/numberSelect/numbers';
import ProductSelect from './components/ProductSelect/ProductSelect'
import { products } from "./components/ProductSelect/products";
import ProductApi from "./components/productFromAPI/productAPI";
import dynamic from "next/dynamic";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Carousel } from "./components/carousel/Carousel";
//import ColoredBox from "./components/enumColor/ColoredBoxProps";
import { FeaturedIngredients } from "./components/featured-ingredients/featured-ingredients";
//import { VerticalSpacer } from "./components/verticalspacer/verticalSpacer";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
/*
Builder.registerComponent(FeaturedIngredients,{
name:'Featured Ingredients'
}
);*/
// Builder.registerComponent(VerticalSpacer, {
// 	name: 'VerticalSpacer',
// 	noWrap: true,
// 	inputs: [
// 		{
// 			name: 'size',
// 			type: 'string',
// 			required: true,
// 			enum: ['unset', 'sm', 'md', 'lg', 'xl'],
// 			defaultValue: 'sm',
// 		}
// 	],
// });


Builder.registerComponent(withChildren(ProductSelect), {
  name: 'ProductSelect',
  inputs: [
    {
      name: 'productItem',
      type: 'text',
      //enum: products.map((product) => product.name),
      //defaultValue: products.slice(0, 3).map((product) => product.name),
    },
  ],
});

/*
Builder.registerComponent(ColoredBox,{
  name: 'Color',
  inputs:[
    {
      name: 'Color',
      type:'enum',
      enum: [
        {color}
      ]
  }

  ]
}

)
*/
Builder.registerComponent(ProductApi, {
  name: 'ProductApi',
  inputs: [
    {
      name: 'ProductApi',
      type: 'enum',
      enum: [], // This can remain as an empty array if you don't need static products
      defaultValue: [],
    },
  ],
});
Builder.registerComponent(NumberSelect, 
  {
    name: 'NumberSelect',
    
        inputs: [
          {
            name: 'numberList',
            type: 'enum',
            enum: numbers,
            defaultValue: [],
          },
        ],
  }
);

Builder.registerComponent(ProductSelect, 
  {
    name: 'ProductSelect',
    
        inputs: [
          {
            name: 'Products',
            type: 'enum',
            enum: products,
            defaultValue: [],
          },
        ],
  }
);


Builder.registerComponent(MyCustomComponent, {
  name: 'MyCustomComponent',
  inputs: [
    {
      name: 'bool',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'test1',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'test2',
      type: 'boolean',
      defaultValue: true,
    }

  ],
});


Builder.registerComponent(
  
  Counter, {
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  });

  Builder.registerComponent(HeroWithBuilderChildren, {
    name: 'Hero',
    noWrap: true,
    // Adding defaults is important for easy usability
    defaultChildren: [
      { 
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Text', options: { text: 'I am child text block!' } }
      }
    ]
  });

// Register the component and its inputs
/*
Builder.registerComponent(HeroWithBuilderChildren, {
  name: 'Hero',
  inputs: [
    // Input for section A editable region
    {
      name: 'sectionA',
      type: 'uiBlocks', // Specify type of blocks
      //hideFromUI: false,
      helperText: 'This is an editable region.',
      defaultValue: [
        {
          '@type': '@builder.io/sdk:Element',
            component: {
              name: 'Text',
              options: {
                text: 'Section A Editable in Builder...',
            },
          },
          responsiveStyles: {
            large: {
              // Styles for the editable section
            },
          },
        },
      ],
    },
    // Input for section B editable region
    {
      name: 'sectionB',
      type: 'uiBlocks',
      hideFromUI: true,
      helperText: 'This is an editable region.',
      defaultValue: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: 'Section B Editable in Builder...',
            },
          },
          responsiveStyles: {
            large: {
              // Styles for the editable section
            },
          },
        },
      ],
    },
  ],
});
*/

/*
  Builder.registerComponent(
    ProductSelect, {
    name: 'ProductSelect',
    inputs: [
      {
        name: "productItem",
        type: "enum",
        enum: products.map((product) => product.name), // Assume products is an array of objects
        defaultValue: products.slice(0, 3).map((product) => product.name), // Default to first 3 products' names
      },
    ] 
  })
    */
  
/*
Builder.register("editor.settings", {
  styleStrictMode: true, // optional
  allowOverridingTokens: true,

  designTokensOptional: true,
  designTokens: {
    colors: [
      { name: "Brand Red", value: "var(--red, #ff0000)" },
      { name: "Brand Blue", value: "rgba(93, 150, 255, 1)" },
    ],
    colors: [
      { name: "Brand Red", value: "var(--red, purple)" },
      { name: "Green", value: "green" },
      { name: "Orange", value: "orange" },
      ],
    spacing: [
      { name: "Large", value: "var(--space-large, 20px)" },
      { name: "Small", value: "var(--space-small, 10px)" },
      { name: "Tiny", value: "5px" },
    ],
    fontFamily: [
      { name: 'Serif Font', value: 'var(--serif-font, Times, serif)' },
     { name: 'Primary Font', value: 'Roboto, sans-serif' },
      
     //{ name: 'Primary', value: 'GT America, Helvetica Neue, sans-serif' },

     //{ name: 'Secondary', value: 'var(--font-secondary)' },

     // { name: 'Monospace', value: 'var(--font-monospace)' },

    ],
    fontSize: [
      { name: "Extra Large", value: "var(--fontSizeXL)" },
      { name: "Large", value: "var(–fontSizeL)" },
      { name: "Medium", value: "var(–fontSizeM)" },
      { name: "Small", value: "var(–fontSizeS)" },
      { name: "Very Small", value: "var(–fontSizeXS)" }
      ]
  },
  //hideTokenValues: true
});

*/




Builder.registerComponent(Tabs, {
  name: 'Tabs',
  inputs: [
    {
      name: 'tabs',
      type: 'list',
      subFields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'New tab',
        },
        {
          name: 'content',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
      defaultValue: [
        {
          label: 'Tab 1',
          content: [],
        },
      ],
    },
  ],
});
/*
const Text = dynamic(async () => { return (await import('./Home')).default})

Builder.registerComponent(Text, {
  name: "Home",

  inputs: [

  ],
});*/
/*
Builder.registerComponent(withChildren(ProductDetails),{
  name: "ProductDetails",
  inputs:[
    {
      name: "productFamily",
      type: "reference",
      model: "product-family",
      required: true
    },
    {
      name: "models",
      type: "list",
      required: true,
      subFields:[
       { 
        name: "model",
      type: "reference",
      model: "product",
    }
      ]
    },
  ]
}

)*/
