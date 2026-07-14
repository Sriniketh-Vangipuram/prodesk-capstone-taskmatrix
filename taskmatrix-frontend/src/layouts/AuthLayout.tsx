import {Outlet} from "react-router-dom";

function AuthLayout(){
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950">
            <Outlet/>
        </main>
    )
}

export default AuthLayout;