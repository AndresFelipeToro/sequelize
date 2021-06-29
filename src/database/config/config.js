module.exports = {
  "development": {
    "username": "tzlwhkik", // ← Usuario de la DB
    "password": "Iv8a1QyDDybjQB6BIGquYsMoOtD_MPvR", // ← Contraseña del usuario de la DB
    "database": "tzlwhkik", // ← Nombre de la DB previamente creada
    "host": "kashin.db.elephantsql.com",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
