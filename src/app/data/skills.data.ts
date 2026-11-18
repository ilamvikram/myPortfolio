export type SkillGroup = 'front' | 'ui' | 'data' | 'ops' | 'more';
export interface Skill { group: SkillGroup; logo: string; name: string; note: string }

export const SKILL_TABS: { key: 'all' | SkillGroup; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'front', label: 'Frontend' },
  { key: 'ui', label: 'UI Libraries' },
  { key: 'data', label: 'APIs and Data' },
  { key: 'ops', label: 'DevOps' },
  { key: 'more', label: 'Also Know' },
];

export const SKILLS: Skill[] = [
  {
    group: 'front',
    logo: 'l-angular',
    name: 'Angular',
    note: 'Primary framework'
  },
  {
    group: 'front',
    logo: 'l-signals',
    name: 'Angular Signals',
    note: 'Reactive state'
  },
  {
    group: 'front',
    logo: 'l-typescript',
    name: 'TypeScript',
    note: ''
  },
  {
    group: 'front',
    logo: 'l-javascript',
    name: 'JavaScript (ES6+)',
    note: ''
  },
  {
    group: 'front',
    logo: 'l-rxjs',
    name: 'RxJS',
    note: ''
  },
  {
    group: 'front',
    logo: 'l-ngrx',
    name: 'NgRx',
    note: ''
  },
  {
    group: 'front',
    logo: 'l-unittest',
    name: 'Unit Testing',
    note: 'Code quality'
  },
  {
    group: 'front',
    logo: 'l-jquery',
    name: 'jQuery',
    note: ''
  },
  {
    group: 'front',
    logo: 'l-html5',
    name: 'HTML5',
    note: ''
  },
  {
    group: 'front',
    logo: 'l-css3',
    name: 'CSS3 and SCSS',
    note: ''
  },
  {
    group: 'ui',
    logo: 'l-material',
    name: 'Angular Material',
    note: ''
  },
  {
    group: 'ui',
    logo: 'l-zorro',
    name: 'NG-ZORRO',
    note: ''
  },
  {
    group: 'ui',
    logo: 'l-primeng',
    name: 'PrimeNG',
    note: ''
  },
  {
    group: 'ui',
    logo: 'l-bootstrap',
    name: 'Bootstrap',
    note: ''
  },
  {
    group: 'data',
    logo: 'l-rest',
    name: 'RESTful APIs',
    note: 'JSON and XML'
  },
  {
    group: 'data',
    logo: 'l-mysql',
    name: 'MySQL',
    note: ''
  },
  {
    group: 'data',
    logo: 'l-postgresql',
    name: 'PostgreSQL',
    note: ''
  },
  {
    group: 'data',
    logo: 'l-postman',
    name: 'Postman',
    note: ''
  },
  {
    group: 'ops',
    logo: 'l-gitlab',
    name: 'GitLab CI/CD',
    note: ''
  },
  {
    group: 'ops',
    logo: 'l-git',
    name: 'Git',
    note: ''
  },
  {
    group: 'ops',
    logo: 'l-github',
    name: 'GitHub',
    note: ''
  },
  {
    group: 'ops',
    logo: 'l-nginx',
    name: 'Nginx',
    note: ''
  },
  {
    group: 'ops',
    logo: 'l-linux',
    name: 'Linux',
    note: ''
  },
  {
    group: 'ops',
    logo: 'l-jira',
    name: 'JIRA',
    note: ''
  },
  {
    group: 'more',
    logo: 'l-react',
    name: 'ReactJS',
    note: 'Working knowledge'
  },
  {
    group: 'more',
    logo: 'l-python',
    name: 'Python',
    note: 'Working knowledge'
  },
  {
    group: 'more',
    logo: 'l-dotnet',
    name: '.NET',
    note: 'Working knowledge'
  }
];
