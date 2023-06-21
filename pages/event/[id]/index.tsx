import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../../../util/auth";
import Navbar from "../../../components/Navbar";
import supabase from "../../../util/supabase";
import Image from "next/image";
import Template from "../../../public/6893208.png";
import ScrollTop from "../../../components/ScrollTop";

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
      <ScrollTop></ScrollTop>
      <div className="bg-amber-300 p-8">
        <Image src={Template} alt="template"></Image>
        <div className="bg-slate-200 flex flex-col p-4 rounded-lg shadow-lg text-2xl ps-20">
          <h1 className="font-bold">{event.title}</h1>
          <div className="flex flex-wrap items-center">
            <p className="text-gray-500 mr-2">{data}</p>
            <p className="text-amber-500">{event.creator_name}</p>
          </div>
          <p>{event.desc}</p>
          <p>Tema {event.theme}</p>
          <p>
            Link para Evento <span className="text-amber-500">{event.link} </span>
          </p>
        </div>
      </div>
    </AuthProvider>
  );
}
