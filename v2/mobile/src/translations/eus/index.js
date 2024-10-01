const common = {
  hello:  "Agur",
  languageSelector:  "Hautatu zure hizkuntza",
  language:  "Mintzaira",
  theme:  "Lehenetsitako gaia",
  save:  "Aurreztu",
  refreeid:  "Ebaluatzailearen IDa",
  evaluator:  "ESegitu",
  refreemail:  "Ebaluatzaileen posta elektronikoa (lizentzia)",
  webserver:  "Web zerbitzariaren sarbidea",
  urladdress:  "URL helbidea",
  subjectid:  "Gaiaren IDa",
  pass:  "Kontrazeinu",
  evalua:  "Katitul",
  setupapi: "API Authentication",
  setuproot: "App Root",
  select:  "Hautatu",
  loadev:  "Karga geltokiak",
  downloadev:  "Deskargatu geltokiak",
  directory:  "Direktorio",
  downloadcomp: "Download students",
  rootsubtitle: "This is the starting point to access the data folder",
  dirsubtitle:  "Beharrezko fitxategiak non dauden dokumentu direktorioko neurriak erabiliz gorde eta sinkronizatzen diren.",
  answsubtitle:  "Hau da fitxategiaren izena, ebaluazioaren emaitzak kanpotik prozesatu ahal izateko gordeko baitira.",
  rootcomp:  "Lehiakidea (CSV)",
  rooteva:  "Ebaluazioa (JSON)",
  rootansw:  "Emaitzak (JSON)",
  rootcompinf:  "Hautatu lehiakideen datuak biltzen dituen CSV fitxategia",
  rootevainf:  "Hautatu ebaluazio datuak dituen JSON fitxategia",
  dataload: "Load Data",
  passtext: "Enter Device Password",
  password:  "Kontrazeinu",
  id:  "Id",
  submittext: "Submit",
  evaluation:  "Etxe",
  setupt:  "Ezarri",
  config:  "Konfigurazio",
  help:  "Laguntza",
  filt:  "Iragazki",
  competlist:  "Ikasle",
  test:  "Saiatu",
  eco:  "Eko",
  cevaluate:  "Oraingo ebaluazioa",
  gwheel: "Group (Wheel)",
  status:  "Kokapen",
  name:  "Izen",
  group:  "Talde",
  evainfo:  "Ebaluazio informazioa",
  station:  "Gune",
  subject:  "Menperatu",
  loading:  "Kargatzen ....",
  questnum: "Question Number",
  prev:  "Aldez aurreko",
  next: "Next",
  evaproce: "Evaluation Process",
  upload: "UPLOAD",
  showm:  "Erakutsi markak",
  showc:  "Erakutsi lehiakideen izena",
  others:  "Beste",
  studentsl:  "Ikasleen zerrenda",
  studentstotal:  "Ikasleak guztira",
  devicei:  "Gailuaren informazioa",
  deviceilang:  "Gailuaren hizkuntza",
  namei:  "Izen",
  modeli:  "Eredu",
  versioni:  "Bertsio",
  uuidi:  "Uued",
  seriai:  "Seri",
  othersi:  "Beste",
  deviceq: "There is a tablet?",
  devicelan:  "Gailuaren hizkuntza",
  activec:  "Konexio aktiboa",
  connectty:  "Konexio mota",
  lastup:  "Azken eguneraketa",
  validl:  "Baliozko lizentzia",
  devicetype:  "Hau tablet bat da?",
  password:  "Kontrazeinu",
  rpassword: "Repeat Password",
  setpass:  "Pasahitza ezarri",
};
const navigate = {
  setup:  "Ezarri",
  evaluation:  "Etxe",
  configuration:  "Konfigurazio",
  help:  "Laguntza",
};
const help = {
  helptitle:  "Hautatu gai bat",
  help1:  "Nola: Zerbitzariaren konfigurazioa",
  help2: "How to: App root setup",
  help3:  "Lehiakideak iragaztea",
  help4:  "Hizkuntza aldatzea",
  help5: "Internal Database",
  help6:  "Galderak markatzea",
  help7:  "Kargatzeko emaitzak",
  helpicontitle: "Read this page carefully and become familiar with available buttons in the application",
  helpicon1: "Go to App Home",
  helpicon2:  "Aurreko orrialdera itzuli",
  helpicon3:  "Aurrera hurrengo orrialdera",
  helpicon4:  "Lehiakide bat ezabatu",
  helpicon5:  "Aurreztu",
  helpicon6:  "Aurreko Eko aurreko orrialdera",
  helpicon7:  "Aurrera hurrengo Eko orrialdera",
  helpicon8:  "Gailuaren informazioa",
  helpicon9:  "Laguntza",
  helpicon10: "Download stations or competitors",
  helpicon11:  "Kargatu emaitzak datu-basean",
  helpicon12:  "Aldatu emaitzak fitxategiaren izena",
};
const alert = {
  alert1:  "Pasahitz okerra.Saiatu berriro.",
  alert2:  "Bete beharrezko eremu guztiak.",
  alert3:  "Erantzun formatu baliogabea.Mesedez, egiaztatu zure APIa.",
  alert4:  "Ustekabeko errorea gertatu da.Saiatu berriro geroago.",
  alert5:  "Ezin izan da ebaluazioa deskargatzean.Saiatu berriro.",
  alert6:  "Mesedez, hautatu ebaluazio bat deskargatu aurretik.",
  alert7:  "Huts egin du lehiakide deskargatzean.Saiatu berriro.",
  alert8:  "Errore bat gertatu da datuen karga prozesuan.",
  alert9:  "Mesedez, hautatu CSV fitxategia.",
  alert10: "An error occurred while loading student data.",
  alert11:  "Mesedez, aukeratu ebaluazio fitxategia.",
  alert12:  "Mesedez, aukeratu geltokia",
  alert13:  "Lehiakide eta ebaluazio datuak behar bezala kargatu dira.",
  alert14:  "Pasahitza ezin da hutsik egon.Idatzi pasahitza.",
  alert15:  "Pasahitzak ez datoz bat.Saiatu berriro.",
  alert16:  "Ebaluazioa behar bezala igo da",
  alert17:  "Ezin izan da ebaluazioa igo",
  alert18:  "Ez da ebaluazio emaitzak aurkitu.",
  alert19: "An unexpected error occurred while saving evaluation results.",
  alert20:  "Ustekabeko errorea gertatu da",
  alert21:  "Ebaluazio xehetasunak ez daude erabilgarri.",
  alert22:  "Ez da ebaluazio emaitzak aurkitu.",
  alert23:  "Ebaluazioa gorde da",
  alert24:  "Lehiakideen datuak ez daude espero den formatuan.",
  alert25:  "Errorea sarrera gordetzean",
  alert26:  "Errorea gordetako sarrera kargatzean",
  alert27:  "Errorea deskargatutako datuak kargatzean",
  alert28:  "Errorea iragazitako lehiakideen datuak gordetzean",
  filteralert:  "Iragazkia ondo aplikatu da",
  datatext1:  "Ebaluatutako datuak gailuan aurkitzen dira",
  datatext2:  "Ebaluazioa deskargatzearekin jarraitu nahi al duzu lehendik dauden datuak ezabatzea ekarriko duena?",
  yes:  "Bai",
  no: "No",
  loadstation:  "Ebaluazioa behar bezala kargatuta",
  loaderrorstation:  "Ezin izan da ebaluazioa kargatu.Mesedez, egiaztatu zure egiaztagiriak eta saiatu berriro.",
  loadonestation:  "Deskargatu arrakastatsua",
  loadstudent:  "Deskargatu arrakastatsua",
  uploadevaluation:  "Ebaluazioa arrakastaz gorde da!",
};
const helpDetails = {
  1: `
1. Joan Konfigurazio orrialdera
2. Idatzi sarbidea lortzeko hasierako pasahitza
3. Eman ebaluatzailearen IDa
    4. Provide the Evaluator's Email
5. XH. "Erakutsi Marken" edo "Show lehiakideen izena" kontrol-laukiak egiaztatu ditzakezu
    6. Enter the URL address. Note: It must not end with a back-slash "/"
7. Idatzi Gaiaren IDa
8. Idatzi pasahitza
9. Hauek guztiak eman ondoren, egin klik "Karga geltokiak" botoian.Honek emandako gaiaren IDaren egoera kargatuko du.
10. Ondoren, "geltokiak" goitibehera erabiliz, hautatu geltokia gailua deskargatzeko.
11. Ondoren, egin klik "Download Stations" botoian.Demagun dagoeneko zerbitzarira igo ez den aurreko geltokia ebaluatzen hasi zarela.Kasu horretan, elkarrizketa-koadroa ikusiko duzu baieztatutako datuak gorde nahi badituzu.
12. Egin klik "Deskargatu ikasleen" botoian.
13. Egina.
  `,
  2: `
1. Joan Konfigurazio orrialdera
    2. Enter the initial password to gain access
3. Joan "App Root" fitxara aplikazioaren erro botoian klik eginez.
4. Hautatu ikasleen fitxategia (CSV fitxategia).
5. Aukeratu geltokiko fitxategia (JSON fitxategia).
6. Idatzi ebaluazio emaitzak gordeko diren karpetaren izena.
7. Ez sartu ".json" fitxategiaren izenean
8. Egin klik "Kargatu datuak" botoian
9. Egina.
  `,
  3: `
    1. Use the Home icon on the bottom nav to ensure you are on the App home page.
2. Egin klik pantailan dagoen "iragazkiaren" botoian.
3. Editatu "Talde IDa" sarrera-laukia talde edo gurpildun lehiakideak iragazteko.
  `,
  4: `
1. Erabili konfigurazio ikonoa beheko orrialdean konfigurazio pantailara joateko.
2. Hizkuntzaren goitibeherako hizkuntza erabil dezakezu hizkuntza aldatzeko.
  `,
  5: `
    1. After evaluating one or more competitors, click on the upload icon.
2. Hau uneko ebaluazioak zerbitzarira igotzen saiatuko da.
3. Arrakasta izanez gero edo ez bada, fitxategi bat lokalean gordetzen da ebaluazioetarako segurtasun kopia gisa.
  `,
  6: `
1. Lehenik eta behin, ziurtatu nahi izanez gero, lehiakideak iragazi dituzula.Ez badakizu nola egin, joan "lehiakide iragazkiak" laguntza atalean.
2. Ondoren, erabili etxeko ikonoa beheko orrian aplikazioaren hasierako pantailan zaudela ziurtatzeko.
3. Egin klik "ECO" botoian.
4. Honek ebaluazioak kargatu eta iragazi egingo ditu egungo lehiakideei.
5. Egungo geltokia eta gaia pantailaren goiko aldean egiaztatu dezakezu.
6. Egin klik lehiakide hori ebaluatzeko lehiakide baten edozein errenkadan.Honek lehiakide hau markatzen duzun pantailara eramango zaitu.
7. Galdera bakoitzerako lehiakidea ebaluatu dezakezu.
8. Pantailaren goiko aldean "aurreko" ikonoak eta "hurrengo" ikonoak erabil ditzakezu aurreko edo hurrengo lehiakide izatera.
9. Goi-ikonoak erabiliz lehiakide desberdinetara joaten zarenean, uneko ebaluazioa barne datu-basean gordeko da.
10. "Atzera" ikonoa erabiltzea "Ebaluazioak" pantailara itzuli zaitezke.
  `,
  7: `
1. Lehiakide bat edo gehiago ebaluatu ondoren, markatze prozesua jarraitu ondoren, egin klik Kargatu ikonoan.
2. Ziurtatu "ebaluazioen pantailan" zaudela.Ebaluazio guztien zerrenda taula batean agertzen den pantaila.
3. Egin klik Kargatu ikonoan pantailaren goiko aldean emaitzak zerbitzarira igotzeko eta gorde itzazu barne biltegian.
  `,
};
export default {
  common,
  navigate,
  help,
  alert,
  helpDetails,
};

