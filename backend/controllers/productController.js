import pool from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category, featured, sortBy, limit } = req.query;
    
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND p.category_id = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (featured === 'true') {
      query += ` AND p.is_featured = true`;
    }

    // Sorting
    if (sortBy === 'price_asc') {
      query += ' ORDER BY p.price ASC';
    } else if (sortBy === 'price_desc') {
      query += ' ORDER BY p.price DESC';
    } else if (sortBy === 'name') {
      query += ' ORDER BY p.name ASC';
    } else {
      query += ' ORDER BY p.created_at DESC';
    }

    if (limit) {
      query += ` LIMIT $${paramCount}`;
      params.push(parseInt(limit));
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, category_id, stock, is_featured } = req.body;

    const result = await pool.query(
      'INSERT INTO products (name, description, price, image_url, category_id, stock, is_featured) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, price, image_url, category_id, stock || 0, is_featured || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url, category_id, stock, is_featured } = req.body;

    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, category_id = $5, stock = $6, is_featured = $7 WHERE id = $8 RETURNING *',
      [name, description, price, image_url, category_id, stock, is_featured, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
