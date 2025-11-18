        // Simple page navigation
        function showPage(page) {
            // Hide all pages
            const pages = ['home', 'wellbeing', 'reports', 'resources', 'contact', 'profile'];
            pages.forEach(p => {
                document.getElementById(p + '-page').classList.add('hidden');
            });
            
            // Show selected page
            document.getElementById(page + '-page').classList.remove('hidden');
            
            // Update navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active-nav');
                item.classList.add('text-gray-700', 'hover:bg-gray-100');
            });
            
            event.target.closest('.nav-item').classList.add('active-nav');
            event.target.closest('.nav-item').classList.remove('text-gray-700', 'hover:bg-gray-100');
        }

        // Wellbeing tracker functionality
        let selectedMood = null;
        let selectedEmoji = null;

        // Energy slider update
        document.addEventListener('DOMContentLoaded', function() {
            const energySlider = document.getElementById('energy-slider');
            const energyValue = document.getElementById('energy-value');
            
            if (energySlider && energyValue) {
                energySlider.addEventListener('input', function() {
                    energyValue.textContent = this.value;
                });
            }
        });

        function selectMood(mood, emoji) {
            selectedMood = mood;
            selectedEmoji = emoji;
            
            // Reset all mood buttons
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('bg-blue-100', 'border-blue-500');
                btn.classList.add('border-gray-300');
            });
            
            // Highlight selected mood
            event.target.closest('.mood-btn').classList.remove('border-gray-300');
            event.target.closest('.mood-btn').classList.add('bg-blue-100', 'border-blue-500');
        }

        function submitMood() {
            if (!selectedMood) {
                alert('Please select your mood first!');
                return;
            }

            const energyLevel = document.getElementById('energy-slider').value;
            const concerns = document.getElementById('concerns').value;

            // Generate recommendations based on mood and energy
            const recommendations = generateRecommendations(selectedMood, energyLevel);

            // Update result display
            document.getElementById('result-emoji').textContent = selectedEmoji;
            document.getElementById('result-mood').textContent = getMoodText(selectedMood);
            document.getElementById('result-energy').textContent = energyLevel + '/10';
            
            // Update recommendations
            const recDiv = document.getElementById('recommendations');
            recDiv.innerHTML = recommendations.map(rec => `<div>• ${rec}</div>`).join('');

            // Show result, hide form
            document.getElementById('mood-form').classList.add('hidden');
            document.getElementById('mood-result').classList.remove('hidden');
        }

        function resetMood() {
            selectedMood = null;
            selectedEmoji = null;
            
            // Reset form
            document.getElementById('energy-slider').value = 5;
            document.getElementById('energy-value').textContent = '5';
            document.getElementById('concerns').value = '';
            
            // Reset mood buttons
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('bg-blue-100', 'border-blue-500');
                btn.classList.add('border-gray-300');
            });

            // Show form, hide result
            document.getElementById('mood-form').classList.remove('hidden');
            document.getElementById('mood-result').classList.add('hidden');
        }

        function getMoodText(mood) {
            const moodTexts = {
                'very-happy': 'Very Happy',
                'happy': 'Happy',
                'neutral': 'Neutral',
                'sad': 'Sad',
                'stressed': 'Stressed'
            };
            return moodTexts[mood] || 'Unknown';
        }

        function generateRecommendations(mood, energy) {
            let recommendations = [];

            // Energy-based recommendations
            if (energy <= 3) {
                recommendations.push('Take a short break or nap');
                recommendations.push('Try light exercise to boost energy');
            } else if (energy >= 8) {
                recommendations.push('Great energy for challenging tasks');
                recommendations.push('Perfect time for focused study');
            }

            // Mood-based recommendations
            if (mood === 'stressed' || mood === 'sad') {
                recommendations.push('Practice deep breathing');
                recommendations.push('Consider talking to someone');
                recommendations.push('Try a short meditation');
            } else if (mood === 'very-happy' || mood === 'happy') {
                recommendations.push('Great mood for learning!');
                recommendations.push('Good time for group activities');
            }

            // Default recommendations
            if (recommendations.length === 0) {
                recommendations = [
                    'Take regular breaks',
                    'Stay hydrated',
                    'Maintain good posture'
                ];
            }

            return recommendations.slice(0, 3);
        }

        function startBreathing() {
            alert('Starting breathing exercise... Breathe in for 4, hold for 4, out for 6. This would start a guided session!');
        }

        function startMeditation() {
            alert('Beginning meditation session... This would start a 10-minute guided mindfulness exercise.');
        }

        function getTips() {
            alert('Opening personalized wellness tips based on your mood patterns and goals...');
        }

        // Reports functionality
        function showReportType(type) {
            document.getElementById('daily-reports').classList.toggle('hidden', type !== 'daily');
            document.getElementById('weekly-reports').classList.toggle('hidden', type !== 'weekly');
            document.getElementById('wellbeing-reports').classList.toggle('hidden', type !== 'wellbeing');
            
            // Update buttons
            document.getElementById('daily-btn').className = type === 'daily' ? 'btn btn-primary mr-2' : 'btn bg-gray-200 text-gray-700 mr-2';
            document.getElementById('weekly-btn').className = type === 'weekly' ? 'btn btn-primary mr-2' : 'btn bg-gray-200 text-gray-700 mr-2';
            document.getElementById('wellbeing-btn').className = type === 'wellbeing' ? 'btn btn-primary' : 'btn bg-gray-200 text-gray-700';
        }

        // Open external resources
        function openResource(url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }

        // Contact form
        let selectedRating = 0;

        function setRating(rating) {
            selectedRating = rating;
            document.querySelectorAll('.rating-btn').forEach((btn, index) => {
                btn.style.opacity = index < rating ? '1' : '0.3';
            });
        }

        function submitFeedback(event) {
            event.preventDefault();
            alert('Thank you! Your feedback has been submitted.');
            event.target.reset();
            setRating(0);
        }

        // Profile login
        function showLogin() {
            document.getElementById('login-modal').classList.remove('hidden');
        }

        function hideLogin() {
            document.getElementById('login-modal').classList.add('hidden');
        }

        function handleLogin(event) {
            event.preventDefault();
            alert('Login successful! Welcome back, Alex!');
            hideLogin();
        }

        /* --- CHATBOT LOGIC --- */

