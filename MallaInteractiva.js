import { useState, useEffect } from 'react';

const malla = [
  { codigo: 'CBC-SOC', nombre: 'IPC', correlativas: [], ciclo: 'CBC' },
  { codigo: 'CBC-PSI', nombre: 'ICSE', correlativas: [], ciclo: 'CBC' },
  { codigo: 'CBC-BIO', nombre: 'Biología', correlativas: [], ciclo: 'CBC' },
  { codigo: 'CBC-MAT', nombre: 'Matemática', correlativas: [], ciclo: 'CBC' },
  { codigo: 'CBC-SEM', nombre: 'Semiótica', correlativas: [], ciclo: 'CBC' },
  { codigo: 'CBC-PSICO', nombre: 'Psicología', correlativas: [], ciclo: 'CBC' },

  { codigo: 'CFG1', nombre: 'Epistemología', correlativas: ['CBC-PSICO'], ciclo: 'CFG' },
  { codigo: 'CFG2', nombre: 'Estadística', correlativas: ['CBC-MAT'], ciclo: 'CFG' },
  { codigo: 'CFG3', nombre: 'Neurofisiología', correlativas: ['CBC-BIO'], ciclo: 'CFG' },
  { codigo: 'CFG4', nombre: 'Psicología General', correlativas: ['CBC-PSICO'], ciclo: 'CFG' },
  { codigo: 'CFG5', nombre: 'Evolutiva: Niñez', correlativas: ['CFG4'], ciclo: 'CFG' },

  { codigo: 'CFP1', nombre: 'Social', correlativas: ['CFG1', 'CFG4'], ciclo: 'CFP' },
  { codigo: 'CFP2', nombre: 'Evolutiva: Adolescencia', correlativas: ['CFG5'], ciclo: 'CFP' },
  { codigo: 'CFP3', nombre: 'Psicopatología', correlativas: ['CFG4'], ciclo: 'CFP' },
  { codigo: 'CFP4', nombre: 'Educacional', correlativas: ['CFG4'], ciclo: 'CFP' },

  { codigo: 'CFP5', nombre: 'Freud', correlativas: ['CFP3'], ciclo: 'CFP' },
  { codigo: 'CFP6', nombre: 'Forense', correlativas: ['CFP3'], ciclo: 'CFP' },
  { codigo: 'CFP7', nombre: 'Trabajo', correlativas: ['CFP1'], ciclo: 'CFP' },
  { codigo: 'CFP8', nombre: 'Exploración', correlativas: ['CFP3'], ciclo: 'CFP' },

  { codigo: 'CFP9', nombre: 'Lacan', correlativas: ['CFP5'], ciclo: 'CFP' },
  { codigo: 'CFP10', nombre: 'Clínica Adultos', correlativas: ['CFP3'], ciclo: 'CFP' },
  { codigo: 'CFP11', nombre: 'Clínica Niñxs-Adoles.', correlativas: ['CFP2', 'CFP3'], ciclo: 'CFP' },
  { codigo: 'CFP12', nombre: 'Institucional', correlativas: ['CFP1'], ciclo: 'CFP' },
  { codigo: 'CFP13', nombre: 'Práctica Supervisada', correlativas: ['CFP10', 'CFP11'], ciclo: 'CFP' },

  { codigo: 'ELEC1', nombre: 'Electiva 1', correlativas: [], ciclo: 'Electivas' },
  { codigo: 'ELEC2', nombre: 'Electiva 2', correlativas: [], ciclo: 'Electivas' },
  { codigo: 'ELEC3', nombre: 'Electiva 3', correlativas: [], ciclo: 'Electivas' },
];

export default function MallaInteractiva() {
  const [aprobadas, setAprobadas] = useState([]);

  useEffect(() => {
    const guardadas = localStorage.getItem('materiasAprobadas');
    if (guardadas) setAprobadas(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem('materiasAprobadas', JSON.stringify(aprobadas));
  }, [aprobadas]);

  const toggleMateria = (codigo) => {
    setAprobadas(prev =>
      prev.includes(codigo) ? prev.filter(c => c !== codigo) : [...prev, codigo]
    );
  };

  const puedeCursarse = (materia) =>
    materia.correlativas.every(cod => aprobadas.includes(cod));

  const total = malla.length;
  const cantidadAprobadas = aprobadas.length;
  const porcentaje = Math.round((cantidadAprobadas / total) * 100);

  const ciclos = ['CBC', 'CFG', 'CFP', 'Electivas'];

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#963564' }}>
        Progreso: {porcentaje}%
      </h2>
      {ciclos.map(ciclo => (
        <div key={ciclo} style={{ padding: '1rem' }}>
          <h3 style={{ color: '#963564' }}>{ciclo}</h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {malla.filter(m => m.ciclo === ciclo).map(m => {
              const aprobada = aprobadas.includes(m.codigo);
              const habilitada = puedeCursarse(m);
              return (
                <div
                  key={m.codigo}
                  className={`card ${aprobada ? 'aprobada' : habilitada ? 'habilitada' : 'deshabilitada'}`}
                  onClick={() => habilitada && toggleMateria(m.codigo)}
                >
                  <p>{m.nombre}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}