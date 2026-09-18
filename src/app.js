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
  elements: ["user", "path", "git", "status", "prompt"],
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
  path: { label: "Caminho", sample: "~/projects" },
  git: { label: "Git", sample: "git:(main)" },
  status: { label: "Status", sample: "✓" },
  prompt: { label: "Prompt", sample: "❯" },
  command: { label: "Comando", sample: "npm run dev" },
  clock: { label: "Relógio", sample: "18:42" },
};

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

const defaultThemeName = "robbyrussell";

const applyCustomAccent = () => {
  document.documentElement.style.setProperty("--accent", customState.accent);
  document.documentElement.style.setProperty("--accent-soft", `${customState.accent}2b`);
  document.documentElement.style.setProperty("--green", customState.success);
  document.documentElement.style.setProperty("--yellow", customState.warning);
};

const normalizeThemeName = (value) => value || defaultThemeName;

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
  const parts = [];

  if (customState.elements.includes("user")) parts.push("lucas@zshcraft");
  if (customState.elements.includes("path")) parts.push("~/projects");
  if (customState.elements.includes("git")) parts.push("git:(main)");
  if (customState.elements.includes("status")) parts.push("✓");
  if (customState.elements.includes("clock")) parts.push("18:42");
  if (customState.elements.includes("command")) parts.push("npm run dev");

  const primaryLine = parts.length ? parts.join(promptConfig.separator) : "lucas@zshcraft ~/projects";
  const promptSymbol = customState.elements.includes("prompt") ? promptConfig.prompt : "❯";

  return {
    primaryLine,
    promptSymbol,
  };
};

const composeCustomTheme = () => {
  const { primaryLine, promptSymbol } = buildCustomPrompt();

  const previewLines = [
    `${primaryLine}`,
    `${promptSymbol} git status`,
    `On branch main`,
    `Your branch is up to date with 'origin/main'.`,
    `${promptSymbol} echo "Tema personalizado"`,
    `Tema personalizado`,
  ];

  const scriptLines = [];

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

const renderCustomControls = () => {
  segmentButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.style === customState.style);
  });

  renderElementChips();
  renderCheckboxGroup(pluginList, pluginDefinitions, customState.plugins, (key, checked) => {
    customState.plugins[key] = checked;
    updateTerminal("custom");
  });
  renderCheckboxGroup(aliasList, aliasDefinitions, customState.aliases, (key, checked) => {
    customState.aliases[key] = checked;
    updateTerminal("custom");
  });

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
  terminalOutput.textContent = themeValue;

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