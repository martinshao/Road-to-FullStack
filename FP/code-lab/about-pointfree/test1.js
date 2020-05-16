const getUserDisplayName = user => `${user.firstName} ${user.lastName}`

const users = [{
        firstName: 'Jane',
        lastName: 'Doe'
    },
    {
        firstName: 'John',
        lastName: 'Doe'
    }
]

users.map(user => getUserDisplayName(user)) // ["Jane Doe", "John Doe"]

const getUserDisplayName = user => `${user.firstName} ${user.lastName}`

const users = [
  {firstName: 'Jane', lastName: 'Doe'},
  {firstName: 'John', lastName: 'Doe'}
]

users.map(getUserDisplayName) // ["Jane Doe", "John Doe"]