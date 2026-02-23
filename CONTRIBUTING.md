# 🤝 Contributing to Surprise Basket

Thank you for your interest in contributing to Surprise Basket! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- PostgreSQL database (Supabase account)
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/surprise-basket.git
   cd surprise-basket
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/surprise-basket.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Copy example files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   
   # Update with your credentials
   ```

6. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 💻 Development Process

### Branching Strategy

We use Git Flow branching model:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature Branch

```bash
# Update your local develop branch
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Write clean code**
   - Follow existing code style
   - Add comments for complex logic
   - Keep functions small and focused

2. **Test your changes**
   - Test manually in browser
   - Write unit tests if applicable
   - Ensure no console errors

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Keep your branch updated**
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Tested on multiple screen sizes
- [ ] All tests passing

### Submitting a Pull Request

1. **Go to GitHub**
   - Navigate to your fork
   - Click "New Pull Request"

2. **Fill out the template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   How to test these changes
   
   ## Screenshots (if applicable)
   Add screenshots here
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Tests added/updated
   - [ ] Documentation updated
   ```

3. **Wait for review**
   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, it will be merged

### After Your PR is Merged

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## 📝 Coding Standards

### TypeScript/JavaScript

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUserById = async (id: string): Promise<User> => {
  const user = await api.get(`/users/${id}`);
  return user.data;
};

// ❌ Bad
const getUserById = async (id) => {
  const user = await api.get('/users/' + id);
  return user.data;
};
```

### React Components

```tsx
// ✅ Good - Functional component with TypeScript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// ❌ Bad - No types, unclear naming
export default function Card({ p, onClick }) {
  return <div onClick={onClick}>{p.n}</div>;
}
```

### CSS/Tailwind

```tsx
// ✅ Good - Organized, readable
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
  <span className="text-lg font-semibold">Product Name</span>
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Add to Cart
  </button>
</div>

// ❌ Bad - Unorganized, hard to read
<div className="flex p-4 bg-white items-center rounded-lg justify-between shadow-md hover:shadow-lg transition">
  <span className="font-semibold text-lg">Product Name</span>
  <button className="bg-blue-500 px-4 text-white py-2 rounded">Add to Cart</button>
</div>
```

### Backend Code

```javascript
// ✅ Good - Clear, with error handling
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
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

// ❌ Bad - No error handling, unclear
export const getProductById = async (req, res) => {
  const result = await pool.query('SELECT * FROM products WHERE id = ' + req.params.id);
  res.json(result.rows[0]);
};
```

## 💬 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(products): add product filtering by category"

# Bug fix
git commit -m "fix(cart): resolve quantity update issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(components): format ProductCard component"

# Refactor
git commit -m "refactor(api): simplify error handling logic"
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm test
```

### Backend Testing

```bash
cd backend
npm test
```

### Manual Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Test all user flows
- [ ] Test error scenarios
- [ ] Test with slow network
- [ ] Test accessibility

## 📚 Documentation

### Code Comments

```typescript
// ✅ Good - Explains why, not what
// Calculate tax based on user's location
// Different states have different tax rates
const calculateTax = (amount: number, state: string): number => {
  const taxRate = TAX_RATES[state] || DEFAULT_TAX_RATE;
  return amount * taxRate;
};

// ❌ Bad - States the obvious
// This function calculates tax
const calculateTax = (amount, state) => {
  return amount * TAX_RATES[state];
};
```

### README Updates

When adding new features, update:
- Feature list in README.md
- API endpoints if applicable
- Environment variables if added
- Setup instructions if changed

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try latest version
3. Reproduce the bug
4. Gather information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional context**
Any other information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Alternative solutions considered

**Additional context**
Mockups, examples, etc.
```

## 🎯 Areas for Contribution

### Good First Issues
- UI improvements
- Documentation updates
- Bug fixes
- Test coverage

### Advanced Contributions
- New features
- Performance optimizations
- Security enhancements
- Architecture improvements

## 📞 Getting Help

- **Discord:** [Join our server](#)
- **Email:** dev@surprisebasket.com
- **GitHub Discussions:** [Start a discussion](#)

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Surprise Basket! 🎁

Your contributions make this project better for everyone! 🚀
