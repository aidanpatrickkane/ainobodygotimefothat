
# Ainobodygotimefothat Chrome Extension

## Overview
Ainobodygotimefothat is a Chrome extension designed to enhance your browsing experience by allowing you to ask questions about the content of the webpage you're currently viewing. It uses OpenAI's API to provide insightful answers, making your online research more efficient and interactive.

To ensure the security of the OpenAI API key, the extension communicates with a custom-built Node.js server, which handles the API requests. This approach keeps the API key hidden and secure.

## Technologies Used
- **Node.js**: Used to create the backend server.
- **Express**: Simplifies server setup and routing on the Node.js server.
- **CORS**: Enables cross-origin requests.
- **Axios**: Facilitates HTTP requests to the OpenAI API from the Node.js server.
- **HTML/CSS**: Structures and styles the extension's popup interface.
- **JavaScript**: Powers the extension's logic and interaction with the Node.js server.

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- Chrome browser for deploying the extension.

### Server Setup
1. Clone the repository and navigate to the server directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Extension Setup
1. Navigate to `chrome://extensions/` in your Chrome browser.
2. Enable Developer Mode at the top right.
3. Click "Load unpacked" and select the extension directory from your cloned repository.

## Usage
1. With the extension installed, navigate to any webpage.
2. Click the extension icon and enter your question about the webpage's content.
3. The extension will read the current webpage, send your question along with the content to the Node.js server, which then queries OpenAI's API for an answer.
4. The answer will be displayed in the extension's popup window.

## Contributing
Contributions to Ainobodygotimefothat are welcome! Please submit a pull request or create an issue for any features or bug fixes.

## License
[MIT License](LICENSE) - Feel free to use, modify, and distribute this software as you wish.