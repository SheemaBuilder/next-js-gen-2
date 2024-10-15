import { Builder } from '@builder.io/react';
import dynamic from 'next/dynamic';

import { BuilderConfig as ArticlesCarouselBuilderConfig } from 'components/articles-carousel/articles-carousel';
import { BuilderConfig as ButtonGroupBuilderConfig } from 'components/base/button/builder-group';
import { BuilderConfig as TextBlockWithImagesBuilderConfig } from 'components/base/text-block/text-block-with-images';
import { BuilderConfig as TextBlockWithMediaBuilderConfig } from 'components/base/text-block/text-block-with-media';
import { BuilderConfig as BlockQuoteBuilderConfig } from 'components/base/typography/block-quote/block-quote';
import { BuilderConfig as DisclaimerGroupBuilderConfig } from 'components/base/typography/disclaimer/group';
import { BuilderConfig as HeadingBuidlerConfig } from 'components/base/typography/heading/builder-heading';
import { BuilderConfig as CertificationGroupBuilderConfig } from 'components/certification-group/certification-group';
import { BuilderConfig as CleanHeroBuilderConfig } from 'components/clean-hero/clean-hero';
import { BuilderConfig as ConditionalMediaBuilderConfig } from 'components/conditional-media/conditional-media';
import { BuilderConfig as ContactBuilderConfig } from 'components/contact/contact';
import { BuilderConfig as ContentWidthHeroBuilderConfig } from 'components/content-width-hero/content-width-hero';
import { BuilderConfig as ExpertListBuilderConfig } from 'components/expert-list/expert-list';
import { BuilderConfig as FaqCategoryListBuilderConfig } from 'components/faq-list/faq-category-list';
import { BuilderConfig as FaqListBuilderConfig } from 'components/faq-list/faq-list';
import { BuilderConfig as FeatureGroupBuilderConfig } from 'components/feature-group/feature-group';
import { BuilderConfig as FeaturedIngredientsBuilderConfig } from 'components/featured-ingredients/featured-ingredients';
import { BuilderConfig as FeaturedPagesCarouselBuilderConfig } from 'components/featured-pages-carousel/featured-pages-carousel';
import { BuilderConfig as FeaturedProductsWithDataBuilderConfig } from 'components/featured-products/featured-products-with-data';
import { BuilderConfig as FeaturedQuoteBuilderConfig } from 'components/featured-quote/featured-quote';
import { BuilderConfig as FeaturesWithMediaBuilderConfig } from 'components/features-with-media/features-with-media';
import { BuilderConfig as FullWidthCtaBuilderConfig } from 'components/full-width-cta/full-width-cta';
import { BuilderConfig as FullWidthHeroBuilderConfig } from 'components/full-width-hero/full-width-hero';
import { BuilderConfig as CarouselHeroBuilderConfig } from 'components/hero-carousel/hero-carousel';
import { BuilderConfig as IngredientListBuilderConfig } from 'components/ingredient-list/ingredient-list';
import { BuilderConfig as LegalBuilderConfig } from 'components/legal/legal';
import { BuilderConfig as NumberedFeatureGroupBuilderConfig } from 'components/numbered-feature-group/numbered-feature-group';
import { BuilderConfig as ProductCategoriesCarouselBuilderConfig } from 'components/product-categories-carousel/product-categories-carousel';
import { BuilderConfig as ProductsCarouselBuilderConfig } from 'components/products-carousel/products-carousel';
import { BuilderConfig as RichTextBuilderConfig } from 'components/rich-text/rich-text';
import { BuilderConfig as DividerBuilderConfig } from 'components/styled-divider/styled-divider';
import { BuilderConfig as StatisticGroupBuilderConfig } from 'components/styled-statistic/group';
import { BuilderConfig as TestimonialsBuilderConfig } from 'components/testimonials/testimonials';
import { BuilderConfig as TextBlockWithBackgroundImage } from 'components/text-block-with-background-image/text-block-with-background-image';
import { BuilderConfig as TextBlockWithFeaturesBuilderConfig } from 'components/text-block-with-features/text-block-with-features';
import { BuilderConfig as TextBlockWithRightColBuilderConfig } from 'components/text-block-with-right-col/text-block-with-right-col';
import { BuilderConfig as TimelineBuilderConfig } from 'components/timeline/timeline';
import { BuilderConfig as UploadListBuilderConfig } from 'components/upload-list/upload-list';

Builder.registerBlock(
  dynamic(() => import('components/articles-carousel/articles-carousel')),
  ArticlesCarouselBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/base/typography/block-quote')),
  BlockQuoteBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/base/button/builder-group')),
  ButtonGroupBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/contact/contact')),
  ContactBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/certification-group/certification-group')),
  CertificationGroupBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/clean-hero/clean-hero')),
  CleanHeroBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/conditional-media/conditional-media')),
  ConditionalMediaBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/content-width-hero/content-width-hero')),
  ContentWidthHeroBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/base/typography/disclaimer/group')),
  DisclaimerGroupBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/styled-divider/styled-divider')),
  DividerBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/expert-list/expert-list')),
  ExpertListBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/faq-list/faq-list')),
  FaqListBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/faq-list/faq-category-list')),
  FaqCategoryListBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/feature-group')),
  FeatureGroupBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/featured-ingredients')),
  FeaturedIngredientsBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/featured-pages-carousel')),
  FeaturedPagesCarouselBuilderConfig,
);

