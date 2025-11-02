import fs from "fs";

export const keywordSearchTool = {
  name: "search_in_file",
  description: "Search for a keyword inside a file and return matching lines.",
  inputSchema: {
    type: "object",
    properties: {
      file_path: { type: "string", description: "Path to the text file" },
      keyword: { type: "string", description: "Keyword to search for" }
    },
    required: ["file_path", "keyword"]
  },
  async execute({ file_path, keyword }) {
    if (!fs.existsSync(file_path)) {
      return { error: "File not found." };
    }

    const content = fs.readFileSync(file_path, "utf8");
    const lines = content.split("\n");
    const matches = lines
      .map((line, i) => `${i + 1}: ${line}`)
      .filter(line => line.toLowerCase().includes(keyword.toLowerCase()));

    return matches.length > 0
      ? { result: matches }
      : { result: `No matches found for '${keyword}'.` };
  }
};
