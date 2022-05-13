import Image from 'next/image'
import Link from 'next/link'

const logoImage = '/logo.svg'

export const Logo = () => {
  return (
    <Link href="/">
      <a className="px-layout block" title="Cinema logo">
        <Image
          src={logoImage}
          width={224}
          height={88}
          alt="Cinema"
          draggable={false}
        />
      </a>
    </Link>
  )
}
