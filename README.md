# reader

## setup
Dependencies:
 - [dune](https://dune.build)
 - [yarn](https://yarnpkg.com)
  
  
`make install`
`make start`

## example requests

### /users
`curl -XPOST http://localhost:8080/users/login -d'{email: "jake.kinsella@gmail.com", password: "foobar"}'`  

### /feeds
`curl -H "authentication: Bearer ${TOKEN}" -XPOST http://localhost:8080/feeds -d'{uri: "https://hnrss.org/frontpage"}'`  
`curl -H "authentication: Bearer ${TOKEN}" -XGET http://localhost:8080/feeds/https%3A%2F%2Fhnrss.org%2Ffrontpage`  
`curl -H "authentication: Bearer ${TOKEN}" -XGET http://localhost:8080/feeds/https%3A%2F%2Fastralcodexten.substack.com%2Ffeed`  
`curl -H "authentication: Bearer ${TOKEN}" -XGET http://localhost:8080/feeds/https%3A%2F%2Fhnrss.org%2Ffrontpage/items`

## todo
 - pull items from feeds on interval
   - add "refreshed_at" field to feeds, use to drive pulling
   - need to dedupe feed items
 - add lists to aggregate feeds
   - pull items by list
   - attached to user
 - add read_items table
   - only show unread items unless asking for all
