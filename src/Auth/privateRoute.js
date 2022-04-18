import { Navigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";
import { Nav } from "../components/nav";
import { Container } from "@mui/material";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuthValue();

  if (!currentUser?.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Nav />
      <Container style={{ padding: "2em 0" }}>{children}</Container>
    </>
  );
}
