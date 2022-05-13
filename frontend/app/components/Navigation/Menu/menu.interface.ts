import { MaterialIconNameType } from '@/shared/types/icons.types'

export interface IMenuItem {
  icon: MaterialIconNameType
  title: string
  link: string
}

export interface IMenu {
  title: string
  items: IMenuItem[]
}
