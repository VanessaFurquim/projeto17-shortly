# Shortly: Links Que Cabem no Bolso!

## 1. About

This is a backend application of a URL shortening system that allows the user to make any URL a shorter, shareable link.

## 2. Deploy

click the link to access the application on your browser: [Deploy link](https://drivenbet-quer-apostar-quanto.onrender.com)

## 3. Description

Once the user has signed up, they will be able to convert a URL into a functional shorter version. It is also possible to fetch each individual URL - in addition to deleting it, its shortened version, and the user stats.  All shortened URLs submitted by the user are registered in the database and the users are ranked, according to the total of URLs and the ones that are most visited. Aside from the signup and the signin pages, this is the only other one that is accessible without authentication via registration.

### User Registration:

-   Entity: **User**

    ```typescript
    {
        id: number;
        name: string;
        email: string;
        password: string;
    }
    ```

Route: **POST** `/signup`

-   Register new users.

-   **Expected body**:

    ```tsx
        {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        }
    ```

Route: **POST** `/signin`

- Login to user's account.

-   **Expected body**:

    ```tsx
        {
            email: string;
            password: string;
        }
    ```

-   **Incoming payload**:
    ```tsx
    {
        token: string;
    }
    ```

Route: **GET** `/users/me`

- Fetches user's information and a list of their shertened URLs.

-   **Incoming payload**:
    ```tsx
    {
        id: number;
        name: string;
        visitCount: number; // sun of visits to all of user's links
        shortenedUrls: [
            {
                id: number;
                shortUrl: string;
                url: string;
                visitCount: number; // total amount of visits to particular URL
            },
            {
                ...
            }
	    ]
    }
    ```

-   Entity: **ShortUrl**

    ```typescript
    {
        id: number;
        shortUrl: string;
        url: string;
    }
    ```

Route: **POST** `/urls/shorten`

- Request to shorten URL inserted by user.

-   **Expected body**:

    ```tsx
        {
            url: string;
        }
    ```

-   **Incoming payload**:
    ```tsx
    {
        id: number;
        shortUrl: string;
    }
    ```

Route: **GET** `/urls/:id`

- Fetches specific URL by ID.

-   **Incoming payload**:
    ```tsx
    {
        id: number;
        shortUrl: string;
        url: string;
    }
    ```

Route: **GET** `/urls/open/:shortUrl`

- Redirects user to the page corresponding to the shortened URL.

Route: **DELETE** `/urls/:id`

- Deletes from the database the URL and its shortened version.

Route: **GET** `/ranking`

- Fetches rank listing of the 10 users with most amount of visited links. This is a non-authenticated route, meaning it can be accessed by non-registered users.

-   **Incoming payload**:
    ```tsx
    [
        {
            id: number;
            name: string;
            linksCount: number;
            visitCount: number;
        },
        {
            ...
        }
    ]
    ```

## 3. Technologies

- JavaScript
- Node + Express
- PostgreSQL
- BCrypt

## 4. How To Run The Application:

1. Set your environment by populating the env variables. Make sure you have a PostgreSQL database running based on the **.env.example**.
2. Create the environment vabiables in the .env file:
    - .env: `DATABASE_URL=postgres://USERNAME:PASSWROD@localhost:5432/DATABASE-NAME`

3. In the terminal, run command to install all dependencies:
    ```bash
    $ npm install
    ```
7. The application will be running on open terminal with following command:
    ```bash
    $ npm run dev
    ```