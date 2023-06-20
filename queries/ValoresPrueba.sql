-- Escuelas

INSERT INTO escuelas (
  cod_escuela, 
  nombre_esc, 
  fecha_creacion
) VALUES 
  ('ESC1', 'Escuela de Ingenieria', '1953-10-24'),
  ('ESC2', 'Escuela de Derecho', '1953-10-24'),
  ('ESC3', 'Escuela de Comunicacion Social', '1953-10-24'),
  ('ESC4', 'Escuela de Administracion', '1953-10-24');

-- Profesores

INSERT INTO profesores (
  cedula_profesor, 
  nombre_p, 
  direccion_p, 
  telefono_p, 
  categoria, 
  dedicacion, 
  fecha_ingreso, 
  fecha_egreso, 
  status_p
) VALUES
  ('12345678', 'Juan Perez', 'Av. 1', '04140000000', 'A', 'TC', '2001-01-01', NULL, 'A'),
  ('87654321', 'Maria Gomez', 'Av. 2', '04240000000', 'I', 'MT', '2022-01-01', NULL, 'R'),
  ('13579246', 'Pedro Rodriguez', 'Av. 3', '04160000000', 'G', 'MT', '2002-01-01', NULL, 'P'),
  ('45678901', 'Luisa Hernandez', 'Av. 4', '04140000001', 'S', 'TV', '2002-01-01', NULL, 'J'),
  ('56789012', 'Jorge Perez', 'Av. 5', '04240000001', 'T', 'MT', '2002-01-01', NULL, 'A'),
  ('10000006', 'Carlos Gomez', 'Av. 6', '04140000002', 'A', 'TC', '2002-01-01', NULL, 'A'),
  ('10000007', 'Ana Rodriguez', 'Av. 7', '04240000002', 'I', 'MT', '2023-02-27', NULL, 'R'),
  ('10000008', 'Sofia Hernandez', 'Av. 8', '04160000002', 'G', 'TV', '2002-01-01', NULL, 'P'),
  ('10000009', 'Miguel Perez', 'Av. 9', '04140000003', 'S', 'MT', '2002-01-01', NULL, 'J'),
  ('10000010', 'Laura Garcia', 'Av. 10', '04240000003', 'T', 'MT', '2002-01-01', NULL, 'A'),
  ('10000011', 'Javier Rodriguez', 'Av. 11', '04140000004', 'A', 'TC', '2002-01-01', NULL, 'A'),
  ('10000012', 'Isabel Hernandez', 'Av. 12', '04240000004', 'I', 'MT', '2002-05-10', NULL, 'R'),
  ('10000013', 'Jorge Gomez', 'Av. 13', '04160000004', 'I', 'TV', '2022-01-01', NULL, 'P'),
  ('10000014', 'Luis Perez', 'Av. 14', '04140000005', 'I', 'MT', '2022-01-01', NULL, 'J'),
  ('10000015', 'Carla Garcia', 'Av. 15', '04240000005', 'T', 'MT', '2002-01-01', NULL, 'A'),
  ('10000016', 'Mario Perez', 'Av. 14', '04140000015', 'I', 'MT', '2000-01-01', '2012-01-01', 'R'),
  ('10000017', 'Leonardo Meza', 'Av. 15', '04240000016', 'T', 'MT', '2002-01-01', '2012-01-01', 'R'),
  ('10000018', 'Felix Gonzales', 'Av. 15', '04240000018', 'T', 'MT', '2002-01-01', '2012-01-01', 'R');

-- Asignaturas

INSERT INTO asignaturas (
  cod_asignatura, 
  nombre_asig, 
  uc, 
  semestre, 
  taxonomia, 
  status_a
) VALUES 
  ('ASG101', 'Algebra y Trigonometría', 5, 1, 4, 'V'),
  ('ASG102', 'Cálculo Diferencial', 6, 2, 4, 'V'),
  ('ASG103', 'Cálculo Integral', 5, 3, 4, 'V'),
  ('ASG104', 'Cálculo Vectorial', 5, 4, 4, 'V'),
  ('ASG105', 'Redes de Comunicación', 6, 6, 9, 'V'),
  ('ASG106', 'Arquitectura del Computador', 7, 6, 9, 'V'),
  ('ASG107', 'Ciberseguridad', 5, 7, 9, 'V'),
  ('ASG108', 'Inteligencia Artificial', 4, 7, 9, 'E'),
  ('ASG109', 'Computación en la Nube', 5, 8, 9, 'E'),
  ('ASG110', 'Ingeniería de Requisitos', 6, 8, 9, 'E');

-- Estudiantes

