import React, { useState } from "react";
import { AuthProvider, useAuth } from "../../util/auth";
import Navbar from "../../components/Navbar";
import supabase from "../../util/supabase";
import { useRouter } from "next/router";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [theme, setTheme] = useState("");
  const [eventLink, setEventLink] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const handleDateChange = (e) => {
    const { value } = e.target;
    setEventDate(value);
  };

  console.log(user);
  const handleEvent = async (e) => {
    e.preventDefault();

    let { data: users, error: erro } = await supabase
      .from("users")
      .select("id,name");

    const { data, error } = await supabase
      .from("palestra")
      .insert([
        {
          title: eventName,
          desc: description,
          date: eventDate,
          id_creator: user.id,
          theme: theme,
          link: eventLink,
          creator_name: user.name,
          rating: "0",
        },
      ]);

    if (error) {
      console.error(error);
    } else {
      router.push("/events");
    }
  };

  return (
    <AuthProvider>
      <Navbar user={user} />
      <div className="justify-center h-screen bg-amber-300 flex p-8">
        <div className="login bg-slate-200 flex flex-col items-center  p-4 rounded-lg shadow-lg w-1/2">
          <h1 className="font-bold text-3xl">CRIAR EVENTO</h1>
          <form
            className="items-center justify-center flex flex-col w-full p-2"
            onSubmit={handleEvent}
          >
            <label className="block m-1">
              <span className="block text-sm font-medium text-slate-700">
                Nome do Evento
              </span>
              <input
                type="text"
                className="peer p-1"
                onChange={(e) => setEventName(e.target.value)}
              />
            </label>
            <label className="block m-1">
              <span className="block text-sm font-medium text-slate-700">
                Descrição
              </span>
              <input
                type="text"
                className="peer p-1"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="block m-1">
              <span className="block text-sm font-medium text-slate-700">
                Data
              </span>
              <input
                type="date"
                className="peer p-1"
                value={eventDate}
                onChange={handleDateChange}
              />
            </label>
            <label className="block m-1">
              <span className="block text-sm font-medium text-slate-700">
                Tema
              </span>
              <input
                type="text"
                className="peer p-1"
                onChange={(e) => setTheme(e.target.value)}
              />
            </label>
            <label className="block m-1">
              <span className="block text-sm font-medium text-slate-700">
                Link da Live
              </span>
              <input
                type="text"
                className="peer p-1"
                onChange={(e) => setEventLink(e.target.value)}
              />
            </label>
            <button className="bg-amber-300 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2 w-1/2">
              CRIAR
            </button>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
}
