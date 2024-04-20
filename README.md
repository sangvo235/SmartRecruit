# SmartRecruit 🧑‍💼
- Course Name: COS80029 Technology Application Project
- University: Swinburne University of Technology
- Group ID: AC4 
- Client Name: Smaart Recruitment

<img width="523" alt="tech" src="https://github.com/sangvo235/SmartRecruit/assets/97276811/e6ffc76e-61c9-4239-997f-48d26f3c9db9">

<img width="567" alt="sys-arc" src="https://github.com/sangvo235/SmartRecruit/assets/97276811/232909b7-8765-4250-8c33-3801bfe907e3">

# Task List 📋
Non-Coding:
- ~Project README~
- ~Figma Prototyping~

Frontend:
- ~Nextjs & Typescript~
- ~Tailwind~
- ~Navigation & Page Creation~
- Page Content (~Authentication~, ~Login~, ~Home~, ~Resume Upload~, ~Account Details~, ~Invitations~, ~Job Listing~ & Online Assessments)
- Dynamic Page Content (~Job Listing~ & Online Assessments) 
- Components/Molecules (~Authentication~, ~Navbar~, ~Footer~, ~Upload Resume~, ~Profile~, ~Invitation Tabs~, ~Job List~ & Online Assessment Cards)
- ~Frontend Env File~
- Integration with Backend Data (Resume Upload, Account Details, Invitations, ~Job Listing~ & Online Assessments)

Backend:
- ~Docker for Django project with postgreSQL~
- ~Django REST API~
- ~Backend Env File~
- ~Configurations~
- Models (~User~, ~Job~, Invite & Online Assessment)
- ~Serializers & API URLs~
- Authentication
- Integration with ML Component for Resume Upload
- Cloud Storage
- Deployment

# Software Required 💻
Before starting please have the following installed.

## Python
- [Python3.12](https://www.python.org/downloads/)

## Node.js
1. All Platforms:
   - Download the LTS version from the [official Node.js website](https://nodejs.org/).
   - Run the installer and follow the instructions to install Node.js and npm.
2. Alternatively, use nvm:
   - Install `nvm` (Node Version Manager) from [nvm's GitHub page](https://github.com/nvm-sh/nvm).
   - Install Node.js using nvm with the command `nvm install 20.9`.

## Docker
1. Windows/macOS:
   - Install Docker Desktop from the [docker.com](https://www.docker.com/products/docker-desktop).
   - Docker Compose is included in Docker Desktop.
2. Linux:
   - Install Docker using the official guide from [docker.com](https://docs.docker.com/engine/install/).
   - Install Docker Compose separately following the instructions on the [Docker Compose documentation](https://docs.docker.com/compose/install/).

## Git (for version control)
1. Windows:
   - Download Git from [Git SCM](https://git-scm.com/download/win).
   - Run the installer and follow the instructions.
2. macOS:
   - Install Git using Homebrew with the command `brew install git` in the terminal.
   - If you don't have Homebrew, install it from [brew.sh](https://brew.sh/).
3. Linux:
   - Use the package manager to install Git, for example `sudo apt-get install git` for Debian/Ubuntu.

## IDE
- Recommended IDE: [VSCode](https://code.visualstudio.com/)

## .env.dev file
- Access to the .env.dev file found in the Team's Google Drive

# Running the Application 👨‍🚀
Follow the following steps to get the application up and running.

### 1. Clone the Repository
Clone the project repository to your local machine using Git.

```
git clone git@github.com:sangvo235/SmartRecruit.git
```

### 2. Build a branch from main
- Ensures that any changes you are making will be self-contained on the same branch and not affect the main branch.
- Any conflict resolution is possible before merging.
- Additionally, it acts as a type of versioning allowing us to go back and restore if anything happens to the main.
```
git checkout -b my-branch-name
```

### 3. Enviroment Variables Configuration 
- Download env.dev file from Google Drive
- Place in the following directory SmartRecruit/backend.
- Edit the file to include the period at the front of "env.dev" --> ".env.dev" and you will notice the file will be greyed out indicated it is successfully flagged by .gitignore.

### 4. Running the Frontend
We will be using Next.js for our frontend, running this is very simple compared to the backend.
  
- Change the directory to the frontend
```
cd frontend
```

- Installing Modules
```
npm i
```

- Running the Development Environment
```
npm run dev
```

### 5. Running the Backend
We will be using Docker and Docker Compose to build the necessary services to run the backend of our application.

- Change the directory to the backend
```
cd backend
```

- Build an image based on the Dockerfile found in the path associated with build (and then run a container based on that image).
```
docker-compose build
```

- Rebuild an image.
```
docker-compose up --build
```

- Running the image
```
docker-compose up
```

- I recommend using this instead as you can run the image but still add commands after (think of the d as detached)
```
docker-compose up -d
```

- Shutting down the image.
```
docker-compose down
```

- Migration (if there is any changes to the database schema / model)
```
docker-compose exec web python manage.py makemigrations
```

- Creating new models (most likely won't have to use this as I will have all the models created already)
```
docker-compose exec web python manage.py startapp my-new-model-name
```

- Create superuser (admin portal where you can put data into the models)
```
docker exec -it backend-web-1 python manage.py createsuperuser
```

1. Example:
   - Email: test@test.com
   - Name: Test
   - Password: test12345

- To sign in and use this please access: localhost:8000/admin/.

### 6. Recommendations
- If your using VSCode you can install the following which will help in streamlining the coding process.

1. [Prettier](https://prettier.io/)
   - Uniform code formatter.

2. [Github Copilot](https://github.com/features/copilot)
   - Free after verifying with your Swinburne email.
   - Uses AI to help propagate generic code. 

![octocat-1713021287104](https://github.com/sangvo235/SmartRecruit/assets/97276811/8708a92c-cd91-479d-89fd-9df721b11dfa)
