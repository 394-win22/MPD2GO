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

const SearchBar = ({
  setQuery,
  setPhaseFilter,
  phaseFilter,
  setTeamFilter,
  teamFilter,
}) => {
  const [isDropped, setIsDropped] = useState(false);
  return (
    <>
      <Search >
        <SearchIconWrapper>
          <SearchIcon style={{ color: "#999999" }} />
        </SearchIconWrapper>
        <StyledInputBase
          onClick={() => setIsDropped(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recent posts"
          style={{ paddingLeft: 50, width: "100%" }}
          inputProps={{ "aria-label": "search" }}
          data-testid="search-bar"
        />
      </Search>
      <SearchDropdown
        isDropped={isDropped}
        setIsDropped={setIsDropped}
        setQuery={setQuery}
        setPhaseFilter={setPhaseFilter}
        phaseFilter={phaseFilter}
        setTeamFilter={setTeamFilter}
        teamFilter={teamFilter}
      />
    </>
  );
};

export default SearchBar;
