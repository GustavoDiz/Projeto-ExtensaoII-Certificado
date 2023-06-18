import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../../util/auth";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import supabase from "../../util/supabase";

export default function Events() {
  const { user } = useContext(AuthContext);

  const [myTalks, setMyTalks] = useState([]);

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
      {user.user_type == "creator" && (
        <Link href={"/createevent"}>
          <button className="bg-amber-300 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2 w-1/2">
            CRIAR EVENTO
          </button>
        </Link>
      )}
      <div>
        <h1>Eventos</h1>
        <div>
          {myTalks.map((talk) => (
            <div key={talk.id} className="bg-amber-400 m-2">
              <h2>{talk.title}</h2>
              <Link href={`/event/${talk.id}`}>
                <button>SABER MAIS</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AuthProvider>
  );
}
