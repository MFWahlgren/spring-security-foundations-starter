export async function getMe() {
    // TODO Exercise 6:
    // GET /api/me
    // Return null if the status is 401
    // Otherwise return the user data
    throw new Error("getMe is not implemented yet");
}

export async function login(formData) {
    // TODO Exercise 6:
    // POST /api/login
    // Send username and password as form data
    // Include the CSRF token
    throw new Error("login is not implemented yet");
}

export async function logout() {
    // TODO Exercise 6:
    // POST /api/logout
    // Include the CSRF token
    throw new Error("logout is not implemented yet");
}

export async function getNotes(url = "/api/notes") {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

// TODO Exercise 5: Send the CSRF token in the X-XSRF-TOKEN header
export async function addNote(formData) {
    const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(
            {text: formData.get("text")}
        ),
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken()
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
}


function csrfToken() {
    // TODO Exercise 5:
    // Read XSRF-TOKEN from document.cookie
    const cookieJar = document.cookie.split("; ");
    const xsrfCookie = cookieJar.find(c => c.startsWith("XSRF-TOKEN="));

    if (!xsrfCookie) {
        return null;
    }

    // Decode the value
    const xsrfToken = xsrfCookie.split("=")[1];

    // Return the token
    return decodeURIComponent(xsrfToken);
}
