import type { ElementInfo } from "@workspace/api-client-react/src/generated/api.schemas";

// A representative subset of the periodic table for the UI display
// Format: [AtomicNo, Symbol, Name, Mass, Category, Group, Period]
const elementsData: Array<[number, string, string, number, string, number | null, number]> = [
  [1, "H", "Hydrogen", 1.008, "nonmetal", 1, 1],
  [2, "He", "Helium", 4.0026, "noble_gas", 18, 1],
  [3, "Li", "Lithium", 6.94, "alkali_metal", 1, 2],
  [4, "Be", "Beryllium", 9.0122, "alkaline_earth_metal", 2, 2],
  [5, "B", "Boron", 10.81, "metalloid", 13, 2],
  [6, "C", "Carbon", 12.011, "nonmetal", 14, 2],
  [7, "N", "Nitrogen", 14.007, "nonmetal", 15, 2],
  [8, "O", "Oxygen", 15.999, "nonmetal", 16, 2],
  [9, "F", "Fluorine", 18.998, "halogen", 17, 2],
  [10, "Ne", "Neon", 20.180, "noble_gas", 18, 2],
  [11, "Na", "Sodium", 22.990, "alkali_metal", 1, 3],
  [12, "Mg", "Magnesium", 24.305, "alkaline_earth_metal", 2, 3],
  [13, "Al", "Aluminum", 26.982, "post_transition_metal", 13, 3],
  [14, "Si", "Silicon", 28.085, "metalloid", 14, 3],
  [15, "P", "Phosphorus", 30.974, "nonmetal", 15, 3],
  [16, "S", "Sulfur", 32.06, "nonmetal", 16, 3],
  [17, "Cl", "Chlorine", 35.45, "halogen", 17, 3],
  [18, "Ar", "Argon", 39.95, "noble_gas", 18, 3],
  [19, "K", "Potassium", 39.098, "alkali_metal", 1, 4],
  [20, "Ca", "Calcium", 40.078, "alkaline_earth_metal", 2, 4],
  [21, "Sc", "Scandium", 44.956, "transition_metal", 3, 4],
  [22, "Ti", "Titanium", 47.867, "transition_metal", 4, 4],
  [23, "V", "Vanadium", 50.942, "transition_metal", 5, 4],
  [24, "Cr", "Chromium", 51.996, "transition_metal", 6, 4],
  [25, "Mn", "Manganese", 54.938, "transition_metal", 7, 4],
  [26, "Fe", "Iron", 55.845, "transition_metal", 8, 4],
  [27, "Co", "Cobalt", 58.933, "transition_metal", 9, 4],
  [28, "Ni", "Nickel", 58.693, "transition_metal", 10, 4],
  [29, "Cu", "Copper", 63.546, "transition_metal", 11, 4],
  [30, "Zn", "Zinc", 65.38, "transition_metal", 12, 4],
  [31, "Ga", "Gallium", 69.723, "post_transition_metal", 13, 4],
  [32, "Ge", "Germanium", 72.630, "metalloid", 14, 4],
  [33, "As", "Arsenic", 74.922, "metalloid", 15, 4],
  [34, "Se", "Selenium", 78.971, "nonmetal", 16, 4],
  [35, "Br", "Bromine", 79.904, "halogen", 17, 4],
  [36, "Kr", "Krypton", 83.798, "noble_gas", 18, 4],
];

export const PERIODIC_TABLE: ElementInfo[] = elementsData.map(
  ([atomicNumber, symbol, name, atomicMass, category, group, period]) => ({
    atomicNumber: atomicNumber as number,
    symbol: symbol as string,
    name: name as string,
    atomicMass: atomicMass as number,
    category: category as string,
    group: group as number | null,
    period: period as number,
  })
);

export const CATEGORY_COLORS: Record<string, string> = {
  nonmetal: "bg-blue-200 text-blue-900 border-blue-300",
  noble_gas: "bg-purple-200 text-purple-900 border-purple-300",
  alkali_metal: "bg-red-200 text-red-900 border-red-300",
  alkaline_earth_metal: "bg-orange-200 text-orange-900 border-orange-300",
  metalloid: "bg-teal-200 text-teal-900 border-teal-300",
  halogen: "bg-pink-200 text-pink-900 border-pink-300",
  transition_metal: "bg-yellow-200 text-yellow-900 border-yellow-300",
  post_transition_metal: "bg-indigo-200 text-indigo-900 border-indigo-300",
};
