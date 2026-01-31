import { useAuth0 } from "@auth0/auth0-react";
import { Box, Heading } from "@chakra-ui/react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const ScannerStatusColor = {
    valido: "green.200",
    invalido: "red.200",
    neutro: "gray.200",
} as const;

type validarStatusResponse = {
    isValid: boolean;
    message: string;
}
export function ScannerQr() {
  const { getAccessTokenSilently } = useAuth0();
  const [status, setStatus] = useState<string>(ScannerStatusColor.neutro);

  async function marcarEntradaComoUsada(qrCodeData: string): Promise<validarStatusResponse> {
    const token = localStorage.getItem('app_tocken') || await getAccessTokenSilently();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/ticket/${qrCodeData}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data:", data);
    if (!response.ok) {
      throw new Error(data.message || 'Error al marcar la entrada como usada');
    }
    return data;
  }

  useEffect(() => {
    async function onScanSuccess(decodedText: string) {
      try {
        const response = await marcarEntradaComoUsada(decodedText);
        console.log("response:", response);
        if (response.isValid) {
            setStatus(ScannerStatusColor.valido);
        } else {
            setStatus(ScannerStatusColor.invalido);
            
        }
        alert(response.message);
      } catch (error) {
        console.error('Error al marcar la entrada como usada:', error);
        setStatus(ScannerStatusColor.invalido);
      }
    }

    function onScanFailure(error: any) {
      setStatus(ScannerStatusColor.invalido);
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 5, qrbox: { width: 500, height: 500 } },
      false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <>
      <Heading textAlign="center" marginTop="20px" marginBottom="20px">
        Escanear Código QR
      </Heading>
      <Box id="reader" backgroundColor={status}/>
    </>
);
}
