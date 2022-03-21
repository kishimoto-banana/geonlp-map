import { Autocomplete, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";

const SearchTextField = styled(TextField)`
  background-color: #ffffff;
`;

const SearchBar = ({
  placeholder,
  suggestions,
  handleInputChange,
  handleChange,
  inputValue,
}) => {
  return (
    <Box>
      <Autocomplete
        sx={{ width: 254, height: 1000 }}
        freeSolo
        blurOnSelect
        disableClearable
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        options={suggestions}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.word
        }
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.surface + option.word}>
              {option.word} : {option.surface} (出現回数 {option.count})
            </li>
          );
        }}
        renderInput={(params) => (
          <SearchTextField
            {...params}
            label={placeholder}
            variant="outlined"
            size="small"
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
