import { Menu } from './Menu'
import { mainMenu, userMenu } from './menu.data'

export const MenuContainer = () => {
  return (
    <div className="mt-12">
      <Menu menu={mainMenu} />
      <Menu menu={userMenu} />
    </div>
  )
}
