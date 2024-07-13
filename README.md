# pixEcoe

An app for evaluating medical students.

## Features

- Downloading questions and student data and storing on the device through either API interaction or raw CSV and JSON file for offline use.
- Offline storage using AsyncStorage.
- Language translation or language option functionality.
- Upload and synchronization of data when the device is back online to sync with the server.

## Installation Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version recommended)
- npm or yarn
- Expo CLI: Install globally using `npm install -g expo-cli`

For iOS development on macOS:

- Xcode (latest version from the Mac App Store)
- Command Line Tools for Xcode: `xcode-select --install`

For Android development:

- Android Studio
- Android SDK
- Set up Android environment variables (follow [React Native documentation](https://reactnative.dev/docs/environment-setup) for detailed steps)

### Step-by-Step Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pixEcoe.git
   cd pixEcoe

2. Install dependencies:
```
bash
npm install
# or
yarn install
```

3. Install CocoaPods dependencies (iOS only):
```
bash
cd ios
pod install
cd ..
```
##### Running the Project

Start the Development Server
Start the Metro bundler:
```
bash
npm start
# or
yarn start
```

For iOS:

```
bash
npx react-native run-ios
```
For Android:

```
bash
npx react-native run-android
Building the Project
```

1. For iOS
Open the ios folder in Xcode:

```
bash
open ios/pixEcoe.xcworkspace
Select your device or simulator and click the build button.
```

2. For Android
Generate a release APK:
```
bash
cd android
./gradlew assembleRelease
The APK can be found in android/app/build/outputs/apk/release.
```
Usage
Once the app is running, follow the on-screen instructions to download questions and student data.
Use the language option in the settings to change the app's language.
Ensure your device is online to upload and synchronize data with the server.
Screenshots


Technologies Used
```
@react-native-async-storage/async-storage: ^1.21.0
@react-navigation/bottom-tabs: ^6.5.11
@react-navigation/native: ^6.1.9
@react-navigation/native-stack: ^6.9.17
@react-navigation/stack: ^6.3.20
@tanstack/react-query: ^5.17.19
expo: ~47.0.14
expo-splash-screen: ~0.17.5
expo-status-bar: ~1.4.1
i18next: 20.3.5
papaparse: ^5.4.1
react: 18.1.0
react-i18next: 11.11.4
react-native: 0.70.8
react-native-csv: ^0.2.0
react-native-device-info: ^10.6.0
react-native-document-picker: ^9.1.1
react-native-flash-message: ^0.4.2
react-native-fs: ^2.20.0
react-native-gesture-handler: ~2.8.0
react-native-localize: 2.1.1
react-native-safe-area-context: 4.4.1
react-native-screens: ~3.18.0
react-native-table-component: ^1.2.2
react-native-vector-icons: ^10.0.3
```

#### Folder Structure
```
pixEcoe/
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # Constant values and configurations
│   ├── navigation/       # Navigation setup and configuration
│   ├── screens/          # Application screens
│   ├── translation/      # Language translation files and setup
│   ├── utils/            # Utility functions and helpers
├── App.js                # Entry point of the application
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

#### Contributing
Fork the repository.
Create a new branch: git checkout -b feature-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature-name.
Open a pull request.

#### Testing
To run tests, use the following command:

```bash
Copy code
npm test
# or
yarn test
````
#### Troubleshooting
Metro bundler not starting: Ensure you have no other processes running on port 8081.
iOS build issues: Ensure you have the latest version of Xcode and CocoaPods installed.
Android build issues: Make sure you have the correct Android SDK installed and environment variables set.
