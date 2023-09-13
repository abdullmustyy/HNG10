# HNGxCRUD API DOCUMENTATION

HNGxCRUD API exposes CRUD(Create, Read, Update, Delete) endpoints that performs operations on a `Person` resourse.
This documentation explains how to make requests to each endpoint, how the response from each request should be, and how to use postman to test the endpoints.

## Endpoints

* `POST`: Make a POST request to the endpoint below to CREATE a `person`.
  
  ```js
  /api
  ```
  
* `GET`: Make a GET request to the endpoint below to READ a `person`.
  
  ```js
  /api/:id
  ```
  
* `PATCH`: Make a PATCH request to the endpoint below to UPDATE a `person`.
  
  ```js
  /api/:id
  ```
  
* `DELETE`: Make a DELETE request to the endpoint below to DELETE a `person`.
  
  ```js
  /api/:id
  ```

> _❕Replace `:id` with the `ID` of the `PERSON` that's been queried in every endpoint where it is needed._

## Usage, Examples & Testing

This section covers how to:

* Make requests to HNGxCRUD API enpoints and get an expected response, with examples.
* Use postman to test HNGxCRUD API endpoints.
  > Follow this link to checkout HNGxCRUD API workspace ↗ [HNGxCRUD API Postman Workspace](https://www.postman.com/spacecraft-meteorologist-88946703/workspace/hngx)

### `CREATE`

Follow these steps to `create` a `person`:

1. Make a `POST` request to the endpoint below.

   ```js
   /api
   ```

2. Pass the name of `person` to be created as a request body.

   ```json
   {
       "name": "Mark Essien"
   }
   ```

   > _❕ `Mark Essien` can be replaced with any other name._
3. If the `POST` request was made correctly _(as explained in previous steps)_ a response like so will be returned.

   ```diff
   {
   +   "message": "CREATED Mark Essien",
       "person": {
   +       "name": "Mark Essien",
           "_id": "6500bdc864623b1a3ea46c5c",
           "__v": 0
       }
   }
   ```

   > _❕ `Mark Essien` is the name of `person` passed as a request body so, `person` with name `Mark Essien` was `CREATED`._

#### Validation

There are criteria that need to be met for a `person` to be created successfully. Asides passing the name of `person` to be created as a request body,
that name _MUST_ be of type _`string`_.

* For instance, if the value of the name passed as a request body was a _`number`_:

  ```json
   {
       "name": 5
   }
   ```

* A response like so will be returned:

   ```json
   {
   +   "message": "Name must be a string"
   }
   ```

   > _❕This response will be returned anytime the name passed as a request body is not of type `string`_

#### Testing

Follow these steps to test the `CREATE` operation on [HNGxCRUD API Postman Workspace](https://www.postman.com/spacecraft-meteorologist-88946703/workspace/hngx)

1. A `url` variable has been set, and it's value is HNGxCRUD API's domain:
   > _The image below illustrates this step._

   ![2023-09-12 (2)](https://github.com/abdullmustyy/HNGx/assets/87391935/50a21af3-36f9-4bd7-9b19-8dceaba545ee)

2. With `{{url}}` as HNGxCRUD API's domain, make a `POST` request to `/api` endpoint, and pass the name of `person` as a request body:
   > _The image below illustrates this step._

   ![2023-09-12 (3)](https://github.com/abdullmustyy/HNGx/assets/87391935/51741035-3201-4d42-a8bd-95e8fc2126b0)
   > _As seen in the image, `Mark Essien` was passed as the name of `person` to be `CREATED` in the request body, and the expected response was returned._

### `READ`

> _❕ Copy the value set to `_id` in the response that was returned after creating a `person`. It'll be needed to perform `READ` operation._

Follow these steps to `read` a `person`:

1. Make a `GET` request to the endpoint below.

   ```js
   /api/:id
   ```
   > _❕ Replace `:id` with the value of `_id` that was copied earlier._
   
2. If the `GET` request was made correctly _(as explained in previous steps)_ a response like so will be returned.

   ```diff
   {
   +   "message": "READ Mark Essien",
       "person": {
           "_id": "6500e5c5be340fadede411cc",
   +       "name": "Mark Essien",
           "__v": 0
       }
   }
   ```

   > _❕ The `:id` that was provided in the endpoint was that of `Mark Essien` so, `person` with name `Mark Essien` was `READ`._

#### Testing

Follow these steps to test the `READ` operation on [HNGxCRUD API Postman Workspace](https://www.postman.com/spacecraft-meteorologist-88946703/workspace/hngx)

1. Update the value of `id` variable to the value of `_id` in the response that was returned after creating a `person`:
   > _The image below illustrates this step._

   ![2023-09-13](https://github.com/abdullmustyy/HNGx/assets/87391935/9fdcac65-6292-41f4-a893-54f692bd501c)

2. With `{{url}}` as HNGxCRUD API's domain, and `{{id}}` as `person` id. Make a `GET` request to `/api/:id` endpoint:
   > _The image below illustrates this step._

   ![2023-09-13 (2)](https://github.com/abdullmustyy/HNGx/assets/87391935/f35b530f-e5ac-44a0-875c-61352f5e8622)
   > _As seen in the image, `Mark Essien` was `READ` since the `:id` that was provided in the endpoint was that of `Mark Essien`, and the expected response was returned._

### `UPDATE`

> _❕ Copy the value set to `_id` in the response that was returned after creating a `person`. It'll be needed to perform `UPDATE` operation._

Follow these steps to `update` a `person`:

1. Make a `PATCH` request to the endpoint below.

   ```js
   /api/:id
   ```
   > _❕ Replace `:id` with the value of `_id` that was copied earlier._

2. Pass the name of `person` to be updated as a request body.

   ```json
   {
       "name": "Mark"
   }
   ```

   > _❕ `Mark` can be replaced with any other name._
   
3. If the `PATCH` request was made correctly _(as explained in previous steps)_ a response like so will be returned.

   ```diff
   {
   +   "message": "UPDATED Mark Essien to Mark",
       "personUpdate": {
           "_id": "6500e5c5be340fadede411cc",
   +       "name": "Mark",
           "__v": 0
       }
   }
   ```

   > _❕ The `:id` that was provided in the endpoint was that of `Mark Essien`, and the name `Mark Essien` was `UPDATED` to was passed as a request body so, `person` with name `Mark Essien` was `UPDATED` to `Mark`._

#### Testing

Follow this step to test the `UPDATE` operation on [HNGxCRUD API Postman Workspace](https://www.postman.com/spacecraft-meteorologist-88946703/workspace/hngx)

1. With `{{url}}` as HNGxCRUD API's domain, and `{{id}}` as `person` id. Make a `PATCH` request to `/api/:id` endpoint, and pass the new name of `person` as a request body:
   > _The image below illustrates this step._

   ![2023-09-13 (3)](https://github.com/abdullmustyy/HNGx/assets/87391935/84ec551d-ba8a-4440-986b-18b8f130d33f)
   > _As seen in the image, `Mark Essien` was `UPDATED` to `Mark` since the `:id` that was provided in the endpoint was that of `Mark Essien`, and the new name that was passed as a request body was `Mark`, then the expected response was returned._

### `DELETE`

> _❕ Copy the value set to `_id` in the response that was returned after creating a `person`. It'll be needed to perform `DELETE` operation._

Follow these steps to `delete` a `person`:

1. Make a `DELETE` request to the endpoint below.

   ```js
   /api/:id
   ```
   > _❕ Replace `:id` with the value of `_id` that was copied earlier._

2. If the `DELETE` request was made correctly _(as explained in previous steps)_ a response like so will be returned.

   ```json
   {
   +   "message": "DELETED Mark"
   }
   ```

   > _❕ The `:id` that was provided in the endpoint was that of `Mark` so, `person` with name `Mark` was `DELETED`._

#### Testing

Follow this step to test the `DELETE` operation on [HNGxCRUD API Postman Workspace](https://www.postman.com/spacecraft-meteorologist-88946703/workspace/hngx)

1. With `{{url}}` as HNGxCRUD API's domain, and `{{id}}` as `person` id. Make a `DELETE` request to `/api/:id` endpoint:
   > _The image below illustrates this step._

   ![2023-09-13 (4)](https://github.com/abdullmustyy/HNGx/assets/87391935/2684ef44-8300-4f08-8f63-9795a1f544aa)
   > _As seen in the image, `Mark` was `DELETED` since the `:id` that was provided in the endpoint was that of `Mark`, and the expected response was returned._

## Domain
View HNGxCRUD API's homepage ↗ [HNGxCRUD API](https://abdulhngx-crud.onrender.com)
