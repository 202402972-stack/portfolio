import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Play, Pause } from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { CardHeader, ContactSection, ProjectImage, SiteHeader } from '@/components/Shared';
import { projectLabel, projectPath, site } from '@/data/site';

const NAV_ITEMS = [
	{ label: 'Work', href: '#work' },
	{ label: 'About', href: '#about' },
	{ label: 'Contact', href: '#contact' },
];

function PodcastCard() {
	const [playing, setPlaying] = useState(false);
	const bars = useMemo(
		() =>
			Array.from({ length: 34 }, (_, i) => ({
				height: 18 + Math.abs(Math.sin(i * 0.85)) * 62 + (i % 4) * 6,
				delay: (i % 9) * 0.09,
				duration: 0.7 + (i % 5) * 0.12,
			})),
		[]
	);

	return (
		<div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-[#ff5a36] p-5 text-white">
			<button
				type="button"
				onClick={() => setPlaying((p) => !p)}
				aria-label={playing ? 'Pause interview preview' : 'Play interview preview'}
				className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white text-[#ff5a36] transition-transform duration-200 hover:scale-105 active:scale-95"
			>
				{playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
			</button>
			<div className="flex h-24 items-center gap-[3px] pt-8" aria-hidden="true">
				{bars.map((bar, i) => (
					<span
						key={i}
						className="eq-bar w-[3px] shrink-0 rounded-full bg-white/90"
						style={{
							height: `${bar.height}%`,
							animation: `eq ${bar.duration}s ease-in-out ${bar.delay}s infinite alternate`,
							animationPlayState: playing ? 'running' : 'paused',
							transform: 'scaleY(0.3)',
						}}
					/>
				))}
			</div>
			<div>
				<p className="min-h-[1.25em] text-base font-semibold leading-tight">{site.podcast.title}</p>
				<p className="mt-1 min-h-[1.25em] text-sm text-white/80">{site.podcast.subtitle}</p>
			</div>
		</div>
	);
}

function CvCard() {
	return (
		<div className="flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-border bg-card p-5">
			<span className="text-[4.5rem] font-medium leading-none tracking-[-0.04em] text-foreground">
				CV
			</span>
			<a
				href={site.cvHref}
				target="_blank"
				rel="noreferrer"
				className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
			>
				Download
				<ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
			</a>
		</div>
	);
}

export default function HomePage() {
	const [first, second] = site.projects;
	const count = String(site.projects.length).padStart(2, '0');

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Header */}
			<SiteHeader items={NAV_ITEMS} />

			<main className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 md:px-6 md:pt-6">
				{/* Bento grid */}
				<section className="grid gap-4 lg:grid-cols-3" aria-label="Introduction">
					{/* Column A — hero + expertise */}
					<div className="flex flex-col gap-4">
						<Reveal>
							<div className="overflow-hidden rounded-3xl border border-border bg-card">
								<div className="hero-gradient relative h-60 md:h-72">
									<div className="dot-grid absolute inset-0" aria-hidden="true" />
									<div className="absolute -bottom-10 left-6 size-20 overflow-hidden rounded-full border-4 border-card bg-muted md:size-24">
										{site.avatar.src && (
											<img
												src={site.avatar.src}
												alt={site.avatar.alt}
												className="size-full object-cover object-[center_10%]"
											/>
										)}
									</div>
								</div>
								<div className="px-6 pb-8 pt-14 md:pt-16">
									<h1 className="min-h-[1.04em] max-w-[14ch] text-4xl font-medium leading-[1.04] tracking-[-0.03em] md:text-[2.9rem]">
										{site.headline}
									</h1>
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.1}>
							<div className="rounded-3xl border border-border bg-card" id="expertise">
								<CardHeader>Expertise</CardHeader>
								<div className="flex min-h-[5rem] flex-wrap gap-2.5 p-6">
									{site.expertise.map((skill) => (
										<span
											key={skill}
											className="cursor-default rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</Reveal>
					</div>

					{/* Column B — about + project image */}
					<div className="flex flex-col gap-4">
						<Reveal delay={0.05}>
							<div className="rounded-3xl border border-border bg-card" id="about">
								<CardHeader>About</CardHeader>
								<div className="p-6">
									<p className="min-h-[8rem] text-[1.05rem] leading-relaxed text-foreground/90">
										{site.about}
									</p>
									<a
										href="#work"
										className="group mt-8 flex items-center justify-between rounded-xl bg-foreground px-5 py-4 text-sm font-medium text-background transition-colors duration-200 hover:bg-foreground/85"
									>
										View My Work
										<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</a>
								</div>
							</div>
						</Reveal>

						<Reveal delay={0.15} className="flex-1">
							<ProjectImage
								src={first.image}
								alt={first.imageAlt}
								label={projectLabel(first)}
								className="h-full min-h-[300px]"
							/>
						</Reveal>
					</div>

					{/* Column C — podcast + CV + map project */}
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							<Reveal delay={0.1}>
								<PodcastCard />
							</Reveal>
							<Reveal delay={0.15}>
								<CvCard />
							</Reveal>
						</div>
						<Reveal delay={0.2} className="flex-1">
							<ProjectImage
								src={second.image}
								alt={second.imageAlt}
								label={projectLabel(second)}
								className="h-full min-h-[420px]"
							/>
						</Reveal>
					</div>
				</section>

				{/* Selected work */}
				<section className="mt-20 md:mt-28" id="work" aria-label="Selected work">
					<Reveal>
						<div className="mb-8 flex items-end justify-between">
							<h2 className="text-3xl font-medium tracking-[-0.02em] md:text-5xl">
								Selected Work
								<span className="ml-3 align-top text-sm tabular-nums text-muted-foreground">
									({count})
								</span>
							</h2>
							<span className="hidden text-sm text-muted-foreground md:block">{site.workRange}</span>
						</div>
					</Reveal>
					<div className="border-t border-border">
						{site.projects.map((project, index) => (
							<Reveal key={project.id} delay={index * 0.06}>
								<Link
									to={projectPath(project)}
									className="group flex items-center gap-5 border-b border-border px-2 py-5 transition-colors duration-200 hover:bg-card md:gap-8 md:px-4 md:py-7"
								>
									<span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
										{project.id}
									</span>
									<span className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted md:block">
										{project.image && (
											<img
												src={project.image}
												alt=""
												loading="lazy"
												className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
											/>
										)}
									</span>
									<span className="min-w-0 flex-1">
										<span className="block min-h-[1.25em] truncate text-xl font-medium tracking-[-0.02em] md:text-3xl">
											{project.title}
										</span>
										<span className="mt-1 block text-sm text-muted-foreground md:hidden">
											{[project.category, project.year].filter(Boolean).join(' · ')}
										</span>
									</span>
									<span className="hidden shrink-0 text-right md:block">
										<span className="block min-h-[1.25rem] text-sm text-foreground/80">
											{project.category}
										</span>
										<span className="mt-0.5 block min-h-[1.25rem] text-sm tabular-nums text-muted-foreground">
											{project.year}
										</span>
									</span>
									<span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
										<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</span>
								</Link>
							</Reveal>
						))}
					</div>
				</section>

				{/* Stats */}
				<section className="mt-20 md:mt-28" aria-label="Experience in numbers">
					<Reveal>
						<div className="grid overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-border">
							{site.stats.map((stat) => (
								<div key={stat.label} className="border-b border-border p-8 last:border-b-0 sm:border-b-0 md:p-10">
									<div className="min-h-[1em] text-5xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl">
										{stat.value !== '' && stat.value != null && (
											<CountUp value={stat.value} suffix={stat.suffix} />
										)}
									</div>
									<p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
								</div>
							))}
						</div>
					</Reveal>
				</section>

				{/* Contact / footer */}
				<ContactSection />
			</main>
		</div>
	);
}
