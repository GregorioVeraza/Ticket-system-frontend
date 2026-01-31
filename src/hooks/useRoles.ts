import { useAuth0 } from "@auth0/auth0-react";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState, useCallback } from "react";

/** Estructura del token (solo lo que nos interesa) */
interface DecodedToken {
  [key: string]: any; // para claims personalizados
  sub?: string;
  permissions?: string[];
}

/**
 * Hook para obtener los roles del usuario desde el token de Auth0
 */
export const useRoles = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!isAuthenticated) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently();
        const decoded: DecodedToken = jwtDecode(token);

        // 👇 Cambiá esta URL por el "Identifier" de tu API
        const rolesClaim = decoded[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`];
        console.log("Decoded roles claim:", rolesClaim);
        if (Array.isArray(rolesClaim)) {
          setRoles(rolesClaim);
        } else {
          setRoles([]);
        }
      } catch (err) {
        console.error("Error obteniendo roles:", err);
        setError("No se pudieron obtener los roles del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [getAccessTokenSilently, isAuthenticated]);

  const hasRol = useCallback(
    (rol:string) => 
        !loading && roles.includes(rol)
        
    ,
    [roles, loading]
  );
  return { roles, loading, error, hasRol };
};
