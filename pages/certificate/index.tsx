import React, { useContext, useEffect, useState } from "react";
import "../../style/global.css";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { AuthContext, AuthProvider } from "../../util/auth";
import supabase from "../../util/supabase";

export default function Certificate() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([]);

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
      <div className="font-bold">
        <h1 className="text-3xl text-center text-amber-400">
          EVENTOS INSCRITOS
        </h1>
        <div>
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-gray-800 text-white p-2 m-2 flex flex-col rounded-xl shadow-lg"
            >
              <h1 className="text-2xl">{e.title}</h1>
              <button className="bg-amber-400 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-600 m-2">
                EMITIR CERTIFICADO
              </button>
            </div>
          ))}
        </div>
      </div>
    </AuthProvider>
  );
}
