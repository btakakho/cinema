import * as MaterialIcons from 'react-icons/md'

import { MaterialIconNameType } from '@/shared/types/icons.types'

interface IProp {
  name: MaterialIconNameType
}

export const Icon = ({ name }: IProp) => {
  const IconComponent = MaterialIcons[name]

  if (!IconComponent) {
    return <MaterialIcons.MdCircle />
  }

  return <IconComponent />
}
