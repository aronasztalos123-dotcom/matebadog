"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ChevronDown } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Ez a mező kötelező."),
  phone: z
    .string()
    .min(1, "Ez a mező kötelező.")
    .regex(/^(\+36|06)\d{8,9}$/, "Adjon meg érvényes telefonszámot. (pl. +36 30 123 4567 vagy 06301234567)"),
  email: z.string().email("Adjon meg érvényes e-mail címet.").optional().or(z.literal("")),
  address: z.string().min(3, "Ez a mező kötelező."),
  workType: z.string().optional(),
  roofSize: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, {
    error: "Kérjük, fogadja el az adatvédelmi nyilatkozatot.",
  }),
});

type FormValues = z.infer<typeof schema>;

const workTypes = [
  "Kérem, válasszon...",
  "Tetőfedés (új)",
  "Tetőfelújítás / csere",
  "Bádogos munkák",
  "Ácsszerkezeti munka",
  "Tetőablak beépítés",
  "Szigetelés és fóliázás",
  "Egyéb / nem tudom pontosan",
];

const roofSizes = [
  "Nem tudom / nem vagyok biztos",
  "20–40 nm alatt",
  "40–80 nm",
  "80–150 nm",
  "150 nm felett",
];

export default function KapcsolatForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormValues) => {
    // Simulate async submission (owner will connect to Resend/Formspree)
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  const inputClass = (hasError: boolean) =>
    `w-full border rounded-[8px] px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 transition-all bg-white ${
      hasError
        ? "border-red-400 focus:ring-red-300"
        : "border-[#E7E5E4] focus:ring-[#C84B11] focus:border-transparent"
    }`;

  const labelClass = "block text-sm font-medium text-[#1C1917] mb-1.5";
  const errorClass = "mt-1.5 text-xs text-red-500 flex items-center gap-1";

  if (submitted) {
    return (
      <div className="py-8 flex flex-col items-center text-center">
        <CheckCircle size={52} className="text-[#15803D] mb-5" aria-hidden="true" />
        <h3 className="text-xl font-bold text-[#1C1917] mb-3">Üzenet elküldve!</h3>
        <p className="text-[#57534E] text-sm leading-relaxed max-w-sm">
          Köszönjük megkeresését! Általában 24 órán belül visszahívjuk vagy visszaírjuk.
          Ha sürgős, hívja közvetlenül:{" "}
          <a href="tel:+36300951686" className="font-semibold text-[#C84B11]">
            +36 30 095 1686
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Teljes neve <span className="text-[#C84B11]">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="pl. Kovács János"
          className={inputClass(!!errors.name)}
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className={errorClass} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Telefonszáma <span className="text-[#C84B11]">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="pl. +36 30 123 4567"
          className={inputClass(!!errors.phone)}
          {...register("phone")}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className={errorClass} role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail címe
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="pl. kovacs.janos@gmail.com"
          className={inputClass(!!errors.email)}
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={errorClass} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className={labelClass}>
          Helyszín / cím <span className="text-[#C84B11]">*</span>
        </label>
        <input
          id="address"
          type="text"
          placeholder="pl. Pécel, Fő utca 12."
          className={inputClass(!!errors.address)}
          {...register("address")}
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className={errorClass} role="alert">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Work type */}
      <div>
        <label htmlFor="workType" className={labelClass}>
          Elvégzendő munka
        </label>
        <div className="relative">
          <select
            id="workType"
            className={`${inputClass(false)} appearance-none pr-10 cursor-pointer`}
            {...register("workType")}
          >
            {workTypes.map((opt) => (
              <option key={opt} value={opt === "Kérem, válasszon..." ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* Roof size */}
      <div>
        <label htmlFor="roofSize" className={labelClass}>
          Becsült tető alapterülete
        </label>
        <div className="relative">
          <select
            id="roofSize"
            className={`${inputClass(false)} appearance-none pr-10 cursor-pointer`}
            {...register("roofSize")}
          >
            {roofSizes.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Üzenete
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Írja le röviden, miben segíthetek..."
          className={inputClass(false)}
          {...register("message")}
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 accent-[#C84B11] shrink-0"
            {...register("consent")}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span className="text-[#57534E] text-sm leading-relaxed">
            Hozzájárulok, hogy adataimat az árajánlat elkészítéséhez felhasználják, és a
            kapcsolatfelvétel érdekében felvegyék velem a kapcsolatot.{" "}
            <span className="text-[#C84B11]">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className={errorClass} role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Üzenet elküldése"
      >
        {isSubmitting ? "Küldés..." : "Elküldöm az üzenetet →"}
      </button>
    </form>
  );
}
