const bcrypt = require('bcrypt')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            bcrypt.compare(password, users[i].password, function(error, success) {
              if (!error){
                if (success){
                let account = {...users[i]}
                account.password = ''
                res.status(200).send(account)
                } else {
                  res.status(400).send('didnt work')
                }
              } else {
                console.log('failed')
              }
            })
        } 
      }
      
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        //users.push(req.body)

        const {username, email, password, firstName, lastName} = req.body
        const saltRounds = 10

        bcrypt.hash(password, saltRounds, (error, hashPass) => {
          let newDatabaseEntry = {}
          newDatabaseEntry.username = username
          newDatabaseEntry.email = email
          newDatabaseEntry.firstName = firstName
          newDatabaseEntry.lastName = lastName
          
          newDatabaseEntry.password = hashPass
         users.push(newDatabaseEntry)
          
          console.log(newDatabaseEntry)
          res.status(200).send(req.body)
      })
    }
}