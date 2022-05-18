import { Heading } from '@/ui/Heading'

import { Meta } from '@/utils/meta/Meta'

export default function Error500() {
  return (
    <Meta title="Server error">
      <Heading>500 - Server-side error occured</Heading>
    </Meta>
  )
}
