import NavBar from "./NavBar";

const Layout = ({ children, assetList }) => {
  return (
    <>
      <NavBar assetList={assetList} />
      <div className="pt-20" />
      {children}
    </>
  );
};

export default Layout;
