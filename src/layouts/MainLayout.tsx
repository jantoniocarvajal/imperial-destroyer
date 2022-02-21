import React, { useState } from "react";
import { Outlet } from "react-router";
import { Footer } from "./Footer";
import "./mainLayout.scss";
import { NavBar } from "./NavBar";
import { TopBar } from "./TopBar";

export const MainLayout = () => {
  // const { children } = props;
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="layout">
      <header className="header">
        <TopBar />
      </header>
      <aside className="aside">
        <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      </aside>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

// export const MainLayout = () => {
//   const [isMobileNavOpen, setMobileNavOpen] = useState(false);

//   return (
//     <div className="root">
//       <TopBar />
//       <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
//       <div className="wrapper">
//         <div className="contentContainer">
//           <div className="content">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
