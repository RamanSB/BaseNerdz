import os
import re


def extract_number(filename):
    match = re.search(r'token-id-(\d+)', filename)
    return int(match.group(1)) if match else -1

current_dir = os.getcwd()
base_nerdz_dir = os.path.abspath(os.path.join(current_dir+"/../base-nerdz/"))
os.chdir(base_nerdz_dir)
files = os.listdir(os.getcwd())
files.sort(key=extract_number)
print(f"There are {len(files)} files of which index 0 is '.DS_Store'")
counter = 0

for index, filename in enumerate(files):
    new_name = f"{index}.png"
    os.rename(filename, new_name)
    print(f"Renaming {filename} to {new_name}")
    counter+=1

    

print(f"{counter} Files have been renamed successfully.")

