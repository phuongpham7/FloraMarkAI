
export default function ModelLoader({ progress, status }) {
  return (
    <div className="loader-box">
      <p><strong>{status}</strong></p>
      {progress > 0 && (
        <div className="progress-bar">
          <div style={{ width: `${progress}%`, background: '#2e7d32', height: '8px', borderRadius: '4px' }} />
        </div>
      )}
    </div>
  );
}