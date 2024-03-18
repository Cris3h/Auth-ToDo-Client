import Auth from "@/components/Auth";
import { useCookies } from "react-cookie";


export default function Home() {
  return (
    <div className="root-container">
        <Auth />
    </div>
  );
}
