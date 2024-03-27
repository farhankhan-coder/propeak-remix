import { logout } from "../../Services/login/login-service";
import Logout from "../../Components/login/components/logout";
import io from "socket.io-client";


export default function logoutRoute(){
    return(
        <div>
            <Logout/>
        </div>
    )
}