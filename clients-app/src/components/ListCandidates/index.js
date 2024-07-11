import { Typography, Button } from "@mui/material";
import { useApiContext } from "../../context/context";
import useApi from "../../hooks/useApi";

export default function ListCandidates() {
  const { handleClickOpen } = useApi();
  const { users } = useApiContext();
  return (
    <div
      style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems:"center" }}
    >
      {users.map((user) => (
        <Button
          onClick={() => {
            handleClickOpen(user);
          }}
          key={user.id}
          style={{ margin: "0.5rem 0", width:"50%", height:"5vh" }}
        >
          <Typography variant="body1" style={{ color: "black" }}>
            {user.name}
          </Typography>
        </Button>
      ))}
    </div>
  );
}
