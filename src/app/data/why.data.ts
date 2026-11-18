export interface WhyCard { color: string; icon: string; title: string; text: string }

export const WHY_CARDS: WhyCard[] = [
  {
    color: '#E8963A',
    icon: 'i-award',
    title: 'Hands-on Experience',
    text: '2+ years building enterprise Angular apps used by 300+ internal users across several teams.'
  },
  {
    color: '#14A37F',
    icon: 'i-search',
    title: 'Production Mindset',
    text: 'Log analysis, root-cause fixes and support for 20+ releases keep what I ship reliable.'
  },
  {
    color: '#E0457B',
    icon: 'i-users',
    title: 'Team Collaboration',
    text: 'Daily work with backend, QA and DevOps teams across analysis, build, release and maintenance.'
  },
  {
    color: '#8E24AA',
    icon: 'i-heart',
    title: 'Dedication and Care',
    text: 'I care about details, from tidy components to solid error handling and data protection.'
  },
  {
    color: '#5B5BE0',
    icon: 'i-code',
    title: 'Strong Technical Base',
    text: 'Angular, Signals, TypeScript, RxJS and NgRx, backed by unit tests and responsive, accessible interfaces.'
  }
];
