import pool from '../config/db.js';

export const createOrder = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { items, total_amount, shipping_address, phone, transaction_id, payment_screenshot_url } = req.body;
    const user_id = req.user.id;

    await client.query('BEGIN');

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, payment_status, order_status, transaction_id, payment_screenshot_url, shipping_address, phone) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_id, total_amount, 'Payment Verification Pending', 'Pending', transaction_id, payment_screenshot_url, shipping_address, phone]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      );

      // Update product stock
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await client.query('COMMIT');

    res.status(201).json(order);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, payment_status } = req.body;

    let query = 'UPDATE orders SET ';
    const params = [];
    let paramCount = 1;

    if (order_status) {
      query += `order_status = $${paramCount}`;
      params.push(order_status);
      paramCount++;
    }

    if (payment_status) {
      if (params.length > 0) query += ', ';
      query += `payment_status = $${paramCount}`;
      params.push(payment_status);
      paramCount++;
    }

    query += ` WHERE id = $${paramCount} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
