// export default function AnalysisResult({ result, hazard }) {
//   return (
//     <div className="output-box">
//       <strong>AI Identification:</strong>
//       <p>{result}</p>
//       {hazard && (
//         <div className="hazard-warning">
//           <strong>⚠️ {hazard.name}</strong>
//           <p>{hazard.warning}</p>
//           <small>{hazard.action}</small>
//         </div>
//       )}
//     </div>
//   );
// }

import { offlineHazardDatabase } from "../lib/plantDatabase";

export default function AnalysisResult({ result, hazard, onHazardUpdate }) {
  return (
    <div className="output-box">
      <strong>AI Identification:</strong>
      <p>{result}</p>

      {/* Hazard Warning Section */}
      <div className="hazard-section" style={{ marginTop: "12px" }}>
        {hazard ? (
          <div className="hazard-warning">
            <strong>⚠️ Identified Hazard: {hazard.name}</strong>
            <p>{hazard.warning}</p>
            <small>{hazard.action}</small>
          </div>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#556b55" }}>
            No major hazards automatically detected.
          </p>
        )}

        {/* Manual Hazard Update Dropdown */}
        <div style={{ marginTop: "10px" }}>
          <label style={{ fontSize: "0.85rem", marginBottom: "4px" }}>
            Correct or Update Hazard Tag:
          </label>
          <select
            value={hazard ? hazard.name : ""}
            onChange={(e) => {
              const selectedName = e.target.value;
              const found = offlineHazardDatabase.find(
                (h) => h.name === selectedName,
              );
              onHazardUpdate(found || null);
            }}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- None / Safe --</option>
            {offlineHazardDatabase.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
