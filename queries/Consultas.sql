-- (2)
-- Listar los profesores que ingresaron el año pasado, con categoría “Instructor” a
-- dedicación “Medio Tiempo”.. El listado debe contener : Cédula, Nombre del profesor
-- y fecha de ingreso y debe estar ordenado ascendentemente por fecha de ingreso y
-- nombre del profesor.

SELECT 
  cedula_profesor AS cedula, 
  nombre_p AS profesor, 
  fecha_ingreso
FROM profesores
WHERE (
  (EXTRACT(YEAR FROM fecha_ingreso) = EXTRACT(YEAR FROM CURRENT_DATE) - 1) AND
  (categoria IN ('I') AND dedicacion IN ('MT'))
)
ORDER BY fecha_ingreso, nombre_p;

-- (3)
-- Listar los profesores (Cédula y Nombre) que han dictado una asignatura de nombre
-- dado, en un lapso también dado. El listado debe estar ordenado ascendentemente
-- por nombre del profesor.

-- SELECT 
--   cedula_profesor AS cedula, 
--   nombre_p AS profesor
-- FROM profesores
-- WHERE cedula_profesor IN (
--   SELECT cedula_profesor 
--   FROM secciones 
--   WHERE (
--     lapso = '202115' AND cod_asignatura IN (
--       SELECT cod_asignatura
--       FROM asignaturas
--       WHERE (
--         nombre_asig = 'Inteligencia Artificial'
--       )
--     )
--   )
-- )
-- ORDER BY profesor;

-- Haciendo uso de JOINS (Mejora)

SELECT 
  prof.cedula_profesor AS cedula, 
  prof.nombre_p AS profesor
FROM profesores AS prof
INNER JOIN secciones AS sec ON prof.cedula_profesor = sec.cedula_profesor
INNER JOIN asignaturas AS asg ON sec.cod_asignatura = asg.cod_asignatura
WHERE (asg.nombre_asig = 'Inteligencia Artificial' AND sec.lapso = '202115')
ORDER BY profesor;

-- (4)
-- Listar, para cada Escuela, la cantidad de estudiantes activos, no inscritos y
-- retirados. El listado debe contener el código y nombre de la Escuela así como
-- cantidad de activos, no inscritos y retirados, y un total general de estudiantes (suma
-- de activos, no inscritos y retirados). Debe estar ordenado por total de estudiantes
-- de mayor a menor.

SELECT 
  esc.cod_escuela AS codigo, 
  esc.nombre_esc AS escuela, 
  COUNT(CASE WHEN est.status_est IN ('A') THEN 1 ELSE NULL END) AS activos, 
  COUNT(CASE WHEN est.status_est IN ('N') THEN 1 ELSE NULL END) AS no_inscritos,
  COUNT(CASE WHEN est.status_est IN ('R') THEN 1 ELSE NULL END) AS retirados,
  COUNT(CASE WHEN est.status_est IN ('A', 'N', 'R') THEN 1 ELSE NULL END) AS total_estudiantes
FROM escuelas AS esc
INNER JOIN estudiantes AS est ON esc.cod_escuela = est.cod_escuela
GROUP BY esc.cod_escuela, esc.nombre_esc
ORDER BY total_estudiantes DESC;

-- (5)
-- Listar los estudiantes que hayan cursado alguna asignatura de Taxonomía 9 el lapso
-- pasado y la hayan reprobado. El listado debe contener el Id y Nombre del estudiante,
-- el nombre de la asignatura y la calificación obtenida. Debe ordenar el listado por Id
-- del estudiante.

SELECT 
  est.id_estudiante AS id_est,
  est.nombre_est AS estudiante,
  asg.nombre_asig AS asignatura,
  cal.calificacion AS calificacion
FROM estudiantes AS est
INNER JOIN calificaciones AS cal ON est.id_estudiante = cal.id_estudiante
INNER JOIN secciones AS sec ON cal.nrc = sec.nrc
INNER JOIN asignaturas AS asg ON sec.cod_asignatura = asg.cod_asignatura
WHERE 
  sec.lapso = (
    SELECT DISTINCT lapso 
    FROM secciones 
    ORDER BY lapso DESC 
    LIMIT 1 OFFSET 1
  ) AND 
  asg.taxonomia = 9 AND cal.status_n IN ('R')
ORDER BY est.id_estudiante;
  
-- (6)
-- Listar las asignaturas (Código, Nombre y Semestre) que ya están eliminada del
-- catálogo y la cantidad de estudiantes que la aprobaron. El listado debe estar
-- ordenado por semestre y la cantidad de estudiantes, ambos en forma descendente.

SELECT 
  asg.semestre, 
  asg.cod_asignatura AS codigo, 
  asg.nombre_asig AS asignatura, 
  COUNT(*) AS estudiantes_aprobados
FROM asignaturas AS asg
INNER JOIN secciones AS sec ON asg.cod_asignatura = sec.cod_asignatura
INNER JOIN calificaciones AS cal ON sec.nrc = cal.nrc
WHERE asg.status_a IN ('E') AND cal.status_n IN ('A')
GROUP BY asg.cod_asignatura
ORDER BY semestre DESC, estudiantes_aprobados DESC;

