import { createContext, useContext } from "react";

const TestAuthContext = createContext<any>(null);

export function TestAuthProvider({ children }: { children: React.ReactNode }) {
  console.log("TestAuthProvider: Modo de ejecución:", import.meta.env.MODE);
    return (
    <TestAuthContext.Provider
      value={{
        isAuthenticated: true,
        user: {
          role: import.meta.env.VITE_TEST_ROLE || 'user',
          email: 'producer@test.com',
        },
        getAccessTokenSilently: async () => 'test-token',
        loginWithRedirect: () => {},
        logout: () => {},
      }}
    >
      {children}
    </TestAuthContext.Provider>
  );
}

export function useTestAuth0() {
  return useContext(TestAuthContext);
}
