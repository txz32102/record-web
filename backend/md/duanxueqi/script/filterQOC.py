import re

# Read content from the file
with open('duanxueqi.md', 'r', encoding='utf-8') as file:
    content = file.read()

# Remove the specified parts while keeping the question numbers
processed_content = re.sub(r'Question: ', '', content)
processed_content = re.sub(r'Options: ', '', processed_content)
processed_content = re.sub(r'Correct Answer: ', '', processed_content)

# Write the processed content back to the file
with open('duanxueqi.md', 'w', encoding='utf-8') as file:
    file.write(processed_content)

print("Processing complete. The file has been updated.")
