import { Menu } from './Menu'
import { GenresMenu } from './genres/GenresMenu'
import { mainMenu, userMenu } from './menu.data'

export const MenuContainer = () => {
  return (
    <div className="mt-12">
      <Menu menu={mainMenu} />
      <GenresMenu />
      <Menu menu={userMenu} />
    </div>
  )
}
