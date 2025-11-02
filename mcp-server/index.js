import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    name: "Local File Search MCP Server",
    version: "1.0.0",
    status: "✅ Server running",
  });
});


app.get("/mcp/manifest", (req, res) => {
  res.json({
    name: "local-file-search",
    version: "1.0.0",
    description: "Search for a keyword inside local text files.",
    tools: [
      {
        name: "search_in_file",
        description: "Search for a keyword inside a file and return matching lines.",
        input_schema: {
          type: "object",
          properties: {
            file_path: { type: "string", description: "Absolute path to the file" },
            keyword: { type: "string", description: "Keyword to search for" },
          },
          required: ["file_path", "keyword"],
        },
      },
    ],
  });
});


app.post("/search_in_file", (req, res) => {
  try {
    const { file_path, keyword } = req.body;
    if (!file_path || !keyword) {
      return res.status(400).json({ message: "❌ Missing file_path or keyword" });
    }

    const absolutePath = path.resolve(file_path);
    const data = fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
    console.log("📄 FILE CONTENT:\n", data);

    const matches = data
      .split(/\r?\n/)
      .filter((line) => new RegExp(keyword, "i").test(line));

    res.json(
      matches.length > 0
        ? { message: `✅ Found ${matches.length} matches`, matches }
        : { message: "❌ No matches found" }
    );
  } catch (error) {
    res.status(500).json({ error: `❌ Error reading file: ${error.message}` });
  }
});


const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ MCP-like server running at http://localhost:${PORT}`);
});
