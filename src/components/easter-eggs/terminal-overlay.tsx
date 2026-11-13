"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { content } from "@/data/content";

const KONAMI_CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

interface CommandOutput {
  command: string;
  output: string | string[];
}

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: [
        "Kartheek Portfolio Shell v1.0.0 (x86_64-pc-none)",
        "Type 'help' to inspect available system commands.",
      ],
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const konamiProgressRef = useRef<string[]>([]);
  const actionBufferRef = useRef<string>("");

  // 1. Konami Code, Typing "action", and Backtick terminal trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA";

      // Backtick toggles terminal
      if (e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Escape closes terminal if open
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      // Don't listen for typing easter eggs while typing inside inputs
      if (isInputFocused) return;

      // Konami Code Detection
      const key = e.key.toLowerCase();
      konamiProgressRef.current.push(key);
      if (konamiProgressRef.current.length > KONAMI_CODE.length) {
        konamiProgressRef.current.shift();
      }

      const isKonamiMatch =
        konamiProgressRef.current.length === KONAMI_CODE.length &&
        konamiProgressRef.current.every(
          (val, idx) => val === KONAMI_CODE[idx]
        );

      if (isKonamiMatch) {
        konamiProgressRef.current = [];
        // Invert to bone background for 3 seconds
        document.documentElement.classList.add("bone-invert");
        window.dispatchEvent(new CustomEvent("mascot-flip"));

        setTimeout(() => {
          document.documentElement.classList.remove("bone-invert");
        }, 3000);
      }

      // "action" word typing detection
      if (key.length === 1 && /[a-z]/i.test(key)) {
        actionBufferRef.current += key;
        if (actionBufferRef.current.length > 10) {
          actionBufferRef.current = actionBufferRef.current.slice(-10);
        }

        if (actionBufferRef.current.endsWith("action")) {
          actionBufferRef.current = "";
          window.dispatchEvent(new CustomEvent("mascot-clap"));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Auto scroll to bottom of terminal output
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "exit") {
      setIsOpen(false);
      return;
    }

    let output: string | string[] = "";

    switch (trimmed) {
      case "help":
        output = [
          "Available commands:",
          "  projects    List engineering works & case studies",
          "  skills      Enumerate technical capabilities",
          "  film        Display motion reels in index",
          "  hire        Open direct mailto dispatch",
          "  clear       Wipe terminal output history",
          "  exit        Close terminal overlay",
        ];
        break;

      case "projects":
        output = content.projects.map(
          (p) => `${p.numeral} // ${p.title} (${p.status}) — ${p.category}`
        );
        break;

      case "skills":
        output = content.skills.map(
          (s) => `${s.category}: ${s.items.join(", ")}`
        );
        break;

      case "film":
        output = content.films.map(
          (f) => `${f.title} (${f.year}) — [${f.duration}] ${f.role}`
        );
        break;

      case "hire":
        window.location.href = "mailto:hello@kartheek.dev";
        output = "Opening mail client: mailto:hello@kartheek.dev ...";
        break;

      default:
        output = `Command not recognized: '${trimmed}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Developer Terminal Overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex items-end sm:items-center justify-center p-4 sm:p-6"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl border border-line bg-surface text-text font-mono text-xs shadow-2xl flex flex-col max-h-[70vh] sm:max-h-[60vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-bg select-none">
          <div className="flex items-center gap-2 text-muted">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-wider text-text">
              kartheek@terminal: ~ (ESC to exit)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-muted hover:text-accent transition-colors cursor-pointer text-xs uppercase"
          >
            [ × ]
          </button>
        </div>

        {/* Terminal Scrollable Logs */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-mono text-xs">
          {history.map((entry, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted">
                <span className="text-accent">➜</span>
                <span className="text-text font-medium">{entry.command}</span>
              </div>
              <div className="text-muted/90 pl-4 whitespace-pre-wrap leading-relaxed">
                {Array.isArray(entry.output) ? (
                  entry.output.map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))
                ) : (
                  <div>{entry.output}</div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Prompt */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-line px-4 py-2.5 flex items-center gap-2 bg-bg"
        >
          <span className="text-accent font-bold">➜</span>
          <span className="text-muted text-[11px] hidden sm:inline">
            kartheek:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help', 'projects', 'hire'..."
            className="flex-1 bg-transparent border-0 outline-none text-text font-mono text-xs placeholder:text-muted/40"
          />
        </form>
      </div>
    </div>
  );
}
