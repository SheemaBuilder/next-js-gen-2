import { builder, Builder } from '@builder.io/react'
import dynamic from 'next/dynamic'

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

Builder.registerComponent(
  dynamic(() => import('./NewsletterSection')),
  {
    name: 'Newsletter',
    inputs: [{ name: 'title', type: 'text' }],
    image:
      'https://static.vecteezy.com/system/resources/previews/003/099/623/large_2x/line-icon-for-newsletter-vector.jpg',
  },
)
