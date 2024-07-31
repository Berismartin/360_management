import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
    const navigate = useNavigate(); 
    useEffect (() => {
        let login = sessionStorage.getItem('accessToken');
        if(!login || login === undefined){
            localStorage.setItem('login_error', 'Unauthorized User');
            navigate('/', {replace: true});
        }
    }, []);
    return ( <Component />  );
}
 
export default Protected;