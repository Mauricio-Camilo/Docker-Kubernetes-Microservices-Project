const urls = {
  // "backend-1": "http://localhost:4001/",
  "backend-1": "http://192.168.49.2:30001/",
  "backend-2": "http://localhost:4002/",
  "backend-3": "http://localhost:4003/"
};

// Estado de cada backend: true = mostrando, false = escondido
const states = {
  "backend-1": false,
  "backend-2": false,
  "backend-3": false
};

async function callBackend(backend) {
  const responseElement = document.getElementById(`response-${backend}`);

  if (states[backend]) {
    // Se já está ativo, limpa a mensagem e marca como inativo
    responseElement.innerText = "";
    states[backend] = false;
    return;
  }

  try {
    const res = await fetch(urls[backend]);
    const data = await res.text();
    responseElement.innerText = data;
    states[backend] = true; // marca como ativo
  } catch (err) {
    responseElement.innerText = "Error: " + err.message;
    states[backend] = false;
  }
}
