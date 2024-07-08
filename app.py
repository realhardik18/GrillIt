import streamlit as st
from helpers import Roast
import requests
from together import Together

def get_content(username):
    response=requests.get(f'https://www.reddit.com/user/{username}.json')
    user_data=list()
    for post in response.json()['data']['children']:
        try:
            data={
                "title": post['data']['link_title'],
                "content": post['data']['body']
            }
            user_data.append(data)
        except KeyError:
            pass
    return user_data

def Roast(username,key):    
    data=get_content(username=username)
    client = Together(api_key=key)
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Roast a user named {username} based on this data {data}"}],
    )    
    return response.choices[0].message.content

key=st.secrets['API_KEY']

st.title('Welcome To GrillIt🔥')
st.write('Made By [realhardik18](https://x.com/realhardik18) | [Support GrillIt](https://buymeacoffee.com/realhardik18)')
username = st.text_input(label="Enter Reddit Username")

if st.button("Submit"):    
    if username:        
        roast=Roast(username,key)
        st.write(roast)