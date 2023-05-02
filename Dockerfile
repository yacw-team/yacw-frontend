FROM nginx:1.23-alpine

# Copy the build output to the default nginx public folder
COPY ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
