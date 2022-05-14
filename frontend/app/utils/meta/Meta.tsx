import Head from 'next/head'
import { useRouter } from 'next/router'

import { logoImage } from '@/components/Navigation/Logo'

import { ISeo } from './meta.interface'

import { siteName, titleMerge } from '@/config/seo.config'

import { onlyText } from '../string/clearText'

interface IProps extends ISeo {
  children: React.ReactNode
}

export const Meta = ({ title, description, image, children }: IProps) => {
  const { asPath } = useRouter()
  const currentUrl = `${process.env.APP_URL}${asPath}`

  return (
    <>
      <Head>
        <title itemProp="headline">{titleMerge(title)}</title>
        {description ? (
          <>
            <meta
              itemProp="description"
              name="description"
              content={onlyText(description, 152)}
            />
            <link rel="canonical" href={currentUrl} />
            <meta property="og:locale" content="en" />
            <meta property="og:title" content={titleMerge(title)} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image || logoImage} />
            <meta property="og:site_name" content={siteName} />
            <meta
              property="og:description"
              content={onlyText(description, 197)}
            />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  )
}
