# Read the content of duanxueqi.md
with open('duanxueqi.md', 'r', encoding='utf-8') as file:
    lines = file.readlines()

# Process each line
processed_lines = []
for line in lines:
    if line.strip():  # If the line is not empty
        processed_lines.append(line.strip() + '</br>')
    else:
        processed_lines.append(line)

# Write the processed content back to duanxueqi.md
with open('duanxueqi.md', 'w', encoding='utf-8') as file:
    file.write('\n'.join(processed_lines))

print("File has been processed successfully.")
