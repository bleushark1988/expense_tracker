const Expense = require('../models/Expense');

/**
 * GET /
 * Expense page.
 */

exports.index = (req, res) => {
  Expense.find({ }, (err, expenselist) => {
    if (err) { return; }
    res.render('expense', {
      title: 'Expense',
      expenses: expenselist
    });
  });
};

/**
 * POST /insert
 * Create a new expense.
 */
exports.insert = (req, res) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }
  const expense = new Expense({
    date: req.body.date,
    amount: req.body.amount,
    description: req.body.description,
    comment: req.body.comment
  });

  expense.save((err) => {
    if (err) { req.flash('errors', errors); }
    res.redirect('/expense');
  });
};

/**
 * POST /update submit
 * update a expense.
 */
exports.updated = (req, res) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/expense');
  }

  const setData = {
    date: req.body.date,
    amount: req.body.amount,
    description: req.body.description,
    comment: req.body.comment
  };


  console.log(setData);
  Expense.findByIdAndUpdate(req.body._id, { $set: setData }, { new: true }, (err) => {
    if (err) { req.flash('errors', errors); }
    res.redirect('/expense');
  });
};

/**
 * POST /update submit
 * update a expense.
 */
exports.updating = (req, res) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/expense');
  }

  Expense.find({ }, (err, result) => {
    if (err) { return; }
    res.render('expense', {
      title: 'Expense',
      update: result,
    });
  });
};

/**
 * POST /expense/delete
 * Delete user account.
 */
exports.postDeleteExpense = (req, res) => {
  Expense.remove({ _id: req.query._id }, (err) => {
    if (err) {
      req.flash('errors', err);
      return res.redirect('/expense');
    }
    req.logout();
    req.flash('info', { msg: 'Your expense has been deleted.' });
    res.redirect('/expense');
  });
};

exports.getUpdateContact = (req, res) => {
  Expense.findById(req.query._id, (err, item) => {
    console.log(item.description);
    res.render('expense/update', {
      title: 'Update Expense',
      updateData: item
    });
  });
};

exports.sortByDate = (req, res) => {
  Expense.find({ }, (err, expenselist) => {
    if (err) { return; }
    res.render('expense', {
      title: 'Expense',
      expenses: expenselist
    });
  }).sort({ date: -1 });
};

exports.sortByComment = (req, res) => {
  Expense.find({ }, (err, expenselist) => {
    if (err) { return; }
    res.render('expense', {
      title: 'Expense',
      expenses: expenselist
    });
  }).sort({ comment: -1 });
};

exports.sortByAmount = (req, res) => {
  Expense.find({ }, (err, expenselist) => {
    if (err) { return; }
    res.render('expense', {
      title: 'Expense',
      expenses: expenselist
    });
  }).sort({ amount: -1 });
};

exports.sortByDescription = (req, res) => {
  Expense.find({ }, (err, expenselist) => {
    if (err) { return; }
    res.render('expense', {
      title: 'Expense',
      expenses: expenselist
    });
  }).sort({ descritpion: -1 });
};
