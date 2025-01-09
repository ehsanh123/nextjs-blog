'use client'
import { useState } from 'react'

const api_page = () => {

    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const runPythonScript = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/run-python");
      const data = await response.json();

      if (response.ok) {
        setOutput("respond : " + data)//.output);
      } else {
        // setOutput(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error fetching API:", error);
      setOutput("Failed to run Python script");
    } finally {
      setLoading(false);
    }
    };


    return (
    <div style={{ padding: "20px" }}>
      <h1>Run Python Script in Next.js</h1>
      <button onClick={runPythonScript} disabled={loading}>
        {loading ? "Running..." : "Run Script"}
      </button>
      <p>Output: {output}</p>
    </div>
    )
}

export default api_page
