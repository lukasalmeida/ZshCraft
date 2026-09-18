const themeTemplates = {
  robbyrussell: `
  user@machine:~/projects$ ls
  README.md  src  src-tauri
  user@machine:~/projects$ zsh
  ➜  ~/projects git:(main) ✨
  `,
  "af-magic": `
  user@machine:~/projects$ npm run dev
  > zshcraft@0.1.0 dev
  > tauri dev
  [info] Executing requested command...
  ➜  ~/projects
  `,
  agnoster: `
  ~/projects (main) ⚡
  ❯ git status
  On branch main
  Your branch is up to date with 'origin/main'.
  `,
  gitster: `
  ~/projects main ✓
  ❯ cargo check
  Finished dev [unoptimized + debuginfo] target(s) in 0.97s
  `,
  bira: `
  ▸ ~/projects
  ▸ git:(main) 
  ❯ echo "ZshCraft pronto"
  ZshCraft pronto
  `,
};

const customState = {
  style: "classic",
  accent: "#8b5cf6",
  accentAlt: "#06b6d4",
  success: "#34d399",
  warning: "#fbbf24",
  suggestion: "#d65d0e",
  elements: ["user", "path", "git", "runtime", "status", "prompt"],
  promptOrder: "user|path|git|runtime|status",
  runtimeModules: {
    node: true,
    python: true,
    rust: false,
    go: false,
    docker: true,
    kubernetes: false,
  },
  gitIndicators: {
    branch: true,
    modified: true,
    staged: true,
    untracked: true,
    conflicts: true,
  },
  directoryStyle: "short",
  blockSeparator: "",
  innerSeparator: "›",
  borderEffect: "glow",
  iconSet: "nerd",
  themePreset: "dark",
  configFormat: "toml",
  cursorStyle: "❯❯",
  cursorErrorColor: "#f87171",
  plugins: {
    zinit: true,
    autosuggestions: true,
    syntaxHighlighting: true,
    completions: true,
    starship: true,
    nvm: true,
    java: true,
    sdkman: true,
    opencode: true,
    autoCd: true,
    history: true,
  },
  aliases: {
    ls: true,
    ll: true,
    la: true,
    c: true,
    python: true,
    pip: true,
  },
  customSnippet: `export PATH="/home/lucas/.opencode/bin:$PATH"`,
};

const promptStyles = {
  classic: { prompt: "❯", separator: " " },
  minimal: { prompt: "➜", separator: " " },
  neon: { prompt: "λ", separator: "  " },
  modern: { prompt: "", separator: " • " },
};

const elementDefinitions = {
  user: { label: "Usuário", sample: "lucas@zshcraft" },
  path: { label: "Diretório", sample: "~/projects" },
  git: { label: "Git", sample: "git:(main)" },
  runtime: { label: "Runtime", sample: "node 20.11.0" },
  status: { label: "Status", sample: "✓" },
  prompt: { label: "Prompt", sample: "❯" },
  command: { label: "Comando", sample: "npm run dev" },
  clock: { label: "Relógio", sample: "18:42" },
};

const runtimeDefinitions = {
  node: { label: "Node.js", sample: "node 20.11.0" },
  python: { label: "Python", sample: "py 3.12.0" },
  rust: { label: "Rust", sample: "rustc 1.81.0" },
  go: { label: "Go", sample: "go 1.23.0" },
  docker: { label: "Docker", sample: "docker 27.2" },
  kubernetes: { label: "Kubernetes", sample: "kubectl 1.30" },
};

const promptModuleDefinitions = [
  ["user", "Usuário"],
  ["path", "Diretório"],
  ["git", "Git"],
  ["runtime", "Runtime"],
  ["status", "Status"],
  ["command", "Comando"],
  ["clock", "Relógio"],
  ["prompt", "Prompt"],
];

