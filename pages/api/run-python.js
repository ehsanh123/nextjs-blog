import { execFile } from "child_process";
import path from "path";

export default function handler(req, res) {
  const scriptPath = path.join(process.cwd(), "script.py");

  console.log("Executing Python script...");

  execFile("python3", [scriptPath], (error, stdout, stderr) => {
    console.log("Python script executed");

    if (error) {
      console.error("Error executing script:", error.message);
      return res.status(500).json({ error: "Failed to execute script" });
    }

    if (stderr) {
      console.error("Python stderr:", stderr);
      return res.status(500).json({ error: "Script error", details: stderr });
    }

    console.log("Python stdout:", stdout);

    try {
      // Try parsing the stdout to JSON
      const parsedOutput = JSON.parse(stdout.trim());
      // Ensure response is returned
      // console.log("Python stdout:", 'hi');
      // return res.status(200).json(parsedOutput);
      return res.status(200).json(stdout);
      // return 'hi'
      

    } catch (e) {
      console.error("Error parsing Python output:", e);
      return res.status(500).json({ error: "Failed to parse Python script output", details: stdout.trim() });
    }
  });
}
