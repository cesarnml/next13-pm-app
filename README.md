# Next13 Project Management App Tutorial

- [Next13 Project Management App Tutorial](#next13-project-management-app-tutorial)
  - [Lessons](#lessons)
  - [Notes](#notes)
    - [Lesson 01 Notes - Project Scaffolding](#lesson-01-notes---project-scaffolding)
    - [Lesson 02 Notes](#lesson-02-notes)
    - [Lesson 03 Notes](#lesson-03-notes)
    - [Lesson 04 Notes](#lesson-04-notes)

## Lessons

- [x] ~~_Lesson 01: Project Scaffold_~~ [2023-01-06]
- [x] ~~_Lesson 02 - Scaffold path aliases, app dir page grouping/routes and GlassPane component/layout_~~ [2023-01-11]
- [x] ~~_Lesson 03 - Declare reusable components (`Button, Input, Card, Sidebar, SidebarLink`)_~~ [2023-01-11]
- [x] ~~_Lesson 04 - Setup api fetcher, reusable AuthForm, typings around routes and api endpoints_~~ [2023-01-11]
- [x] ~~_Lesson 05 - Incorporate AuthForm in register and signin pages_~~ [2023-01-11]
- [ ] Lesson 06
- [ ] Lesson 07
- [ ] Lesson 08
- [ ] Lesson 09

## Notes

### Lesson 01 Notes - Project Scaffolding

- `npx prisma format` will auto generate required related fields in `schema.prisma`
- `npx prisma migrate dev` syncs prisma client module with current `schema.prisma`
  - Required after making any change to `schema.prisma`

### Lesson 02 Notes

- `GlassPane` component will likely be refactored to be part of the `RootLayout` component declaration

### Lesson 03 Notes

- `class-variance-authority (cva)` - cool component to create reusable component variants
- `clsx` - conditional className concatenation done right

### Lesson 04 Notes

- Implementing cool new pattern to get the power of `enums` without using `enum` type

```typescript
export const FakeEnum = {
  Key1: 'value1'
  Key2: 'value2'
} as const

export type FakeEnumType =  typeof FakeEnum[keyof typeof FakeEnum]
```
