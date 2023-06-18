import React, { useState } from "react";
import "../../style/global.css";
import supabase from "../../util/supabase";
import logo from "../../public/certificados-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import CustomModal from "../../components/Modal";
import Link from "next/link";

export default function Signout() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleOptionChange = (e) => {
    setUsertype(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    // Redirecionar para a página de login, se necessário
  };

  let contentModal;
  if (erro) {
    contentModal = (
      <div className="bg-red-200 p-4 rounded-lg font-bold text-center">
        <p>Ocorreu um erro durante o registro,tente novamente.</p>
        <button
          className="bg-amber-300 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2"
          onClick={closeModal}
        >
          Fechar
        </button>
      </div>
    );
  } else {
    contentModal = (
      <div>
        <p>Registro realizado com sucesso!</p>
        <button
          className="bg-amber-300 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2"
          onClick={closeModal}
        >
          Fechar
        </button>
      </div>
    );
  }

  //REGISTRAR USUARIO
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !email || !usertype) {
      setError(true);
      setShowModal(true);
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let { data, error } = await supabase.from("users").insert([
      {
        username: username,
        password: hashedPassword,
        email: email,
        user_type: usertype,
        name: name,
        profile_pic:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
    ]);

    if (error) {
      console.log(error);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="items-center justify-center h-screen bg-amber-300 flex">
      <div className="login bg-slate-200 flex flex-col items-center  p-4 rounded-lg shadow-lg">
        <Image src={logo} width={300} alt="logo" />
        <form
          className="items-center justify-center flex flex-col"
          onSubmit={handleRegister}
        >
          <label className="block m-1">
            <span className="block text-sm font-medium text-slate-700">
              Nome
            </span>
            <input
              type="text"
              className="peer p-1"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
              Password
            </span>
            <input
              type="password"
              className="peer p-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block m-1">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              className="peer p-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block m-1">
            <span className="block text-sm font-medium text-slate-700">
              Selecione um tipo de usuário:
            </span>
            <select name="usertype" id="usertype" onChange={handleOptionChange}>
              <option value="">Selecione</option>
              <option value="creator">Criador</option>
              <option value="common">Participante</option>
            </select>
          </label>

          <button
            type="submit"
            className="bg-amber-300 rounded-md p-1 font-bold text-white border-solid border-2 border-amber-400 m-2"
          >
            REGISTRAR-SE
          </button>
        </form>
        {showModal && (
          <CustomModal
            isOpen={showModal}
            onClose={closeModal}
            content={contentModal}
          />
        )}
      </div>
    </div>
  );
}
