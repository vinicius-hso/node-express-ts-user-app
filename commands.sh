psql -U docker -d estudos_node_db

# create user
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"vinnie2","email":"vinnie2@dev.com"}' \
  http://localhost:3000/user

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"vinnie2","email":"vinnie2@dev.com", "password":"123321asd", "role": "manager"}' \
  http://localhost:3000/user

# get users
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/user


# login
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"vinnie2","email":"vinnie2@dev.com", "password":"123321asd"}' \
  http://localhost:3000/user/login