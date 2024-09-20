class AuthService {
  // Store access code
  setCode(code: string) {
    localStorage.setItem("code", code);
  }

  // Retrieve access code
  getCode() {
    return localStorage.getItem("code");
  }

  // Store access token
  setToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  // Retrieve access token
  getToken() {
    return localStorage.getItem("access_token");
  }

  // Check if the user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    // Perform any additional checks, like token expiration validation
    return !!token; // true if token exists
  }

  // Log out the user
  logout() {
    localStorage.removeItem("code");
    window.location.href = "/";
  }

  // Optionally, implement token refresh logic
  async refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const response = await fetch("/api/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      this.setToken(data.access_token);
    }
  }
}

export const authService = new AuthService();
