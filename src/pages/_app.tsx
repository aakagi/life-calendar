import 'tailwindcss/tailwind.css'
import '../../public/globals.css'
import type { AppProps } from 'next/app'

export default function ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
