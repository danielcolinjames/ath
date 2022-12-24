import NavBar from './NavBar'
import Footer from './Footer'

export const Layout = ({
  children,
  assetList,
  assetColors,
  rgb,
  className,
}: {
  children?: any
  assetList?: any[]
  assetColors?: any
  rgb?: any
  className?: string
}) => {
  return (
    <div className={`min-h-screen ${className ? className : ''}`}>
      <NavBar assetColors={assetColors} assetList={assetList} rgb={rgb} />
      <div className="pt-14" />
      {children}
      <Footer assetColors={assetColors} rgb={rgb} />
    </div>
  )
}
