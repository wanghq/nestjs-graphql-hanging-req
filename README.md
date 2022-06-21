# Running

Start the app `npm run start:dev`.

### Req hangs if more than 1 subfields depend on connection which throws error.

```
curl --location --request POST 'http://localhost:3001/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n  recipe(id: \"string\") {\n    id\n    description\n    creator {\n      id\n    }\n    creator2 {\n      id\n    }\n  }\n}\n","variables":{}}'
```

### Req doesn't hang if 1 subfield depends on connection which throws error.

```
curl --location --request POST 'http://localhost:3001/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n  recipe(id: \"string\") {\n    id\n    description\n    creator {\n      id\n    }\n  }\n}\n","variables":{}}'
```

### Req doesn't hang if subfields throw error directly (not dependinng on connection).

```
curl --location --request POST 'http://localhost:3001/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n  recipe(id: \"string\") {\n    id\n    description\n    country {\n      id\n    }\n    country2 {\n      id\n    }\n  }\n}\n","variables":{}}'
```
