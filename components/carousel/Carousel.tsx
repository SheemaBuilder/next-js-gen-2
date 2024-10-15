import { BuilderBlocks, BuilderElement } from "@builder.io/react";
import { useEffect, useRef, useState } from "react";
import { Flex, Icon } from "@/components";
import { SPACING_INPUTS } from "@/constants";
import { BREAKPOINTS, SPACING, styled, theme } from "@/styles";
import { BuilderComponent, ResponsiveSpacing, Spacing } from "@/types";
import { hexToRgba, typedKeys } from "@/utils";
import icon from "../assets/images/builder-icons/keyframes-couple-solid.svg";

type Padding = {
  x?: ResponsiveSpacing;
  y?: ResponsiveSpacing;
};

type CarouselProps = {
  slides?: {
    blocks: BuilderElement[];
  }[];
  controls?: {
    show?: boolean;
    autoplay?: boolean;
    timer?: number;
    maxWidth?: number;
    padding?: Padding;
  };
};

export const Carousel: BuilderComponent<CarouselProps> = ({
  attributes,
  builderBlock,
  controls,
  slides,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentSlide = useRef(0);
  const timer = useRef<NodeJS.Timer | null>(null);

  const resetTimer = () => {
    if (!timer.current) return;
    setIsPaused(true);
    clearInterval(timer.current);
    timer.current = null;
  };

  const startTimer = () => {
    if (!controls?.timer) return;
    setIsPaused(false);
    const intervalId = setInterval(() => {
      let nextSlide = currentSlide.current + 1;
      if (nextSlide === (slides?.length || 0)) nextSlide = 0;
      currentSlide.current = nextSlide;
      setActiveSlide(nextSlide);
    }, controls?.timer * 1000);
    timer.current = intervalId;
  };

  const toggleTimer = () => {
    if (timer.current) resetTimer();
    else startTimer();
  };

  const showSlide = (slide: number) => {
    currentSlide.current = slide;
    setActiveSlide(slide);

    if (!isPaused) {
      resetTimer();
      startTimer();
    }
  };

  useEffect(() => {
    if (controls?.autoplay) startTimer();
    return () => resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container {...attributes}>
      {slides?.map(({ blocks }, i) => {
        const isActive = i === activeSlide;
        return (
          <Slide
            key={`slide-${i}`}
            initial={{ opacity: isActive ? 1 : 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{
              type: "tween",
              duration: 1,
            }}
            pointerEvents={isActive ? "all" : "none"}
          >
            <BuilderBlocks
              key={i}
              parentElementId={builderBlock?.id}
              dataPath={`component.options.slides.${i}.blocks`}
              blocks={blocks}
            />
          </Slide>
        );
      })}
      {controls?.show && (
        <Controls $padding={controls?.padding} $maxWidth={controls?.maxWidth}>
          <Indicators>
            {slides?.map((_, i) => (
              <Indicator
                key={`indicator-${i}`}
                $isActive={i === activeSlide}
                onClick={() => showSlide(i)}
              />
            ))}
          </Indicators>
          <PlayPauseButton onClick={toggleTimer}>
            <Icon
              icon={isPaused ? "play-solid" : "pause-solid"}
              color="primaryB"
            />
          </PlayPauseButton>
        </Controls>
      )}
    </Container>
  );
};

const DEFAULT_BLOCK: BuilderElement = {
  "@type": "@builder.io/sdk:Element",
  layerName: "Slide",
  component: {
    name: "Core:Section",
    options: {
      blocks: [],
      maxWidth: 1536,
    },
  },
};

Carousel.config = {
  name: "Carousel",
  image: icon.src,
  canHaveChildren: true,
  noWrap: true,
  inputs: [
    {
      name: "slides",
      type: "list",
      subFields: [
        {
          name: "blocks",
          type: "uiBlocks",
          hideFromUI: true,
          defaultValue: [],
        },
      ],
      defaultValue: [{ blocks: [DEFAULT_BLOCK] }, { blocks: [DEFAULT_BLOCK] }],
    },
    {
      name: "controls",
      type: "object",
      advanced: true,
      defaultValue: {
        show: true,
        autoplay: true,
        timer: 5,
        maxWidth: BREAKPOINTS["2xl"],
        padding: {
          x: {
            desktop: SPACING[14],
            tablet: SPACING[11],
            mobile: SPACING[4],
          },
          y: {
            desktop: SPACING[7],
          },
        },
      },
      subFields: [
        {
          name: "show",
          type: "boolean",
        },
        {
          name: "autoplay",
          type: "boolean",
        },
        {
          name: "timer",
          type: "number",
          helperText: "In seconds",
        },
        {
          name: "maxWidth",
          type: "number",
        },
        {
          name: "padding",
          type: "object",
          subFields: ["x", "y"].map((name) => ({
            name,
            type: "object",
            subFields: SPACING_INPUTS,
          })),
        },
      ],
    },
  ],
};

const PlayPauseButton = styled(Flex).attrs({ is: "button" })`
  align-items: center;
  background: ${({ theme }) => hexToRgba(theme.color.secondaryC, 0.25)};
  border-radius: ${theme.borderRadius["50%"]};
  height: ${theme.spacing.rem[10]};
  justify-content: center;
  width: ${theme.spacing.rem[10]};
`;

const Indicator = styled(Flex)<{ $isActive?: boolean }>`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.color.secondaryA : theme.color.primaryB};
  border-radius: calc(${theme.spacing.rem[1]} / 2);
  cursor: pointer;
  height: ${theme.spacing.rem[1]};
  position: relative;
  transition: all 500ms ease-out;
  width: ${({ $isActive, theme }) =>
    $isActive ? theme.spacing.rem[11] : theme.spacing.rem[3]};

  &:before {
    content: "";
    height: ${theme.spacing.rem[10]};
    left: 0;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 100%;
  }
`;

const Indicators = styled(Flex)`
  gap: ${theme.spacing.rem[2]};
`;

const getSpacing = (key: string, s?: Spacing) =>
  s ? `${key}: ${Number(s) / 10}rem;` : ``;

const Controls = styled(Flex)<{ $padding?: Padding; $maxWidth?: number }>`
  align-items: flex-end;
  grid-column-start: 1;
  grid-row-start: 1;
  justify-content: space-between;
  justify-self: center;
  margin: 0 auto;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "unset")};
  pointer-events: none;
  width: 100%;
  z-index: 2;

  * {
    pointer-events: all;
  }

  ${(props) => {
    const x = props?.$padding?.x;
    const y = props?.$padding?.y;
    const spacing = {
      ["padding-left"]: x,
      ["padding-right"]: x,
      ["padding-top"]: y,
      ["padding-bottom"]: y,
    };
    return typedKeys(spacing).map(
      (key) => `
        ${getSpacing(key, spacing[key]?.desktop)}

        ${theme.breakpoint.lg`
          ${getSpacing(key, spacing[key]?.tablet)}
        `(props)}

        ${theme.breakpoint.md`
          ${getSpacing(key, spacing[key]?.mobile)}
        `(props)}
      `
    );
  }}
`;

const Slide = styled(Flex)`
  flex-direction: column;
  grid-column-start: 1;
  grid-row-start: 1;
`;

const Container = styled(Flex)`
  display: grid;
`;
