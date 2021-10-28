import Container from "./Container";
import { styled } from "@stitches/react";

export const MyWrapper = styled("div", {
  background: "black",
  color: "white"
});

export const MyBox = styled("div", {
  padding: "1rem"
});

function ExampleApp() {
  return (
    <MyWrapper>
      <Container>
        <MyBox>Box 1</MyBox>
        <MyBox>Box 2</MyBox>
        <MyBox>Box 3</MyBox>
        <MyBox>Box 4</MyBox>
      </Container>
    </MyWrapper>
  );
}

export default ExampleApp;
