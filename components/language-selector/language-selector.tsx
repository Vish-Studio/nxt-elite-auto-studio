"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { useId, useState } from "react";

export type LanguageOption = { code: string; flag: string; label: string };

type LanguageSelectorProps = { onChange: (code: string) => void; options: LanguageOption[]; value: string };

const LanguageSelector = ({ onChange, options, value }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const selected = options.find((option) => option.code === value) ?? options[0];

  return <div className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false); }}><button aria-controls={menuId} aria-expanded={isOpen} aria-haspopup="listbox" className="inline-flex cursor-pointer items-center gap-[0.45rem] border border-[var(--color-rule)] bg-transparent px-[0.7rem] py-[0.78rem] font-inherit text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-ivory)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] aria-expanded:border-[var(--color-gold)] aria-expanded:text-[var(--color-gold)]" onClick={() => setIsOpen((open) => !open)} type="button"><span aria-hidden="true" className="text-[0.9rem] leading-none">{selected.flag}</span><span>{selected.label}</span><CaretDownIcon aria-hidden="true" size={12} weight="bold" /></button>{isOpen && <div aria-label="Select language" className="absolute right-0 top-[calc(100%+0.4rem)] z-20 grid min-w-full border border-[var(--color-rule)] bg-[var(--color-surface)] p-1" id={menuId} role="listbox">{options.map((option) => <button aria-selected={option.code === value} className="flex cursor-pointer items-center gap-[0.4rem] border-0 bg-transparent px-2 py-[0.6rem] text-left font-inherit text-[0.58rem] uppercase tracking-[0.08em] whitespace-nowrap text-[var(--color-fog)] hover:bg-[var(--color-gold-soft)] hover:text-[var(--color-gold)] aria-selected:bg-[var(--color-gold-soft)] aria-selected:text-[var(--color-gold)]" key={option.code} onClick={() => { onChange(option.code); setIsOpen(false); }} role="option" type="button"><span aria-hidden="true" className="text-[0.9rem] leading-none">{option.flag}</span>{option.label}</button>)}</div>}</div>;
};

export default LanguageSelector;
