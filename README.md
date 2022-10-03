<p align="center">
  <img src="https://github.com/acmesquita/nookmoney/blob/main/public/assets/logo.png" alt="nookmoney" width="350px" />
</p>

---

System to manager your money with simples interations

### Requirements

- [x] Authentication and Authorizarion
- [x] Register your banks
- [x] Register your bank account balance
- [x] Register your charges
- [ ] Monitor bank information using chats
- [ ] Monitor your charges and payouts

### Getting Started

Installation of this project's dependencies is recommended to be with `npm`

```bash
npm install
```

### Running project

**Pre-install**

This project need `docker` installed successful.

> Initialize database

```bash
docker compose up
```
```
npx prisma db push
```

> Start application

```bash
npm run dev

```

Access http://localhost:3000 :tada
