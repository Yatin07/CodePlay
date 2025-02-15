window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!window.SpeechRecognition) {
    alert("Your browser does not support speech recognition. Please use Chrome.");
}
 
// Create speech recognition instance
const recognition = new SpeechRecognition();
recognition.continuous = true;  // Keep listening continuously
recognition.lang = 'en-US';
recognition.interimResults = false;
 
// Handle speech recognition results
recognition.onresult = (event) => {
    const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User said:", speechResult);
    processVoiceCommand(speechResult);
};
 
// Restart listening after speaking
recognition.onend = () => {
    console.log("Restarting voice recognition...");
    setTimeout(() => recognition.start(), 1000); // Restart after 1 second
};
 
// Handle recognition errors
recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    alert("Speech recognition error: " + event.error);
};
 
// Start voice assistant on button click
document.addEventListener("DOMContentLoaded", () => {
    const voiceBtn = document.getElementById("voice-btn");
    if (voiceBtn) {
        voiceBtn.addEventListener("click", () => {
            console.log("Voice assistant activated. Listening...");
            recognition.start();
        });
    } else {
        console.error("Voice button not found.");
    }
});
 
// Process voice commands
function processVoiceCommand(command) {
    let response = "I didn't understand that.";
 
    if (command.includes("find a doctor")) {
        response = "Redirecting to Find a Doctor section.";
        window.location.href = "#";  // Add actual section ID
    } else if (command.includes("our services")) {
        response = "Navigating to Our Services.";
        window.location.href = "#";  // Add actual section ID
    } else if (command.includes("testimonials")) {
        response = "Here are some testimonials.";
        window.location.href = "#";  // Add actual section ID
    } else if (command.includes("book an appointment")) {
        response = "Opening the Appointment section.";
        window.location.href = "#";  // Add actual section ID
    } else if (command.includes("what is healthsphere")) {
        response = "HealthSphere is an AI-powered health assistant.";
    } else if (command.includes("hello")) {
        response = "Hello! How can I assist you today?";
    } else if (command.includes("stop listening")) {
        response = "Okay, stopping voice assistant.";
        recognition.stop(); // Stop listening
        return;
    }
 
    speak(response);
}
 
// Text-to-Speech Function
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
 
    utterance.onend = () => {
        console.log("Finished speaking. Resuming listening...");
        recognition.start(); // Resume listening after speaking
    };
 
    window.speechSynthesis.speak(utterance);
}