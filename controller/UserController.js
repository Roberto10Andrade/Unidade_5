const User = require('../models/User')


module.exports = class UserController {

  isAuthenticated = false;
  static login(req, res) {
    res.render('users/login')
  }

  static async loginPost(req, res) {
    const { username, password } = req.body

    if (username === 'admin' && password === 'admin') {
      const users = await User.findAll({ raw: true });

      res.render('dashboard', { users: users, isAuthenticated: true })
    } else {
      res.redirect('users/login')
    }
  }

  static logout(req, res) {

    res.redirect('users/login')
  }

  static add(req, res) {
    res.render('userform', { isAuthenticated: true })
  }

  static async save(req, res) {

    const usuario = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }
    try {
      const exists = await UserController.validaSave(usuario.email)

      if (!exists) {
        await User.create(usuario)
        const users = await User.findAll({ raw: true });
        res.render('dashboard', { users: users, isAuthenticated: true })
      }
      else {

        res.render('userform', { isAuthenticated: true })
      }
    } catch (error) {
      console.log(error);

    }


  }

  static async validaSave(email) {
    let users = await User.findAll({ where: { email: email } })
    if (users.length > 0) {
      return true
    } else {
      return false
    }
    return false
  }

  static async edit(req, res) {
    const id = req.params.id
    console.log(id)
    const user = await User.findOne({ where: { id: id }, raw: true });
    res.render('userEdit', { user: user, isAuthenticated: true })
  }

  static async editSave(req, res) {
    const id = req.body.id;
    const usuario = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }

    await User.update(usuario, { where: { id: id } })
    const users = await User.findAll({ raw: true });
    res.render('dashboard', { users: users, isAuthenticated: true })

  }

  static async delete(req, res) {
    const { id } = req.body
    try {
      User.destroy({ where: { id: id } })
      const users = await User.findAll({ raw: true });
      res.render('dashboard', { users: users, isAuthenticated: true })

    } catch (error) {
      console.log(error);
    }
  }



  static async findAll() {
    const users = await User.findAll({ raw: true });
    return users
  }

  static async home(req, res) {
    const users = await User.findAll({ raw: true });
    res.render('dashboard', { users: users, isAuthenticated: true })
  }


}