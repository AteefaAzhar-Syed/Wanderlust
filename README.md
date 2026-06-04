## Wanderlust 🌍

A full-stack travel accommodation platform inspired by Airbnb, where users can create listings, upload images, explore destinations, and write reviews with authentication and map integration.

---

## 🚀 Live Demo

https://wanderlust-s1wz.onrender.com

---

## ✨ Features

* User Authentication (Register, Login, Logout)
* Create, Edit, Delete Listings
* Image Upload using Cloudinary
* Add & Delete Reviews
* Review Author Display
* Interactive Maps using MapTiler
* Ownership Authorization
* Flash Messages for feedback
* MongoDB Atlas Database Integration
* Responsive UI with Bootstrap

---

## 🛠️ Tech Stack

**Frontend:**

* HTML5
* CSS3
* Bootstrap
* EJS Templates

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB Atlas
* Mongoose

**Authentication:**

* Passport.js
* Express Session

**Cloud Services:**

* Cloudinary (Image Storage)
* MapTiler (Geocoding & Maps)

**Deployment:**

* Render

---

## 📂 Project Structure

```text id="projstr1"
Wanderlust/
│
├── app.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │
│   ├── users/
│   │   ├── login.ejs
│   │   ├── signup.ejs
│   │
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css
│   ├── js/
│   │   ├── script.js
│
├── init/
│   ├── index.js
│   ├── data.js
│
├── utils/
│   ├── ExpressError.js
│   ├── wrapAsync.js
│
├── middleware.js
├── schema.js
├── cloudConfig.js
```

---



## 📸 Screenshots

### 🏠 Home Page
<img width="1909" height="876" alt="homepage" src="https://github.com/user-attachments/assets/52b54bc6-cdc8-4427-a207-b25fecfb7e99" />


### 📄 Listing Details Page
<img width="1868" height="892" alt="ListingDetails" src="https://github.com/user-attachments/assets/2a965f66-cde6-4633-a914-c7fec872c67f" />


### ➕ Create Listing Page
<img width="1896" height="873" alt="CreateListing" src="https://github.com/user-attachments/assets/801bc236-f2a8-4b5c-8f40-99d739cfc064" />


### ✏️ Edit Listing Page
<img width="1903" height="870" alt="EditPage" src="https://github.com/user-attachments/assets/4f640eee-34a5-47b1-af2c-8c7bd481cf48" />


### 🌍 Map View
<img width="1868" height="855" alt="MapSection" src="https://github.com/user-attachments/assets/f422b456-0e96-4fd5-a691-a050309cd3d0" />


### 💬 Reviews Section
<img width="1896" height="862" alt="Review" src="https://github.com/user-attachments/assets/a893ad83-c29f-4333-841b-4f95e1442d79" />



## ⚙️ Installation

```bash id="inst1"
git clone <your-repo-url>
cd MAJORPROJECT
npm install
```

### Environment Variables

Create `.env` file:

```env id="env1"
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAPTILER_API_KEY=your_maptiler_api_key
```

---

## ▶️ Run Project

```bash id="run1"
node app.js
```

or

```bash id="run2"
nodemon app.js
```

Open:

```text id="localhost1"
http://localhost:8080
```

---

## 🌱 Seed Database

```bash id="seed1"
node init/index.js
```

---

## 🔒 Authentication Rules

* Only logged-in users can create listings
* Only owners can edit/delete listings
* Only review authors can delete reviews

---

## 🌍 Maps Feature

Each listing uses MapTiler API to convert location into coordinates and display interactive maps.

---

## 📈 Future Improvements

* Search & filtering system
* Booking system
* Wishlist feature
* Payment integration
* User profile pages

---

## 👨‍💻 Author

**Syed Ateefa Azhar**

GitHub: https://github.com/AteefaAzhar-Syed   
LinkedIn: https://linkedin.com/in/syedateefaazhar

---

## 📜 License

This project is for educational purposes only.

