import React, { useContext, useEffect, useState } from "react";
import "../../style/global.css";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { AuthContext, AuthProvider } from "../../util/auth";
import supabase from "../../util/supabase";
import Image from "next/image";
import Template from "../../public/6893208.png";

export default function HomePage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([] as any);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    let { data: palestra, error } = await supabase
      .from("palestra")
      .select("*")
      .range(0, 3);

    if (error) {
      console.log(error);
    } else {
      setEvents(palestra);
    }
    
  };

  return (
    <AuthProvider>
      <Navbar user={user} />
      <div className="flex flex-col">
        <div className="m-5">
          <div className="bg-gray-800 font-bold text-white text-3xl p-2 text-center rounded-xl">
            <h1>
              Bem-vindo ao <span className="text-amber-400">Certificados</span>! Aqui você encontra cursos e palestras
              de qualidade para aprimorar seus conhecimentos.
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center carousel bg-amber-300 text-center p-2">
          <h1 className="bg-gray-800 font-bold text-white w-1/2 text-2xl rounded-xl">
            EVENTOS EM DESTASQUE
          </h1>
          <div className="flex justify-around w-full p-5">
            {events.map((e) => (
              <div
                key={e.id}
                className="bg-gray-800 text-white p-2 m-2 flex flex-col rounded-xl shadow-lg"
              >
                <div style={{ height: "90%" }}>
                  <Image src={Template} alt="template"></Image>
                  <h2 className="font-bold text-amber-200">{e.title}</h2>
                  <p>{e.date}</p>
                </div>
                <Link href={`/event/${e.id}`}>
                  <button className="bg-amber-400 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-600 m-2 w-1/2">
                    SABER MAIS
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div></div>
        </div>
      </div>
    </AuthProvider>
  );
}
