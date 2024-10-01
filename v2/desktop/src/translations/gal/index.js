const common = {
  hello: "Hello",
  languageSelector:  "Selecciona o teu idioma",
  language: "Idioma",
  theme:  "Tema predeterminado",
  save: "Garda",
  refreeid:  "ID do avaliador",
  evaluator: "Avaliador",
  refreemail:  "Correo electrónico do avaliador (licenza)",
  webserver: "Web Server Access",
  urladdress:  "Enderezo de URL",
  subjectid: "Id Acoe",
  pass:  "Contrasinal",
  evalua:  "Estacións",
  setupapi: "API Autenticación",
  setuproot: "App Root",
  select:  "Selecciona",
  loadev: "Descargar estacions",
  downloadev:  "Descargar estación",
  directory: "Directorio",
  downloadcomp: "Descargar estudiantes",
  rootsubtitle:  "Este é o punto de partida para acceder ao cartafol de datos",
  dirsubtitle: "O nome do cartafol onde se almacenan e sincronizan os ficheiros necesarios mediante calquera medida do directorio do documento.",
  answsubtitle: "Este é o nome do ficheiro onde se almacenarán os resultados da avaliación para ser procesados externamente.",
  rootcomp: "Alumnos (CSV)",
  rooteva:  "Avaliación (JSON)",
  rootansw:  "Resultados (JSON)",
  rootcompinf:  "Seleccione o ficheiro CSV que contén os datos dos alumnos",
  rootevainf:  "Seleccione o ficheiro JSON que contén os datos de avaliación",
  dataload:  "Datos de carga",
  passtext:  "Introduza o contrasinal do dispositivo",
  password:  "Contrasinal",
  id:  "Id",
  submittext:  "Enviar",
  evaluation:  "Inicio",
  setupt: "Configuración",
  config: "Configuración",
  help: "Axuda",
  filt:  "Filtro",
  competlist:  "Estudantes",
  test:  "Proba",
  eco: "Avaliación",
  cevaluate:  "Avaliación actual",
  gwheel:  "Grupo (roda)",
  status: "Status",
  name:  "Nome",
  group:  "Grupo",
  evainfo:  "Información de avaliación",
  station: "Estación",
  subject: "Acoe",
  loading: "Carregando....",
  questnum:  "Número de pregunta",
  prev: "Anterior",
  next: "Seguinte",
  evaproce: "Proceso de avaliación",
  upload:  "Carga",
  showm:  "Mostrar marcajes",
  showc: "Mostrar nomes alumnos",
  others:  "Outros",
  studentsl: "Lista alumnos",
  studentstotal:  "Estudantes en total",
  devicei: "Info dispositivo",
  deviceilang: "Idioma do dispositivo",
  namei:  "Nome",
  modeli:  "Modelo",
  versioni:  "Versión",
  uuidi:  "UUID",
  seriai: "Serial",
  othersi:  "Outros",
  deviceq: "Hai unha tableta?",
  devicelan:  "Idioma do dispositivo",
  activec:  "Conexión activa",
  connectty:  "Tipo de conexión",
  lastup:  "Última actualización",
  validl:  "Licenza válida",
  devicetype:  "Esta é unha tableta?",
  password: "Contrasinal",
  rpassword:  "Repita o contrasinal",
  setpass:  "Establecer o contrasinal",
};
const navigate = {
  setup:  "Configuración",
  evaluation:  "Inicio",
  configuration:  "Configuración",
  help:  "Axuda",
};
const help = {
  helptitle:  "Selecciona un tema",
  help1: "Como: configurar servidor",
  help2:  "Como: Configuración da raíz da aplicación",
  help3:  "Filtrando alumnos",
  help4:  "Cambiando o idioma",
  help5: "Base de datos interna",
  help6: "Evaluando",
  help7:  "Cargando resultados",
  helpicontitle:  "Lea con atención esta páxina e coñece os botóns dispoñibles na aplicación",
  helpicon1:  "Vaia á aplicación a casa",
  helpicon2:  "Volver á páxina anterior",
  helpicon3:  "Adiante á seguinte páxina",
  helpicon4:  "Elimina un alumno",
  helpicon5:  "Gardar",
  helpicon6:  "Volver á páxina avaliación anterior",
  helpicon7:  "Adiante á seguinte páxina avaliación",
  helpicon8:  "Información do dispositivo",
  helpicon9:  "Axuda",
  helpicon10: "Download stations or competitors",
  helpicon11:  "Carga resultados á base de datos",
  helpicon12:  "Cambiar os resultados do nome do ficheiro",
};
const alert = {
  alert1:  "Contrasinal incorrecto.Téntao de novo.",
  alert2:  "Encha todos os campos necesarios.",
  alert3:  "Formato de resposta non válido.Comprobe a túa API.",
  alert4:  "Produciuse un erro inesperado.Téntao de novo máis tarde.",
  alert5:  "Non puido descargar a avaliación.Por favor, téntao de novo.",
  alert6:  "Seleccione unha avaliación antes de descargar.",
  alert7:  "Non puido descargar o alumno.Por favor, téntao de novo.",
  alert8:  "Durante o proceso de carga de datos produciuse un erro.",
  alert9:  "Seleccione un ficheiro CSV.",
  alert10:  "Produciuse un erro ao cargar datos dos estudantes.",
  alert11: "Please select an evaluation file.",
  alert12:  "Seleccione unha estación",
  alert13:  "Tanto os datos de alumnos como de avaliación cargáronse con éxito.",
  alert14:  "O contrasinal non pode estar baleiro.Insira un contrasinal.",
  alert15:  "Os contrasinais non coinciden.Por favor, téntao de novo.",
  alert16:  "Avaliación cargouse con éxito",
  alert17:  "Non puido cargar a avaliación",
  alert18:  "Non se atoparon resultados de avaliación.",
  alert19: "An unexpected error occurred while saving evaluation results.",
  alert20:  "Produciuse un erro inesperado",
  alert21:  "Os detalles da avaliación non dispoñibles.",
  alert22:  "Non se atoparon resultados de avaliación.",
  alert23:  "Avaliación gardada",
  alert24:  "Os datos dos alumnos non están no formato esperado.",
  alert25:  "Erro ao gardar entrada",
  alert26:  "Erro ao cargar a entrada almacenada",
  alert27:  "Erro ao cargar datos descargados",
  alert28:  "Erro do aforro de datos de alumnos filtrados",
  filteralert: "Filter applied successfully",
  datatext1:  "Os datos avaliados atópanse no dispositivo",
  datatext2:  "¿Quere continuar coa descarga da avaliación que producirá a eliminación dos datos existentes?",
  yes:  "Si",
  no:  "Non",
  loadstation:  "Avaliación cargada con éxito",
  loaderrorstation:  "Non puido cargar a avaliación.Comprobe as súas credenciais e téntao de novo.",
  loadonestation:  "Descargar éxito",
  loadstudent:  "Descargar éxito",
  uploadevaluation:  "Avaliación gardada con éxito!",
};
const helpDetails = {
  1: `
	1. Vaia á páxina de configuración
	2. Insira o contrasinal inicial para acceder
	3. Proporcione o ID do avaliador
	4. Proporcione o correo electrónico do avaliador
	5. Podes consultar as caixas de verificación "Mostrar marcas" ou "mostrar o nome dos alumnos"
	6. Introduza o enderezo URL.NOTA: Non debe rematar cunha traseira "/"
	7. Introduza o ID do asunto
	8. Insira o contrasinal
	9. Despois de que se forneceron todo isto, faga clic no botón "Carga de estacións".Isto cargará o estado para o ID de suxeito proporcionado.
	10. A continuación, usando o despregable "Estacións", seleccione a estación para descargar para o dispositivo.
	11. A continuación, faga clic en "Estacións de descarga".Supoña que xa comezou a avaliar unha estación anterior que non se subiu ao servidor.Nese caso, verás un cadro de diálogo confirmando se desexa anular eses datos almacenados.
	12. Faga clic no botón "Descargar estudantes".
	13. Feito.
  `,
  2: `
	1. Vaia á páxina de configuración
	2. Insira o contrasinal inicial para acceder
	3. Vaia á pestana "App Root" facendo clic no botón raíz da aplicación.
	4. Seleccione o ficheiro Alumnos (CSV file).
	5. Seleccione o ficheiro da estación (ficheiro JSON).
	6. Insira o nome do cartafol onde se almacenarán os resultados da avaliación.
	7. Non inclúa ".json" no nome do ficheiro
	8. Faga clic en "Cargar datos"
	9. Feito.
  `,
  3: `
	1. Use a icona do fogar na navegación inferior para asegurarse de que estea na páxina de inicio da aplicación.
	2. Faga clic no botón "Filtrar" da pantalla.
	3. Edite a caixa de entrada "ID de grupo" para filtrar alumnos para un grupo ou roda.
  `,
  4: `
	1. Use a icona de configuración na navegación inferior para ir á pantalla de configuración.
	2. Aí podes usar o despregable da linguaxe para cambiar a linguaxe.
  `,
  5: `
	1. Despois de avaliar un ou varios alumnos, faga clic na icona de carga.
		2. This will try to upload the current evaluations to the server.
	3. Se ten éxito ou non, un ficheiro almacénase localmente como copia de seguridade para as avaliacións.
  `,
  6: `
	1. En primeiro lugar, asegúrese de ter filtrado alumnos para unha roda se queres.Se non sabes como facelo, diríxete á sección "Filtrando alumnos".
	2. A continuación, use a icona do fogar na navegación inferior para asegurarse de que estea na pantalla de inicio da aplicación.
	3. Fai clic no botón "avaliació".
	4. Isto cargará e filtrará as avaliacións para os alumnos actuais.
	5. Pode verificar a estación actual e estación na parte superior da pantalla.
	6. Fai clic en calquera fila dun alumno para avaliar ese alumno. Isto levarache á pantalla onde marcas este alumno.
	7. Podes avaliar o alumno para cada pregunta.
	8. Podes usar as iconas "anteriores" e "seguintes" na parte superior da pantalla para pasar ao alumno anterior ou seguinte.
	9. Cando se traslade a diferentes alumnos usando as iconas superiores, a avaliación actual gardarase na base de datos interna.
	10. Usando a icona "Back" pode volver á pantalla "Avaliacións".
  `,
  7: `
1. Despois de avaliar a un ou varios alumnos despois de seguir o proceso de marcaxe, faga clic na icona de carga.
2. Asegúrese de estar na "pantalla de avaliacións".A pantalla onde se amosa a lista de todas as avaliacións nunha táboa.
3. Faga clic na icona de carga na parte superior da pantalla para cargar os resultados ao servidor e gardalos no almacenamento interno.
  `,
};
export default {
  common,
  navigate,
  help,
  alert,
  helpDetails,
};

