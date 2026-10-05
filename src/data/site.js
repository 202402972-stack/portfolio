/*
 * All of the site's content lives in this one file.
 *
 * Every value below is intentionally empty. Fill in what you need and leave
 * the rest blank — empty values simply render as empty slots, so nothing else
 * in the code has to change.
 *
 * Images: put the files in /public/images and reference them like
 * '/images/my-file.jpg'. An empty string keeps the empty frame.
 */

const emptyProject = (id) => ({
	id, // index number shown on the site (01, 02, ...)
	slug: id, // page address: /project/<slug> — you can change it, e.g. 'my-project'
	title: '',
	category: '',
	tags: '',
	year: '',
	image: '', // cover image
	imageAlt: '',
	image2: '', // second image in the intro grid
	image2Alt: '',
	summary: '',
	role: '',
	client: '',
	duration: '',
	tools: [], // list of strings
	challenge: '',
	approach: '',
	solution: '',
	process: Array.from({ length: 4 }, () => ({ title: '', text: '' })),
	results: Array.from({ length: 3 }, () => ({ value: '', label: '' })),
	gallery: Array.from({ length: 4 }, () => ({ src: '', alt: '' })),
});

export const site = {
	name: 'Abdelhamed Nada',
	role: 'Full-Stack Developer',
	location: 'Tanta, Egypt',
	email: '202402972@pua.edu.eg',
	phone: '+20 109 614 4345',
	headline: 'I build complete products.',
	about:
		'Full-stack developer with four years of experience delivering complete products from scratch: front end, back end, database, admin dashboard and deployment. Strong in Next.js, Python, Telegram bots and AI integration, with a sharp eye for clean, well-balanced interfaces.',
	contactHeadline: 'Let\u2019s build the next product.',
	workRange: '2022 \u2014 Present',
	avatar: { src: '/images/avatar.png', alt: 'Abdelhamed Nada' },
	expertise: [
		'Next.js',
		'React',
		'TypeScript',
		'Node.js',
		'Python',
		'PostgreSQL',
		'Telegram bots',
		'AI integration',
		'Tailwind CSS',
		'Three.js',
		'Framer Motion',
		'Supabase',
	],
	podcast: { title: '', subtitle: '' },
	cvHref: '/cv.html',
	stats: [
		{ value: 4, suffix: '+', label: 'Years of experience' },
		{ value: 2, suffix: '', label: 'Working languages' },
		{ value: 7, suffix: '', label: 'Skill domains' },
	],
	socials: [
		{ label: 'GitHub', href: 'https://github.com/202402972-stack' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdelhamed-nada-030528324' },
		{ label: 'Website', href: 'https://abdelhamed-nada.vercel.app' },
	],
	projects: [emptyProject('01'), emptyProject('02'), emptyProject('03'), emptyProject('04')],
};

export const projectPath = (project) => `/project/${project.slug}`;

export const projectLabel = (project) => [project.title, project.category].filter(Boolean).join(' — ');
