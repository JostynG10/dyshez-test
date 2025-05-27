# Dyshez-test

This project was developed as a technical test for the company [Dyshez](https://dyshez.com/), using [Next.js](https://nextjs.org). It is designed for managing user orders and images, featuring authentication and cloud storage with Supabase.

## Demo Test User

You can test the application at the following link:  
👉 [https://dyshez-test.vercel.app/](https://dyshez-test.vercel.app/)

Use the following credentials to log in:

- **Email:** supabasetest10@gmail.com  
- **Password:** 123456789

> **Note:** This user already has information stored in the Supabase service, so you can view orders and images without needing to register or upload new data.

## Features

- **User authentication** (registration, login, password recovery and reset)
- **Order management**: listing, pagination, and sorting of orders
- **Image management**: upload, preview, and delete user images
- **Modern interface** with React, CSS Modules, and reusable components
- **Form handling** with React Hook Form and compatible custom components
- **Notifications** with [react-toastify](https://fkhadra.github.io/react-toastify/)
- **Support for social login** (Google and GitHub)
- **Route protection** via middleware
- **Supabase** for authentication, database, functions and storage

## Project Structure

```
src/
  actions/         # Business logic and Supabase calls
  app/             # Next.js routes and pages (app router structure)
  components/      # Reusable UI components
  context/         # React contexts (e.g., images)
  hooks/           # Custom hooks for form logic and data
  interfaces/      # TypeScript types and contracts
  styles/          # CSS Modules files
  utils/           # Utilities and helpers
public/            # Static assets (images, fonts)
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/JostynG10/dyshez-test.git
   cd dyshez-test
   ```

2. Install the dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables in `.env` (see example in `.env.example`).

4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Scripts

- `dev`: Start the development environment
- `build`: Build the application for production
- `start`: Run the application in production mode
- `lint`: Run the linter

## Deployment

The project is ready to be deployed on [Vercel](https://vercel.com/) or any platform compatible with Next.js. Check the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Additionally, you can easily deploy this project using Docker, both for development and production environments. Below are two recommended methods:

### 1. Quick Deployment with Docker

You can spin up the application in development or production mode using Docker. Make sure you have Docker and Docker Compose installed.

```sh
docker-compose up --build
```

This will build the image and start the service on port 3000.

### 2. Deployment with NGINX and SSL using Docker

For a secure production environment, you can use the `nginx/docker-compose.yml` file which includes NGINX as a reverse proxy with SSL certificate support.

Steps:

1. Place your SSL certificates (`certificate.crt` and `private.key`) in the `nginx/ssl/` folder.
2. From the `nginx/` folder, run:

   ```sh
   docker-compose up --build
   ```

This will start two containers:
- **client**: Your Next.js application running on port 3000.
- **nginx**: Reverse proxy on port 443 (SSL), redirecting secure traffic to your application.

Access the application from [https://localhost:3000](https://localhost:3000) (you can adjust the port in the `nginx/docker-compose.yml` file if needed).

> **Note:** Make sure your certificates are valid to avoid browser warnings.

Check the `docker-compose.yml` and `nginx/default.conf` files for more configuration details.

## Subapase setup

This project uses [Supabase](https://supabase.com/) as a complete backend: authentication, database, functions and storage. Here is how to set up a Supabase environment from scratch for use with this project.

### 1. Create Supabase Project

1. Go to https://supabase.com/ and create an account.
2. Crea un nuevo proyecto.
3. Copy the Project URL and anon/public API key, and place them in your .env file as NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

### 2. Authentication

#### OAuth Providers

Enable the following providers in the Authentication > Providers section:
- **Google**
- **Github**

Follow the documentation to enable the auth providers in [Supabase social login guide](https://supabase.com/docs/guides/auth/social-login)

### 3. Database and Security

The database structure, relationships, RLS policies, functions and triggers can be created automatically by executing the following SQL script: `setup.sql`

#### What does this script include?

- Creation of tables `(profiles, customer, orders, etc.)`.
- Relationship with users `(auth.users)`.
- RLS policies to protect data per user.
- Functions and triggers necessary for the correct operation of the system.

#### How to execute it?
- Go to your Supabase project.
- In the side panel, select SQL Editor.
- Create a new query and paste the contents of `setup.sql`.
- Run the script.

> **Note:** This will automatically configure the entire database without the need for additional manual steps for tables, policies or functions.

### 4. Picture storage

1. In **Storage** > **Buckets**, create a bucket named `pictures`.
2. Disable public access.
3. Set the type of files allowed with `image/jpg, image/png` and save.
4. In **Storage** > **Policies** add a new policy to the `pictures` bucket:
    - Click **Get started quickly**.
    - Select template **Give users access to only their own top level folder named as uid**.
    - Allows operation for **SELECT**, **INSERT** and **DELETE**.
5. Configure your `next.config.mjs` file to allow images coming from supabase:

   ```mjs
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: "https",
           hostname: "YOUR_SUPABASE_HOSTNAME",
         },
       ],
     },
   };
   ```

This ensures each user can only manage their own images within the application.

> **Note:** Adds information from the `orders` table to be displayed in the application.

## Contributing and Adding New Content

If you want to add new features, fix bugs, or improve the project, follow these recommended steps to contribute in an organized way:

1. **Create a new branch following the naming standard**  
   Use prefixes according to the type of change you are going to make, for example:
   - `feature/` for new features (`feature/new-feature`)
   - `fix/` for bug fixes (`fix/bug-fix`)
   - `chore/` for maintenance tasks or minor changes (`chore/update-dependencies`)

   Example to create a new feature branch:
   ```sh
   git checkout main
   git pull
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**  
   Make the necessary code changes. Then, save your changes with clear and descriptive commit messages:

   ```sh
   git add .
   git commit -m "Feature: Brief description of the changes made"
   ```

3. **Push your branch to the remote repository**  
   Push your branch so it is available on GitHub:

   ```sh
   git push origin your-branch-name
   ```

4. **Create a Pull Request (PR)**  
   Go to the repository page on GitHub and click on "Compare & pull request" to open a new PR. Briefly describe the changes and why they are necessary.

5. **Review and merge**  
   Wait for your PR to be reviewed. If everything is correct, it will be merged into the main branch.

Thank you for contributing! If you have questions, check the [GitHub collaboration guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

---

## Credits

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hook Form](https://react-hook-form.com/)
- [Supabase](https://supabase.com/)

---

Thank you for checking out my project! If you have suggestions or find any issues, feel free to open an issue or a pull request.