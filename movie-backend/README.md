# AUTH MODULE

The `Auth` module exposes several endpoints for user authentication. Here’s a concise explanation of each:

### 1. GET /auth/hello

- **Purpose**: Test endpoint to check if the controller is working.
- **Process**: Logs a message and returns a simple greeting.
- **Response**: Returns the string "Hello from auth controller slka s".

### 2. POST /auth/register

- **Purpose**: Register a new user.
- **Parameters**:
  - `email`: Email of the user to be registered (from the request body).
  - `password`: Password of the user to be registered (from the request body).
- **Process**:
  - Logs a message with the user's email.
  - Calls `register` method in `AuthService` to create a new user.
  - Sets authentication tokens in the response.
- **Response**: Returns the created user details without the password.

### 3. POST /auth/login

- **Purpose**: Login an existing user.
- **Parameters**:
  - `email`: Email of the user to be logged in (from the request body).
  - `password`: Password of the user to be logged in (from the request body).
- **Process**:
  - Logs a message with the user's email.
  - Calls `login` method in `AuthService` to authenticate the user.
  - Sets authentication tokens in the response.
- **Response**: Returns the authenticated user details without the password.

### 4. GET /auth/logout

- **Purpose**: Logout the current user.
- **Process**:
  - Logs a message indicating the user is being logged out.
  - Calls `clearAuthTokens` method in `AuthService` to clear authentication tokens.
- **Response**: Returns a message indicating the user has been logged out.

The `Movie` module exposes three endpoints for managing movies. Here’s a concise explanation of each:

# MOVIE MODULE

### 1. GET /movies

- **Purpose**: Fetch a list of movies.
- **Parameters**:
  - `genreFilter` (optional): Array of genres to filter movies by.
  - `sortByRating` (optional, defaults to `false`): If `true`, sorts the movies by their rating (in descending order, to get the most popular movies first).
- **Process**:
  - Retrieves movies and their associated genres and ratings.
  - Filters movies by specified genres if `genreFilter` is provided.
  - Sorts movies by rating if `sortByRating` is `true`.
- **Response**: Returns a list of movies with their genres and ratings.

### 2. POST /movies/add

- **Purpose**: Add a new movie.
- **Parameters**:
  - `title`: Title of the movie.
  - `description`: Description of the movie.
  - `releaseDate` (optional, defaults to current date): Release date of the movie.
  - `genres`: Array of genres for the movie.
- **Process**:
  - Creates a new movie entry.
  - Associates the movie with specified genres.
  - Initializes the movie's rating.
- **Response**: Returns a success message with the created movie details.

### 3. POST /movies/rate

- **Purpose**: Rate a movie.
- **Parameters**:
  - `userId`: ID of the user rating the movie.
  - `movieId`: ID of the movie to be rated.
  - `rating`: Rating given by the user.
- **Process**:
  - Adds a rating for the specified movie by the user.
- **Response**: Returns a success message with the new rating.
