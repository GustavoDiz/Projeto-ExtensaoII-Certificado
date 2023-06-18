import { useContext } from "react";
import { AuthContext, AuthProvider, useAuth } from "../../util/auth";
import Image from "next/image";
import Navbar from "../../components/Navbar";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <AuthProvider>
      <Navbar user={user}/>
      <div>
        <img src={user?.profile_pic} alt="" width={100}/>
        <h1>Perfil do Usuário</h1>
        <p>Nome: {user?.name}</p>
        <p>Email: {user?.email}</p>
        {/* Outras informações do perfil */}
      </div>
    </AuthProvider>
  );
}

export default ProfilePage;
