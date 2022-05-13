import { IMenu } from './menu.interface'

export const mainMenu: IMenu = {
  title: 'Menu',
  items: [
    {
      icon: 'MdHome',
      link: '/',
      title: 'Home',
    },
    {
      icon: 'MdHome',
      link: '/discovery',
      title: 'Discovery',
    },
  ],
}

export const userMenu: IMenu = {
  title: 'General',
  items: [],
}

export const menus: IMenu[] = [mainMenu, userMenu]
