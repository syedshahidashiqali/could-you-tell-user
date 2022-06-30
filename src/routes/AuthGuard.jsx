import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getUser } from "../Services/Auth";
import { getAccessToken } from "../Util/helpers";

export default function AuthGuard({children}) {
    const navigate = useNavigate();
    
    // disallow user to access this page if user is loggedin 
      useEffect(() => {
          if(getAccessToken()){
              navigate("/", { replace: true });

        }
      }, []);
  return (
    <>
    {children}  
    </>
  )
}
