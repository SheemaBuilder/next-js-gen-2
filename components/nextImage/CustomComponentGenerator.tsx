'use client';

// Example Config
import { Builder } from '@builder.io/react/lite';
import { type Component, builder } from '@builder.io/sdk';
import dynamic from 'next/dynamic';

// Molecules
import FormConfig from 'molecules/Form/Form.builderConfig';
import LightboxButtonConfig from 'molecules/LightboxButton/LightboxButton.builderConfig';
import RTCButtonGroupConfig from 'molecules/RTC/Components/ButtonGroup/ButtonGroup.builderConfig';
import CustomCodeConfig from 'molecules/RTC/Components/CustomCode/customCode.builderConfig';
import FeaturesListConfig from 'molecules/RTC/Components/FeaturesList/FeaturesList.builderConfig';
import MetricCardsConfig from 'molecules/RTC/Components/MetricCards/MetricCards.builderConfig';
import ImageBuilderConfig from 'molecules/RTC/Components/NextImage/NextImage.builderConfig';
import {
  RTCAuthorCalloutConfig,
  RTCContentCalloutConfig,
  RTCDetailedPointConfig,
  RTCDownloadableConfig,
  RTCFeaturesConfig,
  RTCHotTipConfig,
  RTCStatsConfig,
  RTCTestimonialConfig,
} from 'molecules/RTC/RTC.builderConfig';
import RichTextBuilderConfig from 'molecules/RichText/richText.builderConfig';
import SocialsConfig from 'molecules/Socials/Socials.builderConfig';

// Components
import AccordionConfig from 'components/Accordion/Accordion.builderConfig';
import AnnouncementBarConfig from 'components/AnnouncementBar/announcementBar.builderConfig';
import ComponentArticle from 'components/Article';
import ArticleConfig from 'components/Article/Article.builderConfig';
import FeaturedCardDeckConfig from 'components/CardDeck/FeaturedCardDeck/FeaturedCardDeck.builderConfig';
import GraphicsCardDeckConfig from 'components/CardDeck/GraphicsCardDeck/GraphicsCardDeck.builderConfig';
import MetricsCardConfig from 'components/CardDeck/MetricsCardDeck/MetricsCardDeck.builderConfig';
import PeriodicCardConfig from 'components/CardDeck/PeriodicCardDeck/PeriodicCardDeck.builderConfig';
import CardDeckConfig from 'components/CardDeck/PersonCardDeck/PersonCardDeck.builderConfig';
import ResourceCardDeckConfig from 'components/CardDeck/ResourceCardDeck/ResourceCardDeck.builderConfig';
import TestimonialCardDeckConfig from 'components/CardDeck/TestimonialCardDeck/TestimonialCardDeck.builderConfig';
import ComponentVideoConfig, { RTCVideoConfig } from 'components/ComponentVideo/ComponentVideo.builderConfig';
import ConversionPanelBuilderConfig from 'components/ConversionPanel/ConversionPanel.builderConfig';
import GatedContentConfig from 'components/GatedContent/GatedContent.builderConfig';
import Heading from 'components/Heading';
import HeadingConfig from 'components/Heading/Heading.builderConfig';
import Hero from 'components/Hero';
import HeroConfig from 'components/Hero/Hero.builderConfig';
import HighlightsConfig from 'components/Highlights/Highlights.builderConfig';
import JobListingConfig from 'components/Listing/JobListing/JobListing.builderConfig';
import ResourceListingConfig from 'components/Listing/ResourceListing.builderConfig';
import PartnerListingConfig from 'components/PartnerListing/PartnerListing.builderConfig';
import SlideboxConfig from 'components/Slidebox/Slidebox.builderConfig';
import SlideboxItemConfig from 'components/Slidebox/SlideboxItem/SlideboxItem.builderConfig';
import SubscriptionPanelBuilderConfig from 'components/SubscriptionPanel/SubscriptionPanel.builderConfig';
import Switchback from 'components/Switchback';
import SwitchbackConfig from 'components/Switchback/Switchback.builderConfig';
import SwitchbackSlidebox from 'components/SwitchbackSlidebox';
import SwitchbackSlide from 'components/SwitchbackSlidebox/SwitchbackSlide';
import SwitchbackSlideConfig from 'components/SwitchbackSlidebox/SwitchbackSlide.builderConfig';
import SwitchbackSlideboxConfig from 'components/SwitchbackSlidebox/SwitchbackSlidebox.builderConfig';
import TestimonialSliderConfig from 'components/TestimonialSlider/TestimonialSlider.builderConfig';
import TimelineConfig from 'components/Timeline/Timeline.builderConfig';
import Trustbar from 'components/Trustbar';
import TrustbarConfig from 'components/Trustbar/Trustbar.builderConfig';

import EventListingConfig from 'templates/Events/EventListing/EventListing.builderConfig';

import type { FC } from 'react';
import type { IWrapper } from 'types';

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';
builder.init(builderApiKey);

