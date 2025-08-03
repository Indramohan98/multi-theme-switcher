import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Order from './pages/Order';
import Cart from './pages/Cart';
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

// Styled component for layout with sidebar logic
const MainContent = styled.main<{ isSidebar: boolean }>`
  margin-left: ${({ isSidebar }) => (isSidebar ? "220px" : "0")};
  padding: 2rem;
  transition: margin-left 0.3s ease;
`;

// Motion wrapper for theme and page transitions
const AnimatedWrapper = styled(motion.div)`
  min-height: 100vh;
`;

const animationVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { currentTheme, theme } = useTheme();
  const isSidebar = currentTheme === "theme3";

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <MainContent isSidebar={isSidebar}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/order/:id" element={<PageTransition><Order /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </MainContent>
    </StyledThemeProvider>
  );
};

// Reusable animated page wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AnimatedWrapper
    key={useTheme().currentTheme}
    variants={animationVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.4 }}
  >
    {children}
  </AnimatedWrapper>
);

const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <AppRoutes />
    </Router>
  </ThemeProvider>
);

export default App;
