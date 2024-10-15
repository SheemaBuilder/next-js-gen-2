import { BuilderComponent, builder, useIsPreviewing, Builder } from '@builder.io/react'
import { BuilderContent } from '@builder.io/sdk'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  hygraphPageContent,
  HygraphPagesQuery,
  HygraphPageFragment,
} from '@graphcommerce/graphcms-ui'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { BlogTitle, GetStaticProps, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import dynamic from 'next/dynamic'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  BlogAuthor,
  BlogHeader,
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPostPathsDocument,
  BlogTags,
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { PageMeta } from '../../components/Store/PageMeta/PageMeta'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

Builder.registerComponent(
  dynamic(() => import('../../components/BuilderIO/NewsletterSection')),
  {
    name: 'Newsletter',
    inputs: [{ name: 'title', type: 'text' }],
    image:
      'https://static.vecteezy.com/system/resources/previews/003/099/623/large_2x/line-icon-for-newsletter-vector.jpg',
  },
)

type Props = {
  hygraphPost: HygraphPageFragment | undefined | null
  builderPost: BuilderContent | null
} & BlogListQuery
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>
type HygraphProps = HygraphPagesQuery & BlogListQuery

export default function BlogPage({ hygraphPost, builderPost, blogPosts }) {
  return builderPost ? (
    <BlogPageBuilder page={builderPost} blogPosts={blogPosts} />
  ) : (
    <BlogPageHygraph pages={[hygraphPost]} blogPosts={blogPosts} />
  )
}

function BlogPageBuilder({
  page,
  blogPosts,
}: {
  page: BuilderContent | null
  blogPosts: BlogListQuery['blogPosts']
}) {
  const router = useRouter()
  const isPreviewing = useIsPreviewing()

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <PageMeta
        title={page?.data?.metaTitle?.Default || page?.data?.title}
        metaDescription={page?.data?.metaDescription?.Default}
        metaRobots={['index', 'follow']}
      />
      <div className='[&_a]:text-[blue] [&_a]:underline'>
        <BuilderComponent model='blog-article' content={page || undefined} />
      </div>
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

function BlogPageHygraph(props: HygraphProps) {
  const { blogPosts, pages } = props

  const page = pages[0]
  const title = page?.title ?? ''

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {title}
        </LayoutTitle>
      </LayoutHeader>
      <Row>
        <PageMeta
          title={title}
          metaDescription={title}
          canonical={`/${page.url}`}
          metaRobots={['index', 'follow']}
        />

        <BlogTitle>{title}</BlogTitle>

        {page.author ? <BlogAuthor author={page.author} date={page.date} /> : null}
        {page.asset ? <BlogHeader asset={page.asset} /> : null}
        <RowRenderer {...page} />
        <BlogTags relatedPages={page.relatedPages} />
      </Row>
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

BlogPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export async function getStaticPaths({ locales = [] }) {
  // Get a list of all pages in Builder
  const pages = await builder.getAll('blog-article', {
    // We only need the URL field
    fields: 'data.url',
    options: { noTargeting: true },
  })

  // Hygraph post paths

  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient(locale)
    const BlogPostPaths = staticClient.query({ query: BlogPostPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return (
      pages.map((page) => ({ params: { url: `${page?.url}`.replace('blog/', '') }, locale })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)

  // Generate the static paths for all pages in Builder

  return {
    paths: [
      ...paths,
      ...(pages
        .map((page) => page.data?.url)
        .filter((url) => url !== '/')
        .map((url) => ({ params: { url: `${url}`.replace('/blog/', '') }, locale: 'en' })) ?? []),
    ],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const path = `/blog/${urlKey}`

  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const builderPost = await builder
    .get('blog-article', {
      userAttributes: {
        urlPath: path,
      },
      limit: 1,
      includeRefs: true,
      includeUnpublished: true,
    })
    .toPromise()

  const builderBlogPosts = builder.getAll('blog-article', {
    // We only need the URL field
    options: { noTargeting: true },
  })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  // If builder does not have the page, try in hygraph
  const hygraphPost = hygraphPageContent(staticClient, `blog/${urlKey}`)

  const hygraphBlogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: [`blog/${urlKey}`], first: 4 },
  })

  const blogPosts = [
    ...(await builderBlogPosts).map((post) => ({
      title: post?.data?.title,
      url: post?.data?.url.startsWith('/') ? post?.data?.url.substr(1) : post?.data?.url,
      date: post?.data?.date
        ? new Date(post?.data?.date as number).toISOString()
        : new Date().toISOString(),
      asset:
        post?.data?.heroImage || post?.data?.thumbnail
          ? {
              url: post?.data?.heroImage || post?.data?.thumbnail || '',
              width: 900,
              height: 600,
            }
          : null,
    })),
    ...((await hygraphBlogPosts).data.blogPosts || []),
  ]

  // Return the page content as props
  return {
    props: {
      builderPost: builderPost || null,
      hygraphPost: !builderPost ? (await hygraphPost).data?.pages.at(0) : null,
      blogPosts,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: process.env.SKIP_ISG ? 1 : 60 * 5,
  }
}
