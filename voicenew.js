// if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
//     alert("Speech Recognition is not supported in this browser. Please use Google Chrome.");
// } else {
//     console.log("Speech Recognition Supported!");
// }

// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();
// recognition.continuous = true; 
// recognition.lang = "en-US";
// recognition.interimResults = false;

// let isListening = false;

// recognition.onresult = async (event) => {
//     console.log("Speech detected!");
//     const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase();
//     console.log("User said:", speechResult);
    
//     processVoiceCommand(speechResult);
// };

// recognition.onerror = (event) => {
//     console.error("Speech Recognition Error:", event.error);
// };

// function toggleVoiceAssistant() {
//     console.log("Toggling Voice Assistant...");
    
//     if (isListening) {
//         recognition.stop();
//         isListening = false;
//         document.getElementById("voiceButton").innerText = "Start Voice Assistant";
//         speak("Voice assistant deactivated.");
//     } else {
//         try {
//             recognition.start();
//             console.log("Voice Recognition Started");
//             isListening = true;
//             document.getElementById("voiceButton").innerText = "Stop Voice Assistant";
//             speak("Voice assistant activated.");
//         } catch (error) {
//             console.error("Error starting recognition:", error);
//         }
//     }
// }
 
// async function chatWithAI(userMessage) {
//     try {
//         const response = await fetch('https://api.cohere.ai/v1/generate', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'omgNzDg7F5eNLbgKaSGc9BD7yn76bDeurXS8AX5d', 
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'command',
//                 prompt: `User: ${userMessage}\nAI:`,
//                 max_tokens: 100
//             })
//         });

//         const data = await response.json();
//         return data.generations[0].text; 
//     } catch (error) {
//         console.error("AI Chat Error:", error);
//         return "Sorry, I couldn't process that request.";
//     }
// }

// function speak(text) {
//     console.log("Speaking:", text);
//     if (!window.speechSynthesis) {
//         console.error("Speech synthesis not supported.");
//         return;
//     }
    
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     utterance.onend = () => console.log("Finished speaking.");
//     window.speechSynthesis.speak(utterance);
// }


// async function processVoiceCommand(command) {
//     const actions = [
//         { keywords: ["find doctor", "show doctors"], action: () => navigateTo("#doctors") },
//         { keywords: ["book appointment"], action: () => navigateTo("#appointment") },
//         { keywords: ["medical reports", "view test results"], action: () => navigateTo("#reports") },
//         { keywords: ["prescription updates", "refill medicine"], action: () => navigateTo("#pharmacy") },
//         { keywords: ["scroll down", "move down", "go down"], action: () => { window.scrollBy(0, 500); speak("Scrolling down."); } },
//         { keywords: ["scroll up", "move up", "go up"], action: () => { window.scrollBy(0, -500); speak("Scrolling up."); } },
//         { keywords: ["hello", "hi"], action: () => speak("Hello! How can I assist you today?") },
//         { keywords: ["thank you", "thanks"], action: () => speak("You're welcome! Stay healthy.") },
//         { keywords: ["stop listening", "turn off voice assistant"], action: () => toggleVoiceAssistant() },
//         { keywords: ["educational resources", "healthcare articles", "medical learning"], action: () => navigateTo("#education") },
//         { keywords: ["meditate", "start meditation", "relax"], action: () => speak("Starting meditation session. Please close your eyes and take deep breaths.") },
//         { keywords: ["schedule event", "set reminder", "add calendar event"], action: () => speak("What event would you like to schedule? Please enter the details in the app.") },
//         { keywords: ["emergency", "call for help", "need urgent help"], action: () => speak("Emergency mode activated. Please contact emergency services immediately.") },
//     ];

//     for (let item of actions) {
//         if (item.keywords.some(keyword => command.includes(keyword))) {
//             item.action();
//             return;
//         }
//     }

//     const aiResponse = await chatWithAI(command);
//     speak(aiResponse);
// }

// function navigateTo(sectionID) {
//     speak("Navigating...");
//     document.querySelector(sectionID)?.scrollIntoView({ behavior: "smooth" });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("voiceButton").addEventListener("click", toggleVoiceAssistant);
// });

