import { DISTINCT_HSL_COLORS } from "./hslColors";

// Function to generate a consistent color based on item name,
// attempting to assign unique colors to different items within a single chart generation.
export const getItemColorByName = (() => {
  // These maps/sets will store the state for the current rendering pass.
  // They are reset when the Linechart component re-renders, because this IIFE re-executes.
  const assignedColorsByName = new Map<
    string,
    { h: number; s: number; l: number }
  >();
  const usedColorObjects = new Set<{ h: number; s: number; l: number }>();

  return (itemName: string): { h: number; s: number; l: number } => {
    // If this itemName was already assigned a color in this pass, return it.
    if (assignedColorsByName.has(itemName)) {
      return assignedColorsByName.get(itemName)!;
    }

    // If DISTINCT_HSL_COLORS is empty, there's nothing to assign.
    // Consider returning a default or throwing an error, though typically it should have colors.
    if (DISTINCT_HSL_COLORS.length === 0) {
      // Fallback to a default color or handle error
      return { h: 0, s: 0, l: 50 }; // Example default
    }

    // New itemName for this pass. Try to find an unused color.
    // Start with a hash-based index for initial placement.
    let hash = 0;
    for (let i = 0; i < itemName.length; i++) {
      const char = itemName.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    const initialIndex = Math.abs(hash) % DISTINCT_HSL_COLORS.length;

    let selectedColor: { h: number; s: number; l: number } | null = null;

    // Probe for an unused color, starting from the initialIndex.
    for (let i = 0; i < DISTINCT_HSL_COLORS.length; i++) {
      const currentIndex = (initialIndex + i) % DISTINCT_HSL_COLORS.length;
      const potentialColor = DISTINCT_HSL_COLORS[currentIndex];
      if (!usedColorObjects.has(potentialColor)) {
        selectedColor = potentialColor;
        break;
      }
    }

    // If all colors are already used by other items in this pass,
    // fall back to the hash-based color (it will be a reused color).
    if (!selectedColor) {
      selectedColor = DISTINCT_HSL_COLORS[initialIndex];
    }

    // Cache the assignment for this itemName and mark the color object as used for this pass.
    assignedColorsByName.set(itemName, selectedColor);
    usedColorObjects.add(selectedColor);

    return selectedColor;
  };
})();