Builder.registerComponent(
  dynamic(
    () => import('components/featured-products/featured-products-with-data'),
  ),
  // FeaturedProductsWithDataBuilderConfig,
  {
    ...FeaturedProductsWithDataBuilderConfig,
    name: 'FeaturedProductsWithData',
  },
);

Builder.registerBlock(
  dynamic(() => import('components/featured-quote/featured-quote')),
  FeaturedQuoteBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/features-with-media/features-with-media')),
  FeaturesWithMediaBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/full-width-cta/full-width-cta')),
  FullWidthCtaBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/full-width-hero/full-width-hero')),
  FullWidthHeroBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/base/typography/heading/builder-heading')),
  HeadingBuidlerConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/hero-carousel/hero-carousel')),
  CarouselHeroBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/ingredient-list/ingredient-list')),
  IngredientListBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/legal/legal')),
  LegalBuilderConfig,
);

Builder.registerBlock(
  dynamic(
    () => import('components/numbered-feature-group/numbered-feature-group'),
  ),
  NumberedFeatureGroupBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/product-categories-carousel')),
  ProductCategoriesCarouselBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/products-carousel')),
  ProductsCarouselBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/rich-text')),
  RichTextBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/styled-statistic/group')),
  StatisticGroupBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/testimonials')),
  TestimonialsBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/text-block-with-features')),
  TextBlockWithFeaturesBuilderConfig,
);

Builder.registerBlock(
  dynamic(
    () =>
      import(
        'components/text-block-with-background-image/text-block-with-background-image'
      ),
  ),
  TextBlockWithBackgroundImage,
);

Builder.registerBlock(
  dynamic(() => import('components/base/text-block/text-block-with-images')),
  TextBlockWithImagesBuilderConfig,
);

Builder.registerBlock(
  dynamic(() => import('components/base/text-block/text-block-with-media')),
  TextBlockWithMediaBuilderConfig,
);

Builder.registerBlock(
  dynamic(
    () =>
      import('components/text-block-with-right-col/text-block-with-right-col'),
  ),
  TextBlockWithRightColBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/timeline/timeline')),
  TimelineBuilderConfig,
);

Builder.registerComponent(
  dynamic(() => import('components/upload-list/upload-list')),
  UploadListBuilderConfig,
);

Builder.register('editor.settings', { customInsertMenu: true });

Builder.register('insertMenu', {
  name: 'Blocks',
  items: [
    { name: ArticlesCarouselBuilderConfig.name },
    { name: CarouselHeroBuilderConfig.name },
    { name: ContactBuilderConfig.name },
    { name: ContentWidthHeroBuilderConfig.name },
    { name: CleanHeroBuilderConfig.name },
    { name: DisclaimerGroupBuilderConfig.name },
    { name: ExpertListBuilderConfig.name },
    { name: FaqListBuilderConfig.name },
    { name: FaqCategoryListBuilderConfig.name },
    { name: FeatureGroupBuilderConfig.name },
    { name: FeaturedIngredientsBuilderConfig.name },
    { name: FeaturedPagesCarouselBuilderConfig.name },
    { name: FeaturedQuoteBuilderConfig.name },
    { name: FeaturesWithMediaBuilderConfig.name },
    { name: FullWidthCtaBuilderConfig.name },
    { name: FullWidthHeroBuilderConfig.name },
    { name: IngredientListBuilderConfig.name },
    { name: LegalBuilderConfig.name },
    { name: ProductsCarouselBuilderConfig.name },
    { name: ProductCategoriesCarouselBuilderConfig.name },
    { name: StatisticGroupBuilderConfig.name },
    { name: TestimonialsBuilderConfig.name },
    { name: TextBlockWithBackgroundImage.name },
    { name: TextBlockWithFeaturesBuilderConfig.name },
    { name: TextBlockWithImagesBuilderConfig.name },
    { name: TextBlockWithMediaBuilderConfig.name },
    { name: TextBlockWithRightColBuilderConfig.name },
    { name: TimelineBuilderConfig.name },
  ],
});

Builder.register('insertMenu', {
  name: 'Inside Blocks',
  items: [
    { name: BlockQuoteBuilderConfig.name },
    { name: ButtonGroupBuilderConfig.name },
    { name: CertificationGroupBuilderConfig.name },
    { name: ConditionalMediaBuilderConfig.name },
    { name: DisclaimerGroupBuilderConfig.name },
    { name: DividerBuilderConfig.name },
    { name: FeatureGroupBuilderConfig.name },
    { name: HeadingBuidlerConfig.name },
    { name: NumberedFeatureGroupBuilderConfig.name },
    { name: RichTextBuilderConfig.name },
    { name: StatisticGroupBuilderConfig.name },
    { name: UploadListBuilderConfig.name },
  ],
});

Builder.register('insertMenu', {
  name: 'Deprecated',
  items: [{ name: 'FeaturedProductsWithData' }],
});
