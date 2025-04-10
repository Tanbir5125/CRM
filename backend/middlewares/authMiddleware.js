import jwt from 'jsonwebtoken';
import Member from '../models/memberModel.js';
import Lead from '../models/leadModel.js';

export const protect = async (req, res, next) => {
  const token = req.cookies?.['jwt-crm'];

  if (!token) {
    return res.status(401).json({ success: false, redirect: '/login', message: 'Not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Member.findById(decoded.id) || await Lead.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, redirect: '/login', message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, redirect: '/login', message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.toLowerCase();

    if (!req.user || !roles.includes(userRole)) {
      return res.status(403).json({ success: false, redirect: '/login', message: 'Access denied' });
    }

    next();
  };
};

export const restrictToUnauthenticated = (req, res, next) => {
  const token = req.cookies?.['jwt-crm'];

  if (token) {
    return res.status(403).json({ success: false, redirect: '/dashboard', message: 'Already logged in' });
  }

  next();
};
