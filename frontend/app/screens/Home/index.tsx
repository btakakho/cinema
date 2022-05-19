import { toastr } from 'react-redux-toastr'

import { Heading } from '@/components/ui/Heading'

import { Meta } from '@/utils/meta/Meta'

export const Home = () => {
  return (
    <Meta
      title="Watch movies online"
      description="Watch Cinema movies and TV shows or stream right to your browser."
    >
      <Heading className="text-gray-300 mb-8 text-xl">
        Watch movies online
      </Heading>

      <button onClick={() => toastr.success('Auth', 'Success')}>
        Show message
      </button>
    </Meta>
  )
}
