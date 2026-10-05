import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Building2,
	CalendarDays,
	Clock,
	Compass,
	FlaskConical,
	Layers,
	Lightbulb,
	PenTool,
	Puzzle,
	Rocket,
	Sparkles,
	Target,
	TrendingUp,
	UserRound,
	Users,
	Wrench,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import { CardHeader, ContactSection, ProjectImage, SiteHeader } from '@/components/Shared';
import { projectLabel, projectPath, site } from '@/data/site';

const NAV_ITEMS = [
	{ label: 'All work', to: { pathname: '/', hash: '#work' }, icon: ArrowLeft },
	{ label: 'Contact', href: '#contact' },
];

const DETAILS = [
	{ key: 'role', label: 'Role', icon: UserRound },
	{ key: 'client', label: 'Client', icon: Building2 },
	{ key: 'duration', label: 'Duration', icon: Clock },
	{ key: 'year', label: 'Year', icon: CalendarDays },
];

const STORY = [
	{ key: 'challenge', label: 'Challenge', icon: Puzzle },
	{ key: 'approach', label: 'Approach', icon: Compass },
	{ key: 'solution', label: 'Solution', icon: Lightbulb },
];

const STEP_ICONS = [Compass, PenTool, FlaskConical, Rocket];
const RESULT_ICONS = [TrendingUp, Target, Users];

const pad = (n) => String(n).padStart(2, '0');

function SectionTitle({ children, count, icon: Icon }) {
	return (
		<Reveal>
			<div className="mb-8 flex items-end justify-between">
				<h2 className="text-3xl font-medium tracking-[-0.02em] md:text-5xl">
					{children}
					{count && (
						<span className="ml-3 align-top text-sm tabular-nums text-muted-foreground">({count})</span>
					)}
				</h2>
				{Icon && (
					<span className="hidden size-12 items-center justify-center rounded-full border border-border md:flex">
						<Icon className="size-5" aria-hidden="true" />
					</span>
				)}
			</div>
		</Reveal>
	);
}