let chatbotOpen = true;

// Toggle chatbot open/close
function toggleChatbot() {
    const body = document.getElementById("chatbot-body");
    const btn = document.getElementById("chatbot-toggle-btn");

    chatbotOpen = !chatbotOpen;
    body.style.display = chatbotOpen ? "block" : "none";
    btn.textContent = chatbotOpen ? "−" : "+";
}

// Send message
function sendChatMessage() {
    const input = document.getElementById("chatbot-input");
    const text = input.value.trim();

    if (text === "") return;

    addChatMessage(text, "user-msg");
    input.value = "";

    setTimeout(() => {
        botReply(text);
    }, 500);
}

// Detect enter key
function handleChatInput(e) {
    if (e.key === "Enter") sendChatMessage();
}

// Add message to chat window
function addChatMessage(message, type) {
    const msgBox = document.getElementById("chatbot-messages");
    const div = document.createElement("div");

    div.className = `chat-msg ${type}`;
    div.textContent = message;

    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

// Simple AI-like responses
function botReply(userText) {
    let reply = "";

    userText = userText.toLowerCase();

    // Basic responses
    if (userText.includes("hello") || userText.includes("hi")) {
        reply = "Hello! How can I help you today?";
    }
    else if (userText.includes("study")) {
        reply = "Try studying in 25–30 minute sessions with short breaks. It helps improve focus!";
    }
    else if (userText.includes("stress") || userText.includes("sad")) {
        reply = "I'm here for you ❤️ Try taking a deep breath. Want a relaxation exercise?";
    }
    else if (userText.includes("wellbeing")) {
        reply = "You can update your wellbeing check in the Wellbeing section.";
    }
    else if (userText.includes("report")) {
        reply = "Reports are available in Daily, Weekly, and Wellbeing categories.";
    }
    else {
        reply = "That's interesting! Could you tell me more?";
    }

    addChatMessage(reply, "bot-msg");
}
