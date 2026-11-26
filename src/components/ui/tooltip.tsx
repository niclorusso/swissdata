"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * "?" beside a card title and the panel it opens inside the card. No popup and no portal: the panel is part
 * of the card, full card width, so it works the same with a mouse, a finger or the keyboard. Each card has its
 * own state: opening one panel does not close the others.
 */
export function useMoreInfo() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);
  // Escape closes the panel when the focus is on the button or inside the panel
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.stopPropagation();
        close();
      }
    },
    [open, close]
  );
  return { open, id, buttonRef, toggle, close, onKeyDown };
}

type MoreInfo = ReturnType<typeof useMoreInfo>;

/** The "?" button: a 22px circle in a 44px tap area. */
export function MoreInfoButton({ info, label, className }: { info: MoreInfo; label: string; className?: string }) {
  return (
    <button
      ref={info.buttonRef}
      type="button"
      aria-expanded={info.open}
      aria-controls={info.id}
      aria-label={label}
      onClick={info.toggle}
      onKeyDown={info.onKeyDown}
      className={cn("group inline-flex flex-none items-center justify-center w-11 h-11 -my-2.5 -mr-2.5 focus:outline-none", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-sm font-semibold leading-none",
          "group-focus-visible:ring-2 group-focus-visible:ring-ink",
          info.open ? "bg-ink text-white" : "bg-swiss-gray-200 text-swiss-gray-700 group-hover:bg-swiss-gray-300"
        )}
      >
        ?
      </span>
    </button>
  );
}

/** The panel: paper background, full card width, in the flow of the card. Without JavaScript it is shown open. */
export function MoreInfoPanel({ info, children, className }: { info: MoreInfo; children: ReactNode; className?: string }) {
  return (
    <div
      id={info.id}
      hidden={!info.open}
      data-more-panel=""
      onKeyDown={info.onKeyDown}
      className={cn("rounded-xl p-3 text-sm leading-relaxed text-swiss-gray-700 space-y-2", className)}
      style={{ background: "var(--sdf-paper)" }}
    >
      {children}
    </div>
  );
}
