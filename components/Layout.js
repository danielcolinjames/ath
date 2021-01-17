import NavBar from "./NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      <div className="pt-20" />
      {props.children}
    </>
  );
};

export default Layout;
