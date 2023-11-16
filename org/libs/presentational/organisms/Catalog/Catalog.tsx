"use client";
import Link from "next/link";
import { catalogData } from "./Data";
import "./styles.scss";
import { useEffect, useState } from "react";
const Catalog = () => {
  const [isShowing, setIsShowing] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 70) {
        setIsShowing(true);
      } else {
        setIsShowing(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={`catalog__wrapper ${isShowing ? "active" : ""}`}>
      <nav className="catalog container">
        <ul>
          {catalogData.map((cd) => (
            <li className="item" key={cd.name}>
              <Link href={cd.href} prefetch={true}>
                <i className={cd.icon} />
                {cd.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Catalog;
