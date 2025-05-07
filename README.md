# Fabricio Portfolio - Terminal Inspired Website

A unique portfolio website with a hybrid terminal + modern navigation bar interface, designed to showcase both technical skills and creativity.

![Portfolio Screenshot](./ChatGPT%20Image%20May%207%2C%202025%2C%2010_42_52%20AM.png)

## Features

- **Interactive Terminal Interface**: Navigate through a Unix-like terminal
- **Modern Navigation**: Traditional navigation bar for those who prefer clicking
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dynamic Content**: Backend powered by Supabase for easy content updates
- **Animations**: Smooth transitions using Framer Motion

## Terminal Commands

Once the site is loaded, you can use the following commands in the terminal:

- `ls` - List the current directory contents
- `cd projects` - Navigate to the projects section
- `cat project_name` - View details about a specific project
- `man help` - Display a list of available commands

## Pages

- **Home**: Introduction and quick overview
- **Projects**: Portfolio of development projects
- **Experience**: Work history and professional experience
- **Skills**: Technical skills with proficiency levels
- **Education**: Academic background and certifications
- **Contact**: Get in touch form and contact information
- **Blog**: (Coming soon)

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: GitHub Pages

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fabricio-portfolio.git
   cd fabricio-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to a new file named `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your Supabase credentials:
     ```
     REACT_APP_SUPABASE_URL=your_supabase_url_here
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```
   - Note: The `.env` file is ignored by Git to keep your credentials secure

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Project Structure

- `src/components/` - Reusable UI components (Terminal, Navbar, etc.)
- `src/pages/` - Main page components (Home, Projects, etc.)
- `src/services/` - API and service integrations (Supabase)
- `public/` - Static assets

## License

MIT

## Author

Fabricio Rodriguez 