import NavBar from "./NavBar";

const Layout = ({ children, assetList, assetColors, rgb }) => {
  return (
    <>
      <NavBar assetColors={assetColors} rgb={rgb} assetList={assetList} />
      <div className="pt-14" />
      {children}
    </>
  );
};

export default Layout;
