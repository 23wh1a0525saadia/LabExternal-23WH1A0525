# QuickNotes Pro

A minimal full-stack **MERN** starter project used as a lab-exam baseline. Students extend this project by adding Create/Update/Delete APIs, search, filtering, pagination, forms, and routing.

```
quicknotes-pro/
├── server/   # Node.js + Express + MongoDB (port 5000)
└── client/   # React + Material UI      (port 3000)
```

---

## Prerequisites

- **Node.js** >= 18
- **MongoDB** running locally at `mongodb://127.0.0.1:27017`

### Install MongoDB on Ubuntu

```bash
sudo apt-get update
sudo apt-get install -y gnupg curl
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod
sudo systemctl status mongod
```

### Install latest Node.js on Ubuntu

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

---

## Initial GitHub commit

Run these commands from the `quicknotes-pro` project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Unset GitHub username (Ubuntu)

```bash
git config --global --unset user.name
git config --global --get user.name   # should return nothing
```
## verfied if removed
```bash
git config --list
```
---

## Backend (`/server`)

### Install & Run

```bash
cd server
npm install
npm start
```

The server will:
- Connect to `mongodb://127.0.0.1:27017/quicknotes`
- Seed 3 sample notes (only if the collection is empty)
- Listen on `http://localhost:5004`

### Endpoints

| Method | Path          | Description                                           |
| ------ | ------------- | ----------------------------------------------------- |
| GET    | `/health`     | Returns `"OK"`                                        |
| GET    | `/api/notes`  | Returns all notes sorted by `createdAt` (newest first) |

### Data Model — `Note`

| Field       | Type   | Notes                                |
| ----------- | ------ | ------------------------------------ |
| `title`     | String | required, trimmed                    |
| `content`   | String | required, trimmed                    |
| `category`  | String | optional, defaults to `""`           |
| `createdAt` | Date   | defaults to current timestamp        |

---

## Frontend (`/client`)

### Install & Run

```bash
cd client
npm install
npm start
```

The React dev server runs on `http://localhost:3000` and fetches notes from the backend via `fetch()`.

### Structure

```
client/
├── public/index.html
└── src/
    ├── index.js
    ├── App.js                    # useState + useEffect, renders NotesTable
    ├── api.js                    # fetchNotes()
    └── components/
        └── NotesTable.jsx        # MUI table of notes
```

---

## What NOT to implement (reserved for students)

- POST / PUT / DELETE endpoints
- Search, filter, or pagination
- Forms or routing (react-router)

---

## Quick smoke test

With both servers running:

```bash
curl http://localhost:5004/health           # OK
curl http://localhost:5004/api/notes        # JSON array of notes
open http://localhost:3000                  # Table of notes in browser
```
