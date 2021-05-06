import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/scenes/Scene'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <Scene r3f/>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
