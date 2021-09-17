import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({
  children,
  assetList,
  assetColors,
  rgb,
  className,
  loading,
}) => {
  return (
    <div className={`min-h-screen ${className ? className : ""}`}>
      <NavBar
        assetColors={assetColors}
        rgb={rgb}
        assetList={assetList}
        loading={loading}
      />
      <div className="pt-14" />
      {children}
      <Footer assetColors={assetColors} rgb={rgb} />
    </div>
  );
};

export default Layout;
