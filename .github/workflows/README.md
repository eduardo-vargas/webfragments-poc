# GitHub Actions Workflows 🚀

This directory contains two separate workflows for deploying our web fragments architecture:

## 🧩 `deploy-fragments.yml`
Deploys the web fragments library and standalone demos.

📍 **Deployment URLs:**
- Standalone demos:
  - Party Button: `/fragments/party-button/demo/`
  - Dashboard: `/fragments/dashboard/demo/`
- Importable modules:
  - Party Button: `/fragments/party-button/index.js`
  - Dashboard: `/fragments/dashboard/index.js`

## 🎯 `deploy-main.yml`
Deploys the main application that consumes the fragments.

📍 **Deployment URL:** `/`

## 🔄 Triggers
- On push to `main` in respective directories
- Manual trigger via GitHub UI
- Fragments: Changes in `packages/webfragments/**`
- Main App: Changes in `packages/main-app/**`

## 🌐 Actual Deployed URLs
Replace `eduardo-vargas` with your GitHub username.

### Main App
`https://eduardo-vargas.github.io/webfragments-poc/`

### Fragments
| Fragment | 🖥️ Demo URL | 📦 Module URL |
|----------|------------|--------------|
| Party Button | [Demo](https://eduardo-vargas.github.io/webfragments-poc/fragments/party-button/demo/) | [Module](https://eduardo-vargas.github.io/webfragments-poc/fragments/party-button/index.js) |
| Dashboard | [Demo](https://eduardo-vargas.github.io/webfragments-poc/fragments/dashboard/demo/) | [Module](https://eduardo-vargas.github.io/webfragments-poc/fragments/dashboard/index.js) | 