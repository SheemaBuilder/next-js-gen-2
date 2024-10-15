// /pages/my-page/[path].jsx file
import { decodeOptions } from '../../ utils'

export async function getStaticProps({
  params,
}): Promise<{ props: { options: any } }> {
  const options = decodeOptions(params.path)
  return {
    props: {
      options,
    }
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export default function MyPath({ options }) {
  return <MyPage isReturnVisitor={options.returnVisitor} country={options.country} />
}