const users = [{
        name: 'Jane',
        role: 'admin',
        email: 'jane@hotmail.com'
    },
    {
        name: 'John',
        role: 'normal',
        email: 'john@hotmail.com'
    }
]

var getAdminEmails = users =>
    users
      .filter(u => u.role === 'admin')
      .map(u => u.email);

var getAdminEmails = function (users) {
    var emails = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].role === 'admin') {
            emails.push(users[i].email);
        }
    }
    return emails;
}