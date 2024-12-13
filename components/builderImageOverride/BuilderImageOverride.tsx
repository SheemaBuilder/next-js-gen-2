import React from 'react';

import { Builder } from '@builder.io/react';

import { NextChakraImage } from '@chtbks/steak-n-eggs';

const DEFAULT_ASPECT_RATIO = 0.7041;

type Props = {
  image: string;
  backgroundSize?: 'cover' | 'contain';
  backgroundPosition?: 'center' | 'top' | 'left' | 'right' | 'bottom' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
  altText?: string;
  height?: number;
  width?: number;
  prefetch?: boolean;
  aspectRatio?: number;
};

export const BuilderImageOverride = ({
  image,
  backgroundSize,
  backgroundPosition,
  altText,
  height,
  width,
  prefetch = false,
  aspectRatio = DEFAULT_ASPECT_RATIO,
}: Props
) => {
  const shouldFill = !width || !height || backgroundSize === 'cover';
  if (!image) return null;

  return (
    <NextChakraImage
      src={image}
      alt={altText}
      width={width}
      height={height}
      priority={prefetch}
      fill={shouldFill}
      quality={99}
      aspectRatio={aspectRatio}
      objectFit={backgroundSize}
      objectPosition={backgroundPosition}
    />
  );
};

BuilderImageOverride.registrationName = 'Image';
BuilderImageOverride.registerComponent = () => {
  Builder.registerComponent(BuilderImageOverride, {
    name: BuilderImageOverride.registrationName,
    override: true,
    static: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/images%2Fbaseline-insert_photo-24px.svg?alt=media&token=4e5d0ef4-f5e8-4e57-b3a9-38d63a9b9dc4',
    canHaveChildren: true,
    defaultStyles: {
      position: 'relative',
      minHeight: '20px',
      minWidth: '20px',
      overflow: 'hidden',
    },
    inputs: [
      {
        // TODO: new editor type 'responsiveImage' that can do different crops per breakpoint
        // and sets an object and that is read here
        name: 'image',
        type: 'file',
        bubble: true,
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        required: true,
        defaultValue:
          'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: async (options: Map<string, any>) => {
          console.log('options', options);
          const DEFAULT_ASPECT_RATIO = 0.7041;
          options.delete('srcset');
          options.delete('noWebp');

          function loadImage(url: string, timeout = 60000): Promise<HTMLImageElement> {
            return new Promise((resolve, reject) => {
              const img = document.createElement('img');
              let loaded = false;
              img.onload = () => {
                loaded = true;
                resolve(img);
              };

              img.addEventListener('error', event => {
                console.warn('Image load failed', event.error);
                reject(event.error);
              });

              img.src = url;
              setTimeout(() => {
                if (!loaded) {
                  reject(new Error('Image load timed out'));
                }
              }, timeout);
            });
          }

          function round(num: number) {
            return Math.round(num * 1000) / 1000;
          }

          const value = options.get('image');
          const aspectRatio = options.get('aspectRatio');

          console.log('value', value);
          console.log('aspectRatio', aspectRatio);

          // For SVG images - don't render as webp, keep them as SVG
          fetch(value)
            .then(res => res.blob())
            .then(blob => {
              if (blob.type.includes('svg')) {
                options.set('noWebp', true);
              }
            });

          if (value && (!aspectRatio || aspectRatio === DEFAULT_ASPECT_RATIO)) {
            console.log('Image has either no or default aspect ratio', aspectRatio);
            const img_1 = await loadImage(value);
            const possiblyUpdatedAspectRatio = options.get('aspectRatio');
            if (options.get('image') === value &&
              (!possiblyUpdatedAspectRatio || possiblyUpdatedAspectRatio === DEFAULT_ASPECT_RATIO)) {
              const img1AspectRatio = round(img_1.height / img_1.width);
              if (img_1.width && img_1.height) {
                console.log('Updating aspect ratio and dimensions', img1AspectRatio, img_1.width, img_1.height);
                options.set('aspectRatio', img1AspectRatio);
                options.set('height', img_1.height);
                options.set('width', img_1.width);
                options.delete('maxWidth');
                options.delete('maxHeight');
              }
            }
          }
        }
      },
      {
        name: 'backgroundSize',
        type: 'text',
        defaultValue: 'cover',
        enum: [
          {
            label: 'contain',
            value: 'contain',
            helperText: 'The image should never get cropped',
          },
          {
            label: 'cover',
            value: 'cover',
            helperText: `The image should fill its box, cropping when needed`,
          },
        ],
      },
      {
        name: 'backgroundPosition',
        type: 'text',
        defaultValue: 'center',
        enum: [
          'center',
          'top',
          'left',
          'right',
          'bottom',
          'top left',
          'top right',
          'bottom left',
          'bottom right',
        ],
      },
      {
        name: 'altText',
        type: 'string',
        helperText: 'Text to display when the user has images off',
      },
      {
        name: 'height',
        type: 'number',
        advanced: true,
      },
      {
        name: 'width',
        type: 'number',
        advanced: true,
      },
      {
        name: 'sizes',
        type: 'string',
        hideFromUI: true,
      },
      {
        name: 'srcset',
        type: 'string',
        hideFromUI: true,
      },
      // TODO: force lazy load option (maybe via binding for now hm component.options.lazy: true)
      {
        name: 'prefetch',
        friendlyName: 'Prefetch Image?',
        type: 'boolean',
        defaultValue: false,
        helperText: 'Defaults to false, should be set to true for images above the fold',
      },
      {
        name: 'aspectRatio',
        type: 'number',
        helperText:
          "This is the ratio of height/width, e.g. set to 1.5 for a 300px wide and 200px tall photo. Set to 0 to not force the image to maintain it's aspect ratio",
        advanced: true,
        defaultValue: DEFAULT_ASPECT_RATIO,
      },
    ],
  });
};
