async function makeCall() {
  const phone = document.getElementById("phone").value;
  const status = document.getElementById("status");
  const btn = document.getElementById("callBtn");

  if (!phone) {
    status.innerText = "Please enter a phone number.";
    status.style.color = "#ff6b6b";
    return;
  }

  btn.disabled = true;
  btn.innerText = "Calling...";
  status.innerText = "Initiating call...";
  status.style.color = "#00c6ff";

  try {
    const res = await fetch("/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone })
    });

    const data = await res.json();

    if (data.success) {
      status.innerText = "Call initiated successfully!";
      status.style.color = "#4cd137";
    } else {
      status.innerText = "Call failed.";
      status.style.color = "#ff6b6b";
    }
  } catch (err) {
    status.innerText = "Something went wrong.";
    status.style.color = "#ff6b6b";
  }

  btn.disabled = false;
  btn.innerText = "Start Call";
}
