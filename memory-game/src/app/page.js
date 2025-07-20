import Link from "next/link";
import React from "react";
import Header from "../components/Header.jsx";
import "./page.css";

export default function App() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>

      <nav>
        <Link href="/level1" className="home-navlink">
          Level 1
        </Link>
        <Link href="/level2" className="home-navlink">
          Level 2
        </Link>
      </nav>
    </div>
  );
}
