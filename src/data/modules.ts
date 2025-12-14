
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
  type: 'motor' | 'wiring';
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
        id: 'step1',
        title: { en: 'Identify the Stator', hi: 'स्टेटर को पहचानें' },
        description: {
          en: 'The stator is the stationary part of the motor. Locate the cylindrical outer casing with copper windings.',
          hi: 'स्टेटर मोटर का स्थिर हिस्सा है। तांबे की वाइंडिंग वाले बेलनाकार बाहरी आवरण का पता लगाएं।'
        },
        instruction: {
          en: 'Click on the cyan-colored component to select the stator.',
          hi: 'स्टेटर को चुनने के लिए सियान रंग के घटक पर क्लिक करें।'
        },
        targetPartId: 'stator'
      },
      {
        id: 'step2',
        title: { en: 'Position the Rotor', hi: 'रोटर को रोटर करें' },
        description: {
          en: 'The rotor is the rotating component. It sits inside the stator and contains permanent magnets.',
          hi: 'रोटर घूर्णन घटक है। यह स्टेटर के अंदर बैठता है और इसमें स्थायी चुंबक होते हैं।'
        },
        instruction: {
          en: 'Click on the purple component and drag it into position.',
          hi: 'बैंगनी घटक पर क्लिक करें और इसे स्थिति में खींचें।'
        },
        targetPartId: 'rotor'
      },
      {
        id: 'step3',
        title: { en: 'Attach the Shaft', hi: 'शाफ्ट संलग्न करें' },
        description: {
          en: 'The shaft transmits mechanical power from the motor. Align it with the rotor center.',
          hi: 'शाफ्ट मोटर से यांत्रिक शक्ति संचारित करता है। इसे रोटर केंद्र के साथ संरेखित करें।'
        },
        instruction: {
          en: 'Click on the pink shaft and connect it to the rotor.',
          hi: 'गुलाबी शाफ्ट पर क्लिक करें और इसे रोटर से कनेक्ट करें।'
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
        }
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
        }
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
        }
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
  }
};
