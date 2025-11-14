import { linkResolver } from '@/prismicio'
import '@/styles/globals.css'
import { PrismicProvider } from '@prismicio/react'
import { parseCookies, setCookie } from 'nookies'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <PrismicProvider linkResolver={linkResolver}>
            <Component {...pageProps} />
        </PrismicProvider>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const cookies = parseCookies(ctx)
    const isSpanish = ctx.pathname.startsWith('/es')

    if (cookies.NEXT_LOCALE) {
        if (cookies.NEXT_LOCALE === 'en' && isSpanish) {
            setCookie(ctx, 'NEXT_LOCALE', 'es')
        }

        if (cookies.NEXT_LOCALE === 'es' && !isSpanish) {
            ctx.res.writeHead(302, {
                Location: `/es${ctx.pathname}`,
            })
            ctx.res.end()
        }
    } else {
        setCookie(ctx, 'NEXT_LOCALE', isSpanish ? 'es' : 'en')
    }

    const pageProps = Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : {}

    return {
        pageProps,
    }
}
