import { TextField } from "@mui/material";
import { useState } from "react";

interface SearchProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return <TextField label="Search" variant="outlined" fullWidth onChange={handleChange} sx={{ background: '#ffffff', mb:2}}/>;
};

export default SearchComponent;
