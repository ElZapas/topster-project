/**
  * @file AboutTab.tsx
  * @description Componente que muestra información sobre el generador de topsters.
 */

export default function AboutTab() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Generador de topsters</h1>
      <p className="text-gray-100 mb-2">
      <span className="font-semibold">Creado por:</span> Fabian Anstro
      </p>
      <p className="text-gray-100 mb-4">
      Este generador de topsters es una herramienta diseñada para ayudarte a crear collages visuales de tus álbumes favoritos. 
      Puedes personalizar tus listas y descargarlas para compartirlas con tus amigos fácilmente.
      </p>
      <p className="text-gray-100">
      Si tienes alguna sugerencia o encuentras algún problema, no dudes en contactarnos <a href="mailto:anstrosolanofabian@gmail.com" className="text-teal-500 underline">aquí</a>. ¡Gracias por usar mi aplicación! :D
      </p>
    </div>
  );
}
