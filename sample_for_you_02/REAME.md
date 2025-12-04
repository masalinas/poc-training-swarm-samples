# Description

- Crear un servicio de compose para desplegar wordpress con mysql.
- Quiero guardar el estado de la base de datos en un volumen
- Quiero guardar el estado de wordpress en otro volumen
- Crear un docker compose con los dos servicios y los volumenes.
- Probar los dos servicios en local y ver que funcionan
- Borrar recursos de docker locales para no dejar basura.
- Crear un cluster de swarm o utilizar uno ya existente.
- Modificar el servicio de compose para que pueda ser desplegado como stack en swarm. Escoger las replicas a usar
- Subir los recursos del servicio de stack al manager.
- Desplegar el stack en swager
- Probar que se puede acceder al mismo desde el navegador
- Escalar el stack, monitorizar los servicios, tasks.
- Finalmente borrar el stack