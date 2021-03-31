import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, assetList, assetColors, rgb }) => {
  return (
    <>
      <NavBar assetColors={assetColors} rgb={rgb} assetList={assetList} />
      <div className="pt-14" />
      {children}
      <Footer assetColors={assetColors} rgb={rgb} />
    </>
  );
};

export default Layout;
