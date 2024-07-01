import os
import requests

urls_file = "./urls.txt"
downloads_dir = os.path.expanduser('~/Downloads/BaseNerdz')

os.makedirs(downloads_dir, exist_ok=True)

counter = 0
def download_file(url: str, save_path: str, counter: int):
    try: 
        response = requests.get(url, stream=True)
        response.raise_for_status()

        file_name = f"token-id-{counter}-{os.path.basename(url)}.png"
        file_path = os.path.join(save_path, file_name)
        counter+=1
        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
            print(f"Downloaded: {file_path}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {url} - tokenId: {counter}: {e}")



with open(urls_file, 'r') as file:
    urls = file.readlines()
    for url in urls:
        url = url.strip()
        if url:
            download_file(url, downloads_dir, counter)
            counter+=1