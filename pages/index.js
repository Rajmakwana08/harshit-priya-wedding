import Head from 'next/head'
import AnimatedInvite from '../components/AnimatedInvite'
import Gallery from '../components/Gallery'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wedding Invitation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <AnimatedInvite />
        <Gallery />
      </main>
    </>
  )
}
