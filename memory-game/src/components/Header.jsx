"use client";
import Link from "next/link";
import "./Header.css";
export default function Header() {
  return (
    <div className="Header">
      <Link href="/" className="header-logo-link">
        <img src="/logo.png" alt="" className="logo" />
      </Link>
      <h1>MEMORY GAME </h1>
    </div>
  );
}
