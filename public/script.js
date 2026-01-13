async function makeCall() {
  const phone = document.getElementById("phone").value;
  const status = document.getElementById("status");

  status.innerText = "Calling...";

  const res = await fetch("/call", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: phone })
  });

  const data = await res.json();

  if (data.success) {
    status.innerText = "Call initiated successfully!";
  } else {
    status.innerText = "Call failed!";
  }
}
