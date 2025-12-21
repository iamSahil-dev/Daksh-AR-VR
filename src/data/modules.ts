
export interface ModuleStep {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  instruction: { en: string; hi: string };
  targetPartId?: string; // For 3D interaction logic (Motor)
  requiredConnection?: { from: string; to: string }; // For Wiring (Start -> End)
  type?: 'info' | 'interaction'; // New field to distinguish lesson types
  image?: string; // Optional image for info steps
}

export interface ModuleData {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  type: 'motor' | 'wiring' | 'pcb';
  steps: ModuleStep[];
}

export const modulesData: Record<string, ModuleData> = {
  '1': {
    id: '1',
    title: { en: 'Motor Assembly Basics', hi: 'मोटर असेंबली की मूल बातें' },
    description: { en: 'Learn to disassemble and fix a basic DC motor.', hi: 'एक बुनियादी डीसी मोटर को अलग करना और ठीक करना सीखें।' },
    type: 'motor',
    steps: [
      {
        id: 'intro_stator',
        type: 'info',
        title: { en: 'Component: The Stator', hi: 'घटक: स्टेटर' },
        description: {
          en: 'The Stator is the stationary part of the motor. It contains the permanent magnets or windings that create the magnetic field.',
          hi: 'स्टेटर मोटर का स्थिर हिस्सा है। इसमें स्थायी चुंबक या वाइंडिंग होती है जो चुंबकीय क्षेत्र बनाती है।'
        },
        instruction: {
          en: 'Observe the highlighted Stator.',
          hi: 'हाइलाइट किए गए स्टेटर को देखें।'
        },
        targetPartId: 'stator' // Used for focus
      },
      {
        id: 'intro_rotor',
        type: 'info',
        title: { en: 'Component: The Rotor', hi: 'घटक: रोटर' },
        description: {
          en: 'The Rotor (or Armature) is the rotating part. It sits inside the stator and spins when current flows through it.',
          hi: 'रोटर (या आर्मेचर) घूमने वाला हिस्सा है। यह स्टेटर के अंदर बैठता है और करंट प्रवाहित होने पर घूमता है।'
        },
        instruction: {
          en: 'Observe the highlighted Rotor.',
          hi: 'हाइलाइट किए गए रोटर को देखें।'
        },
        targetPartId: 'rotor'
      },
      {
        id: 'intro_shaft',
        type: 'info',
        title: { en: 'Component: The Shaft', hi: 'घटक: शाफ्ट' },
        description: {
          en: 'The Shaft is the metal rod connected to the rotor. It transfers the mechanical power to the machine being driven.',
          hi: 'शाफ्ट रोटर से जुड़ी धातु की छड़ है। यह यांत्रिक शक्ति को उस मशीन में स्थानांतरित करता है जिसे चलाया जा रहा है।'
        },
        instruction: {
          en: 'Observe the highlighted Shaft.',
          hi: 'हाइलाइट किए गए शाफ्ट को देखें।'
        },
        targetPartId: 'shaft'
      },
      {
        id: 'step1',
        title: { en: 'Assemble: The Stator', hi: 'इकट्ठा करें: स्टेटर' },
        description: {
          en: 'We start with the base. The Stator housing holds everything together.',
          hi: 'हम आधार से शुरू करते हैं। स्टेटर आवास सब कुछ एक साथ रखता है।'
        },
        instruction: {
          en: 'Click on the Stator to confirm the base.',
          hi: 'आधार की पुष्टि करने के लिए स्टेटर पर क्लिक करें।'
        },
        targetPartId: 'stator'
      },
      {
        id: 'step2',
        title: { en: 'Assemble: The Rotor', hi: 'इकट्ठा करें: रोटर' },
        description: {
          en: 'Now we place the Rotor inside the magnetic field of the Stator.',
          hi: 'अब हम रोटर को स्टेटर के चुंबकीय क्षेत्र के अंदर रखते हैं।'
        },
        instruction: {
          en: 'Click the Rotor to place it inside.',
          hi: 'इसे अंदर रखने के लिए रोटर पर क्लिक करें।'
        },
        targetPartId: 'rotor'
      },
      {
        id: 'step3',
        title: { en: 'Assemble: The Shaft', hi: 'इकट्ठा करें: शाफ्ट' },
        description: {
          en: 'Finally, the Shaft runs through the center to ensure smooth rotation.',
          hi: 'अंत में, सुचारू रोटेशन सुनिश्चित करने के लिए शाफ्ट केंद्र के माध्यम से चलता है।'
        },
        instruction: {
          en: 'Click the Shaft to render the motor complete.',
          hi: 'मोटर को पूरा करने के लिए शाफ्ट पर क्लिक करें।'
        },
        targetPartId: 'shaft'
      },
    ]
  },
  '2': {
    id: '2',
    title: { en: 'Electrical Wiring', hi: 'विद्युत वायरिंग' },
    description: { en: 'Understand basic house wiring connections.', hi: 'बुनियादी घर की वायरिंग कनेक्शन को समझें।' },
    type: 'wiring',
    steps: [
      {
        id: 'intro1',
        type: 'info',
        title: { en: 'What is a Switch?', hi: 'स्विच क्या है?' },
        description: {
          en: 'A switch is a component that controls the flow of electricity. It opens (breaks) or closes (completes) the circuit.',
          hi: 'स्विच एक घटक है जो बिजली के प्रवाह को नियंत्रित करता है। यह सर्किट को खोलता (तोड़ता) या बंद (पूरा) करता है।'
        },
        instruction: {
          en: 'Read the information above and click Next.',
          hi: 'उपरोक्त जानकारी पढ़ें और अगला क्लिक करें।'
        },
        targetPartId: 'switch' // Implicit focus in WiringScene, explicit here for consistency if needed
      },
      {
        id: 'intro2',
        type: 'info',
        title: { en: 'What is a Bulb Holder?', hi: 'बल्ब होल्डर क्या है?' },
        description: {
          en: 'The holder secures the bulb and provides terminals to connect the Phase and Neutral wires.',
          hi: 'होल्डर बल्ब को सुरक्षित करता है और फेज और न्यूट्रल तारों को जोड़ने के लिए टर्मिनल प्रदान करता है।'
        },
        instruction: {
          en: 'Read the information above and click Next.',
          hi: 'उपरोक्त जानकारी पढ़ें और अगला क्लिक करें।'
        },
        targetPartId: 'bulb'
      },
      {
        id: 'intro3',
        type: 'info',
        title: { en: 'Safety First', hi: 'सुरक्षा पहले' },
        description: {
          en: 'Always ensure the Main Power is OFF before touching any wires. Red is typically Phase, Blue/Black is Neutral.',
          hi: 'तारों को छूने से पहले हमेशा सुनिश्चित करें कि मुख्य शक्ति बंद है। लाल आमतौर पर फेज है, नीला/काला न्यूट्रल है।'
        },
        instruction: {
          en: 'Read the information above and click Start Practical.',
          hi: 'उपरोक्त जानकारी पढ़ें और प्रैक्टिकल शुरू करें पर क्लिक करें।'
        },
        targetPartId: 'source'
      },
      {
        id: 'w_step1',
        title: { en: 'Connect Phase to Switch', hi: 'फेज को स्विच से जोड़ें' },
        description: {
          en: 'Draw a wire from the Red Phase Source to the Switch Input.',
          hi: 'लाल फेज स्रोत से स्विच इनपुट तक एक तार खींचें।'
        },
        instruction: {
          en: 'Click the Red Terminal (Source) then click the Switch Terminal.',
          hi: 'लाल टर्मिनल (स्रोत) पर क्लिक करें फिर स्विच टर्मिनल पर क्लिक करें।'
        },
        targetPartId: 'wire_phase',
        requiredConnection: { from: 'source_phase', to: 'switch_in' }
      },
      {
        id: 'w_step2',
        title: { en: 'Connect Switch to Bulb', hi: 'स्विच को बल्ब से जोड़ें' },
        description: {
          en: 'Now connect the output of the switch to the bulb holder.',
          hi: 'अब स्विच के आउटपुट को बल्ब होल्डर से कनेक्ट करें।'
        },
        instruction: {
          en: 'Click the Switch Output then the Bulb Input.',
          hi: 'स्विच आउटपुट पर क्लिक करें फिर बल्ब इनपुट पर क्लिक करें।'
        },
        targetPartId: 'wire_switch_bulb',
        requiredConnection: { from: 'switch_out', to: 'bulb_in' }
      },
      {
        id: 'w_step3',
        title: { en: 'Connect Neutral', hi: 'न्यूट्रल कनेक्ट करें' },
        description: {
          en: 'Complete the circuit by connecting the Neutral wire to the bulb.',
          hi: 'न्यूट्रल तार को बल्ब से जोड़कर सर्किट पूरा करें।'
        },
        instruction: {
          en: 'Click the Blue Neutral Source then the Bulb Output.',
          hi: 'नीले न्यूट्रल स्रोत पर क्लिक करें फिर बल्ब आउटपुट पर क्लिक करें।'
        },
        targetPartId: 'wire_neutral',
        requiredConnection: { from: 'source_neutral', to: 'bulb_out' }
      }
    ]
  },
  '3': {
    id: '3',
    title: { en: 'PCB Soldering', hi: 'पीसीबी सोल्डरिंग' },
    description: { en: 'Learn professional soldering techniques.', hi: 'पेशेवर सोल्डरिंग तकनीक सीखें।' },
    type: 'pcb',
    steps: [
      {
        id: 'intro_pcb',
        type: 'info',
        title: { en: 'The PCB (Board)', hi: 'पीसीबी (बोर्ड)' },
        description: {
          en: 'The Printed Circuit Board (PCB) mechanically supports and electrically connects electronic components using conductive tracks.',
          hi: 'प्रिंटेड सर्किट बोर्ड (पीसीबी) प्रवाहकीय पटरियों का उपयोग करके इलेक्ट्रॉनिक घटकों को यंत्रवत् रूप से समर्थन और विद्युत रूप से जोड़ता है।'
        },
        instruction: {
          en: 'Observe the traces and pads on the PCB.',
          hi: 'पीसीबी पर निशान और पैड देखें।'
        },
        targetPartId: 'board'
      },
      {
        id: 'intro_resistor',
        type: 'info',
        title: { en: 'The Resistor', hi: 'रेसिस्टर' },
        description: {
          en: 'A Resistor limits the flow of electric current. The colored bands indicate its resistance value.',
          hi: 'एक रेसिस्टर विद्युत प्रवाह के प्रवाह को सीमित करता है। रंगीन बैंड इसके प्रतिरोध मूल्य को दर्शाते हैं।'
        },
        instruction: {
          en: 'Observe the resistor and its color code.',
          hi: 'रेसिस्टर और उसके कलर कोड को देखें।'
        },
        targetPartId: 'resistor'
      },
      {
        id: 'intro_iron',
        type: 'info',
        title: { en: 'The Soldering Iron', hi: 'सोल्डरिंग आयरन' },
        description: {
          en: 'This tool supplies heat to melt solder, which flows into the joint between the component and the board.',
          hi: 'यह उपकरण सोल्डर को पिघलाने के लिए गर्मी की आपूर्ति करता है, जो घटक और बोर्ड के बीच के जोड़ में बहता है।'
        },
        instruction: {
          en: 'Observe the heated tip of the iron.',
          hi: 'लोहे की गर्म नोक को देखें।'
        },
        targetPartId: 'iron'
      },
      {
        id: 'safe1',
        type: 'info',
        title: { en: 'Safety Warning', hi: 'सुरक्षा चेतावनी' },
        description: {
          en: 'Soldering irons get extremely hot (300°C+). Never touch the metal tip. Use in a well-ventilated area.',
          hi: 'सोल्डरिंग आयरन बहुत गर्म (300°C+) हो जाते हैं। धातु की नोक को कभी न छुएं। अच्छी तरह हवादार क्षेत्र में उपयोग करें।'
        },
        instruction: {
          en: 'Read and understand the safety warning.',
          hi: 'सुरक्षा चेतावनी पढ़ें और समझें।'
        }
      },
      {
        id: 'pcb_step1',
        title: { en: 'Inspect the Pads', hi: 'पैड का निरीक्षण करें' },
        description: {
          en: 'Identify the pads on the Printed Circuit Board where components will be placed.',
          hi: 'प्रिंटेड सर्किट बोर्ड पर पैड की पहचान करें जहां घटक रखे जाएंगे।'
        },
        instruction: {
          en: 'Click on the PCB to confirm inspection.',
          hi: 'निरीक्षण की पुष्टि के लिए पीसीबी पर क्लिक करें।'
        },
        targetPartId: 'board'
      },
      {
        id: 'pcb_step2',
        title: { en: 'Place the Resistor', hi: 'रेसिस्टर रखें' },
        description: {
          en: 'Insert the resistor leads through the holes. Bending the leads helps hold it in place.',
          hi: 'छिद्रों के माध्यम से रेसिस्टर लीड डालें। लीड को झुकाने से इसे जगह पर रखने में मदद मिलती है।'
        },
        instruction: {
          en: 'Click the Resistor to place it on the board.',
          hi: 'इसे बोर्ड पर रखने के लिए रेसिस्टर पर क्लिक करें।'
        },
        targetPartId: 'resistor'
      },
      {
        id: 'pcb_step3',
        title: { en: 'Solder the Joint', hi: 'जोड़ को सोल्डर करें' },
        description: {
          en: 'Heat the pad and component lead simultaneously, then apply solder. Do not apply solder directly to the iron tip.',
          hi: 'पैड और घटक लीड को एक साथ गर्म करें, फिर सोल्डर लागू करें। सीधे आयरन टिप पर सोल्डर न लगाएं।'
        },
        instruction: {
          en: 'Click the Soldering Iron to apply heat and solder.',
          hi: 'गर्मी और सोल्डर लगाने के लिए सोल्डरिंग आयरन पर क्लिक करें।'
        },
        targetPartId: 'iron'
      }
    ]
  }
};
