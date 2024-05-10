# SmartRecruit 🧑‍💼
- Course Name: COS80029 Technology Application Project
- University: Swinburne University of Technology
- Group ID: AC4 
- Client Name: Smaart Recruitment

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=for-the-badge)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=fff&style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff&style=for-the-badge)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?logo=scikitlearn&logoColor=fff&style=for-the-badge)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=fff&style=for-the-badge)
![Keras](https://img.shields.io/badge/Keras-D00000?logo=keras&logoColor=fff&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge)
![Microsoft Azure](https://img.shields.io/badge/Microsoft%20Azure-0078D4?logo=microsoftazure&logoColor=fff&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=for-the-badge)
![Google Drive](https://img.shields.io/badge/Google%20Drive-4285F4?logo=googledrive&logoColor=fff&style=for-the-badge)

<img width="523" alt="tech" src="https://github.com/sangvo235/SmartRecruit/assets/97276811/e6ffc76e-61c9-4239-997f-48d26f3c9db9">

<img width="567" alt="sys-arc" src="https://github.com/sangvo235/SmartRecruit/assets/97276811/232909b7-8765-4250-8c33-3801bfe907e3">

# Task List 📋
Non-Coding:
- ~Google Drive~
- ~Figma Prototyping~
- ~System Architecture & Tech Stack~ 
- ~Project README~
- ~Diagram of Models~

Frontend:
- ~Nextjs & Typescript~
- ~Tailwind CSS~
- ~Shadcn/ui Components~
- ~Navigation & Page Creation~
- ~Page Content (~Authentication~, ~Login~, ~Home~, ~Resume Upload~, ~Account Details~, ~Invitations~ & ~Job Listing~)~
- ~Dynamic Page Content (~Job Listing~ & ~Online Assessments~)~ 
- ~Components/Molecules (~Authentication~, ~Navbar~, ~Footer~, ~Upload Resume~, ~Profile~, ~Invitation Tabs~, ~Job List~ & ~Online Assessment Cards~)~
- ~Frontend Env File~
- ~User able to change account details on frontend~ 
- ~Integration with Backend Data (Resume Upload, ~Account Details~, ~Invitations~, ~Job Listing~, ~Online Assessments~ & ~Results~)~

Backend:
- ~Docker for Django project with postgreSQL~
- ~Django REST API~
- ~Backend Env File~
- ~Configurations~
- ~Serializers & API URLs~
- ~Authentication~
- ~Models (~User~, ~Job~, ~Invite~, ~Online Assessment~, ~Question~, ~Answer~ and ~Machine Learning~)~
- ~APIs (~GET User Details~, ~POST User Details~, ~POST Avatar Upload~, ~GET Jobs~, ~GET Invites~, ~Filter Invites~, ~GET Online Assessment~ and ~Machine Learning~)~

TODOs: 
- ~Improvement to Online Assessment (implemented cookies to store testing session data, timer function and dyanmic result generation)~
- ~Fixed the Invite API, Model and card components~ 
- Login bug fixes (mostly with data not re-rendering immediately)
- Frontend interface & API for listing candidate scores on online assessment for job recruiter
- Storage of uploaded resume
- Integrating machine learning component for resume upload
- Search bar and filtering system on job listing page based on the resume uploaded
- Have the user and recruiter displays to be different on the frontend
- Cloud storage option
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

## .env files
- Access to the .env.dev file for backend found in the Team's Google Drive.
- Access to the .env.local file for frontend found in the Team's Google Drive.

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
- Download env.dev & env.local files from Google Drive
- Place env.dev in the SmartRecruit/backend directory.
- Place env.local in the SmartRecruit/frontend directory.
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
