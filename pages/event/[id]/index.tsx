import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../../../util/auth";
import Navbar from "../../../components/Navbar";
import supabase from "../../../util/supabase";

export default function Event() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const id = router.query.id as string;
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    let { data: palestra, error } = await supabase
      .from("palestra")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      setEvent(palestra[0]);
    }
  };

  const convertDate = (dateString: string) => {
    if (!dateString) {
        return ""; // Retorna uma string vazia se a data for indefinida
      }
      
    const [y, m, d] = dateString.split("-");
    const convertedDate = `${d}/${m}/${y}`;
    return convertedDate;
  };

  const data = event ? convertDate(event.date) : "";
  console.log(data);
  return (
    <AuthProvider>
      <Navbar user={user} />
      <div className="h-screen bg-amber-300">
        <div className="bg-slate-200 flex flex-col items-center  p-4 rounded-lg shadow-lg">
          <h1>{event.title}</h1>
          <p>{event.desc}</p>
          <p>Data {data}</p>
          <p>Tema {event.theme}</p>
          <p>Criador {event.creator_name}</p>
          <p>Link para Evento {event.link} </p>
        </div>
      </div>
    </AuthProvider>
  );
}
