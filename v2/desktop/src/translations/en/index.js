const common = {
  hello: "Hello",
  languageSelector: "Select Your Language",
  language: "Language",
  theme: "Default Theme",
  save: "Save",
  refreeid: "Evaluator ID",
  evaluator: "Evaluator",
  refreemail: "Evaluator Email (License)",
  webserver: "Web Server Access",
  urladdress: "URL Address",
  subjectid: "Subject ID",
  pass: "Password",
  evalua: "Stations",
  setupapi: "API Authentication",
  setuproot: "App Root",
  select: "Select",
  loadev: "Load stations",
  downloadev: "Download stations",
  directory: "Directory",
  downloadcomp: "Download students",
  rootsubtitle: "This is the starting point to access the data folder",
  dirsubtitle:
    "The folder name where the required files are stored and synchronized using any measures in the document directory.",
  answsubtitle:
    "This is file name where the results of the evaluation will be stored to be processed externally.",
  rootcomp: "Competitor (CSV)",
  rooteva: "Evaluation (JSON)",
  rootansw: "Results (JSON)",
  rootcompinf: "Select the csv file that contains the competitors data",
  rootevainf: "Select the json file that contains the evaluation data",
  dataload: "Load Data",
  passtext: "Enter Device Password",
  password: "Password",
  id: "ID",
  submittext: "Submit",
  evaluation: "Home",
  setupt: "Setup",
  config: "Configuration",
  help: "Help",
  filt: "Filter",
  competlist: "Students",
  test: "Test",
  eco: "Evaluation",
  cevaluate: "Current Evaluation",
  gwheel: "Group (Wheel)",
  status: "Status",
  name: "Name",
  group: "Group",
  evainfo: "Evaluation Information",
  station: "Station",
  subject: "Subject",
  loading: "Loading....",
  questnum: "Question Number",
  prev: "Previous",
  next: "Next",
  evaproce: "Evaluation Process",
  upload: "UPLOAD",
  showm: "Show Marks",
  showc: "Show Competitors name",
  others: "Others",
  studentsl: "Student List",
  studentstotal: "Students Total",
  devicei: "Device info",
  deviceilang: "Device Language",
  namei: "Name",
  modeli: "Model",
  versioni: "Version",
  uuidi: "UUID",
  seriai: "Serial",
  othersi: "Others",
  deviceq: "There is a tablet?",
  devicelan: "Device Language",
  activec: "Active Connection",
  connectty: "Connection Type",
  lastup: "Last Update",
  validl: "Valid License",
  devicetype: "This is a tablet?",
  password: "Password",
  rpassword: "Repeat Password",
  setpass: "Set Password",
};
const navigate = {
  setup: "Setup",
  evaluation: "Home",
  configuration: "Configuration",
  help: "Help",
};
const help = {
  helptitle: "Select a topic",
  help1: "How to: Server setup",
  help2: "How to: App root setup",
  help3: "Filtering Competitors",
  help4: "Changing the language",
  help5: "Internal Database",
  help6: "Marking questions",
  help7: "Uploading results",
  helpicontitle:
    "Read this page carefully and become familiar with available buttons in the application",
  helpicon1: "Go to App Home",
  helpicon2: "Back to previous page",
  helpicon3: "Forward to next page",
  helpicon4: "Delete one competitor",
  helpicon5: "Save",
  helpicon6: "Back to previous Eco page",
  helpicon7: "Forward to next Eco page",
  helpicon8: "Device Info",
  helpicon9: "Help",
  helpicon10: "Download stations or competitors",
  helpicon11: "Upload results to database",
  helpicon12: "Change results file name",
};
const alert = {
  alert1: "Incorrect password. Try again.",
  alert2: "Please fill in all required fields.",
  alert3: "Invalid response format. Please check your API.",
  alert4: "An unexpected error occurred. Please try again later.",
  alert5: "Failed to download evaluation. Please try again.",
  alert6: "Please select an evaluation before downloading.",
  alert7: "Failed to download competitor. Please try again.",
  alert8: "An error occurred during the data load process.",
  alert9: "Please select a CSV file.",
  alert10: "An error occurred while loading student data.",
  alert11: "Please select an evaluation file.",
  alert12: "Please Select a station",
  alert13: "Both competitor and evaluation data have been loaded successfully.",
  alert14: "Password cannot be empty. Please enter a password.",
  alert15: "Passwords do not match. Please try again.",
  alert16: "Evaluation uploaded successfully",
  alert17: "Failed to upload evaluation",
  alert18: "No evaluation results found.",
  alert19: "An unexpected error occurred while saving evaluation results.",
  alert20: "An unexpected error occurred",
  alert21: "Evaluation details not available.",
  alert22: "No evaluation results found.",
  alert23: "Evaluation saved",
  alert24: "Competitor data is not in the expected format.",
  alert25: "Error saving input",
  alert26: "Error loading stored input",
  alert27: "Error loading downloaded data",
  alert28: "Error saving filtered competitor data",
  filteralert: "Filter applied successfully",
  datatext1: "Evaluated data is found on the device",
  datatext2:
    "Do you want to proceed with downloading the evaluation which will result in deletion of the existing data?",
  yes: "Yes",
  no: "No",
  loadstation: "Evaluation loaded successfully",
  loaderrorstation:
    "Failed to load evaluation. Please check your credentials and try again.",
  loadonestation: "Download Successful",
  loadstudent: "Download Successful",
  uploadevaluation: " Evaluation saved successfully!",
};
const helpDetails = {
  1: `
    1. Go to the setup page
    2. Enter the initial password to gain access
    3. Provide the Evaluator’s ID
    4. Provide the Evaluator's Email
    5. You can check xthe "Show marks" or "Show competitors name" checkboxes
    6. Enter the URL address. Note: It must not end with a back-slash "/"
    7. Enter the subject id
    8. Enter the password
    9. After all these have been provided, click the "Load stations" button. This will load the status for the subject id provided.
    10. Then using the “Stations” dropdown, select the station to download for the device.
    11. Then click on "Download stations". Suppose you have already started evaluating a previous station that has not been uploaded to the server. In that case, you will see a dialogue box confirming if you want to override that stored data.
    12. Click on the "Download students" button.
    13. Done.
  `,
  2: `
    1. Go to the setup page
    2. Enter the initial password to gain access
    3. Go to the "App root" tab by clicking on the App root button.
    4. Select the Students file (CSV file).
    5. Select the Station file (JSON file).
    6. Enter the name of the folder where the evaluation results will be stored.
    7. Don’t include ".json" in the file name
    8. Click on "Load Data"
    9. Done.
  `,
  3: `
    1. Use the Home icon on the bottom nav to ensure you are on the App home page.
    2. Click on the "Filter" button on the screen.
    3. Edit the "Group ID" input box to filter competitors for a group or wheel.
  `,
  4: `
    1. Use the Configuration icon on the bottom nav to go to the configuration screen.
    2. There you can use the Language dropdown to change the language.
  `,
  5: `
    1. After evaluating one or more competitors, click on the upload icon.
    2. This will try to upload the current evaluations to the server.
    3. If it’s successful or not, a file is stored locally as a backup for the evaluations.
  `,
  6: `
    1. First, ensure you have filtered competitors for a wheel if you want. If you don’t know how to do this, head to the "Filtering competitors" help section.
    2. Then use the Home icon on the bottom nav to ensure you are on the App home screen.
    3. Click on the "Eco" button.
    4. This will load and filter the evaluations for the current competitors.
    5. You can verify the current station and subject on the top of the screen.
    6. Click on any row for a competitor to evaluate that competitor. This will take you to the screen where you mark this competitor.
    7. You can evaluate the competitor for each question.
    8. You can use the "previous" and "next" icons on the top of the screen to move to the previous or next competitor.
    9. When you move to different competitors using the top icons, the current evaluation will be saved to the internal database.
    10. Using the "back" icon you can go back to the "Evaluations" screen.
  `,
  7: `
    1. After evaluating one or more competitors after following the marking process, click on the upload icon.
    2. Ensure you are on the "Evaluations screen". The screen where the list of all the evaluations is displayed on a table.
    3. Click the upload icon at the top of the screen to upload the results to the server and save them in the internal storage.
  `,
};
export default {
  common,
  navigate,
  help,
  alert,
  helpDetails,
};
