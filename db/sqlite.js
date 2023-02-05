import { Sequelize } from 'sequelize'
const db_Conect = new Sequelize({
    dialect: 'sqlite',
    storage: 'db_sqlite'
})
export const db_seqlise_Generar = async () => {
    await db_sqlite.authenticate()
    //await db_sqlite.sync({ force: true })
}
export default db_Conect
