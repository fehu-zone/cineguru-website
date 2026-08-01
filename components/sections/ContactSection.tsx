"use client";

import { useState, type FormEvent } from "react";

import { siteConfig } from "@/data/site";
import type { Locale, Messages } from "@/i18n/config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/classNames";
import { Button, ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";

type FormValues = { name: string; email: string; brief: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactSection({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", brief: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const contact = messages.contact;

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = contact.form.nameError;
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = contact.form.emailError;
    if (values.brief.trim().length < 20) nextErrors.brief = contact.form.briefError;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus(contact.form.checkError);
      return;
    }

    const subject = encodeURIComponent(`${contact.form.subject} — ${values.name}`);
    const body = encodeURIComponent(`${contact.form.name}: ${values.name}\n${contact.form.email}: ${values.email}\n\n${contact.form.brief}:\n${values.brief}`);
    setStatus(contact.form.openingStatus);
    trackEvent("contact_intent", { language: locale });
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const fields = [
    { key: "name" as const, label: contact.form.name, type: "text", autoComplete: "name" },
    { key: "email" as const, label: contact.form.email, type: "email", autoComplete: "email" },
  ];

  return (
    <section className="page-shell pb-[clamp(4rem,7vw,7rem)] pt-section" id="contact">
      <div className="grid grid-cols-12 gap-grid max-[940px]:grid-cols-6 max-[940px]:gap-y-16">
        <div className="reveal-on-scroll col-span-7 max-[940px]:col-span-full">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.7rem,6.7vw,7.8rem)] [font-weight:580] leading-[0.92] tracking-[-0.05em] max-[640px]:text-[clamp(3.2rem,13.8vw,5rem)]">{contact.title}</h2>
          <p className="mt-8 max-w-[46ch] text-[clamp(1rem,calc(.23vw+.96rem),1.15rem)] leading-[1.58] text-foreground/65">{contact.description}</p>
          <div className="mt-8 flex items-center gap-6 max-[640px]:flex-col max-[640px]:items-start">
            <ButtonLink variant="light" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(contact.form.subject)}`}>{contact.mailCta}<span aria-hidden="true">↗</span></ButtonLink>
            <TextLink className="flex-col items-start gap-1 text-foreground" href={siteConfig.phoneHref}>{contact.phoneCta}<span className="font-body text-sm font-normal normal-case tracking-normal">{siteConfig.phoneDisplay}</span></TextLink>
          </div>
        </div>

        <form className="reveal-on-scroll col-start-9 col-end-[-1] self-end rounded-2xl border border-foreground/15 bg-surface/65 p-[clamp(1rem,2vw,1.65rem)] max-[940px]:col-span-full max-[940px]:w-[min(100%,45rem)]" onSubmit={submitContact} noValidate>
          {fields.map((field) => (
            <div className={cn("border-b border-foreground/15 py-3 focus-within:border-accent", errors[field.key] && "border-accent")} key={field.key}>
              <label className="block font-mono text-[0.58rem] uppercase tracking-[0.08em] text-foreground/55" htmlFor={`contact-${field.key}`}>{field.label}</label>
              <input className="mt-2 block w-full border-0 bg-transparent py-1 text-[0.98rem] leading-normal text-foreground outline-none" id={`contact-${field.key}`} name={field.key} type={field.type} autoComplete={field.autoComplete} value={values[field.key]} onChange={(event) => updateValue(field.key, event.target.value)} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${field.key}-error` : undefined} />
              {errors[field.key] ? <small className="mt-1 block text-xs text-accent" id={`${field.key}-error`}>{errors[field.key]}</small> : null}
            </div>
          ))}
          <div className={cn("border-b border-foreground/15 py-3 focus-within:border-accent", errors.brief && "border-accent")}>
            <label className="block font-mono text-[0.58rem] uppercase tracking-[0.08em] text-foreground/55" htmlFor="contact-brief">{contact.form.brief}</label>
            <textarea className="mt-2 block w-full resize-y border-0 bg-transparent py-1 text-[0.98rem] leading-normal text-foreground outline-none" id="contact-brief" name="brief" rows={4} value={values.brief} onChange={(event) => updateValue("brief", event.target.value)} aria-invalid={Boolean(errors.brief)} aria-describedby={errors.brief ? "brief-error" : undefined} />
            {errors.brief ? <small className="mt-1 block text-xs text-accent" id="brief-error">{errors.brief}</small> : null}
          </div>
          <div className="mt-5 flex items-center justify-between gap-4 max-[640px]:flex-col max-[640px]:items-start">
            <Button type="submit">{contact.form.send}<span aria-hidden="true">↗</span></Button>
            <a className="font-mono text-[0.53rem] text-foreground/55 underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{contact.form.direct}</a>
          </div>
          <p className="mt-3 min-h-[1.2em] text-xs text-foreground/65" aria-live="polite">{status}</p>
        </form>
      </div>

      <div className="mt-[clamp(5rem,8vw,8rem)] grid grid-cols-3 gap-grid border-t border-foreground/15 pt-5 max-[640px]:grid-cols-1 max-[640px]:gap-y-8">
        <a className="flex flex-col gap-3" href={`mailto:${siteConfig.email}`}><span className="font-mono text-[0.56rem] uppercase tracking-[0.08em] text-foreground/45">{contact.emailLabel}</span><strong className="font-normal text-foreground/80">{siteConfig.email}</strong></a>
        <address className="flex flex-col gap-3 not-italic"><span className="font-mono text-[0.56rem] uppercase tracking-[0.08em] text-foreground/45">{contact.location}</span><strong className="font-normal text-foreground/80">{contact.address}</strong></address>
        <div className="flex flex-col gap-3"><span className="font-mono text-[0.56rem] uppercase tracking-[0.08em] text-foreground/45">{contact.socialLabel}</span><SocialLinks className="text-sm text-foreground/80" /></div>
      </div>
    </section>
  );
}
