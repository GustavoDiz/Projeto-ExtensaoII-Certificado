import React, { useContext } from "react";
import "../style/global.css";
import Image from "next/image";
import logo from "../public/certificados-logo.png";
import { AuthProvider, useAuth } from "../util/auth";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

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

      <Dropdown>
        <DropdownTrigger>
          <div className="profile text-lg font-medium text-white h-full flex items-center">
            <p>
              Bem Vindo <span className="text-amber-400">{user?.name}</span>
            </p>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="bg-gray-800 p-5">
          <DropdownItem key="new">
            <Link href={"/profile"}>
              <span className="text-white font-medium">Ver Perfil</span>
            </Link>
          </DropdownItem>
          <DropdownItem key="new">
            <Link href={"/subscribes"}>
              <span className="text-white font-medium">Ver Inscrições</span>
            </Link>
          </DropdownItem>
          <DropdownItem key="new">
            <Link href={"/login"}>
              <button
                className="text-red-600 text-lg font-medium"
                onClick={logout}
              >
                Sair
              </button>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
}
