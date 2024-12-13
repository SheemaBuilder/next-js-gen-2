import { builder } from '@builder.io/react';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import React, { type FC, type LegacyRef, useEffect, useRef, useState } from 'react';

import Icon from 'molecules/Icon';
import LightboxComponent from 'molecules/Lightbox';
import Link from 'molecules/Link';
import { useModal } from 'molecules/Modal/useModal';
import RichText from 'molecules/RichText';

import { isEmptyRichText, toKebabCase } from 'utils/stringFunctions';

import type { IImageType } from 'molecules/RTC/Components/NextImage/NextImage.builderConfig';

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';
builder.init(builderApiKey);

const NextImage: FC<IImageType> = ({
  source,
  width,
  height,
  exactSize,
  imageAlignment,
  alt,
  link,
  attributes,
  isModal,
  thumbnail,
  caption,
  isPriority = false,
  loading,
}) => {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>(null);
  const modalRef = useRef(null);
  const [isOpen, { closeModal, toggleModal }] = useModal(ref);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const imageClass = cva('max-lg:!h-auto max-lg:!w-full', {
    variants: {
      imageAlignment: {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
      },
    },
    defaultVariants: {
      imageAlignment: 'left',
    },
  });

  const handleModalTriggerClick = () => {
    builder.trackConversion();
    toggleModal();
  };

  useEffect(() => {
    try {
      if (attributes && attributes.length > 0) {
        attributes.forEach(({ attributeName, attributeValue }) => {
          let attrName = toKebabCase(attributeName);

          if (!attrName.includes('data-')) {
            attrName = `data-${attrName}`;
          }

          if (ref.current) {
            ref.current?.setAttribute(attrName, attributeValue);
          } else {
            console.warn('image ref is null');
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [attributes, ref.current]);

  useEffect(() => {
    const loadImage = () => {
      const img = document.createElement('img');
      img.src = source;
      img.onload = () => {
        const aspectRatio = img.width / img.height;

        if (width && !height) {
          setImageDimensions({ width, height: height || Math.round(width / aspectRatio) });
        } else if (height && !width) {
          setImageDimensions({ width: width || Math.round(height * aspectRatio), height });
        } else if (width && height) {
          setImageDimensions({ width, height });
        } else {
          setImageDimensions({ width: img.width, height: img.height });
        }
      };
    };

    loadImage();
  }, [source, width, height, caption]);

  if (!source) {
    return null;
  }

  const renderImage = () => (
    <figure>
      <Image
        width={width || imageDimensions.width}
        height={height || imageDimensions.height}
        src={source}
        alt={alt || ''}
        data-exact-size={exactSize}
        priority={isPriority}
        className={imageClass({ imageAlignment })}
        style={{
          width: exactSize ? width || imageDimensions.width : '100%',
          height: exactSize ? height || imageDimensions.height : '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: width && height ? 'cover' : 'contain',
        }}
        loading={loading}
      />
      {!isEmptyRichText(caption) && (
        <figcaption>
          <RichText richText={caption} className="mt-4 text-sm italic text-gray-500" />
        </figcaption>
      )}
    </figure>
  );

  if (link) {
    return (
      <Link
        ref={ref as LegacyRef<HTMLAnchorElement>}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full"
        title={alt || ''}
        onClick={() => builder.trackConversion()}
      >
        {renderImage()}
      </Link>
    );
  }

  if (!isModal) {
    return <div className="relative w-full">{renderImage()}</div>;
  }

  return (
    <>
      <button
        className="group relative size-full"
        ref={ref as LegacyRef<HTMLButtonElement>}
        onClick={() => handleModalTriggerClick()}
      >
        <Image
          src={thumbnail || source}
          width={width || 600}
          height={height || 400}
          alt={alt || ''}
          style={{ maxHeight: '80svh', objectFit: 'cover', borderRadius: '1rem' }}
          loading={loading}
        />
        <div className="absolute bottom-0 right-0 z-50 cursor-pointer rounded-br-lg rounded-tl-lg bg-white/80 p-2 text-primary-600">
          <Icon icon="zoom-in" size={24} className="text-primary-600 group-hover:text-primary-400" />
        </div>
      </button>
      <LightboxComponent ref={modalRef} isOpen={isOpen} closeModal={closeModal} toggleModal={toggleModal}>
        <figure>
          <Image
            src={`${source}?width=${width}&height=${height}`}
            width={width || 600}
            height={height || 400}
            alt={alt || ''}
            style={{ width: '100%', height: '100%' }}
          />
          {!isEmptyRichText(caption) && (
            <figcaption>
              <RichText richText={caption} className="mt-4 text-sm italic text-gray-500" />
            </figcaption>
          )}
        </figure>
      </LightboxComponent>
    </>
  );
};

export default NextImage;
