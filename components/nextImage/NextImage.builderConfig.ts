import type { Component } from '@builder.io/sdk';

export type IImageType = {
  id: string;
  source: string;
  alt?: string;
  width?: number;
  height?: number;
  exactSize?: boolean;
  imageAlignment?: 'left' | 'center' | 'right';
  link?: string;
  priority?: boolean;
  isModal?: boolean;
  thumbnail?: string;
  attributes?: {
    attributeName: string;
    attributeValue: string;
  }[];
  caption?: string;
  loading?: 'eager' | 'lazy' | undefined;
  isPriority?: boolean;
};

const ImageBuilderConfig = {
  name: 'Next Image',
  inputs: [
    { name: 'source', type: 'file', allowedFileTypes: ['webp', 'jpeg', 'png', 'jpg', 'svg', 'json'], required: true },
    {
      name: 'isModal',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'thumbnail',
      helperText: 'Optional, if the image is a modal. Used if the primary image is oversized, like an infographic',
      type: 'file',
      allowedFileTypes: ['webp', 'jpeg', 'png', 'jpg'],
      showIf: "options.get('isModal') === true",
    },
    { name: 'alt', type: 'text', helperText: 'For usage for screen-readers' },
    { name: 'caption', type: 'richText', helperText: 'For usage for screen-readers' },
    {
      name: 'isPriority',
      friendlyName: 'Is Priority Image?',
      type: 'boolean',
      defaultValue: false,
      helperText:
        'Prioritizes loading of images. Default is false and should be used sparingly. Typically, the largest image above the fold should be prioritized.',
    },
    { name: 'width', type: 'number', helperText: 'Please use the native width', defaultValue: 600 },
    { name: 'height', type: 'number', helperText: 'Please use the native height', defaultValue: 400 },
    {
      name: 'exactSize',
      type: 'boolean',
      defaultValue: false,
      helperText:
        'If false (default), image will fill the provided container. If true, image will follow width/height settings',
    },
    {
      name: 'imageAlignment',
      type: 'string',
      enum: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
      showIf: "options.get('exactSize') === true",
      helperText: 'Aligns the image if the width is less than the container width. Default is left-aligned.',
    },
    { name: 'link', type: 'url', helperText: 'Optional linked image' },
    {
      name: 'attributes',
      type: 'list',
      helperText: 'Optional Data attributes, used for tracking purposes.',
      subFields: [
        {
          name: 'attributeName',
          type: 'text',
          helperText: 'Data attribute name. Should be in the format "data-{attribute-name}".',
          required: true,
        },
        {
          name: 'attributeValue',
          type: 'text',
          helperText: 'Data attribute value.',
          required: true,
        },
      ],
    },
  ],
} as Component;

export default ImageBuilderConfig;
