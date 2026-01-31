import './App.css';
import {MostrarEventos} from './Evento/MostrarEvento/MostrarEventos'
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { DetalleEvento } from './Evento/MostrarEvento/DetalleEvento';
import { VerEntarada } from './Evento/MostrarEvento/VerEntrada';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/ui/Buttons/LoginButton';
import LogoutButton from './components/ui/Buttons/LogoutButton';
import Profile from './components/ui/Buttons/Profile';
import { Box, Heading  } from '@chakra-ui/react';
import { useEffect } from 'react';
import {updateApiToken} from './api/api';
import { useAuthPermissions  } from '@/hooks/useAuthPermissions';
import { PERMISSIONS  } from '@/constants/roles';
import {Cloudinary} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { PagoExitoso } from './RetornoPago/PagoExitoso';
import { PagoFallido } from './RetornoPago/PagoFallido';
import { PagoPendiente } from './RetornoPago/PagoPendiente';
import { ScannerQr } from './Scanner/ScannerQr';
import { ValidarStaff } from './ValidarUsuarios/ValidarStaff';
/*
const {user} = useAuth0();
const {getAccessTokenSilently} = useAuth0();
const token = await getAccessTokenSilently();*/
function App() {
  const { isAuthenticated, isLoading, error, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  
  const {hasPermission} = useAuthPermissions();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'duywuj8o3'
    }
  });
  const img = cld
        .image('samples/cloudinary-logo-vector')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(fill().width(150).height(100)); // Transform the image: auto-crop to square aspect_ratio

  
  
  useEffect (() => {
    if (isAuthenticated ){
    getAccessTokenSilently().then((token) => {
    const roles = user?.['roles/roles'] || [];
    
     if (localStorage &&  localStorage.getItem('app_tocken')!==token){
     localStorage.setItem('app_tocken', token)
     }
     localStorage.setItem('app_tocken', token)
     updateApiToken(token);
     if (roles.includes('Staff')){
      navigate(`http://localhost:5173/scanner`);
    }
   });
    }
  }) 


  return (
    <>
      
        <header>
          {import.meta.env.MODE === "test" && <h1> Modo Testing Activado</h1>}
          <AdvancedImage cldImg={img}/>
            <Link to="/">
              Home
            </Link>
          
          {!isAuthenticated && <LoginButton data-cy="logIn"/>}
          { isAuthenticated && (
            <Box display={'flex'} gap={"10px"}>
              <Profile/>
              <LogoutButton/>
            </Box>
            )
          }
        </header>
        
        <Routes>
          <Route path='/' element={ !hasPermission(PERMISSIONS.TICKET_SCAN)?<MostrarEventos isAuthenticated={import.meta.env.MODE === 'test'?true :isAuthenticated}/>:<Heading>No tienes permisos para acceder a esta página</Heading>} />
          <Route path='/scanner' element={ hasPermission(PERMISSIONS.TICKET_SCAN) ? <ScannerQr/> : <Heading>No tienes permisos para acceder a esta página</Heading> }/>
          <Route path='/evento/:nombre' element={<DetalleEvento/>}/>
          <Route path='/evento/:nombre/:id/entradas' element={<VerEntarada/>}/>
          <Route path='/pago-exitoso' element={<PagoExitoso/>}/>
          <Route path='/pago-fallido' element={<PagoFallido/>}/>
          <Route path='/pago-pendiente' element={<PagoPendiente/>}/>
          <Route path='/administrarStaff' element={ <ValidarStaff/>}/>
        </Routes>
      
      
    </>
  );
}

export default App;
