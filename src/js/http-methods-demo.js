const baseUrlInput = document.getElementById("api-base-url");
const resourceIdInput = document.getElementById("api-resource-id");
const resultBox = document.getElementById("api-result");

const getButton = document.getElementById("btn-get");
const postButton = document.getElementById("btn-post");
const patchButton = document.getElementById("btn-patch");
const putButton = document.getElementById("btn-put");
const deleteButton = document.getElementById("btn-delete");

function safeParseId() {
  const parsed = Number(resourceIdInput.value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function printResult(title, payload) {
  resultBox.textContent = `${title}\n\n${JSON.stringify(payload, null, 2)}`;
}

async function runRequest(method) {
  const baseUrl = baseUrlInput.value.trim() || "http://localhost:3000/products";
  const id = safeParseId();

  let url = baseUrl;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "GET") {
    url = `${baseUrl}?limit=5`;
  }

  if (method === "POST") {
    options.body = JSON.stringify({
      name: "Trail Dome Tent",
      brand: "SleepOutside",
      price: 259.99,
      category: "tents",
    });
  }

  if (method === "PATCH") {
    url = `${baseUrl}/${id}`;
    options.body = JSON.stringify({
      price: 149.99,
    });
  }

  if (method === "PUT") {
    url = `${baseUrl}/${id}`;
    options.body = JSON.stringify({
      id,
      name: "Summit Tent Updated",
      brand: "SleepOutside",
      price: 309.99,
      category: "tents",
    });
  }

  if (method === "DELETE") {
    url = `${baseUrl}/${id}`;
    delete options.headers["Content-Type"];
  }

  try {
    printResult(`${method} ${url}`, { status: "Loading..." });

    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { message: "No JSON response body" };

    printResult(`${method} ${url}`, {
      status: response.status,
      ok: response.ok,
      data,
    });

    if (response.ok && method !== "GET") {
      window.dispatchEvent(new CustomEvent("products:changed"));
    }
  } catch (error) {
    printResult(`${method} ${url}`, {
      error: error.message,
    });
  }
}

if (
  baseUrlInput &&
  resourceIdInput &&
  resultBox &&
  getButton &&
  postButton &&
  patchButton &&
  putButton &&
  deleteButton
) {
  getButton.addEventListener("click", () => runRequest("GET"));
  postButton.addEventListener("click", () => runRequest("POST"));
  patchButton.addEventListener("click", () => runRequest("PATCH"));
  putButton.addEventListener("click", () => runRequest("PUT"));
  deleteButton.addEventListener("click", () => runRequest("DELETE"));
}
