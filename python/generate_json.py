import json
import random

# Define the attributes
background_colors = ["Neon Green", "Electric Blue", "Vibrant Purple", "Bright Yellow", "Soft Pink"]
facial_expressions = ["Happy", "Concentrated", "Excited", "Thoughtful", "Surprised"]
accessories = {
    "glasses": ["Round", "Square", "Aviator"],
    "hats": ["Beanies", "Caps", "Wizard Hats"],
    "headphones": ["On-Ear", "Over-Ear"],
    "masks": ["Surgical", "Cloth"]
}
outfits = ["Hoodies", "T-Shirts", "Lab Coats", "Casual Shirts"]

# Generate unique NFTs
def generate_unique_nfts(num_nfts):
    nfts = []
    unique_set = set()

    for token_id in range(num_nfts):
        while True:
            bg_color = random.choice(background_colors)
            facial_expression = random.choice(facial_expressions)
            num_accessories = random.randint(1, 4)
            selected_accessories = random.sample(list(accessories.items()), num_accessories)
            accessories_list = [
                {"type": acc_type, "value": random.choice(acc_values)}
                for acc_type, acc_values in selected_accessories
            ]
            outfit = random.choice(outfits)

            nft = {
                "name": f"BaseNerdz-{token_id}",
                "tokenId": token_id,
                "attributes": {
                    "bgColor": bg_color,
                    "facialExpression": facial_expression,
                    "accessories": accessories_list,
                    "outfit": outfit
                }
            }
            
            nft_str = json.dumps(nft, sort_keys=True)
            if nft_str not in unique_set:
                unique_set.add(nft_str)
                nfts.append(nft)
                break
    
    return nfts

# Generate 777 unique NFTs
nfts = generate_unique_nfts(777)

# Save to file
file_path = "base_nerdz_nfts_v5.json"
with open(file_path, "w") as f:
    json.dump(nfts, f, indent=4)


