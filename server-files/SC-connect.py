import soundcloud

# create client object with app and user credentials
client = soundcloud.Client(client_id='a00ba5d43da1e0be6a98405e062206ef',
                           client_secret='17c462624f5d263679ba4704649883da',
                           username='editor@bloodaxebooks.com',
                           password='hemulen')

# print authenticated user's username
print client.get('/me').username