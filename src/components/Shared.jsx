import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Globe, Linkedin, Mail } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, Website: Globe };

export function Pill({ children, className = '', ...props }) {
	return (
		<span
			className={`inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-foreground ${className}`}
			{...props}
		>
			{children}
		</span>
	);
}

export function CardHeader({ children, icon: Icon }) {
	return (
		<div className="flex items-center gap-2.5 border-b border-border px-6 py-4 text-sm font-medium text-muted-foreground">
			{Icon && <Icon className="size-4" aria-hidden="true" />}
			{children}
		</div>
	);
}

// Image frame. With no `src` it stays as an empty frame of the same size.
export function ProjectImage({ src, alt = '', label, className = '' }) {
	return (
		<div className={`group relative overflow-hidden rounded-3xl border border-border bg-muted ${className}`}>
			{src && (
				<img
					src={src}
					alt={alt}
					loading="lazy"
					className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
				/>
			)}
			{label && (
				<span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/85 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-sm">
					{label}
				</span>
			)}
		</div>
	);
}

const NAV_LINK =
	'inline-flex items-center rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background md:px-5';

export function SiteHeader({ items, linkHome = false }) {
	const identity = (
		<Pill className="min-h-[2.375rem] min-w-[8rem] shrink-0">
			{site.name}
			<span className="ml-2 hidden text-muted-foreground sm:inline">{site.role && `/ ${site.role}`}</span>
		</Pill>
	);

	return (
		<header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
			<div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-4 md:px-6">
				{linkHome ? (
					<Link to="/" className="shrink-0" aria-label="Home">
						{identity}
					</Link>
				) : (
					identity
				)}
				<nav className="flex items-center gap-2 md:gap-3" aria-label="Primary">
					{items.map((item) =>
						item.to ? (
							<Link key={item.label} to={item.to} className={NAV_LINK}>
								{item.icon && <item.icon className="mr-1.5 size-3.5" aria-hidden="true" />}
								{item.label}
							</Link>
						) : (
							<a key={item.label} href={item.href} className={NAV_LINK}>
								{item.label}
							</a>
						)
					)}
				</nav>
			</div>
		</header>
	);
}

export function ContactSection() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-20 md:mt-28" id="contact">
			<Reveal>
				<div className="overflow-hidden rounded-3xl bg-[#141414] text-white">
					<div className="p-8 md:p-14">
						<p className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">Contact</p>
						<h2 className="mt-6 min-h-[1.05em] max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
							{site.contactHeadline}
						</h2>
						<div className="mt-10 flex flex-wrap items-center gap-4">
							<a
								href={site.email ? `mailto:${site.email}` : undefined}
								className="inline-flex min-h-[3rem] min-w-[12rem] items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#141414] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
							>
								<Mail className="size-4" />
								{site.email}
							</a>
							<div className="flex items-center gap-2.5">
								{site.socials.map((social) => {
									const Icon = SOCIAL_ICONS[social.label];

									return (
										<a
											key={social.label}
											href={social.href || undefined}
											{...(social.href ? { target: '_blank', rel: 'noreferrer' } : {})}
											aria-label={social.label}
											className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:bg-white hover:text-[#141414]"
										>
											{Icon && <Icon className="size-4" />}
										</a>
									);
								})}
							</div>
						</div>
					</div>
					<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-xs text-white/50 md:px-14">
						<span>
							© {year}
							{site.name ? ` ${site.name}.` : ''} All rights reserved.
						</span>
						<span>{site.location}</span>
						<a
							href="#"
							className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
						>
							Back to top
							<ArrowUp className="size-3.5" />
						</a>
					</div>
				</div>
			</Reveal>
		</footer>
	);
}
