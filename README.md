# 🏟️ Algo Arena

> A comprehensive competitive programming platform where developers can solve algorithmic challenges, participate in contests, and track their progress. Built with Turborepo, Next.js, TypeScript, and Prisma.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/MukulPretham/algo-arena.git

# Install dependencies
npm install

# Start development servers
npm run dev
```

## 🎯 Platform Features

### For Coders
- **🔐 Account Management** - Create personalized accounts with secure authentication
- **💻 Multi-Language Support** - Solve problems in your preferred programming language
- **📊 Progress Tracking** - Monitor your submission history and performance metrics
- **🏆 Contest Participation** - Compete in timed programming contests
- **📈 Scoring System** - Track your ranking and improvement over time
- **📚 Problem Categories** - Browse problems by topics and difficulty levels

### For Platform
- **🗃️ Robust Database Design** - PostgreSQL with Prisma ORM for data integrity
- **⚡ Real-time Evaluation** - Instant feedback on code submissions
- **🎪 Contest Management** - Comprehensive contest creation and participation system
- **📋 Test Case Management** - Detailed test cases with explanations for each problem

## 📋 What's Inside?

Algo Arena is a monorepo built with [Turborepo](https://turborepo.com) that includes the following packages and applications:

### Applications

- **`web`** - Main Next.js application with Tailwind CSS (Primary user interface)
- **`docs`** - Documentation site built with Next.js and Tailwind CSS

### Packages

- **`ui`** - Shared React component library with Tailwind CSS used by both `web` and `docs`
- **`@repo/eslint-config`** - Shared ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- **`@repo/typescript-config`** - Shared TypeScript configuration files used throughout the monorepo

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (100% TypeScript codebase)
- **Database**: [PostgreSQL](https://postgresql.org/) with [Prisma ORM](https://prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build System**: [Turborepo](https://turborepo.com) for optimized builds
- **Code Quality**: ESLint + Prettier
- **Package Manager**: npm

## 🏗️ Project Structure

```
algo-arena/
├── apps/
│   ├── docs/                 # Documentation site
│   └── web/                  # Main application
├── packages/
│   ├── ui/                   # Shared component library
│   ├── eslint-config/        # ESLint configurations
│   └── typescript-config/    # TypeScript configurations
├── prisma/
│   └── schema.prisma         # Database schema
├── package.json
├── turbo.json               # Turborepo configuration
└── README.md
```

## 💡 Key Features

### Competitive Programming Platform
- **User Registration & Authentication** - Secure account creation with email verification
- **Multi-Language Code Execution** - Support for popular programming languages
- **Real-time Contest System** - Timed competitions with live leaderboards
- **Comprehensive Problem Bank** - Categorized by topics and difficulty levels
- **Advanced Scoring System** - Track performance metrics and rankings
- **Submission History** - Complete record of all attempts and solutions

### Database Architecture
The platform uses a robust PostgreSQL database with Prisma ORM, featuring:

#### Core Models
- **Users** - Account management with unique usernames and emails
- **Problems** - Algorithm challenges with statements and categorization
- **Test Cases** - Input/output pairs with detailed explanations
- **Topics** - Problem categorization system
- **Submissions** - User solution attempts with status tracking

#### Contest System
- **Contests** - Timed competitive events with start/end times
- **Contest Problems** - Many-to-many relationship between contests and problems
- **Participant Logs** - User participation tracking with scores

### Monorepo Architecture
- **Turborepo** for lightning-fast builds with intelligent caching
- **Shared UI Components** across multiple applications
- **Consistent tooling** with shared ESLint and TypeScript configs
- **Optimized package compilation** using Next.js Compiler

## 🗄️ Database Schema

The platform uses PostgreSQL with Prisma ORM for robust data management:

### User Management
```prisma
model User {
  id          String    @id @default(uuid())
  username    String    @unique
  password    String 
  email       String    @unique
  submissions Submissions[]
  contests    ContestParticipantLogs[]
}
```

### Problem System
```prisma
model Problem {
  id          String    @id @default(uuid())
  title       String
  statement   String    @unique
  type        String
  testCases   TestCases[]
  topics      ProblemToTopic[]
  submissions Submissions[]
  contests    ContestQuestionLogs[]
}

model TestCases {
  id              String  @id @default(uuid())
  problemId       String
  testCaseInput   String
  testCaseOutput  String
  explanation     String 
  problem         Problem @relation(fields: [problemId], references: [id])
}
```

### Contest Framework
```prisma
model Contest {
  id           String    @id @default(cuid())
  name         String    @unique
  starts       DateTime
  ends         DateTime
  problems     ContestQuestionLogs[]
  participants ContestParticipantLogs[]
}

