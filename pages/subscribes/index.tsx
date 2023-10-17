import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../../util/auth";
import supabase from "../../util/supabase";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function Subscribe() {
  const { user } = useContext(AuthContext);
  const [mySubs, setMySubs] = useState([] as any);
  const [palestra, setPalestra] = useState([] as any);
  useEffect(() => {
    fetchMySubs();
  }, []);

  const fetchMySubs = async () => {
    let { data: subscribe, error } = await supabase
      .from("subscribe")
      .select("palestra(id,title)")
      .eq("user", user.id);

    if (error) {
      console.error(error);
    } else {
      setMySubs(subscribe);
      console.log(mySubs);
    }
  };

  return (
    <AuthProvider>
      <Navbar user={user} />
      <div>
        {mySubs.length > 0 ? (
          mySubs.map((palestra) => (
            <div
              className="bg-amber-400 m-2 rounded-md p-1 shadow-lg text-lg font-bold"
              key={palestra.palestra.id}
            >
              <h1>{palestra.palestra.title}</h1>
              <Link href={`/event/${palestra.palestra.id}`}>
                <button className="bg-gray-800 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2 w-1/2 text-center self-center">
                  Ver Mais
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="bg-amber-400 m-2 rounded-md p-1 shadow-lg text-lg font-bold text-center">
            <h1>Não há palestras disponíveis</h1>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}
