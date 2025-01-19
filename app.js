async function getContent(username) {
    const response = await fetch(`https://www.reddit.com/user/${username}.json`);
    const data = await response.json();
    const user_data = [];
    for (const post of data['data']['children']) {
        try {
            const postData = {
                title: post['data']['link_title'],
                content: post['data']['body']
            };
            user_data.push(postData);
        } catch (error) {
            
        }
    }
    return user_data;
}

async function roastUser() {
    const username = document.getElementById('username').value;
    const userData = await getContent(username);
    const key = process.env.API_KEY; // Replace with your API key
    console.log(key)

    const response = await fetch('https://api.together.xyz/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
            model: 'meta-llama/Llama-3-8b-chat-hf',
            messages: [
                { role: 'user', content: `Roast a user named ${username} based on this data ${JSON.stringify(userData)}.` }
            ]
        })
    });

    const result = await response.json();
    document.getElementById('response').innerText = result.choices[0].message.content;
    document.getElementById('responseBox').classList.remove('hidden');
}

function copyToClipboard() {
    const responseText = document.getElementById('response').innerText;
    if (responseText) {
        navigator.clipboard.writeText(responseText).then(() => {
            alert('Roasted text copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    } else {
        alert('No text to copy!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fireContainer = document.querySelector('.fire-container');
    const fireEmojis = ['🔥', '🔥', '🔥', '🔥', '🔥'];
    
    function createFireEmoji() {
        const emoji = document.createElement('span');
        emoji.textContent = fireEmojis[Math.floor(Math.random() * fireEmojis.length)];
        emoji.classList.add('fire-emoji');
        emoji.style.left = '-50px';
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.animationDuration = `${5 + Math.random() * 5}s`;
        fireContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 10000);
    }

    setInterval(createFireEmoji, 500);
});

function roastUser() {
    const username = document.getElementById('username').value;
    // Your existing roast logic here
    // When the roast is ready:
    document.querySelector('[x-data]').__x.$data.loading = false;
    document.querySelector('[x-data]').__x.$data.showResponse = true;
    document.querySelector('[x-data]').__x.$data.response = "Your roast text here";
}

function copyToClipboard() {
    const responseText = document.querySelector('[x-data]').__x.$data.response;
    navigator.clipboard.writeText(responseText).then(() => {
        alert("Roasted text copied to clipboard!");
    });
}

