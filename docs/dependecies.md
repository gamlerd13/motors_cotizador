## List of dependencies

### Auth

1. Next-Auth
2. Prisma
3. Prisma-adapter (This a adapter to next-auth with prisma orm)
4. Prisma-client (This dependencies isntall itself automaticcly when prisma migrate)

### Style

1. Tailwindcss
2. Next-ui (Principal library to use components)
3. React-icons (There are a lot of icons)

### Other

1. Axios
2. bcrypt-ts (to typescript c'z bcryt does not work good)
3. Sonner (to show alert and messages in popups)
4. Prettier
5. eslint

## Prisma comands

1. **Inicializar Prisma**:
   Inicializa Prisma en tu proyecto si aún no lo has hecho:
   ```sh
   npx prisma init --datasource-provider sqlite
   ```

### Migraciones

3. **Crear una Migración**:
   Después de hacer cambios en tu archivo `schema.prisma`, crea una nueva migración:

   ```sh
   npx prisma migrate dev --name <nombre-de-la-migración>
   ```

   Este comando creará una nueva migración en la carpeta `prisma/migrations` y aplicará la migración a tu base de datos.

4. **Aplicar Migraciones**:
   Si tienes migraciones pendientes, puedes aplicarlas a tu base de datos:

   ```sh
   npx prisma migrate deploy
   ```

5. **Revertir una Migración**:
   Para revertir la última migración (útil durante el desarrollo):
   ```sh
   npx prisma migrate reset
   ```
   Nota: Este comando borrará y recreará la base de datos, perdiendo todos los datos actuales. Úsalo con precaución.

### Sincronización y Generación de Cliente

6. **Sincronizar el Esquema con la Base de Datos**:
   Sincroniza el esquema de Prisma con la base de datos sin crear una migración (útil para desarrollo rápido):

   ```sh
   npx prisma db push
   ```

7. **Generar el Cliente de Prisma**:
   Genera el cliente de Prisma basado en el esquema actual. Esto es necesario cada vez que cambias el archivo `schema.prisma`:
   ```sh
   npx prisma generate
   ```
