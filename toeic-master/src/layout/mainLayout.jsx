import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header  />
      {children}
  
    </>
  );
};

export default MainLayout;

