# My Express App

A simple Express application built with TypeScript that interacts with a MySQL database. This application includes models, routes, and controllers for managing various entities such as Admin, Evaluator, Proponent, Submission, SubmissionProponents, Remarks, Campus, and Department.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/my-express-app.git
   ```

2. Navigate to the project directory:

   ```
   cd my-express-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Build the TypeScript files:
   ```
   npm run build
   ```

## Usage

To start the application, run:

```
npm start
```

For development mode with hot reloading, use:

```
npm run dev
```

## API Endpoints

- **Admin**

  - `GET /admin`
  - `POST /admin`
  - `GET /admin/:id`
  - `PUT /admin/:id`
  - `DELETE /admin/:id`

- **Evaluator**

  - `GET /evaluators`
  - `POST /evaluators`
  - `GET /evaluators/:id`
  - `PUT /evaluators/:id`
  - `DELETE /evaluators/:id`

- **Proponent**

  - `GET /proponents`
  - `POST /proponents`
  - `GET /proponents/:id`
  - `PUT /proponents/:id`
  - `DELETE /proponents/:id`

- **Submission**

  - `GET /submissions`
  - `POST /submissions`
  - `GET /submissions/:id`
  - `PUT /submissions/:id`
  - `DELETE /submissions/:id`

- **SubmissionProponents**

  - `GET /submission-proponents`
  - `POST /submission-proponents`
  - `GET /submission-proponents/:id`
  - `PUT /submission-proponents/:id`
  - `DELETE /submission-proponents/:id`

- **Remarks**

  - `GET /remarks`
  - `POST /remarks`
  - `GET /remarks/:id`
  - `PUT /remarks/:id`
  - `DELETE /remarks/:id`

- **Campus**

  - `GET /campus`
  - `POST /campus`
  - `GET /campus/:id`
  - `PUT /campus/:id`
  - `DELETE /campus/:id`

- **Department**
  - `GET /departments`
  - `POST /departments`
  - `GET /departments/:id`
  - `PUT /departments/:id`
  - `DELETE /departments/:id`

## License

This project is licensed under the MIT License.
