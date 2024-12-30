# Bucket List App

A modern web application for managing your personal bucket list. The app allows users to add, view, and delete items, with seamless authentication and data storage using AWS Amplify. Users can also upload images for their bucket list items, which are stored securely in AWS.

---

## About This Project

This project was created as part of my learning journey to explore and practice using AWS services, such as Amplify, S3, and Cognito. It serves as a hands-on exercise to integrate cloud-based authentication, storage, and data management into a React application.

---

## Features

- **User Authentication**: Secure sign-in and sign-out functionality using AWS Amplify Authenticator.
- **Add Items**: Create bucket list items with a title, description, and optional image upload.
- **View Items**: View all your bucket list items with details and uploaded images.
- **Delete Items**: Remove unwanted bucket list items from your list.
- **AWS Integration**: Fully integrated with AWS Amplify for authentication, data storage, and file uploads.

---

## Technologies Used

- **Frontend Framework**: React with TypeScript.
- **AWS Services**:
  - AWS Amplify
  - AWS Cognito for Authentication
  - AWS S3 for Image Storage
  - AWS AppSync or DataStore for CRUD operations
- **UI Library**: `@aws-amplify/ui-react`
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/jasmine-asra/bucket-list-app
   cd bucket-list-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Amplify:
   - Ensure you have initialized AWS Amplify for the project:
     ```bash
     amplify init
     ```
   - Add authentication and storage to the Amplify project:
     ```bash
     amplify add auth
     amplify add storage
     amplify push
     ```

4. Place the `amplify_outputs.json` file in the `src` directory. This file should be generated after running `amplify push`.

5. Start the development server:
   ```bash
   npm start
   ```

---

## Usage

1. **Sign In/Sign Up**:
   - Open the app in your browser.
   - Sign in using the Amplify Authenticator.

2. **Add a Bucket List Item**:
   - Fill in the title and description.
   - Optionally upload an image (JPEG or PNG).
   - Click "Add to Bucket List."

3. **View Your Bucket List**:
   - All your items will appear in a grid.
   - Images (if uploaded) will be displayed.

4. **Delete an Item**:
   - Click the "Delete Item" button to remove an item from the list.

5. **Sign Out**:
   - Use the "Sign Out" button to securely log out.