const contentEditorBlocks = [
  {
    component: dynamic(() => import('molecules/RichText')),
    config: RichTextBuilderConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/FeaturesList')),
    config: FeaturesListConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/ButtonGroup')),
    config: RTCButtonGroupConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/MetricCards')),
    config: MetricCardsConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/AuthorCallout')),
    config: RTCAuthorCalloutConfig,
  },
  {
    // Request to rename Detailed Note -> Content Callout disconnected all existing Detailed Notes.
    // Added duplicate, but renamed. Remove Detailed Note once all are replaced with content callout
    component: dynamic(() => import('molecules/RTC/Components/DetailedNote')),
    config: RTCDetailedPointConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/DetailedNote')),
    config: RTCContentCalloutConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/Downloadable')),
    config: RTCDownloadableConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/Features')),
    config: RTCFeaturesConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/NextImage')),
    config: ImageBuilderConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/HotTip')),
    config: RTCHotTipConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/Stats')),
    config: RTCStatsConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/Testimonial')),
    config: RTCTestimonialConfig,
  },
  {
    component: dynamic(() => import('components/ComponentVideo/VideoPlayer')),
    config: RTCVideoConfig,
  },
  {
    component: dynamic(() => import('molecules/LightboxButton')),
    config: LightboxButtonConfig,
  },
  {
    component: dynamic(() => import('molecules/Socials')),
    config: SocialsConfig,
  },
  {
    component: dynamic(() => import('components/SubscriptionPanel')),
    config: SubscriptionPanelBuilderConfig,
  },
  {
    component: dynamic(() => import('molecules/RTC/Components/CustomCode')),
    config: CustomCodeConfig,
  },
];

const resourceMenuBlocks = [
  {
    component: dynamic(() => import('components/PartnerListing')),
    config: PartnerListingConfig,
  },
  {
    component: dynamic(() => import('components/Listing')),
    config: ResourceListingConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/ResourceCardDeck')),
    config: ResourceCardDeckConfig,
  },
  {
    component: dynamic(() => import('templates/Events/EventListing')),
    config: EventListingConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/FeaturedCardDeck')),
    config: FeaturedCardDeckConfig,
  },
  {
    component: dynamic(() => import('components/Listing/JobListing')),
    config: JobListingConfig,
  },
];

// ! List Alphabetically (or by variant - ie PeriodicCardDeck and GraphicsCardDeck)
const components = [
  {
    component: dynamic(() => import('components/Accordion')),
    config: AccordionConfig,
  },
  {
    component: dynamic(() => import('components/AnnouncementBar')),
    config: AnnouncementBarConfig,
  },
  {
    component: ComponentArticle,
    config: ArticleConfig,
  },
  {
    component: dynamic(() => import('components/ConversionPanel')),
    config: ConversionPanelBuilderConfig,
  },
  {
    component: dynamic(() => import('components/ComponentVideo')),
    config: ComponentVideoConfig,
  },
  {
    component: dynamic(() => import('molecules/Form')),
    config: FormConfig,
  },
  {
    component: Heading,
    config: HeadingConfig,
  },
  {
    component: Hero,
    config: HeroConfig,
  },
  {
    component: dynamic(() => import('components/Highlights')),
    config: HighlightsConfig,
  },
  {
    component: Switchback,
    config: SwitchbackConfig,
  },
  {
    component: SwitchbackSlidebox,
    config: SwitchbackSlideboxConfig,
  },
  {
    component: SwitchbackSlide,
    config: SwitchbackSlideConfig,
  },
  {
    component: dynamic(() => import('components/Timeline')),
    config: TimelineConfig,
  },
  {
    component: Trustbar,
    config: TrustbarConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/GraphicsCardDeck')),
    config: GraphicsCardDeckConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/PersonCardDeck')),
    config: CardDeckConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/MetricsCardDeck')),
    config: MetricsCardConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/PeriodicCardDeck')),
    config: PeriodicCardConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/ResourceCardDeck')),
    config: ResourceCardDeckConfig,
  },
  {
    component: dynamic(() => import('components/CardDeck/TestimonialCardDeck')),
    config: TestimonialCardDeckConfig,
  },
  {
    component: dynamic(() => import('components/GatedContent')),
    config: GatedContentConfig,
  },
  {
    component: dynamic(() => import('components/TestimonialSlider')),
    config: TestimonialSliderConfig,
  },
  {
    component: dynamic(() => import('components/Slidebox')),
    config: SlideboxConfig,
  },
  {
    component: dynamic(() => import('components/Slidebox/SlideboxItem')),
    config: SlideboxItemConfig,
  },
];

const allMenus = [
  { name: 'Rich Text Blocks', components: contentEditorBlocks },
  { name: 'Resource/Listing Blocks', components: resourceMenuBlocks },
];

export const allComponents = [...components, ...contentEditorBlocks, ...resourceMenuBlocks];

const generateComponents = () => {
  allComponents.map(component => Builder.registerComponent(component.component, component.config as Component));
};

const generateMenus = () => {
  allMenus.map(menu =>
    Builder.register('insertMenu', {
      name: menu.name,
      items: menu.components.map(component => ({ name: component.config.name })),
    })
  );
};

export const CustomComponentGenerator: FC<IWrapper> = ({ children }) => {
  generateComponents();
  generateMenus();

  return children;
};

export default CustomComponentGenerator;