const pluginDefinitions = [
  ["zinit", "Zinit"],
  ["autosuggestions", "Autosuggestions"],
  ["syntaxHighlighting", "Syntax Highlighting"],
  ["completions", "Completions"],
  ["starship", "Starship"],
  ["nvm", "NVM"],
  ["java", "Java"],
  ["sdkman", "SDKMAN"],
  ["opencode", "OpenCode"],
  ["autoCd", "Auto CD"],
  ["history", "Histórico compartilhado"],
];

const aliasDefinitions = [
  ["ls", "ls --color=auto"],
  ["ll", "ls -lh --color=auto"],
  ["la", "ls -la --color=auto"],
  ["c", "clear"],
  ["python", "python3"],
  ["pip", "pip3"],
];

const terminalOutput = document.querySelector("#terminal-output");
const themeList = document.querySelector(".theme-list");
const applyButton = document.querySelector("#apply-theme");
const menuButtons = document.querySelectorAll(".menu-item");
const panels = document.querySelectorAll(".view-panel");
const panelTitle = document.querySelector("#panel-title");
const elementChips = document.querySelector("#element-chips");
const pluginList = document.querySelector("#plugin-list");
const aliasList = document.querySelector("#alias-list");
const customSnippetInput = document.querySelector("#custom-snippet");
const segmentButtons = document.querySelectorAll(".segment");
const saveCustomButton = document.querySelector("#save-custom-theme");
const accentMainInput = document.querySelector("#accent-main");
const accentAltInput = document.querySelector("#accent-alt");
const successColorInput = document.querySelector("#success-color");
const warningColorInput = document.querySelector("#warning-color");
const suggestionColorInput = document.querySelector("#suggestion-color");
const promptModuleList = document.querySelector("#prompt-module-list");
const promptOrderSelect = document.querySelector("#prompt-order");
const directoryStyleSelect = document.querySelector("#directory-style");
const blockSeparatorSelect = document.querySelector("#block-separator");
const innerSeparatorSelect = document.querySelector("#inner-separator");
const borderEffectSelect = document.querySelector("#border-effect");
const iconSetSelect = document.querySelector("#icon-set");
const configFormatSelect = document.querySelector("#config-format");
const cursorStyleInput = document.querySelector("#cursor-style");
const errorCursorColorInput = document.querySelector("#error-cursor-color");
const themePresetSelect = document.querySelector("#theme-preset");

const defaultThemeName = "robbyrussell";

