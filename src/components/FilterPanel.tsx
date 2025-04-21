import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useFilterStore } from "../store/useFilterStore";
import {
  statusLabelMap,
  UserStatus,
  UserStatusType,
} from "../constants/statuses";

const FilterPanel = () => {
  const { filter, setFilter } = useFilterStore();

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as UserStatusType);
  };

  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <FormControl fullWidth>
        <InputLabel htmlFor="status-select">Статус</InputLabel>
        <Select
          id="status-select"
          value={filter}
          onChange={handleChange}
          label="Статус">
          <MenuItem value={UserStatus.ACTIVE}>
            {statusLabelMap[UserStatus.ACTIVE]}
          </MenuItem>
          <MenuItem value={UserStatus.INACTIVE}>
            {statusLabelMap[UserStatus.INACTIVE]}
          </MenuItem>
          <MenuItem value={UserStatus.DELETED}>
            {statusLabelMap[UserStatus.DELETED]}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterPanel;
