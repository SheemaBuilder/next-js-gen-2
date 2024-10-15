import { FramerNextPages } from '@graphcommerce/framer-next-pages'
import { GraphQLProvider } from '@graphcommerce/graphql'
import { GlobalHead } from '@graphcommerce/magento-store'
import { CssAndFramerMotionProvider, PageLoadIndicator } from '@graphcommerce/next-ui'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import { lightTheme } from '../components/theme'
import { useHotjar } from '../hooks/useHotjar'
import { I18nProvider } from '../lib/i18n/I18nProvider'
import '../styles/globals.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'core-js/features/array/at'
import '../builder-registry'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en' } = router

  useHotjar()

  return (
    <CssAndFramerMotionProvider>
      <I18nProvider key={locale} locale={locale}>
        <GraphQLProvider {...props}>
          <ThemeProvider theme={lightTheme}>
            <GlobalHead />
            <CssBaseline />
            <PageLoadIndicator />
            <FramerNextPages {...props} />
          </ThemeProvider>
        </GraphQLProvider>
      </I18nProvider>
    </CssAndFramerMotionProvider>
  )
}
