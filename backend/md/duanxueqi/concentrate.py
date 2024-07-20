import os
import re

def concentrate_md_files(directory, output_file):
    # List to hold the contents of all md files
    md_contents = []

    # Regular expression to match filenames like 1.md, 2.md, etc.
    md_file_pattern = re.compile(r'^\d+\.md$')

    # Iterate over all files in the directory
    for filename in sorted(os.listdir(directory)):
        # Check if the file matches the pattern
        if md_file_pattern.match(filename):
            file_path = os.path.join(directory, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                # Read the content of the file
                content = file.read()
                md_contents.append(content)
                md_contents.append('\n\n')  # Adding a newline between files for better readability

    # Write all the collected contents into the output file
    with open(output_file, 'w', encoding='utf-8') as output:
        output.writelines(md_contents)

    print(f"All numbered markdown files have been concatenated into {output_file}")


if __name__ == "__main__":
    directory = '/root/home/record-web/backend/md'
    output_file = '/root/home/record-web/backend/md/duanxueqi.md'
    concentrate_md_files(directory, output_file)
