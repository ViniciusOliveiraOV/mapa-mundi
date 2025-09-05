# Mapa-Mundi (backend + frontend)

Este repositório contém um pequeno projeto Node.js com um módulo nativo (N-API) compilado para Windows e uma interface frontend simples.

## Estrutura

- `backend/` - código do servidor / addon nativo compilado com `node-gyp`.
  - `native/` - código-fonte C++ do addon (N-API)
  - `binding.gyp` - configuração do build do node-gyp
  - `index.js` - exemplo que carrega e executa o addon
- `frontend/` - arquivos estáticos e código React (ex.: `src/App.jsx`)

## Pré-requisitos (Windows)

- Node.js (recomenda-se LTS)
- Python (usado pelo `node-gyp`) — por exemplo 3.8+ ou conforme sua instalação
- Visual Studio Build Tools (ou Visual Studio) com a workload "Desktop development with C++"

## Como compilar o addon (backend)

1. Abra um PowerShell no diretório `backend`:

```powershell
cd C:\Users\stayc\Documents\code\python\atlas_mundo\backend
```

2. Instale dependências e compile (o `install` do `package.json` já chama `node-gyp rebuild`):

```powershell
npm install
```

Ou para compilar manualmente:

```powershell
npm run build
```

3. Teste o addon:

```powershell
node index.js
# deve imprimir: Hello from C++ addon!
```

## Observações

- O projeto usa `node-addon-api` para facilitar a escrita do código N-API e `bindings` para carregar o binário compilado.
- Em Windows, diferenças na expansão de comando e caminhos podem causar problemas ao usar expressões dinâmicas em `binding.gyp`; se necessário, ajuste `include_dirs` ou use o caminho retornado por `node -p "require('node-addon-api').include"`.

## Contribuição

Sinta-se à vontade para abrir issues ou enviar PRs.

---

Arquivo gerado automaticamente: README em português (pt-br). Ajuste conforme necessário.
