"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, Download, ArrowRight, Info, ChevronDown } from "lucide-react";
import { formatHuf } from "@/lib/utils";

type RoofType =
  | "ceramia"
  | "beton"
  | "trapez"
  | "hullam"
  | "zsindely"
  | "sikfedes";

interface RoofTypeOption {
  value: RoofType;
  label: string;
  materialPrice: number;
  laborPrice: number;
}

const roofTypes: RoofTypeOption[] = [
  { value: "ceramia", label: "Cseréptető (kerámia)", materialPrice: 5800, laborPrice: 4500 },
  { value: "beton", label: "Cseréptető (beton)", materialPrice: 4200, laborPrice: 4000 },
  { value: "trapez", label: "Trapézlemez tető", materialPrice: 5200, laborPrice: 3000 },
  { value: "hullam", label: "Hullámlemez tető", materialPrice: 4000, laborPrice: 2800 },
  { value: "zsindely", label: "Bitumenes zsindelytető", materialPrice: 3800, laborPrice: 3500 },
  { value: "sikfedes", label: "Síkfedés (EPDM / bitumen)", materialPrice: 6500, laborPrice: 4200 },
];

const FOIL_PRICE = 650;
const LEC_PRICE = 850;
const TOOLS_PRICE = 500;
const CARPENTRY_MATERIAL_PRICE = 2200;
const CARPENTRY_LABOR_PRICE = 5500;

type UnitType = "fm" | "db" | "m²" | "csomag";

interface PredefinedItem {
  id: string;
  name: string;
  unit: UnitType;
  unitPrice: number;
  tooltip: string;
}