const applyCustomAccent = () => {
  document.documentElement.style.setProperty("--accent", customState.accent);
  document.documentElement.style.setProperty("--accent-soft", `${customState.accent}2b`);
  document.documentElement.style.setProperty("--green", customState.success);
  document.documentElement.style.setProperty("--yellow", customState.warning);

  const isLightPreset = customState.themePreset === "light";
  document.documentElement.style.setProperty("--terminal-bg", isLightPreset ? "#f8fafc" : "#020617");
  document.documentElement.style.setProperty("--terminal-fg", isLightPreset ? "#0f172a" : "#dbeafe");
  document.documentElement.style.setProperty("--terminal-accent", customState.accent);
  document.documentElement.style.setProperty("--terminal-accent-alt", customState.accentAlt);
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#039;");

const renderTerminalPreview = (rawText) => {
  const lines = String(rawText || "").split("\n");

  return lines.map((line) => {
    const safe = escapeHtml(line);

    if (!line) {
      return '<span class="line line-empty">&nbsp;</span>';
    }

    if (/^#\s+---\s*~\/\.zshrc\s*---/.test(line)) {
      return `<span class="line line-comment">${safe}</span>`;
    }

    if (/^(export|PROMPT=|RPROMPT=|alias|source|setopt|bindkey|autoload|zstyle|eval|HISTFILE|PATH=|if \[\[|fi|\[\s*-s|\[\[\s*-s)/.test(line.trim())) {
      return `<span class="line line-script">${safe}</span>`;
    }

    if (/^(?:[A-Za-z0-9_.-]+@|~\/|\.\/|\/)/.test(line.trim()) || /(?:git status|npm run dev|node -v|echo|ls|pwd|clear|python|pip)/i.test(line)) {
      return `<span class="line line-command">${safe}</span>`;
    }

    if (/(On branch main|Your branch is up to date|Your branch is clean|Tema personalizado|ZshCraft pronto|Finished|✓|✦|✚|✖)/.test(line)) {
      return `<span class="line line-success">${safe}</span>`;
    }

    if (/(warning|warn|not found|failed|error|deprecated)/i.test(line)) {
      return `<span class="line line-warning">${safe}</span>`;
    }

    return `<span class="line line-plain">${safe}</span>`;
  }).join('<br>');
};

const normalizeThemeName = (value) => value || defaultThemeName;

const hexToRgb = (hex) => {
  const safeHex = (hex || "#000000").replace("#", "");
  const normalized = safeHex.length === 3
    ? safeHex.split("").map((char) => `${char}${char}`).join("")
    : safeHex;

  const number = Number.parseInt(normalized, 16) || 0;
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
};

const closestZshColorName = (hex) => {
  const palette = [
    ["black", "#000000"],
    ["red", "#ff0000"],
    ["green", "#00ff00"],
    ["yellow", "#ffff00"],
    ["blue", "#0000ff"],
    ["magenta", "#ff00ff"],
    ["cyan", "#00ffff"],
    ["white", "#ffffff"],
  ];

  const source = hexToRgb(hex);
  let chosen = "cyan";
  let bestDistance = Number.POSITIVE_INFINITY;

  palette.forEach(([name, candidateHex]) => {
    const candidate = hexToRgb(candidateHex);
    const distance = Math.sqrt(
      (source.r - candidate.r) ** 2 +
      (source.g - candidate.g) ** 2 +
      (source.b - candidate.b) ** 2
    );

    if (distance < bestDistance) {
      bestDistance = distance;
      chosen = name;
    }
  });

  return chosen;
};

const renderCheckboxGroup = (container, entries, stateMap, onToggle) => {
  container.innerHTML = "";

  entries.forEach(([key, label]) => {
    const row = document.createElement("label");
    row.className = "check-item";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(stateMap[key]);
    input.addEventListener("change", () => onToggle(key, input.checked));
    const span = document.createElement("span");
    span.textContent = label;
    row.append(input, span);
    container.appendChild(row);
  });
};

const buildCustomPrompt = () => {
  const promptConfig = promptStyles[customState.style] ?? promptStyles.classic;
  const activeRuntimes = Object.entries(customState.runtimeModules)
    .filter(([, enabled]) => enabled)
    .map(([key]) => runtimeDefinitions[key]?.label ?? key);

  const pathValue = customState.directoryStyle === "full"
    ? "~/projects/zshcraft" 
    : customState.directoryStyle === "compact"
      ? "~/p/zshcraft"
      : ".../ZshCraft";

  const gitValue = customState.gitIndicators.branch ? "git:(main)" : "git";
  const runtimeValue = activeRuntimes.length ? activeRuntimes.slice(0, 2).join(" • ") : "";
  const statusValue = customState.gitIndicators.conflicts ? "✦" : "✓";

  const partMap = {
    user: "lucas@zshcraft",
    path: pathValue,
    git: gitValue,
    runtime: runtimeValue,
    status: statusValue,
    command: "npm run dev",
    clock: "18:42",
  };

  const order = (customState.promptOrder || "user|path|git|runtime|status").split("|");
  const parts = order
    .filter((key) => customState.elements.includes(key))
    .map((key) => partMap[key])
    .filter(Boolean);

  const primaryLine = parts.length ? parts.join(customState.innerSeparator || promptConfig.separator) : "lucas@zshcraft .../ZshCraft";
  const promptSymbol = customState.elements.includes("prompt") ? promptConfig.prompt : customState.cursorStyle?.slice(0, 1) || "❯";

  return {
    primaryLine,
    promptSymbol,
    gitValue,
    runtimeValue,
    pathValue,
  };
};

const composeCustomTheme = () => {
  const { primaryLine, promptSymbol, runtimeValue } = buildCustomPrompt();
  const gitStatusText = customState.gitIndicators.modified ? "On branch main" : "Your branch is clean";
  const runtimeStatusLines = runtimeValue ? [`${promptSymbol} node -v`, runtimeValue] : [];
  const accentColor = closestZshColorName(customState.accent);
  const accentAltColor = closestZshColorName(customState.accentAlt);
  const successColor = closestZshColorName(customState.success);
  const warningColor = closestZshColorName(customState.warning);
  const suggestionColor = closestZshColorName(customState.suggestion);
  const promptString = `${primaryLine}`.replace(/"/g, '\\"');
  const promptIcon = `${promptSymbol}`.replace(/"/g, '\\"');
  const runtimeStatusText = runtimeValue ? `${runtimeValue}`.replace(/"/g, '\\"') : "zshcraft";

  const previewLines = [
    `${primaryLine}`,
    `${promptSymbol} git status`,
    gitStatusText,
    `Your branch is up to date with 'origin/main'.`,
    ...runtimeStatusLines,
    `${promptSymbol} echo "Tema personalizado"`,
    `Tema personalizado`,
  ];

  const scriptLines = [];
  scriptLines.push(`export ZSHCRAFT_CONFIG_FORMAT="${customState.configFormat}"`);
  scriptLines.push(`export ZSHCRAFT_PROMPT_ORDER="${customState.promptOrder}"`);
  scriptLines.push(`export ZSHCRAFT_DIRECTORY_STYLE="${customState.directoryStyle}"`);
  scriptLines.push(`export ZSHCRAFT_BLOCK_SEPARATOR="${customState.blockSeparator}"`);
  scriptLines.push(`export ZSHCRAFT_INNER_SEPARATOR="${customState.innerSeparator}"`);
  scriptLines.push(`export ZSHCRAFT_THEME_PRESET="${customState.themePreset}"`);
  scriptLines.push(`export ZSHCRAFT_CURSOR="${customState.cursorStyle}"`);
  scriptLines.push(`export ZSHCRAFT_ERROR_CURSOR_COLOR="${customState.cursorErrorColor}"`);
  scriptLines.push(`export ZSHCRAFT_ACCENT_COLOR="${accentColor}"`);
  scriptLines.push(`export ZSHCRAFT_ACCENT_ALT_COLOR="${accentAltColor}"`);
  scriptLines.push(`export ZSHCRAFT_SUCCESS_COLOR="${successColor}"`);
  scriptLines.push(`export ZSHCRAFT_WARNING_COLOR="${warningColor}"`);
  scriptLines.push(`export ZSHCRAFT_SUGGESTION_COLOR="${suggestionColor}"`);
  scriptLines.push(`PROMPT="%F{${accentColor}}${promptString}%f %F{${accentAltColor}}${promptIcon}%f "`);
  scriptLines.push(`RPROMPT="%F{${successColor}}${runtimeStatusText}%f"`);
  scriptLines.push(`export LS_COLORS="di=${accentAltColor}:fi=${accentColor}:ln=${successColor}:so=${warningColor}:pi=${suggestionColor}"`);

  if (customState.plugins.zinit) {
    scriptLines.push("if [[ ! -f $HOME/.local/share/zinit/zinit.git/zinit.zsh ]]; then");
    scriptLines.push("    print -P \"%F{33}%F{220}Instalando Zinit...%f\"");
    scriptLines.push("    mkdir -p \"$HOME/.local/share/zinit\"");
    scriptLines.push("    git clone https://github.com/zdharma-continuum/zinit.git \"$HOME/.local/share/zinit/zinit.git\"");
    scriptLines.push("fi");
    scriptLines.push("source \"$HOME/.local/share/zinit/zinit.git/zinit.zsh\"");
  }

  if (customState.plugins.autosuggestions) scriptLines.push("zinit light zsh-users/zsh-autosuggestions");
  if (customState.plugins.syntaxHighlighting) scriptLines.push("zinit light zsh-users/zsh-syntax-highlighting");
  if (customState.plugins.completions) scriptLines.push("zinit light zsh-users/zsh-completions");

  scriptLines.push("HISTFILE=~/.zsh_history");
  scriptLines.push("HISTSIZE=10000");
  scriptLines.push("SAVEHIST=10000");

  if (customState.plugins.history) {
    scriptLines.push("setopt HIST_EXPIRE_DUPS_FIRST");
    scriptLines.push("setopt HIST_IGNORE_DUPS");
    scriptLines.push("setopt HIST_IGNORE_ALL_DUPS");
    scriptLines.push("setopt HIST_FIND_NO_DUPS");
    scriptLines.push("setopt HIST_IGNORE_SPACE");
    scriptLines.push("setopt SHARE_HISTORY");
  }

  scriptLines.push(`ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=${customState.suggestion}'`);

  if (customState.plugins.autoCd) scriptLines.push("setopt AUTO_CD");
  scriptLines.push("autoload -U compinit && compinit");
  scriptLines.push("zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'");
  scriptLines.push("zstyle ':completion:*' menu select");
  scriptLines.push("bindkey '^[[A' history-beginning-search-backward");
  scriptLines.push("bindkey '^[[B' history-beginning-search-forward");

  if (customState.aliases.ls) scriptLines.push("alias ls='ls --color=auto'");
  if (customState.aliases.ll) scriptLines.push("alias ll='ls -lh --color=auto'");
  if (customState.aliases.la) scriptLines.push("alias la='ls -la --color=auto'");
  if (customState.aliases.c) scriptLines.push("alias c='clear'");
  if (customState.aliases.python) scriptLines.push("alias python=python3");
  if (customState.aliases.pip) scriptLines.push("alias pip=pip3");

  if (customState.plugins.starship) scriptLines.push('eval "$(starship init zsh)"');

  if (customState.plugins.nvm) {
    scriptLines.push('export NVM_DIR="$HOME/.nvm"');
    scriptLines.push('[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"');
    scriptLines.push('[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"');
  }

  if (customState.plugins.java) {
    scriptLines.push('export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which javac))))');
    scriptLines.push('export PATH="$JAVA_HOME/bin:$PATH"');
  }

  if (customState.plugins.sdkman) {
    scriptLines.push('export SDKMAN_DIR="$HOME/.sdkman"');
    scriptLines.push('[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"');
  }

  if (customState.plugins.opencode) {
    scriptLines.push('export PATH="/home/lucas/.opencode/bin:$PATH"');
  }

  const customSnippet = customSnippetInput.value.trim();
  if (customSnippet) scriptLines.push(customSnippet);

  const output = [
    ...previewLines,
    "",
    "# --- ~/.zshrc ---",
    ...scriptLines,
  ].join("\n");

  themeTemplates.custom = output;
  return output;
};

const renderElementChips = () => {
  elementChips.innerHTML = "";

  Object.entries(elementDefinitions).forEach(([key, info]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `element-chip ${customState.elements.includes(key) ? "active" : ""}`;
    button.textContent = info.label;
    button.dataset.element = key;
    button.addEventListener("click", () => {
      if (customState.elements.includes(key)) {
        customState.elements = customState.elements.filter((item) => item !== key);
      } else {
        customState.elements = [...customState.elements, key];
      }
      renderElementChips();
      updateTerminal("custom");
    });
    elementChips.appendChild(button);
  });
};

const renderPromptModuleList = () => {
  promptModuleList.innerHTML = "";

  promptModuleDefinitions.forEach(([key, label]) => {
    const row = document.createElement("label");
    row.className = "check-item";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = customState.elements.includes(key);
    input.addEventListener("change", () => {
      if (input.checked) {
        customState.elements = [...new Set([...customState.elements, key])];
      } else {
        customState.elements = customState.elements.filter((item) => item !== key);
      }
      renderElementChips();
      renderPromptModuleList();
      updateTerminal("custom");
    });
    const span = document.createElement("span");
    span.textContent = label;
    row.append(input, span);
    promptModuleList.appendChild(row);
  });
};

const applyThemePreset = (preset) => {
  const presets = {
    dark: { accent: "#8b5cf6", accentAlt: "#06b6d4", success: "#34d399", warning: "#fbbf24", suggestion: "#d65d0e" },
    light: { accent: "#2563eb", accentAlt: "#0ea5e9", success: "#16a34a", warning: "#f59e0b", suggestion: "#f97316" },
    neon: { accent: "#a855f7", accentAlt: "#22d3ee", success: "#2dd4bf", warning: "#facc15", suggestion: "#fb7185" },
    cyberpunk: { accent: "#ff4ecd", accentAlt: "#00f5d4", success: "#7ee787", warning: "#ffb703", suggestion: "#f72585" },
  };

  const theme = presets[preset] ?? presets.dark;
  customState.accent = theme.accent;
  customState.accentAlt = theme.accentAlt;
  customState.success = theme.success;
  customState.warning = theme.warning;
  customState.suggestion = theme.suggestion;

  applyCustomAccent();
  renderCustomControls();
};

const renderCustomControls = () => {
  segmentButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.style === customState.style);
  });

  renderElementChips();
  renderPromptModuleList();
  renderCheckboxGroup(pluginList, pluginDefinitions, customState.plugins, (key, checked) => {
    customState.plugins[key] = checked;
    updateTerminal("custom");
  });
  renderCheckboxGroup(aliasList, aliasDefinitions, customState.aliases, (key, checked) => {
    customState.aliases[key] = checked;
    updateTerminal("custom");
  });

  if (promptOrderSelect) promptOrderSelect.value = customState.promptOrder;
  if (directoryStyleSelect) directoryStyleSelect.value = customState.directoryStyle;
  if (blockSeparatorSelect) blockSeparatorSelect.value = customState.blockSeparator;
  if (innerSeparatorSelect) innerSeparatorSelect.value = customState.innerSeparator;
  if (borderEffectSelect) borderEffectSelect.value = customState.borderEffect;
  if (iconSetSelect) iconSetSelect.value = customState.iconSet;
  if (configFormatSelect) configFormatSelect.value = customState.configFormat;
  if (cursorStyleInput) cursorStyleInput.value = customState.cursorStyle;
  if (errorCursorColorInput) errorCursorColorInput.value = customState.cursorErrorColor;
  if (themePresetSelect) themePresetSelect.value = customState.themePreset;

  customSnippetInput.value = customState.customSnippet;
  accentMainInput.value = customState.accent;
  accentAltInput.value = customState.accentAlt;
  successColorInput.value = customState.success;
  warningColorInput.value = customState.warning;
  suggestionColorInput.value = customState.suggestion;
};

const updateTerminal = (themeName) => {
  const resolvedTheme = normalizeThemeName(themeName);
  const themeValue = resolvedTheme === "custom" ? composeCustomTheme() : themeTemplates[resolvedTheme] ?? themeTemplates[defaultThemeName];
  terminalOutput.innerHTML = renderTerminalPreview(themeValue);

  const themeButtons = document.querySelectorAll(".theme-button");
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === resolvedTheme;
    button.classList.toggle("active", isActive);
  });
};

const setActiveView = (viewName) => {
  menuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  panels.forEach((panel) => {
    const isActive = panel.id === `${viewName}-panel`;
    panel.classList.toggle("active", isActive);
  });

  const titleMap = {
    themes: "Terminal Zsh",
    customize: "Tema personalizado",
    plugins: "Plugins",
    starship: "Starship",
    backups: "Backups",
  };

  panelTitle.textContent = titleMap[viewName] ?? "Terminal Zsh";
};

const createCustomThemeButton = () => {
  const existingButton = document.querySelector('.theme-button[data-theme="custom"]');
  if (existingButton) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-button";
  button.dataset.theme = "custom";
  button.textContent = "meu tema";
  button.addEventListener("click", () => updateTerminal("custom"));
  themeList.appendChild(button);
};

const saveCustomTheme = () => {
  customState.customSnippet = customSnippetInput.value.trim();
  createCustomThemeButton();
  updateTerminal("custom");
  setActiveView("themes");
};

const invokeCommand = async (command, payload) => {
  if (window.__TAURI_INTERNALS__?.core) {
    return window.__TAURI_INTERNALS__.core.invoke(command, payload);
  }

  return null;
};

const registerThemeButtons = () => {
  const themeButtons = document.querySelectorAll(".theme-button");
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateTerminal(button.dataset.theme);
    });
  });
};

menuButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.view));
});

segmentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    customState.style = button.dataset.style;
    renderCustomControls();
    updateTerminal("custom");
  });
});

accentMainInput.addEventListener("input", (event) => {
  customState.accent = event.target.value;
  applyCustomAccent();
  updateTerminal("custom");
});
accentAltInput.addEventListener("input", (event) => {
  customState.accentAlt = event.target.value;
  updateTerminal("custom");
});
successColorInput.addEventListener("input", (event) => {
  customState.success = event.target.value;
  applyCustomAccent();
  updateTerminal("custom");
});
warningColorInput.addEventListener("input", (event) => {
  customState.warning = event.target.value;
  applyCustomAccent();
  updateTerminal("custom");
});
suggestionColorInput.addEventListener("input", (event) => {
  customState.suggestion = event.target.value;
  updateTerminal("custom");
});
promptOrderSelect.addEventListener("change", (event) => {
  customState.promptOrder = event.target.value;
  updateTerminal("custom");
});
directoryStyleSelect.addEventListener("change", (event) => {
  customState.directoryStyle = event.target.value;
  updateTerminal("custom");
});
blockSeparatorSelect.addEventListener("change", (event) => {
  customState.blockSeparator = event.target.value;
  updateTerminal("custom");
});
innerSeparatorSelect.addEventListener("change", (event) => {
  customState.innerSeparator = event.target.value;
  updateTerminal("custom");
});
borderEffectSelect.addEventListener("change", (event) => {
  customState.borderEffect = event.target.value;
  updateTerminal("custom");
});
iconSetSelect.addEventListener("change", (event) => {
  customState.iconSet = event.target.value;
  updateTerminal("custom");
});
configFormatSelect.addEventListener("change", (event) => {
  customState.configFormat = event.target.value;
  updateTerminal("custom");
});
cursorStyleInput.addEventListener("input", (event) => {
  customState.cursorStyle = event.target.value || "❯❯";
  updateTerminal("custom");
});
errorCursorColorInput.addEventListener("input", (event) => {
  customState.cursorErrorColor = event.target.value;
  updateTerminal("custom");
});
themePresetSelect.addEventListener("change", (event) => {
  customState.themePreset = event.target.value;
  applyThemePreset(customState.themePreset);
  updateTerminal("custom");
});
customSnippetInput.addEventListener("input", (event) => {
  customState.customSnippet = event.target.value;
  updateTerminal("custom");
});

saveCustomButton.addEventListener("click", saveCustomTheme);
applyButton.addEventListener("click", async () => {
  const activeTheme = document.querySelector(".theme-button.active")?.dataset.theme ?? defaultThemeName;
  const result = await invokeCommand("apply_theme", { themeName: activeTheme });

  if (result !== null) {
    terminalOutput.textContent += "\n\n[ZshCraft] Tema aplicado com sucesso.";
  }
});

applyCustomAccent();
renderCustomControls();
registerThemeButtons();
setActiveView("themes");
updateTerminal(defaultThemeName);

const loadCurrentTheme = async () => {
  const currentTheme = await invokeCommand("read_current_theme", {});
  if (currentTheme) {
    updateTerminal(currentTheme);
  }
};

loadCurrentTheme();