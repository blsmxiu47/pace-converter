import { useState } from 'react'

import PaceConverter from './PaceConverter'
import PaceTimeConverter from './PaceTimeConverter'

export default function Content() {
    const [activeTab, setActiveTab] = useState('Pace Converter')

    return (
        <main>
            <nav className="navtabs">
                <ul className="navlist">
                    <li>
                        <button
                            className={`nav-button ${activeTab === 'Pace Converter' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Pace Converter')}
                        >
                            Pace Converter
                        </button>
                    </li>
                    <li>
                        <button
                            className={`nav-button ${activeTab === 'Pace-Time Converter' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Pace-Time Converter')}
                        >
                            Pace-Time Converter
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="outlet">
                {activeTab === 'Pace Converter' && <PaceConverter />}
                {activeTab === 'Pace-Time Converter' && <PaceTimeConverter />}
            </div>
        </main>
    )
}