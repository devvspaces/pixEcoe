const common = {
  hello:  "Hola",
  languageSelector:  "Seleccione su idioma",
  language:  "Idioma",
  theme:  "Tema predeterminado",
  save:  "Guardar",
  refreeid:  "ID de evaluador",
  evaluator: "Evaluador",
  refreemail:  "Correo electrónico del evaluador (licencia)",
  webserver:  "Acceso al servidor web",
  urladdress:  "Dirección de url",
  subjectid:  "Id Ecoe",
  pass:  "Contraseña",
  evalua:  "Estaciones",
  setupapi:  "Autenticación de API",
  setuproot:  "Raíz de la aplicación",
  select:  "Seleccionar",
  loadev:  "Cargar estaciones",
  downloadev:  "Descargar estación",
  directory:  "Carpeta",
  downloadcomp:  "Descargar alumnos",
  rootsubtitle:  "Punto de partida para acceder a la carpeta de datos",
  dirsubtitle:  "Nombre de la carpeta donde los archivos requeridos se almacenan y sincronizan utilizando cualquier medida en el directorio de documentos.",
  answsubtitle:  "Nombre del archivo donde los resultados de la evaluación se almacenarán para ser procesados externamente.",
  rootcomp:  "Alumno (CSV)",
  rooteva:  "Evaluación (JSON)",
  rootansw:  "Resultados (JSON)",
  rootcompinf:  "Seleccione el archivo CSV que contiene los datos de los alumnos",
  rootevainf:  "Seleccione el archivo JSON que contiene los datos de evaluación",
  dataload:  "Cargar datos",
  passtext:  "Entre la contraseña del dispositivo",
  password:  "Contraseña",
  id:  "IDENTIFICACIÓN",
  submittext:  "Entregar",
  evaluation:  "Inicio",
  setupt:  "Configuración",
  config:  "Configuración",
  help:  "Ayuda",
  filt:  "Filtrar",
  competlist:  "alumnos",
  test:  "Prueba",
  eco: "Evaluación",
  cevaluate:  "Evaluación actual",
  gwheel:  "Grupo (rueda)",
  status:  "Estado",
  name:  "Nombre",
  group:  "Grupo",
  evainfo:  "Información de evaluación",
  station:  "Estación",
  subject: "Estación",
  loading:  "Cargando....",
  questnum:  "Número de preguntas",
  prev: "Anterior",
  next: "Siguiente",
  evaproce:  "Proceso de evaluación",
  upload:  "SUBIR",
  showm:  "Notas",
  showc:  "Mostrar nombre de la competencia",
  others: "Otros",
  studentsl:  "Lista de alumnos",
  studentstotal:  "Total alumnos",
  devicei:  "Información del dispositivo",
  deviceilang:  "Idioma del dispositivo",
  namei:  "Nombre",
  modeli:  "Modelo",
  versioni:  "Versión",
  uuidi:  "Uuid",
  seriai:  "De serie",
  othersi: "Otros",
  deviceq:  "¿Hay una tableta?",
  devicelan:  "Idioma del dispositivo",
  activec:  "Conexión activa",
  connectty:  "Tipo de conexión",
  lastup:  "Última actualización",
  validl:  "Licencia válida",
  devicetype:  "Esta es una tableta?",
  password:  "Contraseña",
  rpassword:  "Repita la contraseña",
  setpass:  "Establecer contraseña",
};
const navigate = {
  setup:  "Configuración",
  evaluation:  "Inicio",
  configuration:  "Configuración",
  help:  "Ayuda",
};
const help = {
  helptitle:  "Seleccione un tema",
  help1:  "Cómo: Configuración del servidor",
  help2:  "Cómo: Configuración de la raíz de la aplicación",
  help3:  "Filtrando alumnos",
  help4:  "Cambiar idioma",
  help5:  "Base de datos interna",
  help6:  "Marcaje de preguntas",
  help7:  "Subir resultados",
  helpicontitle:  "Lea esta página cuidadosamente y familiarícese con los botones disponibles en la aplicación.",
  helpicon1:  "Ir a inicio aplicación",
  helpicon2:  "Volver a la página anterior",
  helpicon3:  "Ir a la página siguiente",
  helpicon4: "Borrar alumno",
  helpicon5:  "Guardar",
  helpicon6:  "Volver a la página anterior",
  helpicon7:  "Ir a la próxima página",
  helpicon8:  "Información del dispositivo",
  helpicon9:  "Ayuda",
  helpicon10:  "Descargar estaciones o alumnos",
  helpicon11:  "Cargar resultados en la base de datos",
  helpicon12:  "Cambiar el nombre del archivo de resultados",
};
const alert = {
  alert1:  "Contraseña incorrecta.Intentar otra vez.",
  alert2:  "Complete todos los campos requeridos.",
  alert3:  "Formato de respuesta no válido.Por favor revise su API.",
  alert4:  "Se produjo un error inesperado.Vuelva a intentarlo más tarde.",
  alert5:  "No se pudo descargar la evaluación.Por favor intente de nuevo.",
  alert6:  "Seleccione una evaluación antes de descargar.",
  alert7:  "No se pudo descargar el alumno.Por favor intente de nuevo.",
  alert8:  "Se produjo un error durante el proceso de carga de datos.",
  alert9:  "Seleccione un archivo CSV.",
  alert10:  "Se produjo un error al cargar los datos de los alumnos.",
  alert11:  "Seleccione un archivo de evaluación.",
  alert12:  "Seleccione una estación",
  alert13:  "Tanto los datos de alumnos como la evaluación se han cargado con éxito.",
  alert14:  "La contraseña no puede estar vacía.Entre una contraseña.",
  alert15:  "Las contraseñas no coinciden.Por favor intente de nuevo.",
  alert16:  "Evaluación cargada con éxito",
  alert17:  "No se pudo subir la evaluación",
  alert18:  "No se encontraron resultados de evaluación.",
  alert19:  "Se produjo un error inesperado al guardar los resultados de la evaluación.",
  alert20:  "Se produjo un error inesperado",
  alert21:  "Detalles de evaluación no disponibles.",
  alert22:  "No se encontraron resultados de evaluación.",
  alert23:  "Evaluación guardada",
  alert24:  "Los datos de los alumnos no están en el formato esperado.",
  alert25:  "Error al guardar entrada",
  alert26:  "Error de carga de entrada almacenada",
  alert27:  "Error de carga de datos descargados",
  alert28:  "Error al guardar datos de filtro de alumnos",
  filteralert:  "Filtro aplicado con éxito",
  datatext1:  "Los datos evaluados se encuentran en el dispositivo",
  datatext2:  "¿Desea descargar la evaluación lo que implicará la eliminación de los datos existentes?",
  yes:  "Sí",
  no:  "No",
  loadstation:  "Evaluación cargada con éxito",
  loaderrorstation:  "No se pudo cargar la evaluación.Consulte sus credenciales y vuelva a intentarlo.",
  loadonestation: "Descarga correcta",
  loadstudent: "Descarga correcta",
  uploadevaluation:  "¡Evaluación guardada con éxito!",
};
const helpDetails = {
  1: `
1. Vaya a la página de configuración
2. Entre la contraseña inicial para obtener acceso
3. Proporcione la identificación del evaluador
4. Proporcione el correo electrónico del evaluador
5. Puede verificar las casillas de verificación "Ver notas" o "Ver nombre alumno"
6. Entre la dirección de la URL. NOTA: No debe terminar con un back-slash "/"
7. Entre la identificación de la Ecoe
8. Entre la contraseña
9. Después de que se hayan proporcionado todos estos, haga clic en el botón "Cargar estaciones".Esto cargará las estaciones asociadas a la ID de la Ecoe proporcionada.
10. Luego, utilizando el menú desplegable "estaciones", seleccione la estación para descargar en el dispositivo.
11. Luego haga clic en "Descargar estaciones".Supongamos que ya ha comenzado a evaluar una estación anterior que no se ha cargado en el servidor.En ese caso, verá un cuadro de diálogo que confirma si desea anular esos datos almacenados.
12. Haga clic en el botón "Descargar alumnos".
13. Hecho.
  `,
  2: `
1. Vaya a la página de configuración
2. Entre la contraseña inicial para obtener acceso
3. Vaya a la pestaña "App Raíz" haciendo clic en el botón Raíz de la aplicación.
4. Seleccione el archivo de alumnos (archivo CSV).
5. Seleccione el archivo de la estación (archivo JSON).
6. Entre el nombre de la carpeta donde se almacenarán los resultados de la evaluación.
7. No incluyas ".json" en el nombre del archivo
8. Haga clic en "Cargar datos"
9. Hecho.
  `,
  3: `
1. Use el icono de inicio en la navegación inferior para asegurarse de estar en la página de inicio de la aplicación.
2. Haga clic en el botón "Filtrar" en la pantalla.
3. Edite el cuadro de entrada "ID de grupo" para filtrar alumnos para un grupo o rueda.
  `,
  4: `
1. Use el icono de configuración en el NAV inferior para ir a la pantalla de configuración.
2. Allí puede usar el menú desplegable del idioma para cambiar el idioma.
  `,
  5: `
1. Después de evaluar uno o más alumnos, haga clic en el icono de carga.
2. Esto intentará cargar las evaluaciones actuales en el servidor.
3. Si se ha cargado o no, se almacena un archivo localmente como una copia de seguridad para las evaluaciones.
  `,
  6: `
1. Primero, asegúrese de haber filtrado alumnos para una rueda si lo desea.Si no sabe cómo hacer esto, diríjase a la sección de ayuda "Filtrando alumnos".
2. Luego use el icono de inicio en la navegación inferior para asegurarse de estar en la pantalla de inicio de la aplicación.
3. Haga clic en el botón "Eco".
4. Esto cargará y filtrará las evaluaciones para los alumnos actuales.
5. Puede verificar la estación actual y el sujeto en la parte superior de la pantalla.
6. Haga clic en cualquier fila para un alumno para evaluar a ese alumno.Esto lo llevará a la pantalla donde marca este alumno.
7. Puede evaluar al alumno para cada pregunta.
8. Puede usar los iconos "anteriores" y "siguientes" en la parte superior de la pantalla para moverse al alumno anterior o siguiente.
9. Cuando se mueve a diferentes alumnos utilizando los íconos superiores, la evaluación actual se guardará en la base de datos interna.
10. Usando el ícono "Atrás", puede volver a la pantalla "Evaluaciones".
  `,
  7: `
1. Después de evaluar uno o más alumnos después de seguir el proceso de marcado, haga clic en el icono de carga.
2. Asegúrese de estar en la "pantalla de evaluaciones".La pantalla donde se muestra la lista de todas las evaluaciones en una tabla.
3. Haga clic en el icono de carga en la parte superior de la pantalla para cargar los resultados en el servidor y guardarlos en el almacenamiento interno.
  `,
};
export default {
  common,
  navigate,
  help,
  alert,
  helpDetails,
};

