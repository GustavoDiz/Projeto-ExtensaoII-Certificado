import React, { useContext } from "react";
import "../../style/global.css";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { AuthContext, AuthProvider } from "../../util/auth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <AuthProvider>
      <Navbar user={user} />
      <div className="flex flex-col">
        <div className="m-5">
          <div className="bg-gray-800 font-bold text-white text-3xl p-2 text-center rounded-xl">
            <h1>
              Bem-vindo ao Certificados! Aqui você encontra cursos e palestras
              de qualidade para aprimorar seus conhecimentos.
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center carousel bg-amber-300 text-center p-2">
            <h1 className="bg-gray-800 font-bold text-white w-1/2 text-2xl rounded-xl">EVENTOS EM DESTASQUE</h1>
            <div>
              
            </div>
        </div>
      </div>
    </AuthProvider>
  );
}
