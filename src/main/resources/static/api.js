export async function getMe() {
    // TODO Exercise 6:
    // GET /api/me
    const response = await fetch("/api/me");

    // Return null if the status is 401
    if(!response.ok){
        return null;
    }

    // Otherwise return the user data
    return await response.json();
}

export async function login(formData) {
    // TODO Exercise 6:
    // POST /api/login
    const response = await fetch("/api/login", {
        method: "POST",
        // Send username and password as form data
        body: new URLSearchParams(formData),
        headers: {
            // Include the CSRF token
            "X-XSRF-TOKEN": csrfToken()
        }
    });

    if(!response.ok){
        throw new Error("Login failed")
    }
}

export async function logout() {
    // TODO Exercise 6:
    // POST /api/logout
    const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
            // Include the CSRF token
            "X-XSRF-TOKEN": csrfToken()
        }
    });

    if (!res.ok) {
        throw new Error("An error occurred while logging out");
    }
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
