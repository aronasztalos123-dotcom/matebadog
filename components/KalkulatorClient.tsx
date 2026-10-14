"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, Download, ArrowRight, Info, ChevronDown } from "lucide-react";
import { formatHuf } from "@/lib/utils";
import { fill, localizePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type RoofType =
  | "ceramia"
  | "beton"
  | "trapez"
  | "hullam"
  | "zsindely"
  | "sikfedes";

interface RoofTypeOption {
  value: RoofType;
  materialPrice: number;
  laborPrice: number;
}

const roofTypes: RoofTypeOption[] = [
  { value: "ceramia", materialPrice: 5800, laborPrice: 4500 },
  { value: "beton", materialPrice: 4200, laborPrice: 4000 },
  { value: "trapez", materialPrice: 5200, laborPrice: 3000 },
  { value: "hullam", materialPrice: 4000, laborPrice: 2800 },
  { value: "zsindely", materialPrice: 3800, laborPrice: 3500 },
  { value: "sikfedes", materialPrice: 6500, laborPrice: 4200 },
];

const FOIL_PRICE = 650;
const LEC_PRICE = 850;
const TOOLS_PRICE = 500;
const CARPENTRY_MATERIAL_PRICE = 2200;
const CARPENTRY_LABOR_PRICE = 5500;

type UnitType = "fm" | "db" | "m²" | "csomag";

type PredefinedId = "roofWindow" | "vent" | "chimneyCollar" | "snowGuard" | "ridgeVent";

interface PredefinedItem {
  id: PredefinedId;
  unit: UnitType;
  unitPrice: number;
}

const predefinedItems: PredefinedItem[] = [
  { id: "roofWindow", unit: "db", unitPrice: 85000 },
  { id: "vent", unit: "db", unitPrice: 8500 },
  { id: "chimneyCollar", unit: "db", unitPrice: 12000 },
  { id: "snowGuard", unit: "fm", unitPrice: 2800 },
  { id: "ridgeVent", unit: "fm", unitPrice: 1200 },
];

interface AccessoryRow {
  id: string;
  name: string;
  qty: string;
  unit: UnitType;
  unitPrice: string;
}

interface PredefinedItemState {
  enabled: boolean;
  qty: string;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

const unitTypes: UnitType[] = ["fm", "db", "m²", "csomag"];

interface KalkulatorClientProps {
  lang: Locale;
  dict: Dictionary["calculator"];
}

export default function KalkulatorClient({ lang, dict }: KalkulatorClientProps) {
  const locale = dict.numberLocale;
  const fmt = useCallback((amount: number) => formatHuf(amount, locale), [locale]);
  const num = useCallback((amount: number) => amount.toLocaleString(locale), [locale]);

  const [area, setArea] = useState<string>("");
  const [roofType, setRoofType] = useState<RoofType>("ceramia");
  const [carpentryEnabled, setCarpentryEnabled] = useState(false);
  const [carpentryArea, setCarpentryArea] = useState<string>("");
  const [predefined, setPredefined] = useState<Record<string, PredefinedItemState>>(
    Object.fromEntries(predefinedItems.map((item) => [item.id, { enabled: false, qty: "1" }]))
  );
  const [accessories, setAccessories] = useState<AccessoryRow[]>([]);
  const [vatEnabled, setVatEnabled] = useState(false);

  const nm = parseFloat(area) || 0;
  const selectedRoofData = roofTypes.find((r) => r.value === roofType) ?? roofTypes[0];

  const foilTotal = nm * FOIL_PRICE;
  const lecTotal = nm * LEC_PRICE;
  const materialTotal = nm * selectedRoofData.materialPrice;
  const laborTotal = nm * selectedRoofData.laborPrice;
  const toolsTotal = nm * TOOLS_PRICE;

  const cNm = parseFloat(carpentryArea) || 0;
  const carpentryMaterialTotal = carpentryEnabled ? cNm * CARPENTRY_MATERIAL_PRICE : 0;
  const carpentryLaborTotal = carpentryEnabled ? cNm * CARPENTRY_LABOR_PRICE : 0;

  const predefinedTotal = predefinedItems.reduce((sum, item) => {
    const state = predefined[item.id];
    if (!state?.enabled) return sum;
    return sum + (parseFloat(state.qty) || 0) * item.unitPrice;
  }, 0);

  const customAccessoriesTotal = accessories.reduce((sum, row) => {
    return sum + (parseFloat(row.qty) || 0) * (parseFloat(row.unitPrice) || 0);
  }, 0);

  const accessoriesTotal = predefinedTotal + customAccessoriesTotal;

  const subtotal =
    foilTotal +
    lecTotal +
    materialTotal +
    laborTotal +
    toolsTotal +
    carpentryMaterialTotal +
    carpentryLaborTotal +
    accessoriesTotal;

  const vatAmount = vatEnabled ? subtotal * 0.27 : 0;
  const total = subtotal + vatAmount;

  const handleRoofTypeChange = (value: RoofType) => {
    setRoofType(value);
  };

  const togglePredefined = (id: string, enabled: boolean) => {
    setPredefined((prev) => ({ ...prev, [id]: { ...prev[id], enabled } }));
  };

  const updatePredefinedQty = (id: string, qty: string) => {
    setPredefined((prev) => ({ ...prev, [id]: { ...prev[id], qty } }));
  };

  const addAccessory = () => {
    setAccessories((prev) => [
      ...prev,
      { id: generateId(), name: "", qty: "", unit: "db", unitPrice: "" },
    ]);
  };

  const removeAccessory = (id: string) => {
    setAccessories((prev) => prev.filter((r) => r.id !== id));
  };

  const updateAccessory = (id: string, field: keyof AccessoryRow, value: string) => {
    setAccessories((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handlePdfDownload = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const t = dict.pdf;
    const unit = (u: UnitType) => dict.units[u];
    const today = new Date().toLocaleDateString(dict.numberLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const pageW = doc.internal.pageSize.width;

    // Header bar
    doc.setFillColor(200, 75, 17);
    doc.rect(0, 0, pageW, 16, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255);
    doc.text(t.title, 20, 10.5);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(today, pageW - 20, 10.5, { align: "right" });

    // Project info
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${t.roofType}: ${dict.roofTypes[selectedRoofData.value]}`, 20, 28);
    doc.text(`${t.roofArea}: ${nm} m²`, 20, 35);

    // Table header
    let y = 46;
    const cols = [20, 80, 135, 175];
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, pageW - 40, 8, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50);
    doc.text(t.item, cols[0], y);
    doc.text(t.quantity, cols[1], y);
    doc.text(t.unitPrice, cols[2], y);
    doc.text(t.amount, cols[3], y, { align: "right" });

    const tableRows: string[][] = [
      [t.foil, `${nm} m²`, `${FOIL_PRICE} ${dict.perSqm}`, fmt(foilTotal)],
      [t.lec, `${nm} m²`, `${LEC_PRICE} ${dict.perSqm}`, fmt(lecTotal)],
      [t.material, `${nm} m²`, `${selectedRoofData.materialPrice} ${dict.perSqm}`, fmt(materialTotal)],
      [t.labor, `${nm} m²`, `${selectedRoofData.laborPrice} ${dict.perSqm}`, fmt(laborTotal)],
      [t.tools, `${nm} m²`, `${TOOLS_PRICE} ${dict.perSqm}`, fmt(toolsTotal)],
    ];

    if (carpentryEnabled) {
      tableRows.push(
        [t.carpentryMaterial, `${cNm} m²`, `${CARPENTRY_MATERIAL_PRICE} ${dict.perSqm}`, fmt(carpentryMaterialTotal)],
        [t.carpentryLabor, `${cNm} m²`, `${CARPENTRY_LABOR_PRICE} ${dict.perSqm}`, fmt(carpentryLaborTotal)]
      );
    }

    predefinedItems.forEach((item) => {
      const state = predefined[item.id];
      if (state?.enabled) {
        const qty = parseFloat(state.qty) || 0;
        tableRows.push([
          dict.predefined[item.id].name,
          `${qty} ${unit(item.unit)}`,
          `${num(item.unitPrice)} Ft/${unit(item.unit)}`,
          fmt(qty * item.unitPrice),
        ]);
      }
    });

    accessories.forEach((row) => {
      if (row.name || row.qty) {
        const rowTotal = (parseFloat(row.qty) || 0) * (parseFloat(row.unitPrice) || 0);
        tableRows.push([
          row.name || t.accessory,
          `${row.qty || 0} ${unit(row.unit)}`,
          `${parseFloat(row.unitPrice) || 0} Ft`,
          fmt(rowTotal),
        ]);
      }
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    tableRows.forEach((row, i) => {
      y += 9;
      if (i % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(20, y - 5.5, pageW - 40, 8, "F");
      }
      doc.setTextColor(30);
      doc.text(row[0], cols[0], y);
      doc.setTextColor(80);
      doc.text(row[1], cols[1], y);
      doc.text(row[2], cols[2], y);
      doc.setTextColor(30);
      doc.setFont("helvetica", "bold");
      doc.text(row[3], cols[3], y, { align: "right" });
      doc.setFont("helvetica", "normal");
    });

    y += 10;
    doc.setDrawColor(200);
    doc.line(20, y, pageW - 20, y);

    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30);
    doc.text(t.netTotal, 20, y);
    doc.setTextColor(200, 75, 17);
    doc.text(fmt(subtotal), pageW - 20, y, { align: "right" });

    if (vatEnabled) {
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(t.vat, 20, y);
      doc.text(fmt(vatAmount), pageW - 20, y, { align: "right" });
      y += 7;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30);
      doc.text(t.grossTotal, 20, y);
      doc.setTextColor(200, 75, 17);
      doc.text(fmt(total), pageW - 20, y, { align: "right" });
    }

    const footerY = doc.internal.pageSize.height - 16;
    doc.setDrawColor(200);
    doc.line(20, footerY - 5, pageW - 20, footerY - 5);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(130);
    doc.text(t.disclaimer, 20, footerY);
    doc.text(`${t.contact}: +36 30 095 1686 | mate.tetofedo@gmail.com`, pageW - 20, footerY, { align: "right" });

    doc.save(`${t.fileName}-${Date.now()}.pdf`);
  }, [
    dict, fmt, num,
    nm, selectedRoofData, foilTotal, lecTotal, materialTotal, laborTotal, toolsTotal,
    carpentryEnabled, cNm, carpentryMaterialTotal, carpentryLaborTotal,
    predefined, accessories, subtotal, vatEnabled, vatAmount, total,
  ]);

  const inputClass =
    "w-full border border-[#E7E5E4] rounded-[8px] px-4 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C84B11] focus:border-transparent transition-all bg-white";

  const labelClass = "block text-sm font-medium text-[#1C1917] mb-1.5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
      {/* LEFT: Input form */}
      <div className="space-y-8">

        {/* SECTION A: Alap adatok */}
        <div className="bg-white rounded-card border border-[#E7E5E4] p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h2 className="text-lg font-semibold text-[#1C1917] mb-6 pb-4 border-b border-[#E7E5E4]">
            {dict.sectionA}
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="area" className={labelClass}>
                {dict.areaLabel} <span className="text-[#C84B11]">*</span>
              </label>
              <div className="relative">
                <input
                  id="area"
                  type="number"
                  min="0"
                  className={`${inputClass} pr-12`}
                  placeholder={dict.areaPlaceholder}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  aria-describedby="area-help"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] text-sm">
                  m²
                </span>
              </div>
              <p id="area-help" className="mt-2 text-xs text-[#A8A29E] leading-relaxed">
                {dict.areaHelp}
              </p>
            </div>

            <div>
              <label htmlFor="roofType" className={labelClass}>
                {dict.roofTypeLabel}
              </label>
              <div className="relative">
                <select
                  id="roofType"
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  value={roofType}
                  onChange={(e) => handleRoofTypeChange(e.target.value as RoofType)}
                >
                  {roofTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {dict.roofTypes[opt.value]}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: Anyagköltségek */}
        <div className="bg-white rounded-card border border-[#E7E5E4] p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h2 className="text-lg font-semibold text-[#1C1917] mb-6 pb-4 border-b border-[#E7E5E4]">
            {dict.sectionB}
          </h2>

          <div className="space-y-1">
            <div className="grid grid-cols-[1fr_140px] gap-3 text-xs font-medium text-[#A8A29E] uppercase tracking-wide pb-2">
              <span>{dict.colItem}</span>
              <span className="text-right">{dict.colAmount}</span>
            </div>

            {[
              { ...dict.rows.foil, unitPrice: FOIL_PRICE, total: foilTotal, id: "foil" },
              { ...dict.rows.lec, unitPrice: LEC_PRICE, total: lecTotal, id: "lec" },
              { ...dict.rows.material, unitPrice: selectedRoofData.materialPrice, total: materialTotal, id: "material" },
              { ...dict.rows.labor, unitPrice: selectedRoofData.laborPrice, total: laborTotal, id: "labor" },
              { ...dict.rows.tools, unitPrice: TOOLS_PRICE, total: toolsTotal, id: "tools" },
            ].map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_140px] gap-3 items-center py-3 border-b border-[#F7F5F2] last:border-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#1C1917]">{row.label}</span>
                    <button
                      type="button"
                      title={row.tooltip}
                      className="text-[#A8A29E] hover:text-[#57534E] transition-colors"
                      aria-label={fill(dict.infoAria, { label: row.label })}
                    >
                      <Info size={13} aria-hidden="true" />
                    </button>
                  </div>
                  <span className="text-xs text-[#A8A29E] mt-0.5 block">
                    {num(row.unitPrice)} {dict.perSqm}
                  </span>
                </div>
                <p className="text-right text-sm font-semibold text-[#1C1917]">
                  {fmt(row.total)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION C: Ácsmunka */}
        <div className="bg-white rounded-card border border-[#E7E5E4] p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E7E5E4]">
            <h2 className="text-lg font-semibold text-[#1C1917]">
              {dict.sectionC}
            </h2>
            <label className="flex items-center gap-3 cursor-pointer" htmlFor="carpentry-toggle">
              <span className="text-sm text-[#57534E]">{dict.carpentryToggle}</span>
              <div className="relative">
                <input
                  id="carpentry-toggle"
                  type="checkbox"
                  className="sr-only"
                  checked={carpentryEnabled}
                  onChange={(e) => setCarpentryEnabled(e.target.checked)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    carpentryEnabled ? "bg-[#C84B11]" : "bg-[#E7E5E4]"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      carpentryEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>

          {carpentryEnabled && (
            <div className="space-y-5">
              <div>
                <label htmlFor="carpentryArea" className={labelClass}>
                  {dict.carpentryAreaLabel}
                </label>
                <div className="relative">
                  <input
                    id="carpentryArea"
                    type="number"
                    min="0"
                    className={`${inputClass} pr-12`}
                    placeholder={dict.carpentryAreaPlaceholder}
                    value={carpentryArea}
                    onChange={(e) => setCarpentryArea(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] text-sm">
                    m²
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#A8A29E]">
                  {dict.carpentryHelp}
                </p>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_140px] gap-3 text-xs font-medium text-[#A8A29E] uppercase tracking-wide pb-2">
                  <span>{dict.colItem}</span>
                  <span className="text-right">{dict.colAmount}</span>
                </div>

                {[
                  {
                    label: dict.carpentryMaterial,
                    unitPrice: CARPENTRY_MATERIAL_PRICE,
                    total: carpentryMaterialTotal,
                    id: "cmat",
                  },
                  {
                    label: dict.carpentryLabor,
                    unitPrice: CARPENTRY_LABOR_PRICE,
                    total: carpentryLaborTotal,
                    id: "clab",
                  },
                ].map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[1fr_140px] gap-3 items-center py-3 border-b border-[#F7F5F2] last:border-0"
                  >
                    <div>
                      <span className="text-sm text-[#1C1917]">{row.label}</span>
                      <span className="text-xs text-[#A8A29E] mt-0.5 block">
                        {num(row.unitPrice)} {dict.perSqm}
                      </span>
                    </div>
                    <p className="text-right text-sm font-semibold text-[#1C1917]">
                      {fmt(row.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!carpentryEnabled && (
            <p className="text-sm text-[#A8A29E]">
              {dict.carpentryOff}
            </p>
          )}
        </div>

        {/* SECTION D: Plusz elemek */}
        <div className="bg-white rounded-card border border-[#E7E5E4] p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h2 className="text-lg font-semibold text-[#1C1917] mb-2 pb-4 border-b border-[#E7E5E4]">
            {dict.sectionD}
          </h2>
          <p className="text-xs text-[#A8A29E] mt-4 mb-6">
            {dict.sectionDHelp}
          </p>

          {/* Predefined checkbox items */}
          <div className="space-y-3 mb-8">
            {predefinedItems.map((item) => {
              const state = predefined[item.id];
              const { name, tooltip } = dict.predefined[item.id];
              const itemTotal = state.enabled ? (parseFloat(state.qty) || 0) * item.unitPrice : 0;
              return (
                <div
                  key={item.id}
                  className={`border rounded-[8px] p-4 transition-colors ${
                    state.enabled ? "border-[#C84B11] bg-[#FBF8F6]" : "border-[#E7E5E4] bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={`pre-${item.id}`}
                      checked={state.enabled}
                      onChange={(e) => togglePredefined(item.id, e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#C84B11] cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <label
                          htmlFor={`pre-${item.id}`}
                          className="text-sm font-medium text-[#1C1917] cursor-pointer"
                        >
                          {name}
                        </label>
                        <button
                          type="button"
                          title={tooltip}
                          className="text-[#A8A29E] hover:text-[#57534E] transition-colors"
                          aria-label={fill(dict.infoAria, { label: name })}
                        >
                          <Info size={13} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="text-xs text-[#A8A29E] mt-0.5 block">
                        {num(item.unitPrice)} Ft/{dict.units[item.unit]}
                      </span>
                    </div>
                    {state.enabled && (
                      <div className="flex items-center gap-3 ml-auto flex-shrink-0">
                        <div className="relative w-24">
                          <input
                            type="number"
                            min="1"
                            className={`${inputClass} pr-8 text-center`}
                            value={state.qty}
                            onChange={(e) => updatePredefinedQty(item.id, e.target.value)}
                            aria-label={fill(dict.qtyAria, { name })}
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E] text-xs pointer-events-none">
                            {dict.units[item.unit]}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1C1917] w-28 text-right whitespace-nowrap">
                          {fmt(itemTotal)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom accessories */}
          <div>
            <h3 className="text-sm font-semibold text-[#57534E] mb-4 flex items-center gap-3">
              <span className="block w-6 h-px bg-[#E7E5E4]" aria-hidden="true" />
              {dict.customHeading}
              <span className="block flex-1 h-px bg-[#E7E5E4]" aria-hidden="true" />
            </h3>

            {accessories.length > 0 && (
              <div className="space-y-3 mb-3">
                <div className="hidden sm:grid grid-cols-[2fr_80px_80px_100px_80px_32px] gap-2 text-xs font-medium text-[#A8A29E] uppercase tracking-wide">
                  <span>{dict.colName}</span>
                  <span>{dict.colQty}</span>
                  <span>{dict.colUnit}</span>
                  <span>{dict.colUnitPrice}</span>
                  <span className="text-right">{dict.colAmount}</span>
                  <span />
                </div>

                {accessories.map((row) => {
                  const rowTotal = (parseFloat(row.qty) || 0) * (parseFloat(row.unitPrice) || 0);
                  return (
                    <div
                      key={row.id}
                      className="flex flex-col sm:grid sm:grid-cols-[2fr_80px_80px_100px_80px_32px] gap-2 items-start sm:items-center py-2 border-b border-[#F7F5F2] last:border-0"
                    >
                      <input
                        type="text"
                        className={inputClass}
                        placeholder={dict.namePlaceholder}
                        value={row.name}
                        onChange={(e) => updateAccessory(row.id, "name", e.target.value)}
                        aria-label={dict.nameAria}
                      />
                      <input
                        type="number"
                        min="0"
                        className={inputClass}
                        placeholder={dict.qtyPlaceholder}
                        value={row.qty}
                        onChange={(e) => updateAccessory(row.id, "qty", e.target.value)}
                        aria-label={dict.qtyAriaShort}
                      />
                      <select
                        className={`${inputClass} cursor-pointer`}
                        value={row.unit}
                        onChange={(e) => updateAccessory(row.id, "unit", e.target.value as UnitType)}
                        aria-label={dict.colUnit}
                      >
                        {unitTypes.map((u) => (
                          <option key={u} value={u}>
                            {dict.units[u]}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0"
                        className={inputClass}
                        placeholder="Ft"
                        value={row.unitPrice}
                        onChange={(e) => updateAccessory(row.id, "unitPrice", e.target.value)}
                        aria-label={dict.colUnitPrice}
                      />
                      <p className="text-right text-sm font-semibold text-[#1C1917] sm:block hidden">
                        {fmt(rowTotal)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeAccessory(row.id)}
                        className="text-[#A8A29E] hover:text-red-500 transition-colors p-1 rounded"
                        aria-label={dict.deleteRow}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={addAccessory}
              className="mt-2 flex items-center gap-2 text-[#C84B11] text-sm font-semibold hover:text-[#A33D0D] transition-colors border border-[#C84B11] rounded-[6px] px-4 py-2 hover:bg-[#FBE9E0]"
            >
              <Plus size={16} aria-hidden="true" />
              {dict.addCustom}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Summary panel */}
      <div className="lg:sticky lg:top-24">
        <div
          className="bg-white rounded-card border border-[#E7E5E4] overflow-hidden"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.08)" }}
          aria-label={dict.summaryAria}
        >
          <div className="h-1 bg-[#C84B11]" aria-hidden="true" />

          <div className="p-6">
            <h2 className="text-lg font-semibold text-[#1C1917] mb-6">
              {dict.summaryTitle}
            </h2>

            <div className="space-y-3">
              <SummaryLine label={dict.summary.foil} value={fmt(foilTotal)} />
              <SummaryLine label={dict.summary.lec} value={fmt(lecTotal)} />
              <SummaryLine label={dict.summary.material} value={fmt(materialTotal)} />
              <SummaryLine label={dict.summary.labor} value={fmt(laborTotal)} />
              <SummaryLine label={dict.summary.tools} value={fmt(toolsTotal)} />

              {carpentryEnabled && (
                <>
                  <div className="border-t border-[#E7E5E4] pt-3 mt-1" />
                  <SummaryLine label={dict.summary.carpentryMaterial} value={fmt(carpentryMaterialTotal)} />
                  <SummaryLine label={dict.summary.carpentryLabor} value={fmt(carpentryLaborTotal)} />
                </>
              )}

              <div className="border-t border-[#E7E5E4] pt-3 mt-1" />
              <SummaryLine label={dict.summary.extras} value={fmt(predefinedTotal)} />
              <SummaryLine label={dict.summary.otherAccessories} value={fmt(customAccessoriesTotal)} />
              <div className="flex justify-between items-center text-sm font-semibold border-t border-[#E7E5E4] pt-2 mt-1">
                <span className="text-[#57534E]">{dict.summary.accessoriesTotal}</span>
                <span className="text-[#1C1917]">{fmt(accessoriesTotal)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-[#E7E5E4] mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1C1917] text-base">{dict.grandTotal}</span>
                <span className="font-bold text-[#C84B11] text-xl">{fmt(subtotal)}</span>
              </div>

              {vatEnabled && (
                <>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-[#57534E]">{dict.vat}</span>
                    <span className="text-sm font-medium text-[#57534E]">{fmt(vatAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-[#1C1917] text-base">{dict.grandTotalVat}</span>
                    <span className="font-bold text-[#C84B11] text-xl">{fmt(total)}</span>
                  </div>
                </>
              )}
            </div>

            {/* VAT toggle */}
            <label
              htmlFor="vat-toggle"
              className="flex items-center justify-between mt-4 cursor-pointer"
            >
              <span className="text-sm text-[#57534E]">{dict.vatToggle}</span>
              <div className="relative">
                <input
                  id="vat-toggle"
                  type="checkbox"
                  className="sr-only"
                  checked={vatEnabled}
                  onChange={(e) => setVatEnabled(e.target.checked)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    vatEnabled ? "bg-[#C84B11]" : "bg-[#E7E5E4]"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      vatEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
            </label>

            <p className="text-xs text-[#A8A29E] mt-3 leading-relaxed">
              {dict.vatNote}
            </p>

            {/* Action buttons */}
            <div className="space-y-3 mt-6">
              <a
                href={localizePath(lang, "/kapcsolat")}
                className="btn-primary w-full justify-center"
                aria-label={dict.requestQuoteAria}
              >
                <ArrowRight size={16} aria-hidden="true" />
                {dict.requestQuote}
              </a>
              <button
                type="button"
                onClick={handlePdfDownload}
                className="btn-secondary w-full justify-center"
                aria-label={dict.downloadPdfAria}
              >
                <Download size={16} aria-hidden="true" />
                {dict.downloadPdf}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-[#57534E]">{label}</span>
      <span className="font-medium text-[#1C1917]">{value}</span>
    </div>
  );
}
