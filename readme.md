# 🎨 ZshCraft

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue.svg)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/Rust-1.75+-orange.svg)](https://www.rust-lang.org/)
[![Platform](https://img.shields.io/badge/Platform-Linux-lightgrey.svg)](https://www.kernel.org/)

**ZshCraft** é uma aplicação desktop nativa e ultra leve para Linux desenvolvida com **Tauri**, **Rust** e **Web Technologies**. Ela foi projetada para tornar a customização do seu Zsh simples, intuitiva e totalmente visual.

Com o ZshCraft, você não precisa mais editar o arquivo `~/.zshrc` manualmente no terminal para testar e aplicar temas ou gerenciar plugins.

---

## ✨ Funcionalidades

- 👁️ **Preview em Tempo Real:** Visualize exatamente como seu prompt do terminal vai ficar antes de salvar qualquer alteração.
- 🎨 **Gerenciador de Temas:** Alterne facilmente entre os temas mais populares do Oh My Zsh e Starship com um único clique.
- 🔌 **Gerenciador de Plugins:** Ative e instale plugins essenciais (como `zsh-autosuggestions` e `zsh-syntax-highlighting`) de forma simples e automatizada.
- 🛡️ **Backup Automático:** Todas as edições criam uma cópia de segurança preventiva no formato `~/.zshrc.backup-<TIMESTAMP>`.
- ⚡ **Ultra Leve & Nativo:** Desenvolvido em Rust + WebKitGTK (via Tauri) para garantir consumo mínimo de memória RAM e inicialização instantânea no Linux.

---

## 📸 Preview da Interface

```text
+-----------------------------------------------------------------------+
|  🎨 ZshCraft (Linux GUI)                     Tema Ativo: robbyrussell |
+------------------------------------+----------------------------------+
| Temas Disponíveis                  | Pré-visualização do Terminal    |
|                                    | +------------------------------+ |
| [x] robbyrussell                   | | (o)(o)(o)                     | |
| [ ] agnoster                       | | ➜  meu-projeto git:(main)     | |
| [ ] bira                           | +------------------------------+ |
| [ ] af-magic                       |                                  |
|                                    | [ Aplicar no ~/.zshrc ]          |
+------------------------------------+----------------------------------+
```

---

## 🛠️ Tech Stack

- **Backend / Engine Nativa:** [Rust](https://www.rust-lang.org/) (Invocação IPC com o SO e gerenciamento de arquivos)
- **Framework Desktop:** [Tauri](https://tauri.app/)
- **Frontend UI:** HTML5, CSS3 moderno (Dark Theme) e JavaScript (ES6+)
- **WebView Engine:** WebKitGTK (Nativo do Linux)

---

## 🚀 Como Executar Localmente

### Pré-requisitos (Linux)

Certifique-se de ter as dependências do GTK e do Rust instaladas no seu sistema:

```bash
# Ubuntu / Debian / Pop!_OS
sudo apt update
sudo apt install build-essential curl wget libssl-dev libgtk-3-dev libwebkit2gtk-4.0-dev libayatana-appindicator3-dev librsvg2-dev
```

### Clonar e Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/zshcraft.git

# 2. Acesse a pasta do projeto
cd zshcraft

# 3. Instale as dependências e rode em modo de desenvolvimento
npm install
npm run tauri dev
```

---

## 📦 Compilando o Pacote (.deb / AppImage)

Para compilar o arquivo executável para o seu Linux:

```bash
npm run tauri build
```

Os pacotes compilados serão gerados em:
- `src-tauri/target/release/bundle/appimage/`
- `src-tauri/target/release/bundle/deb/`

---

## 📄 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.