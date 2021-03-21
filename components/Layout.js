import NavBar from "./NavBar";

const Layout = ({
  children,
  assetList,
  assetColors,
  assetColorsLoading,
  assetColorsError,
}) => {
  return (
    <>
      <NavBar
        assetColors={assetColors}
        assetColorsLoading={assetColorsLoading}
        assetColorsError={assetColorsError}
        assetList={assetList}
      />
      <div className="pt-14" />
      {children}
    </>
  );
};

export default Layout;
