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