-- (7)
-- Liste los estudiantes activos que hayan reprobado más de 5 asignaturas distintas y
-- que tengan más de 5 años de estudios. La salida debe mostrar : Id, nombre de
-- estudiante, total de asignaturas cursadas, total de asignaturas reprobadas ,
-- ordenados por total de asignaturas reprobadas en forma descendente.

-- ERROR

-- SELECT 
--   est.id_estudiante AS id, 
--   est.nombre_est AS estudiante,
--   COUNT(DISTINCT sec.cod_asignatura) AS asignaturas_cursadas,
--   COUNT(
--     DISTINCT CASE WHEN cal.status_n = 'R' THEN sec.cod_asignatura ELSE NULL END
--   ) AS asignaturas_reprobadas
-- FROM estudiantes AS est
-- INNER JOIN calificaciones AS cal ON est.id_estudiante = cal.id_estudiante
-- INNER JOIN secciones AS sec ON cal.nrc = sec.nrc
-- WHERE (
--     (SELECT COUNT(DISTINCT sec.lapso) 
--     FROM sec) > 10 
--   AND 
--     (SELECT COUNT(DISTINCT cod_asignatura)
--     FROM secciones
--     WHERE nrc IN (
--       SELECT cal.nrc
--       FROM cal
--       WHERE cal.status_n IN ('R')
--     )) > 5
-- )
-- GROUP BY est.id_estudiante
-- ORDER BY asignaturas_reprobadas DESC;

SELECT 
  est.id_estudiante AS id, 
  est.nombre_est AS estudiante,
  COUNT(DISTINCT sec.cod_asignatura) AS asignaturas_cursadas,
  COUNT(
    DISTINCT CASE WHEN cal.status_n = 'R' THEN sec.cod_asignatura ELSE NULL END
  ) AS asignaturas_reprobadas
FROM estudiantes AS est
INNER JOIN calificaciones AS cal ON est.id_estudiante = cal.id_estudiante
INNER JOIN secciones AS sec ON cal.nrc = sec.nrc
GROUP BY est.id_estudiante
HAVING (
  COUNT(DISTINCT sec.lapso) > 10
  AND 
  COUNT(DISTINCT CASE WHEN cal.status_n = 'R' THEN sec.cod_asignatura ELSE NULL END) > 5
)
ORDER BY asignaturas_reprobadas DESC;

-- (8)
-- Actualizar el Estatus del profesor a “Retirado” y la fecha de egreso con “31-03-2023”,
-- si no tiene carga académica (no tiene asignada al menos un NRC) en el lapso 2023-
-- 25.

UPDATE profesores
SET status_p = 'R', fecha_egreso = '31-03-2023'
WHERE (
  cedula_profesor NOT IN (
    SELECT DISTINCT cedula_profesor
    FROM secciones
    WHERE lapso = '202325'
  )
  AND fecha_egreso IS NULL;
);

-- (9)
-- Eliminar los Profesores cuya Estatus sea “Retirado” y la fecha de egreso sea mayor
-- a 10 años, manteniendo la consistencia de la base de datos, y registrando todos los
-- datos contenidos en la tabla Profesores, en un archivo histórico denominado
-- HistoricoProfesor.

-- crear valores de prueba para profesores de 2012 para abajo y asignarle secciones esos años    

CREATE TABLE historicoProfesores (
  cedula_profesor dom_cedulas,
  nombre_p dom_nombre,
  direccion_p VARCHAR(32) NOT NULL,
  telefono_p VARCHAR(11) DEFAULT NULL,
  fecha_ingreso dom_fechas DEFAULT CURRENT_TIMESTAMP,
  fecha_egreso dom_fechas DEFAULT NULL
);

ALTER TABLE historicoProfesores
  ADD PRIMARY KEY (cedula_profesor),
  ADD CONSTRAINT v_fecha_egreso CHECK (fecha_egreso > fecha_ingreso);

INSERT INTO historicoProfesores(
  cedula_profesor,
  nombre_p,
  direccion_p,
  telefono_p,
  fecha_ingreso,
  fecha_egreso
)
SELECT 
  cedula_profesor, 
  nombre_p, direccion_p, 
  telefono_p, 
  fecha_ingreso, 
  fecha_egreso
FROM profesores
WHERE (
  status_p IN ('R') 
  AND 
  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM fecha_egreso) > 0
);

ALTER TABLE secciones
  ADD COLUMN profesor_egresado VARCHAR(8) DEFAULT NULL,
  ADD CONSTRAINT profesor_egresado_fk FOREIGN KEY (profesor_egresado) REFERENCES historicoProfesores(cedula_profesor)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

-- UPDATE secciones
-- SET 
--   profesor_egresado = cedula_profesor,
--   cedula_profesor = NULL
-- WHERE cedula_profesor IN (
--   SELECT cedula_profesor
--   FROM profesores
--   WHERE (
--     status_p IN ('R') 
--     AND 
--     EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM fecha_egreso) > 10
--   )
-- );

UPDATE secciones AS sec
SET 
  profesor_egresado = prof.cedula_profesor,
  cedula_profesor = NULL
FROM profesores AS prof
WHERE (
  prof.status_p = 'R'
  AND 
  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM fecha_egreso) > 10
  AND sec.cedula_profesor = prof.cedula_profesor
);

DELETE FROM profesores
WHERE (
  status_p IN ('R') 
  AND 
  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM fecha_egreso) > 10
);