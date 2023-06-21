import React, { useContext } from "react";
import "../style/global.css";
import Image from "next/image";
import logo from "../public/certificados-logo.png";
import { AuthProvider, useAuth } from "../util/auth";
import Link from "next/link";

export default function Navbar({ user }) {
  const { logout } = useAuth();

  return (
    <nav className="navbar bg-gray-800 p-5 items-center justify-center flex justify-between">
      <Image src={logo} alt="logo" width={300} />
      <ul className="flex text-lg font-medium text-white justify-around w-1/2">
        <Link href={"/homepage"}>
          <li>Home</li>
        </Link>
        <Link href={"/events"}>
          <li>Eventos</li>
        </Link>
        <Link href={"/certificate"}>
          <li>Certificados</li>
        </Link>
      </ul>
      <div className="profile text-lg font-medium text-white h-full flex items-center">
        <p>
          Bem Vindo{" "}
          <Link href={"/profile"}>
            <span className="text-amber-400">{user?.name}</span>
          </Link>
        </p>
      </div>
      <Link href={"/login"}>
        <button className="text-red-600 text-lg font-medium" onClick={logout}>
          Sair
        </button>
      </Link>
    </nav>
  );
}
