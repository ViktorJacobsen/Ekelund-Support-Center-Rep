'use client';

import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '@/styles/theme/theme-context';

/**
 * FormTextField - Anpassad textfield för formulär
 */
interface FormTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
}

export function FormTextField({
  label,
  helperText,
  startIcon,
  endIcon,
  variant = 'outlined',
  fullWidth = true,
  error,
  disabled,
  ...props
}: FormTextFieldProps) {
  const muiTheme = useMuiTheme();
  
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      helperText={helperText}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2, // Matchar app-stilen med rundade hörn
        },
        ...props.sx
      }}
      {...props}
    />
  );
}

/**
 * FormSelect - Anpassad select för formulär
 */
interface FormSelectProps extends Omit<SelectProps, 'variant'> {
  label: string;
  options: Array<{ value: string; label: string }>;
  helperText?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
}

export function FormSelect({
  label,
  options,
  helperText,
  variant = 'outlined',
  fullWidth = true,
  error,
  disabled,
  ...props
}: FormSelectProps) {
  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-label`;
  
  return (
    <FormControl 
      variant={variant} 
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2, // Matchar app-stilen
        },
        ...props.sx
      }}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * FormCheckbox - Anpassad checkbox för formulär
 */
interface FormCheckboxProps extends CheckboxProps {
  label: string;
  helperText?: string;
}

export function FormCheckbox({
  label,
  helperText,
  disabled,
  ...props
}: FormCheckboxProps) {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormControlLabel
        control={<Checkbox {...props} />}
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * FormSwitch - Anpassad switch för formulär
 */
interface FormSwitchProps extends SwitchProps {
  label: string;
  helperText?: string;
}

export function FormSwitch({
  label,
  helperText,
  disabled,
  ...props
}: FormSwitchProps) {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormControlLabel
        control={<Switch {...props} />}
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * FormRadioGroup - Anpassad radiogrupp för formulär
 */
interface FormRadioGroupProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  row?: boolean;
}

export function FormRadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  helperText,
  error,
  disabled,
  row = false,
  ...props
}: FormRadioGroupProps) {
  return (
    <FormControl component="fieldset" error={error} disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        row={row}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * FormCheckboxGroup - Anpassad grupp av checkboxar för formulär
 */
interface FormCheckboxGroupProps {
  label: string;
  options: Array<{ value: string; label: string; checked: boolean }>;
  onChange: (value: string, checked: boolean) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  row?: boolean;
}

export function FormCheckboxGroup({
  label,
  options,
  onChange,
  helperText,
  error,
  disabled,
  row = false,
}: FormCheckboxGroupProps) {
  const handleChange = (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value, event.target.checked);
  };
  
  return (
    <FormControl component="fieldset" error={error} disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={option.checked}
                onChange={handleChange(option.value)}
                name={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * FormAutocomplete - Anpassad autocomplete för formulär
 */
interface FormAutocompleteProps<T> {
  label: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  value: T | null;
  onChange: (value: T | null) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  multiple?: boolean;
  freeSolo?: boolean;
  placeholder?: string;
}

export function FormAutocomplete<T>({
  label,
  options,
  getOptionLabel,
  value,
  onChange,
  helperText,
  error,
  disabled,
  fullWidth = true,
  multiple = false,
  freeSolo = false,
  placeholder,
  ...props
}: FormAutocompleteProps<T>) {
  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        multiple={multiple}
        freeSolo={freeSolo}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={label} 
            placeholder={placeholder}
            error={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2, // Matchar app-stilen
              }
            }}
          />
        )}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * TagInput - Anpassad inmatning för taggar
 */
interface TagInputProps {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

export function TagInput({
  label,
  value,
  onChange,
  suggestions = [],
  helperText,
  error,
  disabled,
  fullWidth = true,
  placeholder = 'Skriv och tryck Enter...',
  ...props
}: TagInputProps) {
  const { themeClasses } = useTheme();
  const [inputValue, setInputValue] = React.useState('');
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue('');
    }
  };
  
  const handleDelete = (tagToDelete: string) => {
    onChange(value.filter((tag) => tag !== tagToDelete));
  };
  
  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
      <Autocomplete
        multiple
        freeSolo
        options={suggestions.filter(option => !value.includes(option))}
        value={value}
        inputValue={inputValue}
        onInputChange={(_, newValue) => setInputValue(newValue)}
        onChange={(_, newValue) => onChange(newValue as string[])}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              color="primary"
              size="small"
              onDelete={() => handleDelete(option)}
            />
          ))
        }
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={label} 
            placeholder={value.length > 0 ? placeholder : ""}
            onKeyDown={handleKeyDown}
            error={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        )}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * SearchInput - Anpassad sök-inmatning
 */
interface SearchInputProps extends Omit<TextFieldProps, 'variant'> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
}

export function SearchInput({
  onSearch,
  onClear,
  loading = false,
  placeholder = 'Sök...',
  fullWidth = true,
  ...props
}: SearchInputProps) {
  const [value, setValue] = React.useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onSearch) {
      event.preventDefault();
      onSearch(value);
    }
  };
  
  const handleClear = () => {
    setValue('');
    if (onClear) {
      onClear();
    }
  };
  
  return (
    <TextField
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box sx={{ 
              display: 'flex',
              color: loading ? 'primary.main' : 'text.secondary',
              animation: loading ? 'spin 1s linear infinite' : 'none',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={loading 
                    ? "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  } 
                />
              </svg>
            </Box>
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <Box 
              onClick={handleClear}
              sx={{ 
                cursor: 'pointer',
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' }
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Box>
          </InputAdornment>
        ) : null
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...props.sx
      }}
      {...props}
    />
  );
}

export default {
  FormTextField,
  FormSelect,
  FormCheckbox,
  FormSwitch,
  FormRadioGroup,
  FormCheckboxGroup,
  FormAutocomplete,
  TagInput,
  SearchInput
};