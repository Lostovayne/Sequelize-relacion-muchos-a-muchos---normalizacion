// Importar Sequelize
const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const {
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_DIALECT,
} = process.env;

// Inicializar Sequelize
const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: DATABASE_DIALECT,
    }
);

// Definir el modelo Cliente
class Cliente extends Model {}
Cliente.init(
    {
        nombre: DataTypes.STRING,
        direccion: DataTypes.STRING,
    },
    { sequelize, modelName: "cliente" }
);

// Definir el modelo Producto
class Producto extends Model {}
Producto.init(
    {
        nombre: DataTypes.STRING,
        codigo: DataTypes.STRING,
    },
    { sequelize, modelName: "producto" }
);

// Definir la relación entre Cliente y Producto
Cliente.belongsToMany(Producto, { through: "Compra" });
Producto.belongsToMany(Cliente, { through: "Compra" });

// Sincronizar los modelos con la base de datos
sequelize
    .sync()
    .then(() => {
        console.log("Modelos sincronizados con la base de datos");
    })
    .catch((error) => {
        console.error(
            "Error al sincronizar los modelos con la base de datos:",
            error
        );
    });
