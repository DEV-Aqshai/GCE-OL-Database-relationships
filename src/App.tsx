import { relationships, type Relationship, type TableModel, type Tone } from './data'

const ink = '#151515'

const toneColor: Record<Tone, string> = {
  purple: '#8e44ec',
  blue: '#59b5f8',
  pink: '#f97289',
  ink,
}

const toneSoft: Record<Tone, string> = {
  purple: '#ead7ff',
  blue: '#dff2ff',
  pink: '#ffdde4',
  ink: '#efe9f4',
}

type Mark = '1' | 'M' | '0' | '0..1'

function marksFor(id: Relationship['id']): [Mark, Mark] {
  if (id === 'one-one') return ['1', '1']
  if (id === 'one-many') return ['1', 'M']
  if (id === 'many-one') return ['M', '1']
  if (id === 'many-many') return ['M', 'M']
  if (id === 'one-none') return ['1', '0']
  return ['0..1', '1']
}

function EntityBox({
  x,
  y,
  width,
  height,
  title,
  sub,
  accent,
  fill,
}: {
  x: number
  y: number
  width: number
  height: number
  title: string
  sub: string
  accent: string
  fill: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="14" fill={fill} stroke={ink} strokeWidth="2" />
      <circle cx={x + 19} cy={y + 22} r="6" fill={accent} stroke={ink} strokeWidth="1.5" />
      <text x={x + 34} y={y + 27} fontSize="14" fontWeight="700" fill={ink}>{title}</text>
      <text x={x + 19} y={y + 58} fontSize="11.5" fill="#4f4f58">{sub}</text>
    </g>
  )
}

function RelationshipDiagram({ relationship, compact = false }: { relationship: Relationship; compact?: boolean }) {
  const accent = toneColor[relationship.tone]
  const [leftMark, rightMark] = marksFor(relationship.id)

  if (relationship.id === 'many-many') {
    return (
      <svg
        className={`diagram ${compact ? 'diagram-compact' : ''}`}
        viewBox="0 0 640 215"
        role="img"
        aria-label={`${relationship.tamil} ${relationship.english}`}
      >
        <EntityBox x={20} y={20} width={170} height={76} title="Student" sub="Admission_No · PK" accent={toneColor.purple} fill={toneSoft.purple} />
        <EntityBox x={450} y={20} width={170} height={76} title="Sport" sub="Sport_No · PK" accent={toneColor.blue} fill={toneSoft.blue} />
        <EntityBox x={235} y={128} width={170} height={72} title="Student_Sport" sub="Junction Table" accent={toneColor.pink} fill={toneSoft.pink} />
        <path d="M105 96 C105 118 220 128 270 128" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <path d="M535 96 C535 118 420 128 370 128" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <text x="186" y="113" fontSize="14" fontWeight="800" fill={toneColor.purple}>1</text>
        <text x="251" y="122" fontSize="14" fontWeight="800" fill={toneColor.purple}>M</text>
        <text x="388" y="122" fontSize="14" fontWeight="800" fill={toneColor.pink}>M</text>
        <text x="452" y="113" fontSize="14" fontWeight="800" fill={toneColor.blue}>1</text>
      </svg>
    )
  }

  return (
    <svg
      className={`diagram ${compact ? 'diagram-compact' : ''}`}
      viewBox="0 0 640 215"
      role="img"
      aria-label={`${relationship.tamil} ${relationship.english}`}
    >
      <EntityBox x={34} y={58} width={210} height={100} title="Table A" sub="Primary Key" accent={accent} fill={toneSoft[relationship.tone]} />
      <EntityBox
        x={396}
        y={58}
        width={210}
        height={100}
        title="Table B"
        sub={relationship.id === 'one-none' ? 'No Foreign Key' : 'Foreign Key'}
        accent={relationship.id === 'one-none' ? ink : toneColor.blue}
        fill={relationship.id === 'one-none' ? toneSoft.ink : '#ffffff'}
      />
      <path
        d="M244 108 L396 108"
        fill="none"
        stroke={ink}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={relationship.id === 'one-none' || relationship.id === 'zero-one' ? '5 7' : undefined}
      />
      {relationship.id === 'one-none' && <line x1="311" y1="89" x2="329" y2="127" stroke={ink} strokeWidth="2" strokeLinecap="round" />}
      <text x="270" y="113" fontSize="14" fontWeight="800" fill={accent}>{leftMark}</text>
      <text x="360" y="113" fontSize="14" fontWeight="800" fill={relationship.id === 'one-none' ? ink : toneColor.blue}>{rightMark}</text>
    </svg>
  )
}

