import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RiskDisclosure from "./pages/RiskDisclosure";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "plans", Component: Plans },
      { path: "about", Component: About },
      { path: "how-it-works", Component: HowItWorks },
      { path: "faq", Component: FAQ },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "terms", Component: Terms },
      { path: "privacy", Component: Privacy },
      { path: "risk-disclosure", Component: RiskDisclosure },
    ],
  },
]);
