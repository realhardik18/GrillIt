import streamlit as st
from helpers import Roast

key=st.secrets['API_KEY']

st.title('Welcome To GrillIt🔥')
st.write('Made By [realhardik18](https://x.com/realhardik18) | [Support GrillIt](https://buymeacoffee.com/realhardik18)')
username = st.text_input(label="Enter Reddit Username")

if st.button("Submit"):    
    if username:        
        roast=Roast(username,key)
        st.write(roast)