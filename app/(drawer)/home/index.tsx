import { Text } from "react-native";

import Header from "@/src/components/Header";

import ScreenContainer from "@/src/components/layout/ScreenContainer";

export default function Home() {
  return (
    <>
      <Header title="Home" />

      <ScreenContainer>
        <Text>Home</Text>
      </ScreenContainer>
    </>
  );
}