function MiniTable({ table, tone }: { table: TableModel; tone: Tone }) {
  return (
    <div className={`mini-table tone-${tone}`}>
      <div className="mini-table-name">{table.name}</div>
      <div className="mini-table-scroll">
        <table>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column.name}>
                  {column.kind !== 'normal' && <b className={`key ${column.kind}`}>{column.kind.toUpperCase()}</b>}
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${table.name}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cellIndex}-${cell}`} className={table.columns[cellIndex]?.kind === 'fk' ? 'fk' : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Decor() {
  return (
    <div className="decor" aria-hidden="true">
      <span className="decor-ring decor-ring-one" />
      <span className="decor-ring decor-ring-two" />
      <span className="decor-blob" />
    </div>
  )
}

function Header() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="wordmark" href="#top">
          <span>தரவுத்தள உறவுகள்</span>
          <small>Database Relationships</small>
        </a>
        <nav aria-label="Page links">
          <a href="#keys">Keys · விசைகள்</a>
          <a href="#relationships">Relationships · உறவுகள்</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Decor />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="kicker">G.C.E. O/L ICT · Tamil Medium</p>
          <h1>அட்டவணைகள் இணையும் முறை.</h1>
          <p className="english-title">Database Relationships</p>
          <p className="lede">
            தரவுத்தளத்தில் ஒரு Record மற்றொரு Record-இல் எவ்வாறு இணைகிறது என்பதே Relationship.
            Primary Key, Foreign Key மற்றும் ஒவ்வொரு Relationship-ஐயும் எளிமையாகப் பார்க்கலாம்.
          </p>
          <a className="text-link" href="#keys">Keys இல் தொடங்க <span>↓</span></a>
        </div>

        <div className="hero-panel">
          <RelationshipDiagram relationship={relationships[1]} compact />
          <p>Primary Key → Foreign Key</p>
        </div>
      </div>
    </section>
  )
}

const keys: { title: string; english: string; tone: Tone; body: string }[] = [
  {
    title: 'முதன்மை விசை',
    english: 'Primary Key',
    tone: 'purple',
    body: 'ஒரு Record-ஐ தனித்துவமாகக் காட்டும் Field. Unique; Not Null.',
  },
  {
    title: 'வெளி விசை',
    english: 'Foreign Key',
    tone: 'blue',
    body: 'மற்ற Table-இன் Primary Key-ஐக் கொண்ட Field. இதுவே Link ஆகும்.',
  },
  {
    title: 'இணைப்பு அட்டவணை',
    english: 'Junction Table',
    tone: 'pink',
    body: 'Many-to-Many உறவை இரண்டு One-to-Many உறவுகளாக மாற்றும் Table.',
  },
]

function KeySection() {
  return (
    <section className="section" id="keys">
      <div className="wrap">
        <h2>விசைகள் <span>Keys</span></h2>
        <div className="key-list">
          {keys.map((key) => (
            <article className={`key-item tone-${key.tone}`} key={key.english}>
              <h3>{key.title}<small>{key.english}</small></h3>
              <p>{key.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function RelationshipSection() {
  return (
    <section className="section" id="relationships">
      <div className="wrap">
        <h2>உறவு வகைகள் <span>Relationships</span></h2>
        <p className="section-lede">
          முதன்மையானவை One-to-One, One-to-Many, Many-to-Many. மற்றவை அவற்றைப் புரிந்துகொள்ளும் Comparisons.
        </p>

        <div className="relation-list">
          {relationships.map((relationship) => (
            <article className={`relation tone-${relationship.tone}`} key={relationship.id}>
              <div className="relation-heading">
                <span className="notation">{relationship.notation}</span>
                <div>
                  <h3>{relationship.tamil}</h3>
                  <p className="heading-english">{relationship.english}</p>
                </div>
              </div>

              <div className="relation-body">
                <div className="relation-copy">
                  <p>{relationship.definition}</p>
                  <p className="rule">{relationship.rule}</p>
                </div>
                <div className="diagram-card">
                  <RelationshipDiagram relationship={relationship} />
                </div>
              </div>

              <div className="table-strip">
                {relationship.tables.map((table) => (
                  <MiniTable key={table.name} table={table} tone={relationship.tone} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="section closing">
      <div className="wrap">
        <h2>கண்டறியும் முறை <span>Quick Check</span></h2>
        <div className="closing-list">
          <p><span>Foreign Key இல்லையா?</span> No Relationship.</p>
          <p><span>Foreign Key மீண்டும் வருகிறதா?</span> One-to-Many.</p>
          <p><span>இரு பக்கங்களும் பலவா?</span> Many-to-Many — Junction Table.</p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KeySection />
        <RelationshipSection />
        <ClosingSection />
      </main>
    </>
  )
}
