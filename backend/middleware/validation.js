import { body, validationResult } from 'express-validator';

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
export const validateSignup = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('clubName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Club name must be between 2 and 100 characters'),
  body('adminName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Admin name must be between 2 and 100 characters'),
  body('phoneNumber')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('province')
    .isIn(['Lusaka', 'Copperbelt', 'Central', 'Eastern', 'Luapula', 'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'])
    .withMessage('Please select a valid province'),
  body('clubDivision')
    .isIn(['Super League', 'Division One', 'Women\'s League', 'Provincial League'])
    .withMessage('Please select a valid division'),
  handleValidationErrors
];

// User login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Player validation
export const validatePlayer = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Player name must be between 2 and 100 characters'),
  body('age')
    .isInt({ min: 16, max: 50 })
    .withMessage('Age must be between 16 and 50'),
  body('nrc')
    .matches(/^\d{6}\/\d{2}\/\d$/)
    .withMessage('NRC must be in format: 123456/12/1'),
  body('position')
    .isIn(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'])
    .withMessage('Please select a valid position'),
  body('nationality')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nationality must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  handleValidationErrors
];

// Transfer validation
export const validateTransfer = [
  body('playerId')
    .isMongoId()
    .withMessage('Please provide a valid player ID'),
  body('toClub')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Destination club name must be between 2 and 100 characters'),
  body('amount')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Transfer amount is required'),
  body('type')
    .isIn(['Permanent', 'Loan'])
    .withMessage('Transfer type must be either Permanent or Loan'),
  handleValidationErrors
];

// Club update validation
export const validateClubUpdate = [
  body('clubName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Club name must be between 2 and 100 characters'),
  body('adminName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Admin name must be between 2 and 100 characters'),
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('province')
    .optional()
    .isIn(['Lusaka', 'Copperbelt', 'Central', 'Eastern', 'Luapula', 'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'])
    .withMessage('Please select a valid province'),
  body('clubDivision')
    .optional()
    .isIn(['Super League', 'Division One', 'Women\'s League', 'Provincial League'])
    .withMessage('Please select a valid division'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'pending'])
    .withMessage('Status must be active, inactive, or pending'),
  handleValidationErrors
];