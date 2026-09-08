export default function HeritageSkylineArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full pointer-events-none select-none opacity-20 ${className}`}
    >
      {/* Ground Baseline */}
      <line x1="0" y1="115" x2="1200" y2="115" stroke="#C5A059" strokeWidth="1" />
      <line x1="0" y1="118" x2="1200" y2="118" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Repeating Historical Heritage Silhouette (Domes, arches, columns, towers) */}
      <g stroke="#C5A059" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Unit 1 */}
        <path d="M 50,115 L 50,70 L 60,70 L 60,60 Q 75,30 90,60 L 90,70 L 100,70 L 100,115" />
        <path d="M 75,30 L 75,18 M 73,20 L 77,20" />
        <path d="M 65,85 A 10,10 0 0,1 85,85 L 85,115 L 65,115 Z" />

        {/* Pillar monument */}
        <path d="M 120,115 L 120,50 L 135,50 L 135,115" />
        <path d="M 115,50 L 140,50 L 127,38 Z" />

        {/* Classical colonnade */}
        <path d="M 155,115 L 155,75 L 240,75 L 240,115" />
        <path d="M 155,70 L 240,70" />
        <path d="M 175,75 L 175,115 M 195,75 L 195,115 M 215,75 L 215,115" />
        <path d="M 160,75 A 7,7 0 0,1 174,75" />
        <path d="M 180,75 A 7,7 0 0,1 194,75" />
        <path d="M 200,75 A 7,7 0 0,1 214,75" />
        <path d="M 220,75 A 7,7 0 0,1 234,75" />

        {/* Central grand dome */}
        <path d="M 260,115 L 260,65 L 280,65 Q 315,15 350,65 L 370,65 L 370,115" />
        <path d="M 315,15 L 315,5 M 313,7 L 317,7" />
        <path d="M 290,78 A 25,25 0 0,1 340,78 L 340,115 L 290,115 Z" />

        {/* Tower Spire */}
        <path d="M 390,115 L 390,45 L 395,20 L 400,45 L 400,115" />
        <circle cx="395" cy="18" r="2" />

        {/* Repeat Unit across right side */}
        <path d="M 450,115 L 450,70 L 460,70 L 460,60 Q 475,30 490,60 L 490,70 L 500,70 L 500,115" />
        <path d="M 475,30 L 475,18" />
        <path d="M 465,85 A 10,10 0 0,1 485,85 L 485,115 L 465,115 Z" />

        <path d="M 540,115 L 540,55 L 610,55 L 610,115" />
        <path d="M 535,55 L 615,55 L 575,35 Z" />
        <path d="M 560,75 A 15,15 0 0,1 590,75 L 590,115 L 560,115 Z" />

        <path d="M 650,115 L 650,75 L 735,75 L 735,115" />
        <path d="M 670,75 L 670,115 M 690,75 L 690,115 M 710,75 L 710,115" />

        {/* Grand Shivaji College Arch Facade */}
        <path d="M 760,115 L 760,50 L 860,50 L 860,115" />
        <path d="M 755,50 L 865,50 L 810,25 Z" />
        <path d="M 785,75 A 25,25 0 0,1 835,75 L 835,115 L 785,115 Z" />

        {/* Secondary Dome */}
        <path d="M 890,115 L 890,65 Q 920,25 950,65 L 950,115" />
        <path d="M 920,25 L 920,12" />

        {/* Right Pillars & Minarets */}
        <path d="M 980,115 L 980,40 L 986,15 L 992,40 L 992,115" />
        <path d="M 1020,115 L 1020,70 L 1080,70 L 1080,115" />
        <path d="M 1040,80 A 10,10 0 0,1 1060,80 L 1060,115 L 1040,115 Z" />
        <path d="M 1110,115 L 1110,50 L 1140,50 L 1140,115" />
      </g>
    </svg>
  );
}
