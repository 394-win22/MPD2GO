import { Card, Button } from "@mui/material";
const SearchDropdown = ({ isDropped, setIsDropped }) => {
  return (
    <>
      {isDropped && (
        <Card
          sx={{ my: 0 }}
          style={{ width: "100%", zIndex: 10, position: "fixed" }}
        >
          <Button onClick={() => setIsDropped(false)}> X </Button>
          HELLO
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;
