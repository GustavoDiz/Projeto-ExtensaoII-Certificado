import React, { useContext, useState } from "react";
import logo from "../../public/certificados-logo.png";
import Image from "next/image";
import Link from "next/link";
import "../../style/global.css";
import supabase from "../../util/supabase";
import { AuthContext } from "../../util/auth";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import "../../pages/login/stylelogin.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useContext(AuthContext);

  //LOGICA DO LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Informe o nome de usuário e a senha");
      return;
    }

    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    const user = users![0];
    if (error) {
      console.error(error);
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (username == user?.username && passwordMatch) {
        login(user);
        router.push(`/homepage`);
      } else {
        setError("Nome de usuário ou senha incorretos");
      }
    }
  };

  return (
    <div className="items-center justify-center h-screen bg-amber-300 flex">
      <div className="login bg-slate-200 flex flex-col items-center  p-4 rounded-lg shadow-lg">
        <Image src={logo} alt="logo" width={500} />
        <form
          className="items-center justify-center flex flex-col"
          onSubmit={handleLogin}
        >
          {error && <p className="text-red-500">{error}</p>}
          <label className="block m-1">
            <span className="block text-sm font-medium text-slate-700">
              Username
            </span>
            <input
              type="text"
              className="peer p-1"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="block m-1">
            <span className="block text-sm font-medium text-slate-700">
              Senha
            </span>
            <input
              type="password"
              className="peer p-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="login_button"
          >
            ENTRAR
          </button>
          <p id = "false_account">
            Não possui uma conta?{" "}
            <Link href={"/signup"} className="inscri_button">
              Inscrever-se
            </Link>
          </p>
        </form>
        <button
          type="submit"
          className="button_homepage"
        >
          <Link href={"/home"}>Ir para HomePage</Link>
        </button>
      </div>
    </div>
  );
}
