const Expense = require('../models/Expense');

/**
 * GET /
 * Home page.
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
 * Create a new local account.
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
 * POST /update
 * Create a new local account.
 */
exports.update = (req, res, next) => {
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
    if (err) { return next(err); }
    req.logIn(expense, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};
