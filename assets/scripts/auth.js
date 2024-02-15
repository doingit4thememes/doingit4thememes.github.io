const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const localStorageKey = 'sessionTimestamp';
const storedBase64Password = "Y29uZ3JhdHN5b3VkZWNvZGVkaXQ="; // Base64 encoded password

// Check if a session timestamp is stored in local storage
const storedTimestamp = localStorage.getItem(localStorageKey);

if (storedTimestamp && Date.now() - parseInt(storedTimestamp, 10) < SESSION_TIMEOUT) {
    // Session is still valid, user doesn't need to re-enter the password
    console.log('Session is still valid.');
    fetchContent(); // Fetch HTML content when the session is still valid
} else {
    // Session has expired or is not set, prompt for password
    const enteredPassword = prompt('Please enter the password:');
    const enteredBase64Password = btoa(enteredPassword);

    // Validate the password
    if (enteredBase64Password === storedBase64Password) {
        // Password is correct, save the timestamp
        localStorage.setItem(localStorageKey, Date.now().toString());
        console.log('Password is correct. Session saved for 30 minutes.');
        alert('Successfully logged in! Your session has been saved for 30 minutes.\nEnjoy!')
        fetchContent(); // Fetch HTML content when the password is correct
    } else {
        alert('Incorrect password. Access denied.');
        window.location.href = "https://google.com";
    }
}

function fetchContent() {
    // Fetch the HTML content from the 'html' folder
    fetch('assets/html/mainpage.html')
        .then(response => response.text())
        .then(html => {
            // Once the password is correct or the session is valid, inject the content into the DOM
            document.body.innerHTML = html;
        })
        .catch(error => console.error('Error fetching loaded.html:', error));
}
