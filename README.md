# 🚀 API Documentation

---

## 📌 Instrucciones para abrir la colección en Postman

1. 🔹 **Abre Postman**.
2. 🔹 Ve a la pestaña **"Import"** en la esquina superior izquierda.
3. 🔹 Selecciona **"Link"** o **"File"** para importar la colección JSON.
4. 🔹 Si usas un **archivo**, carga el archivo JSON correspondiente.
5. 🔹 Si usas un **enlace**, pégalo y haz clic en **"Continue"**.
6. 🔹 Después de la importación, podrás ver los **endpoints organizados** en la colección.
7. 🔹 Configura las **variables de entorno** si es necesario (por ejemplo, `base_url`).
8. 🔹 Ejecuta los **endpoints** según sea necesario.

---

## 🌍 API Endpoints

### 🏢 Empresas

#### ➕ Crear una empresa
**🟢 POST** `http://localhost:3001/cooperex/v1/empresas/empresas`

📥 **Request Body:**
```json
{
  "name": "Tech Innovators",
  "impactLevel": "LOW",
  "category": "TECHNOLOGY",
  "startDate": "2014-06-15",
  "description": "A company focused on innovative tech solutions.",
  "owner": "angel"
}
```

#### ✏️ Actualizar una empresa
**🟡 PUT** `http://localhost:3001/cooperex/v1/empresas/empresas`

📥 **Request Body:**
```json
{
  "name": "Tech Innovators Updated",
  "impactLevel": "MEDIUM",
  "category": "FINANCE",
  "startDate": "2016-07-20",
  "description": "An updated description for the company.",
  "owner": "javier"
}
```

#### 🔍 Obtener una empresa por ID
**🔵 GET** `http://localhost:3001/cooperex/v1/empresas/empresas/67c11ab7ae5ce13c36aa254c`

---

## 🔑 Autenticación

### 🔐 Login
**🟠 POST** `http://localhost:3001/cooperex/v1/auth/login`

📥 **Request Body:**
```json
{
  "email": "admin@example.com",
  "username": "admin",
  "password": "adminpassword"
}
```

