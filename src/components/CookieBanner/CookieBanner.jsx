import { toast } from 'react-toastify';

const CookieBanner = () => {
  const handleIframeLoad = (event) => {
    const iframeDocument = event.target.contentDocument;

    if (iframeDocument && iframeDocument.requestStorageAccess) {
      iframeDocument
        .requestStorageAccess()
        .then(function (access) {
          document
            .hasStorageAccess()
            .then(() => {
              toast.success('¡Acceso al almacenamiento concedido!');
            })
            .catch(() => {
              toast.error('Se ha rechazado el acceso al almacenamiento');
            });
        })
        .catch(function (error) {
          toast.error('No hay API de solicitud');
          console.log('Error al solicitar acceso al almacenamiento:', error);
        });
    }
  };

  return (
    <div>
      <iframe
        title="Tienda Mis Mascotas"
        src={import.meta.env.VITE_API_URL}
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};
export default CookieBanner;
