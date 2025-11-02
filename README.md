# 🧩 MCP Server – Keyword Search Tool

This project is an MCP (Model Context Protocol) server that provides a simple REST API tool to **search for a keyword inside a text file**.

---

## 🚀 Features
- Search for any keyword in a specified file.
- Returns matching lines as JSON.
- Built using Node.js and Express.

---

## 📁 Project Structure
mcp-server/
├── index.js # Main MCP server file
├── package.json # Node dependencies
├── sample.txt # Example file for testing
└── README.md # Project documentation

1. Clone this repository:
   ```bash
    git clone https://github.com/Navateja-gupta/MCP.git
   cd mcp-server

2. Install dependencies:
  npm install

3. Start the MCP server:
  node server.js
4. Run below command to test the output by providing input value for "Keyword" as shown below
    Invoke-WebRequest -Uri "http://localhost:3000/search_in_file" `
    -Method POST `  -ContentType "application/json" `
    -Body '{"file_path": "C:/Users/Teja/OneDrive/Desktop/mcp-server1/sample.txt", "keyword": "error"}'
