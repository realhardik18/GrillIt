import requests
import streamlit as st
import praw
from together import Together

def get_content(username):
    data=list()
    reddit = praw.Reddit(
        client_id=st.secrets['CLIENT_ID'],
        client_secret=st.secrets['CLIENT_SECRET'],
        user_agent='your_user_agent'        
        )
    user=reddit.redditor(username)
    for comment in user.comments.new(limit=50):        
        data.append(str(comment.body))
    return data

def Roast(username,key):    
    data=get_content(username=username)
    client = Together(api_key=key)
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Roast a user named {username} based on this data {data}. it should be in the form of a single para of 512 charecters"}],
    )    
    return response.choices[0].message.content

st.title('Welcome To GrillIt🔥')
st.write('Made By [realhardik18](https://x.com/realhardik18) | [Support GrillIt](https://buymeacoffee.com/realhardik18)')
username = st.text_input(label="Enter Reddit Username")

if st.button("Submit"):    
    if username:        
        roast=Roast(username,st.secrets['API_KEY'])
        st.write(roast)