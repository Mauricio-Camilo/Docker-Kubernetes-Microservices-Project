const urls = window.BACKEND_URLS;

const states = {
  "backend-1": false,
  "backend-2": false,
  "backend-3": false
};

async function callBackend(backend) {
  const responseElement = document.getElementById(`response-${backend}`);

  if (states[backend]) {
    responseElement.innerText = "";
    states[backend] = false;
    return;
  }

  try {
    const res = await fetch(urls[backend]);
    const data = await res.text();
    responseElement.innerText = data;
    states[backend] = true; 
  } catch (err) {
    responseElement.innerText = "Error: " + err.message;
    states[backend] = false;
  }
}
