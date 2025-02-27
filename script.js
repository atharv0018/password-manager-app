// Function to generate captcha code
function generateCaptcha() {
    const captchaText = Math.random().toString(36).slice(2, 8);
    document.getElementById("captcha").innerText = captchaText;
}

// Show the login form
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("dashboard-form").style.display = "none";
}

// Show the signup form
function showSignup() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    generateCaptcha();
    document.getElementById("dashboard-form").style.display = "none";
}

// Show the dashboard after login
function showDashboard(user) {
    document.getElementById("dashboard-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    loadSavedPasswords(user);
}

// Handle user signup
function signupUser() {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const captchaInput = document.getElementById("captchaInput").value;

    const captcha = document.getElementById("captcha").innerText;

    if (captchaInput !== captcha) {
        alert("Captcha is incorrect.");
        return false;
    }

    const user = {
        name,
        mobile,
        username,
        password,
        savedPasswords: [] // initialize an empty array for storing passwords
    };

    // Save user data to localStorage
    localStorage.setItem(username, JSON.stringify(user));

    alert("Account created successfully. You can now log in.");
    showLogin();
    return false;
}

// Handle user login
function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
        alert("Login successful! Welcome " + storedUser.name);
        showDashboard(storedUser);
    } else {
        alert("Invalid credentials. Please try again.");
    }
    return false;
}

// Save website password to localStorage under the user
function savePassword() {
    const username = document.getElementById("loginUsername").value;
    const websiteName = document.getElementById("websiteName").value;
    const websiteEmail = document.getElementById("websiteEmail").value;
    const websiteUsername = document.getElementById("websiteUsername").value;
    const websitePassword = document.getElementById("websitePassword").value;

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser) {
        const newPassword = {
            websiteName,
            websiteEmail,
            websiteUsername,
            websitePassword
        };

        storedUser.savedPasswords.push(newPassword);
        localStorage.setItem(username, JSON.stringify(storedUser)); // update saved passwords

        alert("Password saved successfully!");
        loadSavedPasswords(storedUser);
    }

    document.getElementById("passwordForm").reset(); // Reset the form
    return false;
}

// Load and display saved passwords for the user
function loadSavedPasswords(user) {
    const savedPasswordsDiv = document.getElementById("savedPasswords");
    savedPasswordsDiv.innerHTML = "";

    if (user.savedPasswords.length === 0) {
        savedPasswordsDiv.innerHTML = "<p>No saved passwords.</p>";
        return;
    }

    user.savedPasswords.forEach(function(password) {
        const passwordDiv = document.createElement("div");
        passwordDiv.classList.add("password-entry");
        passwordDiv.innerHTML = `
            <p><strong>Website:</strong> ${password.websiteName}</p>
            <p><strong>Email:</strong> ${password.websiteEmail}</p>
            <p><strong>Username:</strong> ${password.websiteUsername}</p>
            <p><strong>Password:</strong> ${password.websitePassword}</p>
            <hr>
        `;
        savedPasswordsDiv.appendChild(passwordDiv);
    });
}

// Logout user
function logoutUser() {
    alert("You have been logged out.");
    showLogin();
}