model ContestParticipantLogs {
  contestId String
  userId    String
  score     Int     @default(0)
  contest   Contest @relation(fields: [contestId], references: [id])
  user      User    @relation(fields: [userId], references: [id])
  
  @@id([contestId, userId])
}
```

### Submission Tracking
```prisma
model Submissions {
  id        String  @id @default(cuid())
  userId    String
  problemId String
  status    String
  type      String  @default("practice")
  contestId String  @default("none")
  user      User    @relation(fields: [userId], references: [id])
  problem   Problem @relation(fields: [problemId], references: [id])
}
```
- **Hot Module Replacement** across all packages
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid UI development
- **Component isolation** with clear package boundaries

### UI Component System
- **Scoped CSS classes** using `ui-` prefix to prevent conflicts
- **Compiled styles** output to `dist` directory
- **Direct consumption** of `.tsx` files using `transpilePackages`
- **Consistent design system** across applications

## 🚦 Available Scripts

### Root Level Commands

```bash
# Start all development servers
npm run dev

# Build all applications and packages
npm run build

# Run tests across all packages
npm run test

# Lint all packages
npm run lint

# Format code with Prettier
npm run format

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema to database
npx prisma db seed          # Seed database with sample data
```

### Application-Specific Commands

```bash
# Run specific application
npm run dev --workspace=web
npm run dev --workspace=docs

# Build specific application
npm run build --workspace=web
npm run build --workspace=docs
```

## 🎨 Styling Architecture

### Tailwind Configuration
- **Shared config** in `packages/tailwind-config/tailwind.config.ts`
- **UI prefix** for component library classes (`ui-`)
- **Content paths** configured for optimal CSS compilation

### Component Library Strategy
The project uses a **compiled UI approach** where:
1. UI components are built into the `dist` directory
2. Applications consume compiled styles
3. Component `.tsx` files are used directly via `transpilePackages`

### Alternative Setup
For direct source consumption (without building), update your `tailwind.config.ts`:

```typescript
content: [
  // app content
  `src/**/*.{js,ts,jsx,tsx}`,
  // include packages if not transpiling
  "../../packages/ui/*.{js,ts,jsx,tsx}",
],
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 8.x or higher
- PostgreSQL 14.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MukulPretham/algo-arena.git
   cd algo-arena
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

6. **Open applications**
   - Web App: `http://localhost:3000`
   - Docs: `http://localhost:3001`

### Environment Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/algo_arena"
NEXTAUTH_SECRET="your-auth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## 📦 Package Management

### Adding Dependencies

```bash
# Add to specific workspace
npm install <package> --workspace=web
npm install <package> --workspace=docs
npm install <package> --workspace=ui

# Add to root (affects all workspaces)
npm install <package> -w
```

### Workspace Dependencies

```bash
# Reference internal packages
npm install @repo/ui --workspace=web
```

## 🏆 Best Practices

### Code Organization
- Keep components in the `ui` package for reusability
- Use TypeScript interfaces for prop definitions
- Follow the established naming conventions

### Styling Guidelines
- Use Tailwind utility classes
- Prefix custom UI classes with `ui-`
- Maintain responsive design principles

### Performance
- Leverage Turborepo's caching for faster builds
- Use Next.js Image optimization
- Implement proper code splitting

## 🔮 Roadmap

### ✅ Completed Features
- [x] Robust database schema with Prisma ORM
- [x] User authentication and account management
- [x] Problem categorization system
- [x] Contest framework with participant tracking
- [x] Submission history and status tracking
- [x] Turborepo monorepo setup

### 🚧 In Development
- [ ] Code execution environment setup
- [ ] Multi-language compiler integration
- [ ] Real-time contest leaderboards
- [ ] Problem difficulty rating system

### 📋 Planned Features
- [ ] Advanced analytics dashboard
- [ ] Social features (following, discussions)
- [ ] Problem recommendations
- [ ] Mobile application
- [ ] API rate limiting and security
- [ ] Contest streaming and live updates
- [ ] Editorial solutions and explanations
- [ ] Team contests and collaborations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all builds pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Turborepo](https://turborepo.com) by Vercel
- UI powered by [Tailwind CSS](https://tailwindcss.com)
- Framework by [Next.js](https://nextjs.org)

---

**Algo Arena** - Where algorithms meet competition! 🏟️⚡

*Empowering developers to solve, compete, and excel in algorithmic challenges.*
