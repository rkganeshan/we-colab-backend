Steps to run this project locally.
Assumption: Node 16 or higher is a pre-requisite. Visit https://nodejs.org/en to get the package.

1. Clone the repository:

   ```bash
   git clone https://github.com/rkganeshan/we-colab-backend.git
   cd we-colab-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or if using Yarn:

   ```bash
   yarn install
   ```

## Environment Variables

Add your environment variables in a `.env` file at the root of the project. Example:

```env
PORT=5000
```

## Usage

To run this:
    ```bash
    npm start
    ```

## Directory structure
rkganeshan-we-colab-backend/
    ├── database.sqlite
    ├── index.js
    ├── package.json
    ├── vercel.json
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── authController.js
    │   └── whiteboardController.js
    ├── middleware/
    │   └── authenticate.js
    ├── models/
    │   ├── index.js
    │   ├── user.js
    │   ├── userSession.js
    │   └── whiteboardSession.js
    └── routes/
        ├── authRoutes.js
        ├── socketRoutes.js
        └── whiteboardRoutes.js
