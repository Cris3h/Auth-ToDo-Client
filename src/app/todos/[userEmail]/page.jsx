"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import ListHeader from "@/components/ListHeader";
import ListItem from "@/components/ListItem";
import Link from "next/link";
import "@/app/globals.css";

const page = () => {
  const [tasks, setTasks] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${userEmail}`
      );
      const json = await response.json();
      const sorted = json.sort((a, b) => new Date(a.date) - new Date(b.date))
      setTasks(sorted);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (authToken && userEmail) {
      getData();
    } else {
      router.push(process.env.NEXT_PUBLIC_PAGE_URL);
    }
  }, [authToken, userEmail]);


  

  return (
    <div className="root-container">
      <ListHeader listName={" 🌴 to do tick List"} getData={getData} />
      <p className="user-email"> Welcome back</p>
      {tasks?.map((task) => (
            <ListItem key={task._id} task={task} getData={getData} />
          ))
      }
      <p className="copyright">
        © Copyrigh{" "}
        <Link
          href={"https://www.github.com/cris3h"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          Cris3h
        </Link>{" "}
        Dev
      </p>
    </div>
  );
};

export default page;