INSERT INTO estudiantes (
  cedula_est, 
  nombre_est, 
  cod_escuela, 
  direccion_est, 
  telefono_est, 
  fecha_nac, 
  status_est
) VALUES 
  ('12345679', 'Ana Perez', 'ESC1', 'Av. 4', '04140000001', '2000-01-01', 'A'),
  ('87654322', 'Luis Rodriguez', 'ESC2', 'Av. 5', '04240000001', '2001-01-01', 'A'),
  ('13579247', 'Carlos Gonzalez', 'ESC1', 'Av. 6', '04160000001', '2000-01-01', 'A'),
  ('45678901', 'Sofia Martinez', 'ESC1', 'Av. 4', '04260000000', '2002-01-01', 'A'),
  ('56789012', 'Luisa Garcia', 'ESC1', 'Av. 5', '04180000000', '2003-01-01', 'A'),
  ('22222221', 'Sofia Rodriguez', 'ESC1', 'Av. 4', '04140000004', '2000-01-01', 'A'),
  ('22222222', 'Alejandro Perez', 'ESC2', 'Av. 5', '04240000003', '2001-01-01', 'N'),
  ('22222223', 'Jose Vielma', 'ESC1', 'Av. 6', '04160000005', '2000-01-01', 'R'),
  ('22222224', 'Sebastian Martinez', 'ESC2', 'Av. 4', '04260000008', '2002-01-01', 'N'),
  ('22222225', 'Luisa Morales', 'ESC1', 'Av. 5', '04180000009', '2003-01-01', 'R'),
  ('22222226', 'Andres Martinez', 'ESC2', 'Av. 4', '04260000012', '2002-01-01', 'N'),
  ('22222227', 'Luis Garcia', 'ESC1', 'Av. 5', '04180000005', '2003-01-01', 'R'),
  ('22222228', 'Jesus Ortiz', 'ESC2', 'Av. 4', '04260000013', '2002-01-01', 'R'),
  ('22222229', 'Valentino Garcia', 'ESC1', 'Av. 5', '04180000014', '2003-01-01', 'N');

-- Pagos Realizados

INSERT INTO pagos_realizados (
  id_estudiante, 
  fecha_emision, 
  tipo_pago, 
  tipo_moneda, 
  monto
) VALUES 
  (1, '2021-01-01', 'T', 'B', 100.00),
  (2, '2021-01-01', 'J', 'D', 200.00),
  (3, '2021-01-01', 'D', 'P', 300.00);


-- Secciones

INSERT INTO secciones (
  nrc, 
  cod_asignatura, 
  lapso, 
  cedula_profesor
) VALUES 
  ('001', 'ASG101', '2021-15', '12345678'),
  ('002', 'ASG102', '2021-15', '87654321'),
  ('003', 'ASG103', '2021-25', '13579246'),
  ('004', 'ASG108', '2021-15', '10000006'),
  ('005', 'ASG108', '2021-15', '10000009'),
  ('006', 'ASG109', '2021-15', '10000010'),
  ('007', 'ASG108', '2021-25', '10000009'),
  ('008', 'ASG109', '2021-25', '10000010'),
-- valores de prueba para la 7
  ('009', 'ASG101', '2012-15', '10000009'),
  ('010', 'ASG102', '2012-25', '10000010'),
  ('011', 'ASG103', '2013-15', '10000009'),
  ('012', 'ASG104', '2013-25', '10000009'),
  ('013', 'ASG105', '2014-15', '10000010'),
  ('014', 'ASG106', '2014-25', '10000009'),
  ('015', 'ASG107', '2015-15', '10000009'),
  ('016', 'ASG108', '2016-15', '10000010'),
  ('017', 'ASG109', '2016-25', '10000009'),
  ('019', 'ASG104', '2017-15', '10000009'),
  ('020', 'ASG103', '2017-25', '10000010'),
  ('021', 'ASG102', '2018-15', '10000009'),
-- valores de prueba para la 8
  ('022', 'ASG104', '2023-25', '10000009'),
  ('023', 'ASG103', '2023-25', '10000010'),

  ('024', 'ASG103', '2010-15', '10000016'),
  ('025', 'ASG105', '2010-25', '10000017'),
  ('026', 'ASG102', '2011-15', '10000018');

-- Calificaciones

INSERT INTO calificaciones (
  id_estudiante, 
  nrc, 
  calificacion, 
  status_n
) VALUES 
  (1, '002', 15, 'A'),
  (1, '005', 1, 'R'),
  (1, '007', 8, 'R'),
  (1, '008', 20, 'A'),

  (2, '001', 20, 'A'),
  (2, '002', 18, 'A'),
  (2, '007', 20, 'A'),
  (2, '008', 18, 'A'),

  (3, '003', 18, 'X'),
  (3, '006', 7, 'R'),
  (3, '007', 18, 'A'),
  (3, '008', 20, 'A'),

  (4, '004', 4, 'R'),
  (4, '006', 8, 'R'),
  (4, '007', 3, 'R'),
  (4, '008', 9, 'R'),

  (5, '001', 18, 'A'),
  (5, '002', 20, 'A'),
  (5, '003', 18, 'A'),

  (6, '009', 7, 'R'),
  (6, '010', 5, 'R'),
  (6, '011', 4, 'R'),
  (6, '012', 8, 'R'),
  (6, '013', 9, 'R'),
  (6, '014', 3, 'R'),
  (6, '015', 18, 'A'),
  (6, '016', 20, 'A'),
  (6, '017', 18, 'A'),
  (6, '019', 15, 'A'),
  (6, '020', 13, 'A'),


  (2, '009', 7, 'R'),
  (2, '010', 5, 'R'),
  (2, '011', 4, 'R'),
  (2, '012', 8, 'R'),
  (2, '013', 9, 'R'),
  (2, '014', 3, 'R'),
  (2, '015', 18, 'R'),
  (2, '016', 20, 'A'),
  (2, '017', 18, 'A'),
  (2, '019', 15, 'A'),
  (2, '020', 13, 'A'),

  (3, '009', 7, 'R'),
  (3, '010', 5, 'R'),
  (3, '011', 4, 'R'),
  (3, '012', 8, 'R'),
  (3, '013', 9, 'R'),
  (3, '014', 3, 'R'),
  (3, '015', 2, 'R'),
  (3, '016', 1, 'R'),
  (3, '017', 18, 'A'),
  (3, '019', 15, 'A'),
  (3, '020', 13, 'A'),

  (5, '008', 1, 'R');
