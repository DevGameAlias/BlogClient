# Blog Client

## Overview
The **Blog Client** is a frontend application built with **React.js and Tailwind CSS**. It provides an interactive and responsive user interface for browsing and managing blog posts, user profiles, comments, and newsletters.

## Tech Stack
- **Frontend Framework:** React.js (React 18)
- **State Management & Routing:** React Router
- **Styling:** Tailwind CSS, PostCSS
- **Icons:** Lucide-React, React-Feather
- **Testing:** Jest, React Testing Library

## Features
- **User-friendly blog browsing experience**
- **React Router for seamless navigation**
- **Interactive UI with Tailwind CSS**
- **Commenting system integration**
- **Profile management and authentication UI**
- **Newsletter subscription integration**
- **Optimized performance with PostCSS**

## Installation & Setup
### Prerequisites
- Install **Node.js** (>=14.x)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/capstone-blog-client.git
   cd capstone-blog-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. The client will run at `http://localhost:3000`

## Folder Structure
```
BlogClient/
│-- public/
│-- src/
│   │-- components/
│   │-- pages/
│   │-- assets/
│   │-- styles/
│   │-- App.js
│   │-- index.js
│-- package.json
│-- tailwind.config.js
│-- postcss.config.js
```

## Routing & Features
| Route               | Description                 |
|--------------------|---------------------------|
| `/`                | Home Page (List of Blogs) |
| `/blog/:id`        | View a single blog post   |
| `/profile`         | User Profile Page        |
| `/newsletter`      | Newsletter Signup        |
| `/comments/:blogId` | View & Add Comments     |

## Future Enhancements
- **Dark Mode Support**
- **PWA Optimization**
- **Admin Dashboard for Content Moderation**
- **Integration with Blog Server for Authentication**

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the **MIT License**.

## Contact
For inquiries, reach out via **[Your Email]**.
