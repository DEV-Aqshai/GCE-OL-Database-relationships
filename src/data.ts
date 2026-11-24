export type RelationshipId =
  | 'one-one'
  | 'one-many'
  | 'many-one'
  | 'many-many'
  | 'one-none'
  | 'zero-one'

export type Tone = 'purple' | 'blue' | 'pink' | 'ink'
export type ColumnKind = 'pk' | 'fk' | 'normal'

export interface TableModel {
  name: string
  columns: { name: string; kind: ColumnKind }[]
  rows: string[][]
}

export interface Relationship {
  id: RelationshipId
  notation: string
  tamil: string
  english: string
  tone: Tone
  definition: string
  rule: string
  tables: TableModel[]
}

export const relationships: Relationship[] = [
  {
    id: 'one-one',
    notation: '1 : 1',
    tamil: 'ஒன்றுடன் ஒன்று',
    english: 'One-to-One',
    tone: 'purple',
    definition: 'ஒரு மாணவருக்கு ஒரே ஒரு Marks பதிவு. இரு பக்கங்களிலும் ஒரு பதிவு மட்டும் இணைகிறது.',
    rule: 'Foreign Key · Marks.Admission_No தனித்துவமானது.',
    tables: [
      {
        name: 'Student',
        columns: [
          { name: 'Admission_No', kind: 'pk' },
          { name: 'Name', kind: 'normal' },
        ],
        rows: [
          ['1426', 'Kavindu'],
          ['1427', 'Meenadevi'],
        ],
      },
      {
        name: 'Marks',
        columns: [
          { name: 'Index_No', kind: 'pk' },
          { name: 'Marks', kind: 'normal' },
          { name: 'Admission_No', kind: 'fk' },
        ],
        rows: [
          ['23234', '151', '1426'],
          ['23876', '186', '1427'],
        ],
      },
    ],
  },
  {
    id: 'one-many',
    notation: '1 : M',
    tamil: 'ஒன்றுடன் பல',
    english: 'One-to-Many',
    tone: 'blue',
    definition: 'ஒரு Student பல Fees ரசீதுகள் பெறலாம். ஒவ்வொரு ரசீதும் ஒரே மாணவரையே குறிக்கும்.',
    rule: 'Foreign Key மீண்டும் வரலாம்; அதனால் Fees Table “பல” பக்கம்.',
    tables: [
      {
        name: 'Student',
        columns: [
          { name: 'Admission_No', kind: 'pk' },
          { name: 'Name', kind: 'normal' },
        ],
        rows: [['1426', 'Kavindu']],
      },
      {
        name: 'Facility_Fees',
        columns: [
          { name: 'Receipt_No', kind: 'pk' },
          { name: 'Fees', kind: 'normal' },
          { name: 'Admission_No', kind: 'fk' },
        ],
        rows: [
          ['1000', '40.00', '1426'],
          ['1002', '80.00', '1426'],
        ],
      },
    ],
  },
  {
    id: 'many-one',
    notation: 'M : 1',
    tamil: 'பலவற்றுடன் ஒன்று',
    english: 'Many-to-One',
    tone: 'pink',
    definition: 'அதே One-to-Many உறவை எதிர் பக்கத்திலிருந்து பார்ப்பது. பல ரசீதுகள் ஒரு Student-உடன் இணைகின்றன.',
    rule: 'Reverse view · அட்டவணைகள் மாறுவதில்லை; கேட்கும் திசை மட்டும் மாறும்.',
    tables: [
      {
        name: 'Facility_Fees',
        columns: [
          { name: 'Receipt_No', kind: 'pk' },
          { name: 'Admission_No', kind: 'fk' },
        ],
        rows: [
          ['1000', '1426'],
          ['1002', '1426'],
        ],
      },
      {
        name: 'Student',
        columns: [
          { name: 'Admission_No', kind: 'pk' },
          { name: 'Name', kind: 'normal' },
        ],
        rows: [['1426', 'Kavindu']],
      },
    ],
  },
  {
    id: 'many-many',
    notation: 'M : N',
    tamil: 'பலவற்றுடன் பல',
    english: 'Many-to-Many',
    tone: 'purple',
    definition: 'ஒரு Student பல Sports-இல், ஒரு Sport-இல் பல Students இருக்கலாம்.',
    rule: 'Junction Table தேவை; நேரடி Many-to-Many அமைக்க முடியாது.',
    tables: [
      {
        name: 'Student',
        columns: [
          { name: 'Admission_No', kind: 'pk' },
          { name: 'Name', kind: 'normal' },
        ],
        rows: [['1426', 'Kavindu']],
      },
      {
        name: 'Student_Sport',
        columns: [
          { name: 'Admission_No', kind: 'fk' },
          { name: 'Sport_No', kind: 'fk' },
        ],
        rows: [
          ['1426', 'S001'],
          ['1426', 'S002'],
        ],
      },
      {
        name: 'Sport',
        columns: [
          { name: 'Sport_No', kind: 'pk' },
          { name: 'Sport', kind: 'normal' },
        ],
        rows: [['S001', 'Cricket']],
      },
    ],
  },
  {
    id: 'one-none',
    notation: '1 : 0',
    tamil: 'உறவு இல்லை',
    english: 'No Relationship',
    tone: 'ink',
    definition: 'இரு Tables-ஐயும் இணைக்கும் Foreign Key இல்லை. எனவே நேரடி உறவு இல்லை.',
    rule: 'No Foreign Key · O/L-இல் முதன்மை வகைகள் 1:1, 1:M, M:N.',
    tables: [
      {
        name: 'Student',
        columns: [
          { name: 'Admission_No', kind: 'pk' },
          { name: 'Name', kind: 'normal' },
        ],
        rows: [['1426', 'Kavindu']],
      },
      {
        name: 'Book',
        columns: [
          { name: 'Book_ID', kind: 'pk' },
          { name: 'Title', kind: 'normal' },
        ],
        rows: [['B101', 'ICT for your life']],
      },
    ],
  },
  {
    id: 'zero-one',
    notation: '0..1 : 1',
    tamil: 'விருப்பமான ஒன்று',
    english: 'Optional One',
    tone: 'blue',
    definition: 'ஒரு Student-இன் Library Card இருக்கலாம் அல்லது இல்லாமல் இருக்கலாம்.',
    rule: 'Optional Foreign Key · காலியாக இருக்கலாம்; மதிப்பு இருந்தால் 1:1.',
    tables: [
      {
        name: 'Student',
        columns: [
          { name: 'Admission_No', kind: 'pk' },
          { name: 'Name', kind: 'normal' },
        ],
        rows: [
          ['1426', 'Kavindu'],
          ['1427', 'Meenadevi'],
        ],
      },
      {
        name: 'Library_Card',
        columns: [
          { name: 'Card_No', kind: 'pk' },
          { name: 'Admission_No', kind: 'fk' },
        ],
        rows: [['LC01', '1426']],
      },
    ],
  },
]
