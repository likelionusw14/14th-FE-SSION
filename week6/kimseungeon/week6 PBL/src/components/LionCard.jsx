const PART_COLORS = {
  Frontend: '#f97316',
  Backend: '#3b82f6',
  Design: '#a855f7',
}

const SKILL_COLORS = {
  JavaScript: '#f7df1e',
  React: '#61dafb',
  'HTML/CSS': '#e34f26',
  Vue: '#42b883',
  TypeScript: '#3178c6',
  'Node.js': '#68a063',
  Python: '#3572a5',
  Java: '#b07219',
  Django: '#092e20',
  Spring: '#6db33f',
  Figma: '#f24e1e',
  Sketch: '#fd9a00',
  Illustrator: '#ff9a00',
  Photoshop: '#31a8ff',
  XD: '#ff61f6',
}

export default function LionCard({ lion }) {
  const partColor = PART_COLORS[lion.part] || '#888'
  const skillColor = SKILL_COLORS[lion.skill] || '#666'

  return (
    <div className="lion-card">
      {lion.skill && (
        <span
          className="skill-badge"
          style={{ backgroundColor: skillColor, color: ['JavaScript', 'Figma', 'Sketch', 'Illustrator'].includes(lion.skill) ? '#000' : '#fff' }}
        >
          {lion.skill}
        </span>
      )}

      <div className="card-image">
        {lion.profileImage ? (
          <img src={lion.profileImage} alt={lion.name} />
        ) : (
          <div className="card-image-placeholder">🦁</div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-name">{lion.name}</h3>
        <span className="card-part" style={{ color: partColor }}>{lion.part}</span>
        <p className="card-intro">{lion.intro}</p>
      </div>
    </div>
  )
}