function ResultCard({ result }) {
	return (
		<div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-[#ff5a36] p-5 text-white">
			<span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white text-[#ff5a36]">
				<TrendingUp className="size-4" aria-hidden="true" />
			</span>
			<span className="min-h-[1em] pt-14 text-[3.5rem] font-medium leading-none tracking-[-0.04em]">
				{result.value}
			</span>
			<div>
				<p className="min-h-[1.25em] text-base font-semibold leading-tight">{result.label}</p>
				<p className="mt-1 text-sm text-white/80">Key result</p>
			</div>
		</div>
	);
}

function NextCard({ next }) {
	return (
		<div className="flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-border bg-card p-5">
			<span className="text-[4.5rem] font-medium leading-none tracking-[-0.04em] tabular-nums text-foreground">
				{next.id}
			</span>
			<Link
				to={projectPath(next)}
				className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
			>
				Next project
				<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
			</Link>
		</div>
	);
}

export default function ProjectPage() {
	const { slug } = useParams();
	const total = site.projects.length;
	const index = site.projects.findIndex((p) => p.slug === slug);

	if (index === -1) return <Navigate to="/" replace />;

	const project = site.projects[index];
	const prev = site.projects[(index - 1 + total) % total];
	const next = site.projects[(index + 1) % total];

	return (
		<div className="min-h-screen bg-background text-foreground">
			<SiteHeader items={NAV_ITEMS} linkHome />

			<main className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 md:px-6 md:pt-6">
				{/* Intro bento */}
				<section className="grid gap-4 lg:grid-cols-3" aria-label="Project introduction">
					{/* Column A — title + details */}
					<div className="flex flex-col gap-4">
						<Reveal>
							<div className="overflow-hidden rounded-3xl border border-border bg-card">
								<div className="hero-gradient relative h-60 md:h-72">
									<div className="dot-grid absolute inset-0" aria-hidden="true" />
									<span className="absolute left-6 top-6 inline-flex min-h-[2.375rem] min-w-[8rem] items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground">
										<Layers className="size-3.5" aria-hidden="true" />
										{project.category}
									</span>
									<span className="absolute -bottom-10 left-6 flex size-20 items-center justify-center rounded-full border-4 border-card bg-foreground text-lg font-medium tabular-nums text-background md:size-24 md:text-xl">
										{project.id}
									</span>
								</div>
								<div className="px-6 pb-8 pt-14 md:pt-16">
									<h1 className="min-h-[1.04em] max-w-[14ch] text-4xl font-medium leading-[1.04] tracking-[-0.03em] md:text-[2.9rem]">
										{project.title}
									</h1>
									<p className="mt-4 min-h-[1.5rem] text-muted-foreground">{project.tags}</p>
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.1}>
							<div className="rounded-3xl border border-border bg-card">
								<CardHeader icon={Compass}>Project details</CardHeader>
								<dl className="divide-y divide-border">
									{DETAILS.map(({ key, label, icon: Icon }) => (
										<div key={key} className="flex items-center gap-4 px-6 py-4">
											<span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border">
												<Icon className="size-4" aria-hidden="true" />
											</span>
											<div className="min-w-0 flex-1">
												<dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
													{label}
												</dt>
												<dd className="mt-1 min-h-[1.5rem] text-base font-medium">{project[key]}</dd>
											</div>
										</div>
									))}
								</dl>
							</div>
						</Reveal>
					</div>

					{/* Column B — overview + tools + cover */}
					<div className="flex flex-col gap-4">
						<Reveal delay={0.05}>
							<div className="rounded-3xl border border-border bg-card">
								<CardHeader icon={Sparkles}>Overview</CardHeader>
								<div className="p-6">
									<p className="min-h-[8rem] text-[1.05rem] leading-relaxed text-foreground/90">
										{project.summary}
									</p>
									<Link
										to={{ pathname: '/', hash: '#work' }}
										className="group mt-8 flex items-center justify-between rounded-xl bg-foreground px-5 py-4 text-sm font-medium text-background transition-colors duration-200 hover:bg-foreground/85"
									>
										Back to all work
										<ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
									</Link>
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.1}>
							<div className="rounded-3xl border border-border bg-card">
								<CardHeader icon={Wrench}>Tools</CardHeader>
								<div className="flex min-h-[5rem] flex-wrap gap-2.5 p-6">
									{project.tools.map((tool) => (
										<span
											key={tool}
											className="cursor-default rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
										>
											{tool}
										</span>
									))}
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.15} className="flex-1">
							<ProjectImage
								src={project.image}
								alt={project.imageAlt}
								label={projectLabel(project)}
								className="h-full min-h-[300px]"
							/>
						</Reveal>
					</div>

					{/* Column C — key result + next + second image */}
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							<Reveal delay={0.1}>
								<ResultCard result={project.results[0]} />
							</Reveal>
							<Reveal delay={0.15}>
								<NextCard next={next} />
							</Reveal>
						</div>
						<Reveal delay={0.2} className="flex-1">
							<ProjectImage
								src={project.image2}
								alt={project.image2Alt}
								className="h-full min-h-[420px]"
							/>
						</Reveal>
					</div>
				</section>

				{/* Case study */}
				<section className="mt-20 md:mt-28" aria-label="Case study">
					<SectionTitle icon={Layers}>Case Study</SectionTitle>
					<div className="grid gap-4 md:grid-cols-3">
						{STORY.map(({ key, label, icon }, i) => (
							<Reveal key={key} delay={i * 0.06}>
								<div className="h-full rounded-3xl border border-border bg-card">
									<CardHeader icon={icon}>{label}</CardHeader>
									<p className="min-h-[10rem] p-6 text-[1.05rem] leading-relaxed text-foreground/90">
										{project[key]}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* Process */}
				<section className="mt-20 md:mt-28" aria-label="Process">
					<SectionTitle count={pad(project.process.length)} icon={PenTool}>
						Process
					</SectionTitle>
					<div className="border-t border-border">
						{project.process.map((step, i) => {
							const Icon = STEP_ICONS[i % STEP_ICONS.length];

							return (
								<Reveal key={i} delay={i * 0.06}>
									<div className="flex items-center gap-5 border-b border-border px-2 py-5 md:gap-8 md:px-4 md:py-7">
										<span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
											{pad(i + 1)}
										</span>
										<span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border">
											<Icon className="size-4" aria-hidden="true" />
										</span>
										<span className="min-w-0 flex-1">
											<span className="block min-h-[1.25em] text-xl font-medium tracking-[-0.02em] md:text-3xl">
												{step.title}
											</span>
											<span className="mt-1 block min-h-[1.25rem] text-sm text-muted-foreground">
												{step.text}
											</span>
										</span>
									</div>
								</Reveal>
							);
						})}
					</div>
				</section>

				{/* Gallery */}
				<section className="mt-20 md:mt-28" aria-label="Gallery">
					<SectionTitle count={pad(project.gallery.length)} icon={Sparkles}>
						Gallery
					</SectionTitle>
					<div className="grid gap-4 md:grid-cols-2">
						{project.gallery.map((item, i) => (
							<Reveal key={i} delay={(i % 2) * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
								<ProjectImage
									src={item.src}
									alt={item.alt}
									className={i === 0 ? 'h-72 md:h-[28rem]' : 'h-64 md:h-80'}
								/>
							</Reveal>
						))}
					</div>
				</section>

				{/* Results */}
				<section className="mt-20 md:mt-28" aria-label="Results">
					<SectionTitle icon={TrendingUp}>Results</SectionTitle>
					<Reveal>
						<div className="grid overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-border">
							{project.results.map((result, i) => {
								const Icon = RESULT_ICONS[i % RESULT_ICONS.length];

								return (
									<div key={i} className="border-b border-border p-8 last:border-b-0 sm:border-b-0 md:p-10">
										<span className="flex size-11 items-center justify-center rounded-full border border-border">
											<Icon className="size-4" aria-hidden="true" />
										</span>
										<div className="mt-6 min-h-[1em] text-5xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl">
											{result.value}
										</div>
										<p className="mt-3 min-h-[1.25rem] text-sm text-muted-foreground">{result.label}</p>
									</div>
								);
							})}
						</div>
					</Reveal>
				</section>

				{/* Previous / next */}
				<section className="mt-20 grid gap-4 md:mt-28 md:grid-cols-2" aria-label="More projects">
					{[
						{ project: prev, label: 'Previous', icon: ArrowLeft },
						{ project: next, label: 'Next', icon: ArrowRight },
					].map(({ project: target, label, icon: Icon }) => (
						<Reveal key={label}>
							<Link
								to={projectPath(target)}
								className="group flex items-center gap-5 rounded-3xl border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground md:p-8"
							>
								<span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
									<Icon className="size-4" aria-hidden="true" />
								</span>
								<span className="min-w-0 flex-1">
									<span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">
										{label} · {target.id}
									</span>
									<span className="mt-2 block min-h-[1.25em] truncate text-xl font-medium tracking-[-0.02em] md:text-3xl">
										{target.title}
									</span>
								</span>
								<ArrowUpRight
									className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</Link>
						</Reveal>
					))}
				</section>

				<ContactSection />
			</main>
		</div>
	);
}
