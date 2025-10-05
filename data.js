// Datos extraídos del script SQL
const data = {
    cursos: [
        {
            id: 1,
            nombre: '4º Educación Primaria',
            nivel: 'Primaria',
            comunidad: 'Comunidad de Madrid',
            normativa: 'Decreto 61/2022 BOCAM'
        }
    ],
    asignaturas: [
        {
            id: 1,
            id_curso: 1,
            nombre: 'Matemáticas',
            codigo: 'MAT-4EP',
            descripcion: 'Área de Matemáticas para 4º de Educación Primaria según Decreto 61/2022 BOCAM'
        }
    ],
    unidades: [
        {
            id: 1,
            id_asignatura: 1,
            numero: 1,
            titulo: 'Sistemas de numeración: números naturales y números romanos',
            objetivo: 'Ampliar el conocimiento del sistema de numeración decimal hasta las centenas de millar y conocer el sistema de numeración romano, comprendiendo las diferencias entre ambos sistemas.',
            trimestre: 1,
            saberes: [
                'Números naturales hasta el 999.999',
                'Lectura y escritura de números de seis y siete cifras',
                'Valor posicional: unidades, decenas, centenas, millares',
                'Comparación y ordenación de números grandes',
                'Composición y descomposición numérica',
                'El sistema de numeración romano: reglas, símbolos y aplicaciones'
            ]
        },
        {
            id: 2,
            id_asignatura: 1,
            numero: 2,
            titulo: 'Suma y resta de números naturales',
            objetivo: 'Consolidar los algoritmos de suma y resta con números de varias cifras, desarrollando estrategias de cálculo mental y estimación para resolver situaciones problemáticas cotidianas.',
            trimestre: 1,
            saberes: [
                'Estrategias de cálculo mental con sumas y restas',
                'Algoritmo de la suma con llevadas',
                'Algoritmo de la resta con llevadas',
                'Propiedades de la suma (conmutativa y asociativa)',
                'Resolución de problemas de una y dos operaciones',
                'Estimación de resultados y comprobación'
            ]
        },
        {
            id: 3,
            id_asignatura: 1,
            numero: 3,
            titulo: 'La multiplicación',
            objetivo: 'Dominar el algoritmo de la multiplicación y sus propiedades, aplicándolo en situaciones de la vida cotidiana y desarrollando el cálculo mental.',
            trimestre: 1,
            saberes: [
                'Tablas de multiplicar (repaso y consolidación)',
                'Multiplicación por números de una, dos y tres cifras',
                'Propiedades de la multiplicación (conmutativa, asociativa y distributiva)',
                'Multiplicación por la unidad seguida de ceros',
                'Doble y triple de un número',
                'Estimación de productos y resolución de problemas'
            ]
        },
        {
            id: 4,
            id_asignatura: 1,
            numero: 4,
            titulo: 'La división',
            objetivo: 'Comprender el concepto de división y sus términos, dominando el algoritmo con divisores de una y dos cifras, y aplicándolo en la resolución de problemas.',
            trimestre: 1,
            saberes: [
                'División como reparto y agrupación',
                'Términos de la división: dividendo, divisor, cociente y resto',
                'División exacta y división inexacta',
                'Divisiones con divisor de una y dos cifras',
                'Mitad, tercio y cuarto de un número',
                'Problemas de división en contextos reales'
            ]
        },
        {
            id: 5,
            id_asignatura: 1,
            numero: 5,
            titulo: 'Práctica de las cuatro operaciones',
            objetivo: 'Integrar las cuatro operaciones básicas, comprendiendo el orden de realización y aplicándolas en la resolución de problemas complejos del entorno cercano.',
            trimestre: 2,
            saberes: [
                'Operaciones combinadas (jerarquía de operaciones)',
                'Uso del paréntesis en operaciones',
                'Resolución de problemas de dos o más operaciones',
                'Estrategias de cálculo mental con las cuatro operaciones',
                'Estimación y comprobación de resultados',
                'Relaciones entre operaciones (inversa)'
            ]
        },
        {
            id: 6,
            id_asignatura: 1,
            numero: 6,
            titulo: 'Las fracciones',
            objetivo: 'Introducir el concepto de fracción como representación de partes de un todo, siendo capaz de leer, escribir, representar y comparar fracciones sencillas.',
            trimestre: 2,
            saberes: [
                'Concepto de fracción como parte de un todo',
                'Términos: numerador y denominador',
                'Lectura y escritura de fracciones',
                'Representación gráfica de fracciones',
                'Comparación de fracciones con igual denominador',
                'Fracciones equivalentes (iniciación)'
            ]
        },
        {
            id: 7,
            id_asignatura: 1,
            numero: 7,
            titulo: 'Los números decimales',
            objetivo: 'Comprender el sistema decimal de numeración ampliándolo a las décimas y centésimas, operando con números decimales en contextos de medida y monetarios.',
            trimestre: 2,
            saberes: [
                'Décimas y centésimas',
                'Lectura y escritura de números decimales',
                'Representación en la recta numérica',
                'Comparación y ordenación de decimales',
                'Relación entre fracciones decimales y números decimales',
                'Suma y resta de números decimales'
            ]
        },
        {
            id: 8,
            id_asignatura: 1,
            numero: 8,
            titulo: 'Medida de longitud, capacidad y masa',
            objetivo: 'Conocer las unidades de medida del Sistema Métrico Decimal, estableciendo equivalencias y utilizándolas en situaciones prácticas de medición.',
            trimestre: 2,
            saberes: [
                'Unidades del Sistema Métrico Decimal: metro, litro y gramo',
                'Múltiplos y submúltiplos de las unidades principales',
                'Relaciones entre unidades y conversiones',
                'Estimación de medidas',
                'Expresiones complejas e incomplejas',
                'Resolución de problemas con medidas'
            ]
        },
        {
            id: 9,
            id_asignatura: 1,
            numero: 9,
            titulo: 'Medida del tiempo y el dinero',
            objetivo: 'Desarrollar la competencia en la medida del tiempo y el manejo del dinero, realizando conversiones y operaciones en situaciones cotidianas.',
            trimestre: 3,
            saberes: [
                'Unidades de tiempo: hora, minuto y segundo',
                'Lectura del reloj analógico y digital',
                'Equivalencias entre unidades de tiempo',
                'El sistema monetario: euro y céntimo',
                'Operaciones con cantidades de dinero',
                'Problemas con tiempo y dinero en contextos reales'
            ]
        },
        {
            id: 10,
            id_asignatura: 1,
            numero: 10,
            titulo: 'Rectas, ángulos y figuras planas',
            objetivo: 'Identificar y clasificar elementos geométricos básicos, figuras planas y ángulos, reconociendo sus propiedades y elementos en el entorno próximo.',
            trimestre: 3,
            saberes: [
                'Elementos básicos: punto, recta, semirrecta y segmento',
                'Tipos de rectas: paralelas, secantes y perpendiculares',
                'Ángulos: elementos, tipos (recto, agudo, obtuso) y medida',
                'Polígonos: clasificación y elementos',
                'Triángulos: clasificación según lados y ángulos',
                'Cuadriláteros: tipos (cuadrado, rectángulo, rombo, trapecio)'
            ]
        },
        {
            id: 11,
            id_asignatura: 1,
            numero: 11,
            titulo: 'Perímetro, área y cuerpos geométricos',
            objetivo: 'Calcular el perímetro y área de figuras planas, e identificar cuerpos geométricos y sus elementos, iniciándose en el concepto de desarrollo plano.',
            trimestre: 3,
            saberes: [
                'Concepto de perímetro y su cálculo',
                'Concepto de área y unidades de superficie',
                'Cálculo de áreas por cuadrícula',
                'Cuerpos geométricos: prismas, pirámides, cilindros, conos y esferas',
                'Elementos de los cuerpos geométricos',
                'Desarrollo plano de cuerpos sencillos (cubos, prismas)'
            ]
        },
        {
            id: 12,
            id_asignatura: 1,
            numero: 12,
            titulo: 'Movimientos, simetría, estadística y probabilidad',
            objetivo: 'Realizar transformaciones geométricas básicas, recoger y representar datos estadísticos en tablas y gráficos, e iniciarse en el cálculo de la media y en conceptos básicos de probabilidad.',
            trimestre: 3,
            saberes: [
                'Movimientos en el plano: traslación, giro y simetría',
                'Ejes de simetría en figuras planas',
                'Recogida, registro y organización de datos',
                'Tablas de frecuencias y gráficos (barras, lineales, pictogramas)',
                'Media aritmética (iniciación)',
                'Sucesos: seguros, posibles, imposibles y más o menos probables'
            ]
        }
    ]
};
