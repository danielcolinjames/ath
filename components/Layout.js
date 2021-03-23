import NavBar from "./NavBar";

const Layout = ({ children, assetList, assetColors }) => {
  return (
    <>
      <NavBar assetColors={assetColors} assetList={assetList} />
      <div className="pt-14" />
      {children}
    </>
  );
};

export default Layout;
