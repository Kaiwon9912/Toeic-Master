import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header  />
      {children}
     <Footer/>
    </>
  );
};

export default MainLayout;

