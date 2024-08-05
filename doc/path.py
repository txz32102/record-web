import urllib.parse

def convert_path_to_url(path):
    # Convert the file path to URL-encoded format
    encoded_path = urllib.parse.quote(path, safe='')
    
    # Add the prefix to the encoded path
    url = f"http://www.druggableprotein.com:3001/file/{encoded_path}"
    
    return url

# Input path
input_path = "/root/home/backend/md/2024-8/attention.png"

# Get the converted URL
converted_url = convert_path_to_url(input_path)

print(converted_url)

