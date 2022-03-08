# Test Expectations
1. There will be pages for
    - Show all Posts
    - Show a Post
    - Create new Post
    - Update existing Post
    - Delete existing Post
2. Please use ReactJS and Bootstrap templates (or other framework). Using nextjs will be
plus points
3. Using SSR will be plus points
4. Adding unit test will be plus points
5. Please put the source code in your gitlab or github public repo

# API requirements:

### Get all posts
`GET /posts`

Response:
```
[
  {
    "id": 1,
    "title": "Hello world",
    "content": "Hello world dang dang",
    "published_at": "2021-10-13T05:07:57.208Z",
    "created_at": "2021-10-13T05:07:52.434Z",
    "updated_at": "2021-10-13T05:07:57.228Z"
  }
]
```

### Get post with id
`GET /posts/id`

Response:
```
{
  "id": 1,
  "title": "Hello world",
  "content": "Hello world dang dang",
  "published_at": "2021-10-13T05:07:57.208Z",
  "created_at": "2021-10-13T05:07:52.434Z",
  "updated_at": "2021-10-13T05:07:57.228Z"
}
```

### Create new post
`POST /posts`

Body:
```
{
  "title": "Hello cui",
  "content": "Hello world dang dang"
}
```

Response:
```
{
  "id": 3,
  "title": "Hello cui",
  "content": "Hello world dang dang",
  "published_at": "2021-10-13T05:22:12.052Z",
  "created_at": "2021-10-13T05:22:12.055Z",
  "updated_at": "2021-10-13T05:22:12.055Z"
}
```

### Update post with id
`PUT /posts/id`

Body:
```
{
  "title": "Hello cui",
  "content": "Hello world dang dang ajep"
}
```

Response:
```
{
  "id": 3,
  "title": "Hello cui",
  "content": "Hello world dang dang ajep",
  "published_at": "2021-10-13T05:22:12.052Z",
  "created_at": "2021-10-13T05:22:12.055Z",
  "updated_at": "2021-10-13T05:22:36.103Z"
}
```

### Delete post with id
`DEL /posts/id`

Body:
```
{
  "title": "Hello cui",
  "content": "Hello world dang dang ajep"
}
```


Response:
```
{
  "id": 3,
  "title": "Hello cui",
  "content": "Hello world dang dang ajep",
  "published_at": "2021-10-13T05:22:12.052Z",
  "created_at": "2021-10-13T05:22:12.055Z",
  "updated_at": "2021-10-13T05:22:36.103Z"
}
```
