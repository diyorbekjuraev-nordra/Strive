import { UseSearchInputProps, useSearchInput } from "./use-search-input";
import { memo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/library/Input";
import { Button } from "@/library/Button";

export type SearchInputProps = UseSearchInputProps;
export const SearchInput = memo((props: SearchInputProps) => {
  const {
    shouldShowClearButton,
    getWrapperProps,
    getInputProps,
    getSearchIconProps,
    getClearButtonProps,
  } = useSearchInput(props);

  return (
    <div {...getWrapperProps()}>
      <Search {...getSearchIconProps()} />
      <Input {...getInputProps()} />
      {shouldShowClearButton && (
        <Button {...getClearButtonProps()}>
          <X />
        </Button>
      )}
    </div>
  );
});
