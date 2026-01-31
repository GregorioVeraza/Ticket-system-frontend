import { useTestAuth0 } from "@/test/TestAuthProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";

// Definimos la forma del token decodificado
interface DecodedToken {
  permissions?: string[];
  role?: string;
  [key: string]: any;
}

// Mock de permisos por rol para testing
const ROLE_PERMISSIONS_MAP: Record<string, string[]> = {
  admin: [
    'event:create',
    'event:update',
    'event:delete',
    'event:view',
    'ticket:buy',
    'ticket:view',
    'ticket:scan',
    'staff:create',
    'role:assign',
    'user:manage',
  ],
  producer: [
    'event:create',
    'event:update',
    'event:delete',
    'event:view',
    'ticket:view',
  ],
  staff: [
    'ticket:scan',
    'ticket:view',
    'event:view',
  ],
  user: [
    'ticket:buy',
    'event:view',
  ],
};

export function useAuthPermissions() {
  const { getAccessTokenSilently, isAuthenticated, user } = import.meta.env.MODE === 'test' ? useTestAuth0() : useAuth0();
  const [permissions, setPermissions] = useState<string[]>([]);

  // Cargar y decodificar el token una vez que el usuario está autenticado
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!isAuthenticated) return;
      try {
        // En testing, Auth0 devuelve datos en user.role
        if (import.meta.env.MODE === 'test' && user?.role) {
          
          const testPermissions = ROLE_PERMISSIONS_MAP[user.role] || [];
          setPermissions(testPermissions);
          console.log("Permisos mock para rol", user.role, ":", testPermissions);
          return;
        }

        // En producción, decodificar el JWT
        const token = await getAccessTokenSilently();
        const decoded = jwtDecode<DecodedToken>(token);
        setPermissions(decoded.permissions || []);
      } catch (err) {
        console.error("Error al obtener permisos:", err);
      }
    };

    fetchPermissions();
  }, [getAccessTokenSilently, isAuthenticated, user?.role]);

  // Función para verificar si el usuario tiene un permiso específico
  const hasPermission = useCallback(
    (perm: string) => permissions.includes(perm),
    [permissions]
  );

  return { permissions, hasPermission };
}

