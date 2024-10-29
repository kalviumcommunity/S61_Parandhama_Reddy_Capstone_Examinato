/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { gsap } from "gsap";

const Main = () => {
  useEffect(() => {
    const rootElements = document.querySelectorAll("#root > *");

    gsap.from(rootElements, {
      duration: 0.75,
      opacity: 0,
      scale: 0.8,
      y: 30,
      stagger: {
        amount: 0.3,
        from: "start",
      },
      ease: "back.out(1.5)",
    });

    gsap.from("#root", {
      duration: 0.1,
      opacity: 0,
      y: 20,
      ease: "power3.out",
    });

    const handleRouteChange = () => {
      gsap.fromTo(
        "#root",
        { opacity: 0, y: 20 },
        { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
      );
    };

    const animateOnScroll = () => {
      const scrollElements = document.querySelectorAll(".scroll-animate");
      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
