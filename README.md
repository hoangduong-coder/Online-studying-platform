# Online-studying-platform
This is Howard's final bachelor thesis.

## How to run
1. Clone the repository to your local machine.
2. Install node packages.
- For client: `cd client && npm install` or `cd client && yarn install`
- For server: Do similarly with client server, but replace "client" by "server" in the command.
3. Create a MongoDB database. There are some sample data in the `server/src/dummy` folder, you can add them to your own database.
4. Create a `.env` file in the root directory and declare the necessary environment variables.
5. Run the code:
- For client: `cd client && npm run dev` or `cd client && yarn run dev`
- For server: Do similarly with client server, but replace "client" by "server" in the command.
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
