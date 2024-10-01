const common = {
  hello:  "Hola",
  languageSelector:  "Seleccioneu el vostre idioma",
  language:  "Llengua",
  theme:  "Tema per defecte",
  save:  "Desa",
  refreeid:  "Identificador de l'avaluació",
  evaluator:  "Avaluador",
  refreemail:  "Correu electrònic d’avaluació (llicència)",
  webserver:  "Accés al servidor web",
  urladdress:  "Adreça de l'URL",
  subjectid:  "Id Ecoe",
  pass:  "Contrasenya",
  evalua:  "Estacions",
  setupapi:  "Autenticació API",
  setuproot:  "Arrel de l'aplicació",
  select:  "Seleccionar",
  loadev:  "Carregar estacions",
  downloadev:  "Descarregar estació",
  directory:  "Directori",
  downloadcomp:  "Descarregar estudiants",
  rootsubtitle:  "Punt de partida per accedir a la carpeta de dades",
  dirsubtitle:  "Nom de la carpeta on s’emmagatzemen i es sincronitzen els fitxers necessaris mitjançant qualsevol mesura al directori de documents.",
  answsubtitle:  "Nom del fitxer on es guardaran els resultats de l'avaluació per processar-los externament.",
  rootcomp:  "estudiants (CSV)",
  rooteva:  "Avaluació (JSON)",
  rootansw:  "Resultats (JSON)",
  rootcompinf:  "Seleccioneu el fitxer CSV que conté les dades dels estudiants",
  rootevainf:  "Seleccioneu el fitxer JSON que conté les dades d'avaluació",
  dataload:  "Carregueu les dades",
  passtext:  "Introduïu la contrasenya del dispositiu",
  password:  "Contrasenya",
  id:  "Id",
  submittext:  "Enviar",
  evaluation:  "Inici",
  setupt:  "Configuració",
  config:  "Configuració",
  help:  "Ajudar",
  filt:  "Filtre",
  competlist:  "Estudiants",
  test:  "Provar",
  eco:  "Avaluació",
  cevaluate:  "Avaluació actual",
  gwheel:  "Grup (roda)",
  status:  "Estat",
  name:  "Nom",
  group:  "Agrupar",
  evainfo:  "Informació d'avaluació",
  station:  "Estació",
  subject:  "Estació",
  loading:  "Carregant ....",
  questnum:  "Número de preguntes",
  prev:  "Previ",
  next:  "Següent",
  evaproce:  "Procés d'avaluació",
  upload:  "Penjar",
  showm:  "Mostra marques",
  showc:  "Mostra el nom dels estudiants",
  others:  "Altres",
  studentsl:  "Llista d’estudiants",
  studentstotal:  "Els estudiants en total",
  devicei:  "Informació del dispositiu",
  deviceilang:  "Idioma del dispositiu",
  namei:  "Nom",
  modeli:  "Model",
  versioni:  "Versió",
  uuidi:  "Uuid",
  seriai:  "Serial",
  othersi:  "Altres",
  deviceq:  "Hi ha una tauleta?",
  devicelan:  "Idioma del dispositiu",
  activec:  "Connexió activa",
  connectty:  "Tipus de connexió",
  lastup:  "Última actualització",
  validl:  "Llicència vàlida",
  devicetype:  "Aquesta és una tauleta?",
  password:  "Contrasenya",
  rpassword:  "Repetiu la contrasenya",
  setpass:  "Establiu la contrasenya",
};
const navigate = {
  setup:  "Configuració",
  evaluation:  "Inici",
  configuration:  "Configuració",
  help:  "Ajudar",
};
const help = {
  helptitle:  "Seleccioneu un tema",
  help1:  "Com fer: Configuració del servidor",
  help2:  "Com: Configuració de l'arrel d'aplicacions",
  help3:  "Filtrant estudiants",
  help4:  "Canviar l'idioma",
  help5:  "Base de dades interna",
  help6:  "Marcar preguntes",
  help7:  "Penjar els resultats",
  helpicontitle:  "Llegiu atentament aquesta pàgina i familiaritzeu -vos amb els botons disponibles a l’aplicació",
  helpicon1:  "Vés a App Home",
  helpicon2:  "Tornar a la pàgina anterior",
  helpicon3:  "Envieu a la pàgina següent",
  helpicon4:  "Suprimeix un estudiant",
  helpicon5:  "Desa",
  helpicon6:  "Tornar a la pàgina anterior",
  helpicon7:  "Envieu a la propera pàgina",
  helpicon8:  "Informació del dispositiu",
  helpicon9:  "Ajuda",
  helpicon10:  "Descarregueu estacions o estudiants",
  helpicon11:  "Pengeu els resultats a la base de dades",
  helpicon12:  "Canvieu el nom del fitxer de resultats",
};
const alert = {
  alert1:  "Contrasenya incorrecta.Torneu-ho a provar.",
  alert2:  "Empleneu tots els camps obligatoris.",
  alert3:  "Format de resposta no vàlid.Comproveu la vostra API.",
  alert4:  "S'ha produït un error inesperat.Torneu-ho a provar més tard.",
  alert5:  "No s'ha pogut descarregar l'avaluació.Torneu-ho a provar.",
  alert6:  "Seleccioneu una avaluació abans de descarregar.",
  alert7:  "No s'ha pogut descarregar el estudiant.Torneu-ho a provar.",
  alert8:  "S'ha produït un error durant el procés de càrrega de dades.",
  alert9:  "Seleccioneu un fitxer CSV.",
  alert10: "S'ha produït un error en carregar les dades de l'estudiant.",
  alert11:  "Seleccioneu un fitxer d'avaluació.",
  alert12:  "Seleccioneu una estació",
  alert13:  "Tant les dades del estudiant com de l’avaluació s’han carregat amb èxit.",
  alert14:  "La contrasenya no pot estar buida.Introduïu una contrasenya.",
  alert15:  "Les contrasenyes no coincideixen.Torneu-ho a provar.",
  alert16:  "L'avaluació s'ha penjat correctament",
  alert17:  "No s'ha pogut carregar l'avaluació",
  alert18:  "No es van trobar resultats d’avaluació.",
  alert19:  "S'ha produït un error inesperat en desar resultats d'avaluació.",
  alert20:  "S'ha produït un error inesperat",
  alert21:  "Detalls de l'avaluació no disponibles.",
  alert22:  "No es van trobar resultats d’avaluació.",
  alert23:  "Avaluació desada",
  alert24:  "Les dades dels competidors no tenen el format esperat.",
  alert25:  "Entrada d'estalvi d'errors",
  alert26:  "Error de carregar l'entrada emmagatzemada",
  alert27:  "Error de càrrega de dades descarregades",
  alert28:  "Desar les dades del estudiant filtrades",
  filteralert:  "Filtre aplicat amb èxit",
  datatext1: "Evaluated data is found on the device",
  datatext2:  "Voleu procedir a la descàrrega de l'avaluació que resultarà en la supressió de les dades existents?",
  yes:  "Sí",
  no: "No",
  loadstation:  "L'avaluació s'ha carregat amb èxit",
  loaderrorstation:  "No s'ha pogut carregar l'avaluació.Comproveu les vostres credencials i Torneu-ho a provar.",
  loadonestation:  "Descarregar èxit",
  loadstudent: "Download Successful",
  uploadevaluation:  "L'avaluació es va desar amb èxit.",
};
const helpDetails = {
  1: `
    1. Aneu a la pàgina de configuració
    2. Introduïu la contrasenya inicial per accedir-hi
    3. Proporcioneu l'identificador de l'avaluador
    4. Proporcioneu el correu electrònic de l'avaluador
    5. Podeu marcar les caselles de selecció "Mostrar marques" o "Mostrar el nom dels estudiants".
    6. Introduïu l'adreça URL. Nota: no ha d'acabar amb una barra invertida "/"
    7. Introduïu l'identificador de l'ECOE
    8. Introduïu la contrasenya
    9. Després d'haver proporcionat tots aquests, feu clic al botó "Càrrega estacions". Això carregarà les estacions de l'Ecoe.
    10. A continuació, utilitzant el menú desplegable "Estacions", seleccioneu l'estació que voleu descarregar per al dispositiu.
    11. A continuació, feu clic a "Descarrega estacion". Suposem que ja heu començat a avaluar una estació anterior que no s'ha carregat al servidor. En aquest cas, veureu un quadre de diàleg que confirma si voleu anul·lar les dades emmagatzemades.
    12. Feu clic al botó "Descarrega estudiants".
    13. Fet.
  `,
  2: `
    1. Vés a la pàgina de configuració
    2. Introduïu la contrasenya inicial per accedir-hi
    3. Vés a la pestanya "Root App" fent clic al botó Root App.
    4. Seleccioneu el fitxer Estudiants (CSV file).
    5. Seleccioneu el fitxer Estacionss (JSON file).
    6. Introduïu el nom de la carpeta on es guardaran els resultats de l'avaluació.
    7. Don’t include ".json" in the file name
    8. Feu clic a "Dades de càrrega"
    9. Fet.
  `,
  3: `
    1. Utilitzeu la icona d'inici del NAV inferior per assegurar-vos que esteu a la pàgina d'inici de l'aplicació.
    2. Feu clic al botó "Filtre" de la pantalla.
    3. Editeu el quadre d'entrada "Identificador de grup" per filtrar els estudiants per a un grup o roda.
  `,
  4: `
    1. Utilitzeu la icona de configuració del NAV inferior per anar a la pantalla de configuració.
    2. Allà podeu utilitzar el menú desplegable Idioma per canviar l'idioma.
  `,
  5: `
    1. Després d’avaluar un o més estudiants, feu clic a la icona de càrrega.
    2. Això intentarà carregar les avaluacions actuals al servidor.
    3. Si té èxit o no, un fitxer s’emmagatzema localment com a còpia de seguretat per a les avaluacions.
  `,
  6: `
	1. Primer, assegureu -vos que tingueu estudiants filtrats per a una roda si voleu.Si no sabeu fer -ho, dirigiu -vos a la secció Ajuda de "Filtratge dels estudiants".
	2. A continuació, utilitzeu la icona d'inici del NAV inferior per assegurar -vos que esteu a la pantalla d'inici de l'aplicació.
	3. Feu clic al botó "ECO".
	4. Això carregarà i filtrarà les avaluacions dels estudiants actuals.
	5. Podeu verificar l'estació actual i el subjecte a la part superior de la pantalla.
	6. Feu clic a qualsevol fila perquè un estudiant avalui aquest estudiant.Això us portarà a la pantalla on marqueu aquest estudiant.
    7. Podeu avaluar el estudiant per a cada pregunta.
    8. Podeu utilitzar les icones "anterior" i "següent" a la part superior de la pantalla per passar al estudiant anterior o següent.
	9. Quan es traslladi a diferents estudiants mitjançant les icones superiors, l'avaluació actual es desarà a la base de dades interna.
    10. Mitjançant la icona "enrere" podeu tornar a la pantalla "Avaluacions".
  `,
  7: `
	1. Després d’avaluar un o més estudiants després de seguir el procés de marcatge, feu clic a la icona de càrrega.
    2. Assegureu-vos que esteu a la "pantalla d'avaluacions". La pantalla on es mostra la llista de totes les avaluacions en una taula.
    3. Feu clic a la icona de càrrega a la part superior de la pantalla per carregar els resultats al servidor i desar-los a l'emmagatzematge intern.
  `,
};
export default {
  common,
  navigate,
  help,
  alert,
  helpDetails,
};

