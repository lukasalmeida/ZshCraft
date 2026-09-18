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

const terminalOutput = document.querySelector("#terminal-output");
const themeButtons = document.querySelectorAll(".theme-button");
const applyButton = document.querySelector("#apply-theme");

const updateTerminal = (themeName) => {
  terminalOutput.textContent = themeTemplates[themeName] ?? themeTemplates.robbyrussell;
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === themeName;
    button.classList.toggle("active", isActive);
  });
};

const invokeCommand = async (command, payload) => {
  if (window.__TAURI_INTERNALS__?.core) {
    return window.__TAURI_INTERNALS__.core.invoke(command, payload);
  }

  return null;
};

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateTerminal(button.dataset.theme);
  });
});

applyButton.addEventListener("click", async () => {
  const activeTheme = document.querySelector(".theme-button.active")?.dataset.theme ?? "robbyrussell";
  const result = await invokeCommand("apply_theme", { themeName: activeTheme });

  if (result !== null) {
    terminalOutput.textContent += "\n\n[ZshCraft] Tema aplicado com sucesso.";
  }
});

const loadCurrentTheme = async () => {
  const currentTheme = await invokeCommand("read_current_theme", {});
  if (currentTheme) {
    updateTerminal(currentTheme);
  }
};

loadCurrentTheme();