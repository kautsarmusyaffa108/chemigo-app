import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { PERIODIC_TABLE, CATEGORY_COLORS } from "@/lib/elements";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { ElementInfo } from "@workspace/api-client-react/src/generated/api.schemas";
import { Atom } from "lucide-react";

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null);

  // Group elements for grid layout
  // CSS Grid for periodic table is typically 18 columns, 7 rows (plus 2 rows for lanthanides/actinides which we skip in this basic version for layout simplicity, or place at bottom)
  
  return (
    <AppLayout>
      <div className="p-4 md:p-6 w-full max-w-5xl mx-auto flex flex-col h-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Tabel Periodik</h1>
            <p className="text-muted-foreground font-semibold">Eksplorasi unsur-unsur kimia</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
            <div key={cat} className={`text-xs px-2 py-1 rounded font-bold border ${colors} capitalize`}>
              {cat.replace(/_/g, ' ')}
            </div>
          ))}
        </div>

        {/* Responsive Container for Grid */}
        <div className="overflow-x-auto periodic-scroll pb-4 flex-1">
          <div className="min-w-[800px] grid grid-cols-18 gap-1 auto-rows-[3.5rem]">
            {PERIODIC_TABLE.map((el) => {
              if (!el.group) return null; // Skip f-block for this layout to keep grid simple

              return (
                <button
                  key={el.atomicNumber}
                  onClick={() => setSelectedElement(el)}
                  className={`
                    flex flex-col items-center justify-center p-1 rounded border-2 shadow-sm transition-transform hover:scale-110 hover:z-10
                    ${CATEGORY_COLORS[el.category] || "bg-muted text-muted-foreground border-border"}
                  `}
                  style={{
                    gridColumn: el.group,
                    gridRow: el.period,
                  }}
                >
                  <span className="text-[10px] self-start leading-none opacity-70 font-bold ml-0.5">{el.atomicNumber}</span>
                  <span className="text-lg font-display font-bold leading-none">{el.symbol}</span>
                  <span className="text-[8px] truncate w-full leading-none opacity-80 mt-0.5">{el.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Dialog open={!!selectedElement} onOpenChange={(open) => !open && setSelectedElement(null)}>
          <DialogContent className="sm:max-w-md rounded-3xl border-2">
            {selectedElement && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-display">
                    <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-bold ${CATEGORY_COLORS[selectedElement.category]}`}>
                      {selectedElement.symbol}
                    </div>
                    <div>
                      {selectedElement.name}
                      <div className="text-sm font-sans font-normal text-muted-foreground capitalize">
                        {selectedElement.category.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="bg-muted/50 p-3 rounded-2xl">
                    <p className="text-sm text-muted-foreground font-bold">Nomor Atom</p>
                    <p className="text-xl font-display font-bold text-foreground">{selectedElement.atomicNumber}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-2xl">
                    <p className="text-sm text-muted-foreground font-bold">Massa Atom</p>
                    <p className="text-xl font-display font-bold text-foreground">{selectedElement.atomicMass}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-2xl">
                    <p className="text-sm text-muted-foreground font-bold">Golongan</p>
                    <p className="text-xl font-display font-bold text-foreground">{selectedElement.group || '-'}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-2xl">
                    <p className="text-sm text-muted-foreground font-bold">Periode</p>
                    <p className="text-xl font-display font-bold text-foreground">{selectedElement.period}</p>
                  </div>
                </div>
                {selectedElement.funFact && (
                  <div className="bg-primary/10 border-2 border-primary/20 p-4 rounded-2xl flex gap-3 items-start">
                    <Atom className="text-primary mt-1" size={20} />
                    <p className="text-sm text-primary font-semibold">{selectedElement.funFact}</p>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </AppLayout>
  );
}
