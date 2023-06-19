-- Domain Definitions

CREATE DOMAIN dom_cedulas VARCHAR(8) NOT NULL;
CREATE DOMAIN dom_nombre VARCHAR(24) NOT NULL;
CREATE DOMAIN dom_fechas DATE;

--

CREATE TABLE profesores(
  cedula_profesor dom_cedulas,
  nombre_p dom_nombre,
  direccion_p TEXT NOT NULL,
  telefono_p VARCHAR(11) DEFAULT NULL,
  categoria CHAR(1) NOT NULL,
  dedicacion CHAR(2) NOT NULL,
  fecha_ingreso dom_fechas DEFAULT CURRENT_DATE,
  fecha_egreso dom_fechas DEFAULT NULL,
  status_p CHAR(1) NOT NULL
);

ALTER TABLE profesores
  ADD PRIMARY KEY (cedula_profesor),
  ADD CONSTRAINT uk_telefono_p UNIQUE (telefono_p),
  ADD CONSTRAINT v_fecha_egreso CHECK (fecha_egreso > fecha_ingreso),
  ADD CONSTRAINT v_categoria CHECK (categoria IN ('A', 'I', 'G', 'S', 'T')),
  ADD CONSTRAINT v_dedicacion CHECK (dedicacion IN ('TC', 'MT', 'TV')),
  ADD CONSTRAINT v_status_p CHECK (status_p IN ('A', 'R', 'P', 'J'));

  --

CREATE TABLE asignaturas(
  cod_asignatura VARCHAR(16),
  nombre_asig VARCHAR(64) NOT NULL,
  uc SMALLINT NOT NULL,
  semestre SMALLINT NOT NULL,
  taxonomia SMALLINT NOT NULL,
  status_a CHAR(1) NOT NULL
);

ALTER TABLE asignaturas
  ADD PRIMARY KEY (cod_asignatura),
  ADD CONSTRAINT uk_nombre_asig UNIQUE (nombre_asig),
  ADD CONSTRAINT v_uc_range CHECK (uc >= 0 AND uc <= 9),
  ADD CONSTRAINT v_semestre_range CHECK (semestre >= 0 AND semestre <= 9),
  ADD CONSTRAINT v_taxonomia_range CHECK (taxonomia >= 0 AND taxonomia <= 9),
  ADD CONSTRAINT v_status_a CHECK (status_a IN ('V', 'R', 'E'));

CREATE INDEX idx_nombre_asig ON asignaturas(nombre_asig);
--

CREATE TABLE escuelas(
  cod_escuela VARCHAR(16),
  nombre_esc VARCHAR(32) UNIQUE NOT NULL,
  fecha_creacion dom_fechas DEFAULT CURRENT_DATE
);

ALTER TABLE escuelas
  ADD PRIMARY KEY (cod_escuela),
  ADD CONSTRAINT uk_nombre_esc UNIQUE (nombre_esc);

CREATE INDEX idx_nombre_esc ON escuelas(nombre_esc);

--

CREATE TABLE estudiantes(
  id_estudiante INTEGER GENERATED ALWAYS AS IDENTITY,
  cedula_est dom_cedulas,
  nombre_est dom_nombre,
  cod_escuela VARCHAR(16) NOT NULL,
  direccion_est TEXT NOT NULL,
  telefono_est VARCHAR(11) DEFAULT NULL,
  fecha_nac dom_fechas NOT NULL,
  status_est CHAR(1) NOT NULL
);

ALTER TABLE estudiantes
  ADD PRIMARY KEY (id_estudiante),
  ADD CONSTRAINT uk_cedula_est UNIQUE (cedula_est),
  ADD CONSTRAINT uk_telefono_est UNIQUE (telefono_est),
  ADD CONSTRAINT cod_escuela_fk FOREIGN KEY (cod_escuela) REFERENCES escuelas(cod_escuela) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT v_status_est CHECK (status_est IN ('A', 'R', 'N', 'E'));
  -- ADD CONSTRAINT v_status_est CHECK (
  --   status_est IN ('Activo', 'Retirado', 'No inscrito', 'Egresado')
  -- );
   
    

CREATE INDEX idx_nombre_est_cod_escuela ON estudiantes(nombre_est, cod_escuela);

--

CREATE TABLE pagos_realizados(
  num_factura INTEGER GENERATED ALWAYS AS IDENTITY,
  id_estudiante INTEGER NOT NULL,
  fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo_pago CHAR(1) NOT NULL,
  tipo_moneda CHAR(1) NOT NULL,
  monto DECIMAL NOT NULL
);

ALTER TABLE pagos_realizados
  ADD PRIMARY KEY (num_factura),
  ADD CONSTRAINT id_estudiante_fk FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT v_tipo_pago CHECK (tipo_pago IN ('T', 'J', 'D')),
  ADD CONSTRAINT v_tipo_moneda CHECK (tipo_moneda IN ('B', 'D', 'P')),
  ADD CONSTRAINT v_monto CHECK (monto > 0);

CREATE INDEX idx_id_estudiante on pagos_realizados(id_estudiante);

--

CREATE TABLE secciones(
  nrc VARCHAR(16),
  cod_asignatura VARCHAR(16) NOT NULL,
  lapso VARCHAR(8) NOT NULL,
  cedula_profesor VARCHAR(8)
);

ALTER TABLE secciones
  ADD PRIMARY KEY (nrc),
  ADD CONSTRAINT cod_asignatura_fk FOREIGN KEY (cod_asignatura) REFERENCES asignaturas(cod_asignatura) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cedula_profesor_fk FOREIGN KEY (cedula_profesor) REFERENCES profesores(cedula_profesor) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE calificaciones(
  id_estudiante INTEGER NOT NULL,
  nrc VARCHAR(16) NOT NULL,
  calificacion SMALLINT NOT NULL,
  status_n CHAR(1) NOT NULL
);

ALTER TABLE calificaciones
  ADD PRIMARY KEY (id_estudiante, nrc),
  ADD CONSTRAINT v_calificacion_range CHECK (calificacion >= 0 AND calificacion <= 20),
  ADD CONSTRAINT id_estudiante_fk FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante)
    ON DELETE RESTRICT 
     ON UPDATE CASCADE,
  ADD CONSTRAINT nrc_fk FOREIGN KEY (nrc) REFERENCES secciones(nrc) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT v_status_n CHECK (status_n IN ('A', 'R', 'E', 'X'));
