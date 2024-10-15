import * as React from 'react'
import HeaderBar from './HeaderBar'
import NewsletterForm from './NewsletterForm'

const NewsletterSection: React.FC = () => (
  <section className='bg-white flex max-w-[732px] flex-col justify-center overflow-hidden px-9 py-4 leading-9 max-md:px-5'>
    <div className='bg-white flex flex-col border border-solid border-black border-opacity-30 bg-opacity-80 pb-5 shadow-sm max-md:max-w-full'>
      <HeaderBar />
      <div className='mt-5 flex w-[417px] max-w-full flex-col self-center'>
        <h2 className='text-neutral-900 self-start text-3xl leading-none text-opacity-90'>
          Join our newsletter
        </h2>
        <p className='text-neutral-900 mt-2 text-lg text-opacity-90'>
          Get access to our best deals, tips, and inspiration
        </p>
        <NewsletterForm emailPlaceholder='janedoe@gmail.com' buttonText='JOIN' />
        <p className='text-neutral-900 self-start text-xs text-opacity-90'>
          No spam, we hate it more than you do.
        </p>
      </div>
    </div>
  </section>
)

// eslint-disable-next-line import/no-default-export
export default NewsletterSection
