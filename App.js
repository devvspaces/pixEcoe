import "react-native-gesture-handler";
import AppStack from "./src/navigation/AppStack";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import FlashMessage from "react-native-flash-message";
import "./src/constants/IMLocalize";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStack />
      <FlashMessage floating={true} position="top" />
    </QueryClientProvider>
  );
}
