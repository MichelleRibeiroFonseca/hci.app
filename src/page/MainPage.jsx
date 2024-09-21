import React from "react";

import Container from "../components/Container";
import TextInput from "../components/controles/TextInput";
export default function MainPage({ handleLogout }) {
  return (
    <>
      <Container handleLogout={handleLogout}></Container>
    </>
  );
}
