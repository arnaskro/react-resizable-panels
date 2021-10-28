import Container from "./Container";
import { styled } from "@stitches/react";

export const MyWrapper = styled("div", {
  background: "black",
  color: "white",
  height: "50vh",
  overflow: "hidden"
});

export const MyBox = styled("div", {
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%"
});

export const MyImageBox1 = styled("div", {
  width: "100%",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80)",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

export const MyImageBox2 = styled("div", {
  width: "100%",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1553970016-97408710e9c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1738&q=80)",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

function ExampleApp() {
  return (
    <MyWrapper>
      <Container minWidth={100}>
        <MyBox>Box 1</MyBox>
        <MyImageBox1 />
        <MyBox>Box 3</MyBox>
        <MyImageBox2 />
        <MyBox>Box 5</MyBox>
        <MyBox>Box 6</MyBox>
      </Container>
    </MyWrapper>
  );
}

export default ExampleApp;
