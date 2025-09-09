# PLAYER_MANAGEMENT_PLATFORM

## Overview
This repository is a multi-tenant football club management platform. It allows each club admin to manage their own club's players, matches, transfers, and reports, with a modern React frontend and a unified Node.js/Express backend using MongoDB.

## Project Structure

```
ZAM-FOOT-CENTRAL/
├── frontendone/           # Main club admin dashboard (React + Vite + TypeScript)
│   └── club-admin-dashboard/
├── frontendtwo/           # (Optional/experimental) second frontend
├── unified-backend-api/   # Unified Node.js/Express backend API (MongoDB)
├── public/                # Shared static assets
├── src/                   # (Legacy or shared) source files
├── ...                    # Config files, lockfiles, etc.
```

### frontendone/club-admin-dashboard
- Modern React (Vite, TypeScript) dashboard for club admins
- Features: login/signup, player management, transfers, match reports, club settings
- Uses localStorage for session and club context
- Connects to unified-backend-api for all data

### frontendtwo/
- Placeholder for a second frontend (e.g., super admin, analytics, or future expansion)

### unified-backend-api/
- Node.js/Express REST API
- MongoDB for data storage
- JWT authentication
- Endpoints for clubs, players, matches, transfers, and user management
- File upload support for player images and documents

## Getting Started

1. **Install dependencies:**
	```bash
	cd unified-backend-api && npm install
	cd ../frontendone/club-admin-dashboard && npm install
	```
2. **Configure environment:**
	- Copy `.env.example` to `.env` in `unified-backend-api/` and set your MongoDB URI and JWT secret.
3. **Run backend:**
	```bash
	cd unified-backend-api
	npm start
	```
4. **Run frontend:**
	```bash
	cd frontendone/club-admin-dashboard
	npm run dev
	```
5. **Access the app:**
	- Visit `http://localhost:5173` (or the port shown in the terminal)

## Notes
### Data Storage & Environment
- Currently, the backend uses a **local instance of MongoDB** for all data storage. All test data, including player images and documents, are stored in the `lovable-uploads` folder on the local filesystem.
- In the future, the project will switch to a cloud storage platform (e.g., Cloudinary) for uploads and an online database (MongoDB Atlas or PostgreSQL) for production use.

### Features
- **Register a player:** Club admins can add new players to their club.
- **Create a transfer request:** Club admins can initiate transfer requests for players.
- **Other features (in progress):**
	- Club-to-club interactions
	- Match scheduling and reporting
	- Advanced analytics and dashboards
	- Super admin and multi-club management

### Additional Notes
- The codebase currently has some TypeScript issues (about 53). These do not prevent running the app but should be addressed for production.
- The old backend (`backend/`) has been removed. Only `unified-backend-api/` is used.
- The README no longer references the lovable site or any legacy code.

## Contributing
- Please open issues or pull requests for bug fixes, improvements, or TypeScript fixes.

## License
MIT
- Tailwind CSS

## How can I deploy this project?



## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
