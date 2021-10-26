import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, assetList, assetColors, rgb, className }) => {
  return (
    <div className={`min-h-screen ${className ? className : ""}`}>
      <NavBar assetColors={assetColors} rgb={rgb} assetList={assetList} />
      <div className="pt-14" />
      {children}
      <Footer assetColors={assetColors} rgb={rgb} />
    </div>
  );
};

export default Layout;
