import { Button, FileUpload, Icon, Box, useFileUploadContext} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu"

export function UploadManual({ onUpload }: { onUpload: (url: string) => void }) {
  
  
  const fileUpload = useFileUploadContext();
  const handleUpload = async () => {
    if (import.meta.env.MODE === 'test') {
      console.log("Test mode: Simulating upload");
      onUpload('test-image-public-id');
      return;
    }
  if (!fileUpload.acceptedFiles || fileUpload.acceptedFiles.length === 0) return;

  const file = fileUpload.acceptedFiles[0]; // este es el File real
    console.log("Uploading file:", file);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "proveedorUnsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/duywuj8o3/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  console.log("Upload response:", json);
  onUpload(json.public_id);
};


  return (
    <>
      
      <FileUpload.RootProvider value={fileUpload} width="-webkit-fill-available">
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List clearable/>
    </FileUpload.RootProvider>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    

      <Button onClick={handleUpload} colorScheme="blue" mt={2}>
        Subir imagen
      </Button>
    </>
  );
}
