"use client";
import { useState, useCallback } from "react";

// Simple filter option type
export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface UseFilterProps {
  options: FilterOption[];
  defaultValue?: string;
  onFilterChange?: (value: string) => void;
}

// Simple hook - just manages state and selection logic
export function usePointedFilter({
  options,
  defaultValue,
  onFilterChange,
}: UseFilterProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? options[0]?.value);

  const handleFilterChange = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onFilterChange?.(value);
    },
    [onFilterChange]
  );

  const isSelected = useCallback(
    (value: string) => {
      return selectedValue === value;
    },
    [selectedValue]
  );

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return {
    selectedValue,
    selectedOption,
    handleFilterChange,
    isSelected,
  };
}
