export default [
  // Rocket Propulsion (RS101)
  {
    _id: "M101",
    name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and rocket engines.",
    course: "RS101",
    lessons: [
      {
        _id: "L101",
        name: "History of Rocketry",
        description: "A brief history of rocketry and space exploration.",
        module: "M101",
      },
      {
        _id: "L102",
        name: "Propulsion Fundamentals",
        description: "Impulse, thrust, exhaust velocity & efficiency.",
        module: "M101",
      },
    ],
  },
  {
    _id: "M102",
    name: "Liquid Engines",
    description: "Design & operation of liquid propellant engines.",
    course: "RS101",
    lessons: [
      {
        _id: "L103",
        name: "Injector Design",
        description: "Injector types and mixing performance.",
        module: "M102",
      },
      {
        _id: "L104",
        name: "Cooling Techniques",
        description: "Regenerative & film cooling strategies.",
        module: "M102",
      },
    ],
  },
  // Aerodynamics (RS102)
  {
    _id: "M201",
    name: "Fluid Dynamics Basics",
    description: "Continuity, momentum, Bernoulli, compressibility.",
    course: "RS102",
    lessons: [
      {
        _id: "L201",
        name: "Viscosity & Laminar Flow",
        description: "Flow regimes and Reynolds number.",
        module: "M201",
      },
    ],
  },
  {
    _id: "M202",
    name: "Airfoils & Lift",
    description: "Airfoil geometry, pressure distribution, stall.",
    course: "RS102",
    lessons: [
      {
        _id: "L202",
        name: "Boundary Layer",
        description: "Transition & turbulence effects.",
        module: "M202",
      },
      {
        _id: "L203",
        name: "Drag Components",
        description: "Parasitic, induced & wave drag.",
        module: "M202",
      },
    ],
  },
  // Spacecraft Design (RS103)
  {
    _id: "M301",
    name: "Systems Engineering",
    description: "Mission requirements & trade studies.",
    course: "RS103",
    lessons: [
      {
        _id: "L301",
        name: "Subsystem Interfaces",
        description: "Power, thermal, structural interfaces.",
        module: "M301",
      },
    ],
  },
  {
    _id: "M302",
    name: "Payload Integration",
    description: "Payload accommodation & vibration isolation.",
    course: "RS103",
    lessons: [
      {
        _id: "L302",
        name: "Launch Environments",
        description: "Acoustic & shock loads.",
        module: "M302",
      },
    ],
  },
  // Middle-earth Languages (RS107)
  {
    _id: "M701",
    name: "Elvish Phonology",
    description: "Vowel harmony & consonant shifts in Sindarin.",
    course: "RS107",
    lessons: [
      {
        _id: "L701",
        name: "Sindarin Mutation",
        description: "Initial consonant mutation rules.",
        module: "M701",
      },
    ],
  },
  {
    _id: "M702",
    name: "Khuzdul Roots",
    description: "Structure of Dwarvish triliteral roots.",
    course: "RS107",
    lessons: [
      {
        _id: "L702",
        name: "Morphology of Khuzdul",
        description: "Derivational patterns & affixes.",
        module: "M702",
      },
    ],
  },
];
