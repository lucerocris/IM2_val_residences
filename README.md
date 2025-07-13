# Rental Property Management Platform

A comprehensive multi-tenant rental property management system built with Laravel, Inertia.js, and React that connects landlords with prospective tenants and manages the entire rental lifecycle.

## 🏢 Overview

This platform provides a complete ecosystem for rental property management, featuring role-based access control, automated billing, maintenance tracking, and financial reporting. The system supports three user types and handles everything from property listings to ongoing tenant management.

## 🚀 Features

### Core User Types
- **Landlords** - Property owners who manage rental units
- **Tenants** - Current renters with active leases  
- **Prospective Tenants** - Users looking to rent properties

### Key Functionality

#### 🔐 Authentication & User Management
- Role-based registration and login
- Single Table Inheritance for user types
- Middleware-protected routes based on user roles
- Automatic dashboard redirection by user type

#### 🏠 Property Management
- Add and edit rental properties
- Property details management (address, rent, amenities, photos)
- Availability status tracking
- Performance metrics and occupancy rates

#### 📋 Property Listings & Applications
- Public property listings with search and filtering
- Application submission system for prospective tenants
- Application status tracking
- Landlord application review and approval workflow

#### 📄 Lease Management
- Digital lease creation and management
- Customizable lease terms (duration, rent, deposit)
- Lease document generation and storage
- Active/inactive lease tracking

#### 🎯 Tenant Onboarding
- Comprehensive pre-lease activation process
- Payment collection (deposits, first month rent)
- Document upload and verification (checked manually by landlord)
- ID verification (checked manually by landlord)
- Progress tracking for landlords

#### 💰 Billing & Payment System
- Automated monthly bill generation
- Multiple payment methods (GCash, PayMaya, Bank Transfer)
- Payment status tracking (pending, partial, paid, overdue)
- Automated overdue marking
- Payment history management

#### 🔧 Maintenance Management
- Tenant maintenance request submission
- Status tracking (pending, in progress, completed)
- Landlord request management and updates


#### 📊 Financial Reporting & Analytics
- Revenue tracking by property and time period
- Rent collection rate analysis
- Expense monitoring and categorization
- Profit/loss analysis
- Property performance metrics
- Occupancy rate tracking

#### 🎛️ Role-Specific Dashboards
- **Landlord Dashboard**: Property overview, maintenance requests, financial summaries
- **Tenant Dashboard**: Lease information, bills, maintenance requests, payments
- **Prospective Tenant Dashboard**: Available listings, application status, property search

## 🛠️ Tech Stack

- **Backend**: Laravel
- **Frontend**: React with Inertia.js
- **Database**: MySQL
- **Authentication**: Custom Authentication
- **File Storage**: Laravel Storage
- **Payment Processing**: GCash, PayMaya, Bank Transfer integrations (manually sent)

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/lucerocris/rental-platform.git
cd rental-platform
```

2. Install PHP dependencies
```bash
composer install
```

3. Install Node.js dependencies
```bash
npm install
```

4. Environment setup
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env`
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rental_platform
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run database migrations
```bash
php artisan migrate
```

7. Seed the database (optional)
```bash
php artisan db:seed
```

8. Build frontend assets
```bash
npm run build
```

9. Start the development server
```bash
php artisan serve
npm run dev
```

## 🔄 System Flow

### Complete Tenant Lifecycle
1. **Property Listing** → **Application** → **Lease Creation** → **Onboarding** → **Active Tenancy**

### Financial Management Flow
2. **Lease Agreement** → **Automated Billing** → **Payment Processing** → **Financial Reporting**

### Service Request Flow
3. **Tenant Request** → **Maintenance Tracking** → **Landlord Management** → **Resolution**

## 🏗️ Architecture

The system uses Laravel's MVC architecture with:
- **Models**: Single Table Inheritance for user types
- **Controllers**: Role-based route handling
- **Views**: React components with Inertia.js
- **Middleware**: Role-based access control
- **Jobs**: Automated billing and notifications
- **Events**: System-wide activity tracking

## 📱 User Interfaces

### Landlord Features
- Property management dashboard
- Application review system
- Tenant management tools
- Financial reporting
- Maintenance oversight

### Tenant Features
- Lease document access
- Bill payment system
- Maintenance request submission


### Prospective Tenant Features
- Property search and filtering
- Application submission
- Status tracking


## 🔒 Security

- Role-based access control
- CSRF protection
- Input validation and sanitization
- Secure file upload handling
- Database query protection

## 📈 Performance

- Efficient database queries with relationships
- Pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Support

For support, please contact [lucerocris22@gmail.com] or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- Laravel community for the excellent framework
- Inertia.js team for seamless SPA experience
- React team for the powerful frontend library

---

**Built with ❤️ using Laravel + Inertia.js + React**
