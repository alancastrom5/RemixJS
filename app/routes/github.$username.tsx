import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";

export interface User {
    login: string
    avatar_url: string
    html_url: string
    bio: string
}

export const loader: LoaderFunction = async ({ params }) => {
    const res = await fetch(`https://api.github.com/users/${params.username}`, {
      headers: {
        accept: "application/vnd.github.v3+json",
        Authorization: "",
      },
    });
  
    if (!res.ok) {
      console.error("Erro ao buscar dados do usuário:", await res.text());
      throw new Error("Falha ao buscar dados do usuário");
    }
  
    return {
      user: await res.json(),
    };
  };
  
export interface LoaderData {
    user: User
}

export default function () {
    const { user } = useLoaderData<LoaderData>();
    return (
        <>
            <h1>{user.login}</h1>
            <blockquote>{user.bio}</blockquote>
            <img src={user.avatar_url} alt={user.login}  width="150"/>
        </>
    )    
}