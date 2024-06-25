from openai import OpenAI
import os
import json
import time

client = OpenAI()

def generate_prompt(nft):
    bg_color = nft['attributes']['bgColor']
    facial_expression = nft['attributes']['facialExpression']
    accessories = ", ".join([f"{acc['value']} {acc['type']}" for acc in nft['attributes']['accessories']])
    outfit = nft['attributes']['outfit']

    prompt = f"Create a 3D voxel art, with each element composed of small, cube-like pixels: A blue character with a {facial_expression} expression, wearing {accessories}, dressed in a {outfit}, with a {bg_color} background."
    return prompt

def generate_image(prompt, token_id):
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        quality="standard",
        size="1024x1024"
    )
    
    image_url = response.data[0].url
    # Save the image or perform further processing
    return image_url

# Example usage:
nft_data = {
    "name": "BaseNerdz-Lunar",
    "tokenId": 3,
    "attributes": {
        "bgColor": "Electric Blue",
        "facialExpression": "Happy",
        "accessories": [
            {"type": "glasses", "value": "Aviator"},
            {"type": "hats", "value": "Wizard Hat"}
        ],
        "outfit": "Hoodie"
    }
}


def main():
    # Load the NFT data
    with open("../base_nerdz_nfts_v5.json", 'r') as file:
        data = json.load(file)
    
    # Dictionary to store the generated image URLs
    image_urls = {} # (k=tokenId, v=imageUrl)
    print(len(data))
    # Generate images and gather the results
    for nft in data:
        token_id = nft['tokenId']
        prompt = generate_prompt(nft)
        image_url = generate_image(prompt, token_id)
        image_urls[token_id] = image_url
        print(f"{token_id}: {image_url}")
        

    # Save the image URLs to a JSON file
    with open("generated_image_urls.json", 'w') as outfile:
        json.dump(image_urls, outfile, indent=4)

if __name__ == "__main__":
    main()