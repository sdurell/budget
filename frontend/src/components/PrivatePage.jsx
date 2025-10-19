import { Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";

export default function PrivatePage() {
    return (
        <>
            <MyNavbar/>
            <main className="main-content">
                <Outlet/>
            </main>
        </>
    )
}