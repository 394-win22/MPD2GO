import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#ffffff",
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    left: 0,
    margin: 0,
    transition: theme.transitions.create("width"),
  },
}));

const DirectorySearchBar = ({ setQuery, filter, setFilter }) => {
  const [isDropped, setIsDropped] = useState(false);
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onClick={() => setIsDropped(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          style={{ width: "80%" }}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <SearchDropdown
        isDropped={isDropped}
        setIsDropped={setIsDropped}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};

export default DirectorySearchBar;
