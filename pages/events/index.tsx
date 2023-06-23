import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../../util/auth";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import supabase from "../../util/supabase";
import Image from "next/image";
import Template from "../../public/6893208.png";

export default function Events() {
  const { user } = useContext(AuthContext);

  const [myTalks, setMyTalks] = useState([] as any);

  useEffect(() => {
    fetchMyTalks();
  }, []);

  const fetchMyTalks = async () => {
    let { data: palestra, error } = await supabase.from("palestra").select("*");

    if (error) {
      console.error(error);
    } else {
      console.log(palestra);
      setMyTalks(palestra);
    }
  };

  return (
    <AuthProvider>
      <Navbar user={user} />
      <div className="flex flex-col bg-gray-800">
        <div className="bg-amber-400 font-bold text-white text-3xl p-6">
          <h1 className="text-center">EVENTOS</h1>
        </div>
        {user && user.user_type === "creator" && ( 
          <Link
            href={"/createevent"}
            className="bg-amber-400 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2 w-1/2 text-center self-center"
          >
            CRIAR EVENTO
          </Link>
        )}
        <div className="grid grid-cols-3 gap-4 justify-center">
          {myTalks.map((talk) => (
            <div
              key={talk.id}
              className="bg-amber-400 m-2 rounded-md p-1 shadow-lg text-lg font-bold"
            >
              <Image src={Template} alt="template"></Image>
              <h1 className="bg-amber-400 font-bold text-white text-center">
                {talk.title}
              </h1>
              <div className="flex ">
                <div className="text-center ms-2">
                  <p className="text-gray-200">Nov</p>
                  <h1>9</h1>
                </div>
                <div className="flex">
                  <p className="text-center">
                    A conferência líder em inovações digitais.
                  </p>
                  <Link
                    href={`/event/${talk.id}`}
                    className="bg-gray-800 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2 w-1/2 text-center self-center"
                  >
                    <button>SABER MAIS</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthProvider>
  );
}
