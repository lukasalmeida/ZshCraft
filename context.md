# 🗺️ ZshCraft - Contexto e Arquitetura do Projeto

## 🎯 Visão Geral
O **ZshCraft** é um aplicativo desktop nativo para Linux desenvolvido para facilitar a personalização visual, gerenciamento de temas e controle de plugins do **Zsh** (Oh My Zsh e Starship). Ele elimina a necessidade de editar arquivos `.zshrc` manualmente ao oferecer um painel de controle com preview em tempo real e criação automática de backups.

## 🛠️ Stack Tecnológica

- **Core & Backend (Native OS):** Rust (Tauri CLI / API)



- **WebView UI (Frontend):** HTML5, CSS3 moderno, JavaScript ES6+



- **Plataforma-Alvo:** Linux (Suporte a `.deb`, `AppImage` e pacotes para distribuições baseadas em Arch/Debian)



- **Mecanismo de WebView:** WebKitGTK (Nativo do Linux)




## 📂 Estrutura de Diretórios Esperada

Plaintext

```
zshcraft/
├── src/                    # Frontend (Interface do Usuário)
│   ├── index.html          # Layout principal e simulador de terminal
│   ├── styles.css          # Estilos CSS (Tema Dark, botões e layout)
│   └── app.js              # Lógica do frontend e chamadas via Tauri API
├── src-tauri/              # Backend (Rust e Configurações do App)
│   ├── src/
│   │   └── main.rs         # Comandos Rust (Manipulação de arquivos do SO)
│   ├── Cargo.toml          # Dependências do Rust (dirs, tauri, etc.)
│   └── tauri.conf.json     # Configurações do pacote e permissões da aplicação
├── install.sh              # Script opcional para instalação via cURL/Bash
├── context.md              # Contexto da aplicação para Devs/AIs
└── README.md               # Documentação principal e guia do usuário
```

## ⚙️ Regras do Sistema & Fluxo de Dados

1. **Manipulação do `.zshrc`:**


    - O arquivo principal do usuário fica em `~/.zshrc`.
        
          
        
    - **Sempre** gerar um backup no diretório `~/.zshrc.backup-` antes de reescrever ou atualizar qualquer linha de configuração.



2. **Leitura e Parsing de Temas:**


    - O backend Rust deve ler a linha iniciada por `ZSH_THEME="..."` e retornar a string para o frontend.
        
          
        
    - Se a chave não for encontrada, deve ser definido um valor padrão (`robbyrussell`).



3. **Invocação Tauri (IPC):**


    - `read_current_theme()`: Retorna o tema ativo atualmente no sistema.
        
          
        
    - `apply_theme(theme_name)`: Grava o novo tema no `.zshrc` criando o backup preventivo.




## 🎨 Diretrizes de Design & UI

- **Interface:** Visual moderno estilo Dark Mode (inspirado em paletas como Catppuccin / Dracula).



- **Terminal Simulation:** O simulador de terminal no frontend deve atualizar seu HTML interno instantaneamente ao clicar nos botões da barra lateral de temas.



- **Leveza:** O frontend não deve depender de frameworks pesados no MVP para manter o pacote final compacto (< 10 MB).




## 🧪 Próximos Passos (Roadmap)

- [ ] Leitura e escrita básica do `ZSH_THEME` no `.zshrc`.



- [ ] Visualizador/Simulador de terminal em tempo real.



- [ ] Módulo para ativação/desativação de plugins (`zsh-autosuggestions`, `zsh-syntax-highlighting`).



- [ ] Suporte a exportação de configurações do **Starship Prompt** (`starship.toml`).



- [ ] Empacotamento de lançamentos via GitHub Actions (`AppImage` e `.deb`).