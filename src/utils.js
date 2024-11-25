import { LOCK_STATUS_URL, SHOW_APEL_URL, RESET_URL } from './constants';

export const handleButtonClick = async (buttonId, queue, setQueue, isProcessing, setIsProcessing, lockStatus, setLockStatus, selectedUrl, isAppleEnabled) => {
  if (queue.includes(buttonId)) {
    console.log(`Tombol ${buttonId} sudah ada dalam antrian`);
    return;
  }

  try {
    const response = await fetch(LOCK_STATUS_URL);
    const data = await response.text();
    const isLocked = data === "1";

    if (isLocked) {
      setQueue((prevQueue) => [...prevQueue, buttonId]);
    } else {
      const urlParams = new URLSearchParams({
        urutan: buttonId,
        apel: isAppleEnabled ? "yes" : "no",
      });
      const url = `http://47.128.237.174/mandalorian/${selectedUrl}?${urlParams.toString()}`;
      console.log(`Membuka website untuk tombol ${buttonId}`);
      window.open(url, "_blank");
    }
  } catch (error) {
    console.error("Error fetching lock status:", error);
    setQueue((prevQueue) => [...prevQueue, buttonId]);
  }
};

export const handleFormSubmit = async (e, nomor, opsi, email, setNotification) => {
  e.preventDefault();
  try {
    const urlParams = new URLSearchParams({
      nomor,
      opsi,
      apel: email,
    });
    const url = `${SHOW_APEL_URL}?${urlParams.toString()}`;
    const response = await fetch(url);
    if (response.ok) {
      setNotification("Data meluncur...!");
      setTimeout(() => setNotification(""), 1000); // Hide notification after 1 second
    } else {
      setNotification("Gagal menyimpan data.");
    }
  } catch (error) {
    console.error("Error mengirimkan data:", error);
    setNotification("Gagal menyimpan data.");
  }
};

export const handleShowClick = async (nomor, opsi, setShowResult) => {
  try {
    const urlParams = new URLSearchParams({
      pasukan: nomor,
      urutan: opsi,
    });
    const url = `${SHOW_APEL_URL}?${urlParams.toString()}`;
    const response = await fetch(url);
    const data = await response.text();
    setShowResult(data);
  } catch (error) {
    console.error("Error fetching current results:", error);
  }
};

export const resetClick = async (setShowResult) => {
  try {
    const response = await fetch(RESET_URL);
    const data = await response.text();
    setShowResult(data);
  } catch (error) {
    console.error("Error fetching current results:", error);
  }
};

export const fetchLockStatus = async (setLockStatus) => {
  try {
    const response = await fetch(LOCK_STATUS_URL);
    const data = await response.text();
    setLockStatus(data === '1');
  } catch (error) {
    console.error("Error fetching lock status:", error);
  }
};