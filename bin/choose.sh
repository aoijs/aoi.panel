#!/bin/bash
# Ask the user for their name
echo "Enter a cmd to run (default bash)"
unset file
read file
if [ "$file"=="" ]; then
    file="bash"
fi
$file
echo exited