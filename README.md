# 🌱 HobbyMaxxing --- Rebuilding Real Connections in a Post‑COVID World

> *"I want to become a more interesting person."*

**HobbyMaxxing** is a social platform designed to help people rediscover
**real-life connections through learning and hobbies**. In a time where
digital addiction, loneliness, and social isolation are growing problems
in Canada, HobbyMaxxing encourages people to meet **in person**, learn new
skills, and build meaningful relationships.

------------------------------------------------------------------------

# 🇨🇦 Theme: Real Canadian Issues

Post‑COVID Canada has seen major shifts in social behavior:

-   Increased **loneliness and depression**
-   Difficulty forming communities **post‑graduation**
-   **Immigrants struggling** to find communities they fit into
-   **Digital addiction** among youth
-   Declining **youth--senior interactions**
-   Small businesses struggling to find audiences for niche classes

Research shows isolation has dramatically increased in Canada:
https://www.gv.ymca.ca/ymca-research-isolation-in-canada[https://www.gv.ymca.ca/ymca-research-isolation-in-canada]

HobbyMaxxing addresses this by making **in‑person learning experiences
accessible and discoverable**.

------------------------------------------------------------------------

# 💡 The Idea

HobbyMaxxing is an app that connects people through **in‑person classes and
activities**.

Instead of endlessly scrolling social media, users can:

-   Take pottery classes
-   Learn painting
-   Attend cooking workshops
-   Join language learning sessions
-   Try bouquet making
-   Explore wine tasting
-   Discover cultural experiences

The goal is simple:

> **Turn screen time into real life experiences.**

------------------------------------------------------------------------

# 🎯 Target Users

### Primary Audience

**Gen Z and Young Millennials (18--35)**

People who are:

-   Exploring identity and self‑growth
-   Investing in hobbies
-   Seeking meaningful experiences
-   Wanting to become more interesting individuals

### Secondary Users

-   **Immigrants** looking for community
-   **Seniors** interested in learning and teaching
-   **Local instructors and small businesses**
-   **Students & young professionals**

------------------------------------------------------------------------

# 🚀 Key Features

## 📚 Discover Local Classes

Users can browse curated in‑person classes such as:

-   Pottery
-   Acrylic painting
-   Cooking
-   Wine tasting
-   Language learning
-   Craft workshops

These classes are hosted by **local instructors and niche businesses**.

------------------------------------------------------------------------

## 🤖 Smart Class Recommendations

When users create a profile, the system asks simple preference
questions.

Based on:

-   interests
-   hobbies
-   learning goals

The app recommends classes similar to how **Instagram recommends
content**, but focused on **personal growth and learning**.

------------------------------------------------------------------------

## 👤 User Profiles

Users can:

-   Create personal profiles
-   Update interests
-   Track attended classes
-   Add and remove friends
-   See friends' activities

This creates a **community‑driven learning environment**.

------------------------------------------------------------------------

## ⏰ Smart Class Reminders

The system automatically:

-   Detects upcoming classes
-   Sends reminders **1 hour before the class**

This ensures users **never miss their sessions**.

------------------------------------------------------------------------

## 📈 Skill Growth Graph

Inspired by **Obsidian's knowledge graph**, the app visualizes the
skills users develop over time.

Example:

Painting → Acrylic Techniques → Color Theory\
Cooking → Knife Skills → Italian Cuisine

This encourages **long‑term learning and personal development**.

------------------------------------------------------------------------

## 👵 Senior Friendly Mode

To encourage **intergenerational interaction**, the app supports:

-   Simple UI mode
-   Larger buttons
-   Clear navigation

Making it easier for **senior users to participate**.

------------------------------------------------------------------------

## 🌎 Multilingual Support

Canada is highly multicultural.

The app supports multiple languages commonly spoken by immigrants,
helping more people **integrate into local communities**.

------------------------------------------------------------------------

# 🧠 What Makes HobbyMaxxing Different?

  ------------------------------------------------------------------------
  Platform                     Focus                 Problem
  ---------------------------- --------------------- ---------------------
  Meetup                       Group events          Messy discovery

  Eventbrite                   Ticketing platform    Not curated

  ClassPass                    Fitness classes       Limited variety

  HobbyMaxxing                    **Learning &          Curated growth
                               connection**          focused experiences
  ------------------------------------------------------------------------

HobbyMaxxing focuses on **self‑improvement, learning, and meaningful
relationships**.

------------------------------------------------------------------------

# 🛠 Tech Stack

Frontend - **Expo React Native** - Modern mobile UI - Cross‑platform
support

Backend - **FastAPI** - Python recommendation logic

Authentication - **Firebase Authentication**

Storage / Media - **Cloudinary**

Calendar Integration - **Google Calendar API**

------------------------------------------------------------------------

# 🏗 Project Architecture

    Mobile App (Expo React Native)
            │
            │ API Requests
            ▼
    Flask Backend (Python)
            │
            ├── Recommendation Engine
            ├── Class Management
            ├── Notifications
            │
            ▼
    Firebase Authentication

    External Services:
    - Cloudinary (media)
    - Google Calendar (class scheduling)
    - Google Maps (local area)
    - Gemini (AI assistance)

------------------------------------------------------------------------

# ⚙️ Running the Project

## 1️⃣ Clone the Repository

``` bash
git clone <your-repo-url>
cd community-app
```

------------------------------------------------------------------------

## 2️⃣ Install Dependencies

### Frontend

``` bash
npm install
```

### Backend

``` bash
pip install -r requirements.txt
```

------------------------------------------------------------------------

## 3️⃣ Configure Firebase

Create a Firebase project and add your config to:

    firebase/firebaseConfig.js

------------------------------------------------------------------------

## 4️⃣ Start the Application

Run the app with:

``` bash
npx expo start
```

This launches the Expo development server.

------------------------------------------------------------------------

# 📸 Design Inspiration

Structure - **ClassPass**

Design References - https://www.cosmos.so - https://www.othership.us -
https://222.place

The goal is a **clean, aesthetic, curated experience**.

------------------------------------------------------------------------

# 📊 Future Improvements

-   AI powered skill roadmap
-   Instructor marketplace
-   Local community partnerships
-   Gamified learning achievements
-   Public community spaces for cities

------------------------------------------------------------------------

# ❤️ Why This Matters

Canada is facing a **growing loneliness crisis**.

HobbyMaxxing helps solve this by:

-   Encouraging **offline interaction**
-   Supporting **small local businesses**
-   Promoting **lifelong learning**
-   Creating **intergenerational relationships**

The platform transforms hobbies into **meaningful social experiences**.

------------------------------------------------------------------------

# 🤝 Credits

Sources used during development:

-   Claude
-   ChatGPT
-   GitHub Copilot

Research:

YMCA Canada Loneliness Study\
https://www.gv.ymca.ca/ymca-research-isolation-in-canada

------------------------------------------------------------------------

# 🌟 Final Thought

HobbyMaxxing isn't just an app.

It's a way to help people **build real lives outside their screens**.
