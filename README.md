# 🧼 Clean Architecture ToDo App (React + Vite)

This project is a simple **ToDo App** demonstrating how to structure a **React + TypeScript** application using **Clean Architecture** principles.

## 🚀 Tech Stack

- [Vite](https://vitejs.dev/) — Fast bundler & dev server
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- Clean Architecture (Inspired by Uncle Bob)
- Local in-memory data store (mock backend)

---

## 🧠 What is Clean Architecture?

Clean Architecture emphasizes **separation of concerns**, making the app:

- Easier to test
- Easier to scale
- More maintainable
- Framework-independent

### Layered Structure:

```

+--------------------------------------+
\|            UI Layer (View)           | ← React Components
+--------------------------------------+
\|      Application Layer (Use Cases)   | ← Orchestrate business logic
+--------------------------------------+
\|         Domain Layer (Entities)      | ← Business rules & interfaces
+--------------------------------------+
\|   Infrastructure Layer (Adapters)    | ← DB, APIs, external tools
+--------------------------------------+

```

---

## 🗂️ Folder Structure

```md
src/
├── presentation/               # UI Layer
│   ├── components/             # Reusable UI elements
│   └── screens/                # Pages (e.g., TodoPage)
│
├── hooks/                      # ViewModels (React hooks)
│   └── useTodoViewModel.ts
│
├── application/                # Application Layer (Use Cases)
│   └── todo/
│       └── useCases/
│           ├── addTodoUseCase.ts
│           └── toggleTodoUseCase.ts
│
├── domain/                     # Domain Layer
│   ├── models/
│   │   └── Todo.ts
│   └── services/
│       └── TodoService.ts (interface)
│
├── infrastructure/             # Infrastructure Layer (Adapters)
│   └── todo/
│       └── TodoServiceImpl.ts
│
├── di/                         # Dependency Injection
│   └── container.ts
│
├── App.tsx                     # Entry Point
└── main.tsx                    # React DOM Mount

````

---

## ✅ Features

- Add new todos
- Toggle completion state
- Fully decoupled architecture
- Clean state management via hooks
- No duplicated keys or stale state
- Easily testable and extensible

---

## 🧪 Example Flow

**Add Todo Flow:**

1. UI → `useTodoViewModel.addTodo(title)`
2. ViewModel → `addTodoUseCase.execute(title)`
3. UseCase → `todoService.addTodo(title)`
4. Adapter (infrastructure) creates a new Todo and returns
5. ViewModel refreshes state by refetching from `todoService.getTodos()`

---

## 🧑‍💻 Commands

### Install dependencies

```bash
npm install
````

### Run the app

```bash
npm run dev
```

### Build the app

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## 📌 Best Practices Included

* **Separation of Concerns:** UI, logic, storage are all decoupled
* **Dependency Injection:** Infrastructure injected via `container.ts`
* **Pure Components & Functions:** No side-effects in UI
* **Scalable File Structure:** Easy to add features
* **Mock Backend:** Easily replace with real API or DB layer

---

## 🧭 Next Steps (Suggestions)

* ✅ Add persistence via `localStorage` or IndexedDB
* 🔐 Integrate authentication
* 🌐 Replace in-memory storage with API calls (e.g. Express, Firebase)
* 🧪 Add unit tests (Jest)
* 📦 Use Zustand or Redux for advanced state management
* 🔍 Add validation via Zod or Yup
* 🌍 Add i18n via react-i18next

---

## 📄 License

MIT

---

## ✨ Author

Built by Nitesh Kesarkar (nitesh.kesarkar@codeblaze.ae)