document.addEventListener("DOMContentLoaded", function () {
    const voiceButton = document.getElementById("voiceButton");

    if (!voiceButton) {
        console.error("❌ Voice button not found!");
        return;
    }

    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Speech Recognition is not supported in this browser. Please use Google Chrome.");
        return;
    }

    console.log("✅ Speech Recognition Supported!");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    let isListening = false; // Track listening state

    // Handle speech result
    recognition.onresult = async (event) => {
        console.log("Speech detected!");
        const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("User said:", speechResult);
        
        processVoiceCommand(speechResult);
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
    };

    // Start/Stop Assistant Toggle
    function toggleVoiceAssistant() {
        console.log("Toggling Voice Assistant...");
        
        if (isListening) {
            recognition.stop();
            isListening = false;
            voiceButton.innerText = "Start Voice Assistant";
            speak("Voice assistant deactivated.");
        } else {
            try {
                recognition.start();
                console.log("Voice Recognition Started");
                isListening = true;
                voiceButton.innerText = "Stop Voice Assistant";
                speak("Voice assistant activated.");
            } catch (error) {
                console.error("Error starting recognition:", error);
            }
        }
    }

    voiceButton.addEventListener("click", toggleVoiceAssistant);

    // AI Chat Function
    async function chatWithAI(userMessage) {
        try {
            const response = await fetch('https://api.cohere.ai/v1/generate', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY_HERE', // Replace with a secure backend call
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'command',
                    prompt: `User: ${userMessage}\nAI:`,
                    max_tokens: 100
                })
            });

            const data = await response.json();
            return data.generations[0]?.text || "Sorry, I couldn't process that request.";
        } catch (error) {
            console.error("AI Chat Error:", error);
            return "Sorry, I couldn't process that request.";
        }
    }

    // Text-to-Speech Function
    function speak(text) {
        console.log("Speaking:", text);
        if (!window.speechSynthesis) {
            console.error("Speech synthesis not supported.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.onend = () => console.log("Finished speaking.");
        window.speechSynthesis.speak(utterance);
    }

    // Process Voice Commands
    async function processVoiceCommand(command) {
        const actions = [
            { keywords: ["find doctor", "show doctors"], action: () => navigateTo("#doctors") },
            { keywords: ["book appointment"], action: () => navigateTo("#appointment") },
            { keywords: ["medical reports", "view test results"], action: () => navigateTo("#reports") },
            { keywords: ["prescription updates", "refill medicine"], action: () => navigateTo("#pharmacy") },
            { keywords: ["scroll down", "move down", "go down"], action: () => { window.scrollBy(0, 500); speak("Scrolling down."); } },
            { keywords: ["scroll up", "move up", "go up"], action: () => { window.scrollBy(0, -500); speak("Scrolling up."); } },
            { keywords: ["hello", "hi"], action: () => speak("Hello! How can I assist you today?") },
            { keywords: ["thank you", "thanks"], action: () => speak("You're welcome! Stay healthy.") },
            { keywords: ["stop listening", "turn off voice assistant"], action: () => toggleVoiceAssistant() },
            { keywords: ["educational resources", "healthcare articles", "medical learning"], action: () => navigateTo("#education") },
            { keywords: ["meditate", "start meditation", "relax"], action: () => speak("Starting meditation session. Please close your eyes and take deep breaths.") },
            { keywords: ["schedule event", "set reminder", "add calendar event"], action: () => speak("What event would you like to schedule? Please enter the details in the app.") },
            { keywords: ["emergency", "call for help", "need urgent help"], action: () => speak("Emergency mode activated. Please contact emergency services immediately.") },
        ];

        for (let item of actions) {
            if (item.keywords.some(keyword => command.includes(keyword))) {
                item.action();
                return;
            }
        }

        // If no direct command, ask AI
        const aiResponse = await chatWithAI(command);
        speak(aiResponse);
    }

    // Navigate to sections
    function navigateTo(sectionID) {
        speak("Navigating...");
        document.querySelector(sectionID)?.scrollIntoView({ behavior: "smooth" });
    }
});
