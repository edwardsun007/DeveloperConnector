import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} DevCon
    </footer>
    // dark bg, white font color, margin-top-5, 5 = 0.25 * $spacer
  );
}
