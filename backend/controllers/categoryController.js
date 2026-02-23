import pool from '../config/db.js';

export const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    const result = await pool.query(
      'INSERT INTO categories (name, description, icon) VALUES ($1, $2, $3) RETURNING *',
      [name, description || null, icon || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
