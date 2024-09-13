import Prop from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
import useMenu from '../../Hooks/useMenu'


const Layout = ({ children }) => {
   const {menu, toggleMenu }= useMenu()
  return (
    <>
    <div className="flex flex-col">
      <Header />
      <div className="pb-6 my-8">{children}</div>
        <Footer />
    </div>
          {menu && <Menu toggleMenu={toggleMenu} />}
  </>
  )
}

Layout.propTypes ={
children: Prop.node.isRequired
}

export default Layout