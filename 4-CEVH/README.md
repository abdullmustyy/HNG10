<p align="center" id="top">
  <a href="#endpoints">Endpoints</a> •
  <a href="#start-stream">Start stream</a> •
  <a href="#send-stream">Send stream</a> •
  <a href="#stop-stream">Stop stream</a> •
  <a href="#transcribe-video">Transcribe Video</a> •
</p>

# CEVH - Chrome Extension Video Handler

Receives a video from chrome extension, save it to database and return a URL where it can be accessed.

## Built With

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Endpoints

### Start stream
  
  ```js
  /api/start-stream
  ```

* **Method:** POST
* **Request:** None
* **Response:**
  
  ```json
  {
    "sessionId": "1696274201924"
  }
  ```

### Send stream
  
  ```js
  /api/send-stream/:sessionId
  ```

* **Method:** POST
* **Params:** sessionId
* **Request:**

  ```json
  {
    "videoDataChunk": "..."
  }
  ```

* **Response:**
  
  ```json
  {
    "message": "Video data chunk received successfully"
  }
  ```

### Stop stream
  
  ```js
  /api/stop-stream/:sessionId
  ```

* **Method:** POST
* **Params:** sessionId
* **Request:** None
* **Response:**
  
  ```json
  {
    "message": "Video saved successfully",
    "video": {
      "name": "...-video.mp4",
      "url": "abdulhngx-cevh.onrender.com/uploads/...-video.mp4",
      "_id": "...",
      "createdAt": "2023-10-02T19:17:43.570Z",
      "updatedAt": "2023-10-02T19:17:43.570Z",
      "__v": 0
    }
  }
  ```

### Transcribe Video
  
  ```js
  /api/transcribe/:sessionId
  ```

* **Method:** GET
* **Params:** sessionId
* **Request:** None
* **Response:**
  
  ```json
  {
    "videoTranscription": {
      "transcript": "...",
      "paragraphs": [...]    
    }
  }
  ```
