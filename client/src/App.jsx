import { useState } from "react";
import axios from "axios";

function App() {
  const [requirement, setRequirement] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
    const res = await axios.post("http://localhost:5000/generate", {
      requirement,
    });
    setTestCases(res.data);
    } catch (err) {
      alert("Failed to generate test cases");
      console.error(err);
    }
    setLoading(false);  
  };

  return (
    <div style={{padding: 20}}>
      <h2>AI Testcase Generator</h2>

      <textarea 
      rows={5}
      style={{width: "100%"}}
      placeholder="Enter requirement here"
      value={requirement}
      onChange={e => setRequirement(e.target.value)}  
      />

      <button onClick={generate} disabled={loading} style={{ marginTop: 10 }}>{loading ? "Generating..." : "Generate Testcases"}</button>

      {testCases.length > 0 && (
        <table border="1" cellPadding="8" style={{marginTop: 20}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Scenario</th>
              <th>Steps</th>
              <th>Expected Result</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((tc, index) => (
              <tr key={index}>
                <td>{tc.id}</td>
                <td>{tc.type}</td>
                <td>{tc.scenario}</td>
                <td>
                  <ol>
                    {tc.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </td>
                <td>{tc.expectedResult}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App;