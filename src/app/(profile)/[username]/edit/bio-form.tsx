"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  KeyboardEventHandler,
  useCallback,
  useOptimistic,
  useState,
} from "react";

import CreatableSelect from "react-select/creatable";
import {
  ClearIndicatorProps,
  MultiValueRemoveProps,
  ValueContainerProps,
  components,
} from "react-select";
import { Button } from "@/components/ui/button";
import { updateBioTags } from "./actions";
import toast from "react-hot-toast";

interface Option {
  readonly label: string;
  readonly value: string;
}

const ClearIndicator = (props: ClearIndicatorProps<Option>) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="text-muted-foreground hover:text-foreground transition-colors" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
    </components.MultiValueRemove>
  );
};
const createOption = (label: string) => ({
  label,
  value: label,
});

export default function BioForm({
  initialBioTags,
  username,
}: {
  initialBioTags: string[];
  username: string;
}) {
  const updateBioTagsWithUsername = updateBioTags.bind(null, username);
  const [inputValue, setInputValue] = useState("");
  const [optimisticValue, setOptimisticValue] = useOptimistic<
    readonly Option[]
  >(initialBioTags.map((t) => createOption(t)));

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        const myPromise = updateBioTagsWithUsername([
          ...optimisticValue.map((t) => t.value),
          inputValue,
        ]);
        setOptimisticValue((prev) => [...prev, createOption(inputValue)]);

        toast.promise(myPromise, {
          loading: "更新中",
          success: "更新しました",
          error: "更新に失敗しました",
        });
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      components={{
        DropdownIndicator: null,
        ClearIndicator,
        MultiValueRemove,
      }}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => {
        setOptimisticValue(newValue);
        const myPromise = updateBioTagsWithUsername(
          newValue.map((t) => t.value)
        );
        toast.promise(myPromise, {
          loading: "更新中",
          success: "更新しました",
          error: "更新に失敗しました",
        });
      }}
      onInputChange={(newValue) => {
        if (optimisticValue.length >= 5) return;
        setInputValue(newValue);
      }}
      onKeyDown={handleKeyDown}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            "flex w-full rounded-md border border-input bg-transparent px-3 py-2",
            isFocused &&
              "ring-offset-background outline-none ring-2 ring-ring ring-offset-2"
          ),
        placeholder: (state) => "text-muted-foreground",
        multiValue: (staet) =>
          cn(
            "before:content-['#'] before:text-muted-foreground px-3 py-1 inline-flex items-center gap-2 rounded-full border bg-card text-card-foreground transition ease-in-out hover:bg-secondary hover:text-secondary-foreground"
          ),
        valueContainer: (state) => "flex flex-wrap gap-2",
      }}
      placeholder="5つまでのタグを追加できます"
      unstyled
      value={optimisticValue}
    />
  );
}

const uncji = `flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`;
