const storedBase64Password = "Y29uZ3JhdHN5b3VkZWNvZGVkaXQ="; // Base64 encoded password

// Prompt for password
const enteredPassword = prompt("Please enter the password:");

// Encode the entered password to Base64
const enteredBase64Password = btoa(enteredPassword);

// Check if the entered password is correct
if (enteredBase64Password !== storedBase64Password) {
    alert("Incorrect password. Access denied.");

    // Redirect to an external URL (change this to your desired URL)
    window.close();
} else {
    // Fetch the HTML content from the 'html' folder
    fetch('assets/html/mainpage.html')
        .then(response => response.text())
        .then(html => {
            // Once the password is correct, inject the content into the DOM
            document.body.innerHTML = html;
        })
        .catch(error => console.error('Error fetching HTML content:', error));
}
