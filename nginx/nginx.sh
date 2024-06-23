#!/bin/bash

# Check if the first argument is "configure"
if [ "$1" = "conf" ]; then
    # Copy the Nginx configuration file for DruggableProtein
    cp -r ./nginx/DruggableProtein /etc/nginx/sites-available/DruggableProtein

    echo "Nginx configuration for DruggableProtein has been copied to /etc/nginx/sites-available/"

    # Check if the symbolic link already exists, if not, create it
    if [ ! -L /etc/nginx/sites-enabled/DruggableProtein ]; then
        ln -s /etc/nginx/sites-available/DruggableProtein /etc/nginx/sites-enabled/DruggableProtein
        echo "Nginx configuration for DruggableProtein has been enabled."
    else
        echo "Nginx configuration for DruggableProtein is already enabled."
    fi

    # Test Nginx configuration
    sudo nginx -t
    if [ $? -eq 0 ]; then
        echo "Nginx configuration test was successful."
        # Reload Nginx to apply changes
        sudo systemctl reload nginx
        echo "Nginx has been reloaded to apply changes."
    else
        echo "Nginx configuration test failed. Please check the configuration for errors."
    fi
else
    echo "Invalid argument. Use 'configure' to copy and enable the Nginx configuration."
fi
