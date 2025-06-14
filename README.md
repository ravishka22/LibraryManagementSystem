# 📚 Library Management System

A user-friendly Library Management System designed to digitize and simplify the management of books, members, and lending operations in a library. This project supports essential features like book tracking, user management, and issuing/returning books with a clean and intuitive interface.

![image](https://github.com/user-attachments/assets/87887065-c9ec-4263-b8e2-f9df7a888a0c)

---

## 🚀 Features

- ✅ Add, update, delete, and search books
- 👤 Manage library members (add/update/delete)
- 🔁 Issue and return books with tracking
- 🗕️ Due date monitoring and late return notifications
- 📊 Dashboard with analytics (total books, borrowed, overdue, etc.)
- 🔍 Advanced filtering and search for books/members
- 🔐 User authentication with role-based access (Admin / Librarian)

---

## 🛠️ Tech Stack

| Layer          | Technology                             |
| -------------- | -------------------------------------- |
| Frontend       | HTML, CSS, JavaScript (React optional) |
| Backend        | Node.js, Express.js                    |
| Database       | MySQL                                  |
| Authentication | JSON Web Tokens (JWT)                  |
| ORM (Optional) | Sequelize / Raw SQL                    |

---


## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```
    git clone https://github.com/ravishka22/LibraryManagementSystem.git
    ```

2.  **Navigate to the project directory:**
    ```
    cd LibraryManagementSystem
    ```

3.  **Install backend dependencies:**
    ```
    cd server
    npm install
    ```

4.  **Install frontend dependencies:**
    ```
    cd ../client
    npm install
    ```
5. Set Environment Variables

    Create a `.env` file in the root directory and add the following:
    
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=library_db
    JWT_SECRET=your_jwt_secret
    ```

6. Setup MySQL Database

    - Create a database named `library_db`
    - If using Sequelize:
      ```bash
      npx sequelize-cli db:migrate
      ```
    - Or run provided SQL scripts manually

7. Run the Server
    
    ```bash
    npm run dev
    ```


## 📸 Screenshots

![image](https://github.com/user-attachments/assets/87887065-c9ec-4263-b8e2-f9df7a888a0c)

![image](https://github.com/user-attachments/assets/b268a723-bab9-4379-95ee-5961f55d442c)

![image](https://github.com/user-attachments/assets/e58091f4-48bf-4187-8517-134903cd557a)

![image](https://github.com/user-attachments/assets/c3e381c1-8530-400b-84e1-b99cbca2983e)

---
