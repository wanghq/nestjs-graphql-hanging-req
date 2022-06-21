# Running

Start the app `npm run start:dev`.

```
curl -0 -v POST 'http://localhost:3001/graphql' \
--data-binary @- << EOF
{
  recipe(id: "string") {
    id
    creator {
      id
    }
  }
}
EOF
```

```
curl --location --request POST 'http://localhost:3001/graphql' \
--data-binary @- << EOF
{
  recipe(id: "string") {
    id
    creator {
      id
    }
    creator2 {
      id
    }
  }
}
EOF
```
