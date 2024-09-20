import "react-native-gesture-handler";
import AppStack from "./src/navigation/AppStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlashMessage from "react-native-flash-message";
import "./src/constants/IMLocalize";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppStack />
        <FlashMessage floating={true} position="top" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