const predefinedItems: PredefinedItem[] = [
  {
    id: "tetőablak",
    name: "Tetőablak (VELUX GHL vagy hasonló)",
    unit: "db",
    unitPrice: 85000,
    tooltip: "Szabványos méretű tetőablak beépítése, kerettel és tömítéssel együtt.",
  },
  {
    id: "szellőző",
    name: "Szellőző elem",
    unit: "db",
    unitPrice: 8500,
    tooltip: "Tetőszellőző a megfelelő páraelvezetés érdekében.",
  },
  {
    id: "kéménygallér",
    name: "Kéménygallér (tömítő készlet)",
    unit: "db",
    unitPrice: 12000,
    tooltip: "Kémény és tető csatlakozásának vízhatlan tömítése.",
  },
  {
    id: "hócsúszásgátló",
    name: "Hócsúszásgátló",
    unit: "fm",
    unitPrice: 2800,
    tooltip: "Hó és jég lecsúszásának megakadályozása az ereszpárkányon.",
  },
  {
    id: "gerincszalag",
    name: "Gerincszellőző szalag",
    unit: "fm",
    unitPrice: 1200,
    tooltip: "A gerinc mentén elhelyezett szellőzőszalag a tető szellőztetéséhez.",
  },
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

export default function KalkulatorClient() {
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

    const today = new Date().toLocaleDateString("hu-HU", {
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
    doc.text("Máté Tetőfedő & Bádogos   Tájékoztató árajánlat", 20, 10.5);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(today, pageW - 20, 10.5, { align: "right" });

    // Project info
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Tető típusa: ${selectedRoofData.label}`, 20, 28);
    doc.text(`Tető alapterülete: ${nm} m²`, 20, 35);

    // Table header
    let y = 46;
    const cols = [20, 80, 135, 175];
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, pageW - 40, 8, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50);
    doc.text("Tétel", cols[0], y);
    doc.text("Mennyiség", cols[1], y);
    doc.text("Egységár", cols[2], y);
    doc.text("Összeg", cols[3], y, { align: "right" });

    const tableRows: string[][] = [
      ["Páraáteresztő fólia", `${nm} m²`, `${FOIL_PRICE} Ft/nm`, formatHuf(foilTotal)],
      ["Lécezés", `${nm} m²`, `${LEC_PRICE} Ft/nm`, formatHuf(lecTotal)],
      ["Fedőanyag", `${nm} m²`, `${selectedRoofData.materialPrice} Ft/nm`, formatHuf(materialTotal)],
      ["Tetőfedési munkadíj", `${nm} m²`, `${selectedRoofData.laborPrice} Ft/nm`, formatHuf(laborTotal)],
      ["Eszközök és kisegédanyagok", `${nm} m²`, `${TOOLS_PRICE} Ft/nm`, formatHuf(toolsTotal)],
    ];

    if (carpentryEnabled) {
      tableRows.push(
        ["Faanyag (ácsmunka)", `${cNm} m²`, `${CARPENTRY_MATERIAL_PRICE} Ft/nm`, formatHuf(carpentryMaterialTotal)],
        ["Ácsmunka munkadíja", `${cNm} m²`, `${CARPENTRY_LABOR_PRICE} Ft/nm`, formatHuf(carpentryLaborTotal)]
      );
    }

    predefinedItems.forEach((item) => {
      const state = predefined[item.id];
      if (state?.enabled) {
        const qty = parseFloat(state.qty) || 0;
        tableRows.push([
          item.name,
          `${qty} ${item.unit}`,
          `${item.unitPrice.toLocaleString("hu-HU")} Ft/${item.unit}`,
          formatHuf(qty * item.unitPrice),
        ]);
      }
    });

    accessories.forEach((row) => {
      if (row.name || row.qty) {
        const rowTotal = (parseFloat(row.qty) || 0) * (parseFloat(row.unitPrice) || 0);
        tableRows.push([
          row.name || "Kellék",
          `${row.qty || 0} ${row.unit}`,
          `${parseFloat(row.unitPrice) || 0} Ft`,
          formatHuf(rowTotal),
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
    doc.text("Végösszeg (nettó):", 20, y);
    doc.setTextColor(200, 75, 17);
    doc.text(formatHuf(subtotal), pageW - 20, y, { align: "right" });

    if (vatEnabled) {
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text("ÁFA (+27%):", 20, y);
      doc.text(formatHuf(vatAmount), pageW - 20, y, { align: "right" });
      y += 7;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30);
      doc.text("Végösszeg (bruttó):", 20, y);
      doc.setTextColor(200, 75, 17);
      doc.text(formatHuf(total), pageW - 20, y, { align: "right" });
    }

    const footerY = doc.internal.pageSize.height - 16;
    doc.setDrawColor(200);
    doc.line(20, footerY - 5, pageW - 20, footerY - 5);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(130);
    doc.text(
      "Ez az árajánlat tájékoztató jellegű. Pontos ár a helyszíni felmérés után adható.",
      20,
      footerY
    );
    doc.text("Kapcsolat: +36 30 095 1686 | mate.tetofedo@gmail.com", pageW - 20, footerY, { align: "right" });

    doc.save(`mate-tetofedo-arajanlat-${Date.now()}.pdf`);
  }, [
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
            A   Alap adatok
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="area" className={labelClass}>
                A tető alapterülete <span className="text-[#C84B11]">*</span>
              </label>
              <div className="relative">
                <input
                  id="area"
                  type="number"
                  min="0"
                  className={`${inputClass} pr-12`}
                  placeholder="pl. 80"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  aria-describedby="area-help"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] text-sm">
                  m²
                </span>
              </div>
              <p id="area-help" className="mt-2 text-xs text-[#A8A29E] leading-relaxed">
                Adja meg a tető lejtős felületét   nem az alaplaptól mérve, hanem a tényleges fedési felületet. Ha nem tudja pontosan, a felmérés során mérjük meg.
              </p>
            </div>

            <div>
              <label htmlFor="roofType" className={labelClass}>
                Tető típusa
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
                      {opt.label}
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
            B   Anyagköltségek
          </h2>

          <div className="space-y-1">
            <div className="grid grid-cols-[1fr_140px] gap-3 text-xs font-medium text-[#A8A29E] uppercase tracking-wide pb-2">
              <span>Tétel</span>
              <span className="text-right">Összeg</span>
            </div>

            {[
              {
                label: "Páraáteresztő fólia",
                unitPrice: FOIL_PRICE,
                total: foilTotal,
                tooltip: "Tetőfólia, amely megakadályozza a beázást, de engedi a párát távozni.",
                id: "foil",
              },
              {
                label: "Lécezés (léc + szamárhát)",
                unitPrice: LEC_PRICE,
                total: lecTotal,
                tooltip: "A fólia feletti lécszerkezet, amire a cserép vagy lemez kerül.",
                id: "lec",
              },
              {
                label: "Fedőanyag (cserép / lemez)",
                unitPrice: selectedRoofData.materialPrice,
                total: materialTotal,
                tooltip: "A tető fedőanyagának becsült ára felszerelve.",
                id: "material",
              },
              {
                label: "Tetőfedési munkadíj",
                unitPrice: selectedRoofData.laborPrice,
                total: laborTotal,
                tooltip: "A tetőfedési munka díja négyzetméterenként.",
                id: "labor",
              },
              {
                label: "Eszközök és kisegédanyagok",
                unitPrice: TOOLS_PRICE,
                total: toolsTotal,
                tooltip: "Tartalmazza a szerszámhasználat díját, rögzítőelemeket, tömítőanyagokat és egyéb kisegédanyagokat.",
                id: "tools",
              },
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
                      aria-label={`Tájékoztató: ${row.label}`}
                    >
                      <Info size={13} aria-hidden="true" />
                    </button>
                  </div>
                  <span className="text-xs text-[#A8A29E] mt-0.5 block">
                    {row.unitPrice.toLocaleString("hu-HU")} Ft/nm
                  </span>
                </div>
                <p className="text-right text-sm font-semibold text-[#1C1917]">
                  {formatHuf(row.total)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION C: Ácsmunka */}
        <div className="bg-white rounded-card border border-[#E7E5E4] p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E7E5E4]">
            <h2 className="text-lg font-semibold text-[#1C1917]">
              C   Ácsmunka
            </h2>
            <label className="flex items-center gap-3 cursor-pointer" htmlFor="carpentry-toggle">
              <span className="text-sm text-[#57534E]">Szükséges ácsmunka is?</span>
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
                  Ácsmunka területe
                </label>
                <div className="relative">
                  <input
                    id="carpentryArea"
                    type="number"
                    min="0"
                    className={`${inputClass} pr-12`}
                    placeholder="pl. 30"
                    value={carpentryArea}
                    onChange={(e) => setCarpentryArea(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] text-sm">
                    m²
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#A8A29E]">
                  Ha csak részleges gerendacsere szükséges, adja meg az érintett területet.
                </p>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_140px] gap-3 text-xs font-medium text-[#A8A29E] uppercase tracking-wide pb-2">
                  <span>Tétel</span>
                  <span className="text-right">Összeg</span>
                </div>

                {[
                  {
                    label: "Faanyag (gerendák, lécek)",
                    unitPrice: CARPENTRY_MATERIAL_PRICE,
                    total: carpentryMaterialTotal,
                    id: "cmat",
                  },
                  {
                    label: "Ácsmunka munkadíja",
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
                        {row.unitPrice.toLocaleString("hu-HU")} Ft/nm
                      </span>
                    </div>
                    <p className="text-right text-sm font-semibold text-[#1C1917]">
                      {formatHuf(row.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!carpentryEnabled && (
            <p className="text-sm text-[#A8A29E]">
              Kapcsolja be a kapcsolót, ha ácsszerkezeti munkára is szüksége van.
            </p>
          )}
        </div>

        {/* SECTION D: Plusz elemek */}
        <div className="bg-white rounded-card border border-[#E7E5E4] p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h2 className="text-lg font-semibold text-[#1C1917] mb-2 pb-4 border-b border-[#E7E5E4]">
            D   Plusz elemek
          </h2>
          <p className="text-xs text-[#A8A29E] mt-4 mb-6">
            Jelölje be az opcionális elemeket, amelyek a tetőre kerülnek.
          </p>

          {/* Predefined checkbox items */}
          <div className="space-y-3 mb-8">
            {predefinedItems.map((item) => {
              const state = predefined[item.id];
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
                          {item.name}
                        </label>
                        <button
                          type="button"
                          title={item.tooltip}
                          className="text-[#A8A29E] hover:text-[#57534E] transition-colors"
                          aria-label={`Tájékoztató: ${item.name}`}
                        >
                          <Info size={13} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="text-xs text-[#A8A29E] mt-0.5 block">
                        {item.unitPrice.toLocaleString("hu-HU")} Ft/{item.unit}
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
                            aria-label={`${item.name} mennyisége`}
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E] text-xs pointer-events-none">
                            {item.unit}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#1C1917] w-28 text-right whitespace-nowrap">
                          {formatHuf(itemTotal)}
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
              Egyéb / egyedi kellék hozzáadása
              <span className="block flex-1 h-px bg-[#E7E5E4]" aria-hidden="true" />
            </h3>

            {accessories.length > 0 && (
              <div className="space-y-3 mb-3">
                <div className="hidden sm:grid grid-cols-[2fr_80px_80px_100px_80px_32px] gap-2 text-xs font-medium text-[#A8A29E] uppercase tracking-wide">
                  <span>Megnevezés</span>
                  <span>Menny.</span>
                  <span>Egység</span>
                  <span>Egységár</span>
                  <span className="text-right">Összeg</span>
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
                        placeholder="pl. Páracsapda"
                        value={row.name}
                        onChange={(e) => updateAccessory(row.id, "name", e.target.value)}
                        aria-label="Kellék megnevezése"
                      />
                      <input
                        type="number"
                        min="0"
                        className={inputClass}
                        placeholder="pl. 12"
                        value={row.qty}
                        onChange={(e) => updateAccessory(row.id, "qty", e.target.value)}
                        aria-label="Mennyiség"
                      />
                      <select
                        className={`${inputClass} cursor-pointer`}
                        value={row.unit}
                        onChange={(e) => updateAccessory(row.id, "unit", e.target.value as UnitType)}
                        aria-label="Egység"
                      >
                        <option value="fm">fm</option>
                        <option value="db">db</option>
                        <option value="m²">m²</option>
                        <option value="csomag">csomag</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        className={inputClass}
                        placeholder="Ft"
                        value={row.unitPrice}
                        onChange={(e) => updateAccessory(row.id, "unitPrice", e.target.value)}
                        aria-label="Egységár"
                      />
                      <p className="text-right text-sm font-semibold text-[#1C1917] sm:block hidden">
                        {formatHuf(rowTotal)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeAccessory(row.id)}
                        className="text-[#A8A29E] hover:text-red-500 transition-colors p-1 rounded"
                        aria-label="Sor törlése"
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
              Egyedi kellék hozzáadása
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Summary panel */}
      <div className="lg:sticky lg:top-24">
        <div
          className="bg-white rounded-card border border-[#E7E5E4] overflow-hidden"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.08)" }}
          aria-label="Becsült költségek összesítője"
        >
          <div className="h-1 bg-[#C84B11]" aria-hidden="true" />

          <div className="p-6">
            <h2 className="text-lg font-semibold text-[#1C1917] mb-6">
              Becsült költségek
            </h2>

            <div className="space-y-3">
              <SummaryLine label="Fólia anyag" value={foilTotal} />
              <SummaryLine label="Lécezés" value={lecTotal} />
              <SummaryLine label="Fedőanyag" value={materialTotal} />
              <SummaryLine label="Tetőfedési munkadíj" value={laborTotal} />
              <SummaryLine label="Eszközök és kisegédanyagok" value={toolsTotal} />

              {carpentryEnabled && (
                <>
                  <div className="border-t border-[#E7E5E4] pt-3 mt-1" />
                  <SummaryLine label="Ácsmunka anyag" value={carpentryMaterialTotal} />
                  <SummaryLine label="Ácsmunka munkadíja" value={carpentryLaborTotal} />
                </>
              )}

              <div className="border-t border-[#E7E5E4] pt-3 mt-1" />
              <SummaryLine label="Plusz elemek" value={predefinedTotal} />
              <SummaryLine label="Egyéb kellékek" value={customAccessoriesTotal} />
              <div className="flex justify-between items-center text-sm font-semibold border-t border-[#E7E5E4] pt-2 mt-1">
                <span className="text-[#57534E]">Kellékek összesen</span>
                <span className="text-[#1C1917]">{formatHuf(accessoriesTotal)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-[#E7E5E4] mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1C1917] text-base">VÉGÖSSZEG</span>
                <span className="font-bold text-[#C84B11] text-xl">{formatHuf(subtotal)}</span>
              </div>

              {vatEnabled && (
                <>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-[#57534E]">ÁFA (+27%)</span>
                    <span className="text-sm font-medium text-[#57534E]">{formatHuf(vatAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-[#1C1917] text-base">Végösszeg ÁFÁ-val</span>
                    <span className="font-bold text-[#C84B11] text-xl">{formatHuf(total)}</span>
                  </div>
                </>
              )}
            </div>

            {/* VAT toggle */}
            <label
              htmlFor="vat-toggle"
              className="flex items-center justify-between mt-4 cursor-pointer"
            >
              <span className="text-sm text-[#57534E]">ÁFA megjelenítése (+27%)</span>
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
              Az ár tartalmazza az anyagot és a munkadíjat, de nem tartalmaz ÁFÁ-t.
              Számlás teljesítés esetén +27% ÁFA kerül felszámításra.
            </p>

            {/* Action buttons */}
            <div className="space-y-3 mt-6">
              <a
                href="/kapcsolat"
                className="btn-primary w-full justify-center"
                aria-label="Ajánlatkérési oldal megnyitása"
              >
                <ArrowRight size={16} aria-hidden="true" />
                Ajánlatot kérek
              </a>
              <button
                type="button"
                onClick={handlePdfDownload}
                className="btn-secondary w-full justify-center"
                aria-label="Árajánlat letöltése PDF formátumban"
              >
                <Download size={16} aria-hidden="true" />
                Letöltés PDF-ben
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-[#57534E]">{label}</span>
      <span className="font-medium text-[#1C1917]">{formatHuf(value)}</span>
    </div>
  );
}
