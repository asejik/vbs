/**
 * Gallery data model.
 * Each item has a unique id, category, src path, alt text,
 * and an explicit aspect ratio to help the masonry layout
 * correctly allocate column space before images load.
 *
 * aspect: 'square' | 'portrait' | 'landscape'
 */

export type GalleryCategory =
  | 'All'
  | 'Arrival'
  | 'Breakout Session'
  | 'Closing Ceremony'
  | 'Indoor Games'
  | 'Outdoor Games'
  | 'Prayers'
  | 'Presentations'
  | 'Teaching'

export type AspectRatio = 'square' | 'portrait' | 'landscape'

export interface GalleryItem {
  id: string
  category: Exclude<GalleryCategory, 'All'>
  src: string
  alt: string
  aspect: AspectRatio
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Arrival',
  'Teaching',
  'Breakout Session',
  'Prayers',
  'Indoor Games',
  'Outdoor Games',
  'Presentations',
  'Closing Ceremony',
]

/** Map category → pill accent colour (Tailwind classes) */
export const CATEGORY_COLORS: Record<GalleryCategory, { bg: string; text: string; activeBg: string; activeText: string }> = {
  All:                { bg: 'bg-slate-100', text: 'text-slate-600', activeBg: 'bg-slate-800',    activeText: 'text-white' },
  Arrival:            { bg: 'bg-sky/10',    text: 'text-sky-dark',  activeBg: 'bg-sky',           activeText: 'text-white' },
  'Breakout Session': { bg: 'bg-grape/10',  text: 'text-grape',     activeBg: 'bg-grape',         activeText: 'text-white' },
  'Closing Ceremony': { bg: 'bg-coral/10',  text: 'text-coral',     activeBg: 'bg-coral',         activeText: 'text-white' },
  'Indoor Games':     { bg: 'bg-tangerine/10', text: 'text-tangerine', activeBg: 'bg-tangerine',  activeText: 'text-white' },
  'Outdoor Games':    { bg: 'bg-ocean/10',  text: 'text-ocean',     activeBg: 'bg-ocean',         activeText: 'text-white' },
  Prayers:            { bg: 'bg-bubblegum/10', text: 'text-bubblegum', activeBg: 'bg-bubblegum',  activeText: 'text-white' },
  Presentations:      { bg: 'bg-tangerine/10', text: 'text-tangerine', activeBg: 'bg-tangerine',  activeText: 'text-white' },
  Teaching:           { bg: 'bg-mint/10',   text: 'text-mint-dark', activeBg: 'bg-mint',          activeText: 'text-white' },
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── ARRIVAL ──
  { id: 'arr-1', src: '/images/arrival/ATC-VBS-29.jpg', alt: 'Arrival 1', category: 'Arrival', aspect: 'landscape' },
  { id: 'arr-2', src: '/images/arrival/IMG_1364.JPG', alt: 'Arrival 2', category: 'Arrival', aspect: 'square' },
  { id: 'arr-3', src: '/images/arrival/IMG_1366.JPG', alt: 'Arrival 3', category: 'Arrival', aspect: 'portrait' },
  { id: 'arr-4', src: '/images/arrival/IMG_1367.JPG', alt: 'Arrival 4', category: 'Arrival', aspect: 'landscape' },
  { id: 'arr-5', src: '/images/arrival/IMG_1369.JPG', alt: 'Arrival 5', category: 'Arrival', aspect: 'square' },
  { id: 'arr-6', src: '/images/arrival/IMG_1371.JPG', alt: 'Arrival 6', category: 'Arrival', aspect: 'landscape' },
  { id: 'arr-7', src: '/images/arrival/IMG_1372.JPG', alt: 'Arrival 7', category: 'Arrival', aspect: 'portrait' },
  { id: 'arr-8', src: '/images/arrival/IMG_1377.JPG', alt: 'Arrival 8', category: 'Arrival', aspect: 'landscape' },
  { id: 'arr-9', src: '/images/arrival/IMG_1383.JPG', alt: 'Arrival 9', category: 'Arrival', aspect: 'square' },
  { id: 'arr-l1', src: '/images/LAGOS/PXL_20250816_090702411.PORTRAIT.jpg', alt: 'Lagos Arrival 1', category: 'Arrival', aspect: 'portrait' },
  { id: 'arr-l2', src: '/images/LAGOS/PXL_20250816_090707479.PORTRAIT.jpg', alt: 'Lagos Arrival 2', category: 'Arrival', aspect: 'portrait' },
  { id: 'arr-l3', src: '/images/LAGOS/PXL_20250816_090710662.PORTRAIT.jpg', alt: 'Lagos Arrival 3', category: 'Arrival', aspect: 'portrait' },
  { id: 'arr-l4', src: '/images/LAGOS/PXL_20250816_091111366.PORTRAIT.jpg', alt: 'Lagos Arrival 4', category: 'Arrival', aspect: 'portrait' },

  // ── BREAKOUT SESSION ──
  { id: 'brk-1', src: '/images/breakout session/ATC-VBS-129 2.jpg', alt: 'Breakout 1', category: 'Breakout Session', aspect: 'landscape' },
  { id: 'brk-2', src: '/images/breakout session/ATC-VBS-136 2.jpg', alt: 'Breakout 2', category: 'Breakout Session', aspect: 'square' },
  { id: 'brk-3', src: '/images/breakout session/ATC-VBS-138.jpg', alt: 'Breakout 3', category: 'Breakout Session', aspect: 'portrait' },
  { id: 'brk-4', src: '/images/breakout session/ATC-VBS-177 2.jpg', alt: 'Breakout 4', category: 'Breakout Session', aspect: 'landscape' },
  { id: 'brk-5', src: '/images/breakout session/ATC-VBS-180 2.jpg', alt: 'Breakout 5', category: 'Breakout Session', aspect: 'square' },
  { id: 'brk-6', src: '/images/breakout session/ATC-VBS-185.jpg', alt: 'Breakout 6', category: 'Breakout Session', aspect: 'portrait' },
  { id: 'brk-7', src: '/images/breakout session/ATC-VBS-210 2.jpg', alt: 'Breakout 7', category: 'Breakout Session', aspect: 'landscape' },
  { id: 'brk-8', src: '/images/breakout session/ATC-VBS-235.jpg', alt: 'Breakout 8', category: 'Breakout Session', aspect: 'square' },
  { id: 'brk-9', src: '/images/breakout session/ATC-VBS-245 2.jpg', alt: 'Breakout 9', category: 'Breakout Session', aspect: 'landscape' },
  { id: 'brk-10', src: '/images/breakout session/ATC-VBS-83.jpg', alt: 'Breakout 10', category: 'Breakout Session', aspect: 'portrait' },
  { id: 'brk-l1', src: '/images/LAGOS/VBS-21.jpg', alt: 'Lagos Breakout 1', category: 'Breakout Session', aspect: 'landscape' },
  { id: 'brk-l2', src: '/images/LAGOS/VBS-24.jpg', alt: 'Lagos Breakout 2', category: 'Breakout Session', aspect: 'square' },
  { id: 'brk-l3', src: '/images/LAGOS/VBS-27.jpg', alt: 'Lagos Breakout 3', category: 'Breakout Session', aspect: 'landscape' },
  { id: 'brk-l4', src: '/images/LAGOS/VBS-28.jpg', alt: 'Lagos Breakout 4', category: 'Breakout Session', aspect: 'portrait' },

  // ── CLOSING CEREMONY ──
  { id: 'cls-1', src: '/images/closing ceremony/ATC-VBS-285.jpg', alt: 'Closing 1', category: 'Closing Ceremony', aspect: 'landscape' },
  { id: 'cls-2', src: '/images/closing ceremony/ATC-VBS-289 2.jpg', alt: 'Closing 2', category: 'Closing Ceremony', aspect: 'square' },
  { id: 'cls-3', src: '/images/closing ceremony/ATC-VBS-291.jpg', alt: 'Closing 3', category: 'Closing Ceremony', aspect: 'portrait' },
  { id: 'cls-4', src: '/images/closing ceremony/ATC-VBS-292.jpg', alt: 'Closing 4', category: 'Closing Ceremony', aspect: 'landscape' },
  { id: 'cls-5', src: '/images/closing ceremony/ATC-VBS-295.jpg', alt: 'Closing 5', category: 'Closing Ceremony', aspect: 'square' },
  { id: 'cls-6', src: '/images/closing ceremony/ATC-VBS-297 2.jpg', alt: 'Closing 6', category: 'Closing Ceremony', aspect: 'portrait' },
  { id: 'cls-7', src: '/images/closing ceremony/ATC-VBS-322.jpg', alt: 'Closing 7', category: 'Closing Ceremony', aspect: 'landscape' },
  { id: 'cls-8', src: '/images/closing ceremony/ATC-VBS-327.jpg', alt: 'Closing 8', category: 'Closing Ceremony', aspect: 'square' },
  { id: 'cls-9', src: '/images/closing ceremony/ATC-VBS-332.jpg', alt: 'Closing 9', category: 'Closing Ceremony', aspect: 'landscape' },
  { id: 'cls-10', src: '/images/closing ceremony/ATC-VBS-334 2.jpg', alt: 'Closing 10', category: 'Closing Ceremony', aspect: 'portrait' },
  { id: 'cls-l1', src: '/images/LAGOS/VBS-80.jpg', alt: 'Lagos Closing 1', category: 'Closing Ceremony', aspect: 'landscape' },
  { id: 'cls-l2', src: '/images/LAGOS/VBS-82.jpg', alt: 'Lagos Closing 2', category: 'Closing Ceremony', aspect: 'square' },
  { id: 'cls-l3', src: '/images/LAGOS/VBS-83.jpg', alt: 'Lagos Closing 3', category: 'Closing Ceremony', aspect: 'landscape' },
  { id: 'cls-l4', src: '/images/LAGOS/VBS-88.jpg', alt: 'Lagos Closing 4', category: 'Closing Ceremony', aspect: 'portrait' },

  // ── INDOOR GAMES ──
  { id: 'ind-1', src: '/images/indoor games/ATC-VBS-108.jpg', alt: 'Indoor Games 1', category: 'Indoor Games', aspect: 'landscape' },
  { id: 'ind-2', src: '/images/indoor games/ATC-VBS-161.jpg', alt: 'Indoor Games 2', category: 'Indoor Games', aspect: 'square' },
  { id: 'ind-3', src: '/images/indoor games/ATC-VBS-164 2.jpg', alt: 'Indoor Games 3', category: 'Indoor Games', aspect: 'portrait' },
  { id: 'ind-4', src: '/images/indoor games/ATC-VBS-182 4.jpg', alt: 'Indoor Games 4', category: 'Indoor Games', aspect: 'landscape' },
  { id: 'ind-5', src: '/images/indoor games/ATC-VBS-185 3.jpg', alt: 'Indoor Games 5', category: 'Indoor Games', aspect: 'square' },
  { id: 'ind-6', src: '/images/indoor games/ATC-VBS-186.jpg', alt: 'Indoor Games 6', category: 'Indoor Games', aspect: 'portrait' },
  { id: 'ind-7', src: '/images/indoor games/ATC-VBS-187.jpg', alt: 'Indoor Games 7', category: 'Indoor Games', aspect: 'landscape' },
  { id: 'ind-8', src: '/images/indoor games/ATC-VBS-194 3.jpg', alt: 'Indoor Games 8', category: 'Indoor Games', aspect: 'square' },
  { id: 'ind-9', src: '/images/indoor games/ATC-VBS-195 4.jpg', alt: 'Indoor Games 9', category: 'Indoor Games', aspect: 'landscape' },
  { id: 'ind-10', src: '/images/indoor games/ATC-VBS-67.jpg', alt: 'Indoor Games 10', category: 'Indoor Games', aspect: 'portrait' },
  { id: 'ind-l1', src: '/images/LAGOS/VBS-52.jpg', alt: 'Lagos Indoor 1', category: 'Indoor Games', aspect: 'landscape' },
  { id: 'ind-l2', src: '/images/LAGOS/VBS-55.jpg', alt: 'Lagos Indoor 2', category: 'Indoor Games', aspect: 'square' },
  { id: 'ind-l3', src: '/images/LAGOS/VBS-58.jpg', alt: 'Lagos Indoor 3', category: 'Indoor Games', aspect: 'landscape' },
  { id: 'ind-l4', src: '/images/LAGOS/VBS-61.jpg', alt: 'Lagos Indoor 4', category: 'Indoor Games', aspect: 'portrait' },

  // ── OUTDOOR GAMES ──
  { id: 'out-1', src: '/images/outdoor games/ATC-VBS-147.jpg', alt: 'Outdoor Games 1', category: 'Outdoor Games', aspect: 'landscape' },
  { id: 'out-2', src: '/images/outdoor games/ATC-VBS-162.jpg', alt: 'Outdoor Games 2', category: 'Outdoor Games', aspect: 'square' },
  { id: 'out-3', src: '/images/outdoor games/ATC-VBS-171 2.jpg', alt: 'Outdoor Games 3', category: 'Outdoor Games', aspect: 'portrait' },
  { id: 'out-4', src: '/images/outdoor games/ATC-VBS-172 2.jpg', alt: 'Outdoor Games 4', category: 'Outdoor Games', aspect: 'landscape' },
  { id: 'out-5', src: '/images/outdoor games/ATC-VBS-173.jpg', alt: 'Outdoor Games 5', category: 'Outdoor Games', aspect: 'square' },
  { id: 'out-6', src: '/images/outdoor games/ATC-VBS-182 3.jpg', alt: 'Outdoor Games 6', category: 'Outdoor Games', aspect: 'portrait' },
  { id: 'out-7', src: '/images/outdoor games/ATC-VBS-183.jpg', alt: 'Outdoor Games 7', category: 'Outdoor Games', aspect: 'landscape' },
  { id: 'out-8', src: '/images/outdoor games/ATC-VBS-184 2.jpg', alt: 'Outdoor Games 8', category: 'Outdoor Games', aspect: 'square' },
  { id: 'out-9', src: '/images/outdoor games/ATC-VBS-194 2.jpg', alt: 'Outdoor Games 9', category: 'Outdoor Games', aspect: 'landscape' },
  { id: 'out-10', src: '/images/outdoor games/ATC-VBS-195 3.jpg', alt: 'Outdoor Games 10', category: 'Outdoor Games', aspect: 'portrait' },
  { id: 'out-l1', src: '/images/LAGOS/PXL_20250816_101400295.LONG_EXPOSURE-02.ORIGINAL.jpg', alt: 'Lagos Outdoor 1', category: 'Outdoor Games', aspect: 'landscape' },
  { id: 'out-l2', src: '/images/LAGOS/VBS-65.jpg', alt: 'Lagos Outdoor 2', category: 'Outdoor Games', aspect: 'square' },
  { id: 'out-l3', src: '/images/LAGOS/VBS-66.jpg', alt: 'Lagos Outdoor 3', category: 'Outdoor Games', aspect: 'landscape' },
  { id: 'out-l4', src: '/images/LAGOS/VBS-67.jpg', alt: 'Lagos Outdoor 4', category: 'Outdoor Games', aspect: 'portrait' },

  // ── PRAYERS ──
  { id: 'pry-1', src: '/images/prayers/ATC-VBS-1.jpg', alt: 'Prayers 1', category: 'Prayers', aspect: 'landscape' },
  { id: 'pry-2', src: '/images/prayers/ATC-VBS-103.jpg', alt: 'Prayers 2', category: 'Prayers', aspect: 'square' },
  { id: 'pry-3', src: '/images/prayers/ATC-VBS-123.jpg', alt: 'Prayers 3', category: 'Prayers', aspect: 'portrait' },
  { id: 'pry-4', src: '/images/prayers/ATC-VBS-124.jpg', alt: 'Prayers 4', category: 'Prayers', aspect: 'landscape' },
  { id: 'pry-5', src: '/images/prayers/ATC-VBS-13.jpg', alt: 'Prayers 5', category: 'Prayers', aspect: 'square' },
  { id: 'pry-6', src: '/images/prayers/ATC-VBS-14.jpg', alt: 'Prayers 6', category: 'Prayers', aspect: 'portrait' },
  { id: 'pry-7', src: '/images/prayers/ATC-VBS-15.jpg', alt: 'Prayers 7', category: 'Prayers', aspect: 'landscape' },
  { id: 'pry-8', src: '/images/prayers/ATC-VBS-87.jpg', alt: 'Prayers 8', category: 'Prayers', aspect: 'square' },
  { id: 'pry-9', src: '/images/prayers/ATC-VBS-88.jpg', alt: 'Prayers 9', category: 'Prayers', aspect: 'landscape' },
  { id: 'pry-10', src: '/images/prayers/ATC-VBS-90.jpg', alt: 'Prayers 10', category: 'Prayers', aspect: 'portrait' },
  { id: 'pry-l1', src: '/images/LAGOS/VBS-2.jpg', alt: 'Lagos Prayers 1', category: 'Prayers', aspect: 'landscape' },
  { id: 'pry-l2', src: '/images/LAGOS/VBS-6.jpg', alt: 'Lagos Prayers 2', category: 'Prayers', aspect: 'square' },
  { id: 'pry-l3', src: '/images/LAGOS/VBS-8.jpg', alt: 'Lagos Prayers 3', category: 'Prayers', aspect: 'landscape' },
  { id: 'pry-l4', src: '/images/LAGOS/VBS-9.jpg', alt: 'Lagos Prayers 4', category: 'Prayers', aspect: 'portrait' },

  // ── PRESENTATIONS ──
  { id: 'pre-1', src: '/images/presentations/ATC-VBS-257 2.jpg', alt: 'Presentations 1', category: 'Presentations', aspect: 'landscape' },
  { id: 'pre-2', src: '/images/presentations/ATC-VBS-257.jpg', alt: 'Presentations 2', category: 'Presentations', aspect: 'square' },
  { id: 'pre-3', src: '/images/presentations/ATC-VBS-259 3.jpg', alt: 'Presentations 3', category: 'Presentations', aspect: 'portrait' },
  { id: 'pre-4', src: '/images/presentations/ATC-VBS-261.jpg', alt: 'Presentations 4', category: 'Presentations', aspect: 'landscape' },
  { id: 'pre-5', src: '/images/presentations/ATC-VBS-262.jpg', alt: 'Presentations 5', category: 'Presentations', aspect: 'square' },
  { id: 'pre-6', src: '/images/presentations/ATC-VBS-265 2.jpg', alt: 'Presentations 6', category: 'Presentations', aspect: 'portrait' },
  { id: 'pre-7', src: '/images/presentations/ATC-VBS-266.jpg', alt: 'Presentations 7', category: 'Presentations', aspect: 'landscape' },
  { id: 'pre-8', src: '/images/presentations/ATC-VBS-270.jpg', alt: 'Presentations 8', category: 'Presentations', aspect: 'square' },
  { id: 'pre-9', src: '/images/presentations/ATC-VBS-272.jpg', alt: 'Presentations 9', category: 'Presentations', aspect: 'landscape' },
  { id: 'pre-10', src: '/images/presentations/ATC-VBS-273.jpg', alt: 'Presentations 10', category: 'Presentations', aspect: 'portrait' },
  { id: 'pre-l1', src: '/images/LAGOS/VBS-40.jpg', alt: 'Lagos Presentation 1', category: 'Presentations', aspect: 'landscape' },
  { id: 'pre-l2', src: '/images/LAGOS/VBS-45.jpg', alt: 'Lagos Presentation 2', category: 'Presentations', aspect: 'square' },
  { id: 'pre-l3', src: '/images/LAGOS/VBS-49.jpg', alt: 'Lagos Presentation 3', category: 'Presentations', aspect: 'landscape' },

  // ── TEACHING ──
  { id: 'tea-1', src: '/images/teaching/ATC-VBS-117.jpg', alt: 'Teaching 1', category: 'Teaching', aspect: 'landscape' },
  { id: 'tea-2', src: '/images/teaching/ATC-VBS-138.jpg', alt: 'Teaching 2', category: 'Teaching', aspect: 'square' },
  { id: 'tea-3', src: '/images/teaching/ATC-VBS-14(2).jpg', alt: 'Teaching 3', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-4', src: '/images/teaching/ATC-VBS-170.jpg', alt: 'Teaching 4', category: 'Teaching', aspect: 'landscape' },
  { id: 'tea-5', src: '/images/teaching/ATC-VBS-38.jpg', alt: 'Teaching 5', category: 'Teaching', aspect: 'square' },
  { id: 'tea-6', src: '/images/teaching/ATC-VBS-44.jpg', alt: 'Teaching 6', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-7', src: '/images/teaching/ATC-VBS-46.jpg', alt: 'Teaching 7', category: 'Teaching', aspect: 'landscape' },
  { id: 'tea-8', src: '/images/teaching/ATC-VBS-48.jpg', alt: 'Teaching 8', category: 'Teaching', aspect: 'square' },
  { id: 'tea-9', src: '/images/teaching/ATC-VBS-61.jpg', alt: 'Teaching 9', category: 'Teaching', aspect: 'landscape' },
  { id: 'tea-10', src: '/images/teaching/ATC-VBS-87.jpg', alt: 'Teaching 10', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-l1', src: '/images/LAGOS/PXL_20250816_092153140.PORTRAIT.jpg', alt: 'Lagos Teaching 1', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-l2', src: '/images/LAGOS/PXL_20250816_092515440.PORTRAIT.jpg', alt: 'Lagos Teaching 2', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-l3', src: '/images/LAGOS/PXL_20250816_093255254.PORTRAIT.jpg', alt: 'Lagos Teaching 3', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-l4', src: '/images/LAGOS/PXL_20250816_093336393.PORTRAIT.jpg', alt: 'Lagos Teaching 4', category: 'Teaching', aspect: 'portrait' },
  { id: 'tea-l5', src: '/images/LAGOS/PXL_20250816_093616852.PORTRAIT.jpg', alt: 'Lagos Teaching 5', category: 'Teaching', aspect: 'portrait' },
]
