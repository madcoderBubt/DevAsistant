# Dev Assistant 🚀

A comprehensive suite of developer tools designed to streamline your daily workflow. Built with performance, privacy, and ease of use in mind.

## ✨ Features

- **Code Formatter**: Quickly format your code using Prettier.
- **Diff Tool**: Compare two pieces of code or text to find differences.
- **JSON Parser**: Parse, validate, and format JSON data.
- **Unit Conversion**: Convert between various units (Length, Weight, Temp, etc.).
- **Image Converter**: Convert images between different formats directly in your browser.
- **Data Converter**: Convert data between formats like CSV, XML, and JSON.

## 🛠️ Tech Stack

- **Monorepo**: Managed with NPM Workspaces.
- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/).
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) for a rich coding experience.
- **Utilities**: 
  - `diff-match-patch` for text comparisons.
  - `prettier` for code formatting.
  - `lucide-react` for beautiful icons.

## 📁 Project Structure

```text
.
├── apps/
│   └── web/          # The main React application (Vite)
├── packages/
│   └── core/         # Shared logic and utilities
├── package.json      # Root workspace configuration
└── README.md         # You are here
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [NPM](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/madcoderBubt/DevAsistant.git
   cd DevAsistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server for the web application:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build all packages and the web application:

```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
