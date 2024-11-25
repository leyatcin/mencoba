import './App.css';
import React, { useState, useEffect } from 'react';
import { handleButtonClick, handleFormSubmit, handleShowClick, resetClick, fetchLockStatus } from './utils';

function App() {
  const [queue, setQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("luciurl.php");
  const [isAppleEnabled, setIsAppleEnabled] = useState(false);
  const [nomor, setNomor] = useState("1");
  const [opsi, setOpsi] = useState("1");
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");
  const [showResult, setShowResult] = useState("");
  const [lockStatus, setLockStatus] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchLockStatus(setLockStatus);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClickWrapper = async (buttonId) => {
    await handleButtonClick(buttonId, queue, setQueue, isProcessing, setIsProcessing, lockStatus, setLockStatus, selectedUrl, isAppleEnabled);
  };

  const handleFormSubmitWrapper = async (e) => {
    await handleFormSubmit(e, nomor, opsi, email, setNotification);
  };

  // eslint-disable-next-line no-unused-vars
  const handleShowClickWrapper = async () => {
    await handleShowClick(nomor, opsi, setShowResult);
  };

  // eslint-disable-next-line no-unused-vars
  const resetClickWrapper = async () => {
    await resetClick(setShowResult);
  };

  const closeNotification = () => {
    setNotification("");
  };

  const closeShowResult = () => {
    setShowResult("");
  };

  return (
    <div>
      <select onChange={(e) => setSelectedUrl(e.target.value)} value={selectedUrl} className="form-select">
        <option value="luciurl.php">luciurl.php</option>
        <option value="luciurl2.php">luciurl2.php</option>
        <option value="luciurl3.php">luciurl3.php</option>
      </select>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isAppleEnabled}
          onChange={(e) => setIsAppleEnabled(e.target.checked)}
        />
        APEL?
      </label>
      {[...Array(8)].map((_, index) => (
        <button key={index} onClick={() => handleButtonClickWrapper(index + 1)}>
          Tombol {index + 1}
        </button>
      ))}
      <div className="queue-container">
        <h3>Antrian:</h3>
        <div className="queue-boxes">
          {queue.map((buttonId, index) => (
            <div key={index} className="queue-box">
              {buttonId}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleFormSubmitWrapper} className="form">
        <select onChange={(e) => setNomor(e.target.value)} value={nomor} className="form-select">
          <option value="1">Pasukan 1</option>
          <option value="2">Pasukan 2</option>
          <option value="3">Pasukan 3</option>
        </select>
        <select onChange={(e) => setOpsi(e.target.value)} value={opsi} className="form-select">
          {[...Array(8)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tambah Email?"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Kirim</button>
      </form>

      {notification && (
        <div className="notification">
          <span>{notification}</span>
          <button onClick={closeNotification}>Tutup</button>
        </div>
      )}

      {showResult && (
        <div className="show-result">
          <span>{showResult}</span>
          <button onClick={closeShowResult}>Tutup</button>
        </div>
      )}
    </div>
  );
}

export default App;