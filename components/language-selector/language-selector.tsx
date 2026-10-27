"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type LanguageOption = { code: string; flag: string; label: string };

type LanguageSelectorProps = {
  fullWidth?: boolean;
  /** Open the list above the trigger, e.g. when the selector sits at the bottom of a panel. */
  menuPlacement?: "bottom" | "top";
  onChange: (code: string) => void;
  options: LanguageOption[];
  value: string;
};

const LanguageSelector = ({
  fullWidth = false,
  menuPlacement = "bottom",
  onChange,
  options,
  value,
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const selected = options.find((option) => option.code === value) ?? options[0];

  return (
    <div
      className={cn("relative", fullWidth && "w-full")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "inline-flex cursor-pointer items-center gap-[0.45rem] border border-rule bg-transparent px-[0.7rem] py-[0.78rem] text-[0.58rem] font-semibold tracking-[0.08em] text-ivory uppercase hover:border-gold hover:text-gold aria-expanded:border-gold aria-expanded:text-gold",
          fullWidth && "w-full",
        )}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true" className="text-[0.9rem] leading-none">
          {selected.flag}
        </span>
        <span>{selected.label}</span>
        <CaretDownIcon aria-hidden="true" size={12} weight="bold" />
      </button>
      {isOpen && (
        <div
          aria-label="Select language"
          className={cn(
            "absolute right-0 z-20 grid min-w-full border border-rule bg-surface p-1",
            menuPlacement === "top" ? "bottom-[calc(100%+0.4rem)]" : "top-[calc(100%+0.4rem)]",
          )}
          id={menuId}
          role="listbox"
        >
          {options.map((option) => (
            <button
              aria-selected={option.code === value}
              className="flex cursor-pointer items-center gap-[0.4rem] border-0 bg-transparent px-2 py-[0.6rem] text-left text-[0.58rem] tracking-[0.08em] whitespace-nowrap text-fog uppercase hover:bg-gold-soft hover:text-gold aria-selected:bg-gold-soft aria-selected:text-gold"
              key={option.code}
              onClick={() => {
                onChange(option.code);
                setIsOpen(false);
              }}
              role="option"
              type="button"
            >
              <span aria-hidden="true" className="text-[0.9rem] leading-none">
                {option.flag}
              </span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
