#!/bin/bash
# Interactive web server starter

read -p "Do you want to install and start the web server? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing and starting http-server..."
    npm install -g http-server@14.1.1
    http-server -p 8080
fi
